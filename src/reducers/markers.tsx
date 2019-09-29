import {
  MARKERS_SUCCESS
} from '../common/constants'

const initialState = []

export default function reducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case MARKERS_SUCCESS:
      return [...action.payload]

    default:
      return state
  }
}
