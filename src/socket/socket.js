import { io } from 'socket.io-client'

const options = {
  'force new connection': true,
  reconnectionAttempts: 'Infinity',
  timeout: 5000,
  transports: ['websocket']
}

export const socket = io.connect('https://socket-chat-server-production-17fa.up.railway.app/', options)
