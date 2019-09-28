import * as types from './constants'

export const init = (isSimulator: boolean) => ({type: types.INIT, isSimulator})

export const login = () => ({type: types.LOGIN_REQUEST})

export const cookie = (name: string, value: string) => ({type: types.COOKIE, name, value})

export const fetchConversations = () => ({type: types.CONVERSATIONS_REQUEST})
export const gotConversations = () => ({type: types.CONVERSATIONS_SUCCESS})

export const fetchConversation = (id: number) => ({type: types.CONVERSATION_REQUEST, id})
export const sendMessage = (conversationId: number) => ({type: types.MESSAGE_REQUEST, payload: {conversationId}})