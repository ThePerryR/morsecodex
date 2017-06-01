import App from './components/pages/App'
import Admin from './components/pages/Admin'
import Landing from './components/pages/Landing'
import Login from './components/pages/Login'
import Experiment from './components/pages/Experiment'

const allRoutes = [
  {path: '/', component: Landing},
  {path: '/e', component: Experiment},
]

export default function (user) {
  return {
    component: App,

    getChildRoutes (_, cb) {
      if (user) {
        cb(null, [
          {path: '/admin', component: Admin},
          ...allRoutes
        ])
      } else {
        cb(null, [
          {path: '/login', component: Login},
          ...allRoutes
        ])
      }
    }
  }
}
