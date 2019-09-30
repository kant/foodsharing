import { TYPE as appState } from '../middlewares/AppState'
import {
  LOGIN_SUCCESS,
  LOGOUT,
  NAVIGATION
} from '../common/constants'

const initialState = {
  state: null,
  session: null,
  token: null,
  scene: null,
  modelId: null
}

export default function reducer(state = initialState, action: any = {}) {
  const { type, payload } = action
  switch (type) {
    case appState:
      return {
        ...state,
        state: payload
      }

    case NAVIGATION:
      return {
        ...state,
        ...payload
      }

    case LOGIN_SUCCESS:
      const { session, token } = payload
      return {
        ...state,
        session,
        token
      }

    case LOGOUT:
      return {
        ...state,
        session: null,
        token: null
      }

    default:
      return state
  }
}
