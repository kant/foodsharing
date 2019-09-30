import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form'

import routes from './routes'
import app from './app'
import conversations from './conversations'
import messages from './messages'
import foodsavers from './foodsavers'
import profile from './profile'
import markers from './markers'
import fairteiler from './fairteiler'
import walls from './walls'

export default combineReducers({
  routes,
  app,
  conversations,
  foodsavers,
  messages,
  profile,
  markers,
  fairteiler,
  walls,

  ...createForms({
    login: {
      email: 'm.strassburger@gmail.com',
      password: 'testtest'
    },
    drafts: {}
  })
})
