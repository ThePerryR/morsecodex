import App from './components/pages/App'
import Admin from './components/pages/Admin'
import Landing from './components/pages/Landing'
import Login from './components/pages/Login'
import Experiment from './components/pages/Experiment'
import Lessons from './components/pages/Lessons'

const allRoutes = [
  {path: '/', component: Landing},
  {path: '/e', component: Experiment},
  {path: '/admin', component: Admin},
  {path: '/lesson', component: Lessons}
]

export default function (user) {
  return {
    component: App,

    getChildRoutes (_, cb) {
      if (user) {
        cb(null, [
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
