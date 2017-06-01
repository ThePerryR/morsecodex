import bodyParser from 'body-parser'
import connectMongo from 'connect-mongo'
import cookieParser from 'cookie-parser'
import csrf from 'csurf'
import dotenv from 'dotenv'
import express from 'express'
import RateLimit from 'express-rate-limit'
import session from 'express-session'
import helmet from 'helmet'
import mongoose from 'mongoose'
import logger from 'morgan'
import passport from 'passport'
import path from 'path'
import favicon from 'serve-favicon'

import User from './schemas/user'
import api from './utils/api'
import getSignedS3Url from './utils/getSignedS3Url'
import login from './utils/login'
import serveApp from './utils/serveApp'
import validate from './utils/validate'
import generateSitemap from './utils/sitemap'

dotenv.config()

/*
 * Initialize MongoDB Connection
 */
const MongoStore = connectMongo(session)
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('error', () => process.exit(-1))

/*
 * Initialize Application
 */
const app = express()
app.set('trust proxy')
app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => console.log(`Serving from http://0.0.0.0:${app.get('port')}`))

/* Redirect HTTP -> HTTPS */
if (app.get('env') !== 'development') {
  app.get('*', (req, res, next) => {
    const secureNoWww = /^https:\/\/teachok/i.test(req.headers.host)
    const noHttps = req.headers['x-forwarded-proto'] !== 'https'
    if (secureNoWww || noHttps) {
      res.redirect(`https://www.teachok.com${req.url}`)
    } else {
      next()
    }
  })
}

/* Serve Static Content */
app.use(favicon(path.join(__dirname, './public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, '../dist/public')))

/* Logging Middleware */
app.use(logger('dev'))

/* Security Middleware */
app.use(helmet())

/* Parsing Middleware */
app.use(bodyParser.json())
app.use(cookieParser())

/* Session Middleware */
const sessionStore = new MongoStore({mongooseConnection: mongoose.connection})
const sessionOptions = {
  secret: 'zeifie23j83',
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}
app.use(session(sessionOptions))

/* Authentication Middleware */
app.use(passport.initialize())
app.use(passport.session())

/* Authentication Strategy */
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

/* Routing */
app.get('/sitemapgen', (_, res) => {
  generateSitemap().then(results => res.send(results))
})
app.use(csrf({cookie: true}))
app.use('/api', api)
app.post('/login', new RateLimit({windowMs: 60000, max: 100, delayMs: 0}), login)
app.get('/validate/:validation_id', validate)
app.get('/sign-s3', getSignedS3Url)
app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})
app.get('*', serveApp)

export default app
