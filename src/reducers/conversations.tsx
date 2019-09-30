import {
  MESSAGE_SUCCESS,
  WEBSOCKET_MESSAGE,
  CONVERSATION_SUCCESS,
  CONVERSATIONS_SUCCESS,
  LOGOUT
} from '../common/constants'

const initialState = []

export default function reducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case MESSAGE_SUCCESS:
    case WEBSOCKET_MESSAGE:
      const { payload: {time, fs_id, body, cid} } = action
          , conversationId = action.type === MESSAGE_SUCCESS ? action.conversationId : cid

      let found = false

      const newState = state.map(conversation => {
        if (conversation.id != conversationId)
          return conversation

        found = true
        return {
          ...conversation,
          unread: "1",
          last_foodsaver_id: `${fs_id}`,
          last_message: body,
          last: time,
          last_ts: Math.floor(Date.parse(time)/1000)
        }
      })

      // In case this is an fresh conversation that we don't have yet, create it!
      if (!found)
        newState.push({
          id: conversationId,
          unread: "1",
          last_foodsaver_id: `${fs_id}`,
          last_message: body,
          last: time,
          last_ts: Math.floor(Date.parse(time)/1000),
          member: [`${fs_id}`]
        })

      return newState

    case CONVERSATIONS_SUCCESS:
      return action.payload.map(conversation => ({
        ...conversation,
        member: conversation.member.map(member => member.id)
      }))

    case CONVERSATION_SUCCESS:
      const { id } = action
      return state.map(conversation => {
        if (conversation.id != id)
          return conversation

        return {
          ...conversation,
          unread: "0"
        }
      })

    case LOGOUT:
      return [...initialState]

    default:
      return state
  }
}
