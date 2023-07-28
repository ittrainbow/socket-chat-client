import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { BsEmojiSmile } from 'react-icons/bs'

import { Users } from '.'
import { Button, Input } from '../UI'
import { MessageType } from '../heplers/types'
import { useAppContext } from '../context/Context'
import Messages from './Messages'
import * as io from 'socket.io-client'

const socket = io.connect('https://ittr-socket-chatrooms.onrender.com')

export const Room = () => {
  const { id } = useParams()
  const inputRef = useRef<HTMLInputElement>()
  const context = useAppContext()
  const navigate = useNavigate()
  const { name, setName } = context
  const [room, setRoom] = useState<string>('')
  const [numberOfUsers, setNumberOfUsers] = useState<number>(0)
  const [users, setUsers] = useState<string[]>([])
  const [state, setState] = useState<MessageType[]>([])
  const [showEmojies, setShowEmojies] = useState<boolean>(false)
  const [tempMessage, setTempMessage] = useState<string>('')
  const tempMessageRef = useRef(tempMessage)

  useEffect(() => {
    const name = localStorage.getItem('socketRoomUsername')
    name ? setName(name) : navigate('/')

    socket.on('message', (data) => {
      setState((state) => [...state, data])
    })

    socket.on('usersupdated', (data) => {
      const { getUsers, numberOfUsers } = data
      setUsers(getUsers)
      setNumberOfUsers(numberOfUsers)
    }) // eslint-disable-next-line
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [state])

  useEffect(() => {
    id && setRoom(id)
  }, [id])

  useEffect(() => {
    if (room && name) {
      const user = { room, name }
      socket.emit('join', user)
    }
  }, [room, name])

  useEffect(() => {
    const onUnload = (e: any) => {
      e.preventDefault()
      name && socket.emit('leaveroom', { room: id, name })
    }

    const onSubmit = (e: KeyboardEvent) => {
      e.code === 'Enter' && sendMessageHandler(tempMessageRef.current)
    }

    window.addEventListener('beforeunload', onUnload)
    room && window.addEventListener('keypress', onSubmit)

    return () => {
      window.removeEventListener('beforeunload', onUnload)
      window.removeEventListener('keypress', onSubmit)
    } // eslint-disable-next-line
  }, [name, id, room])

  useEffect(() => {}, [id])

  const leaveRoomHandler = () => {
    socket.emit('leaveroom', { room, name })
    navigate('/')
  }

  const tempMessageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTempMessage(value)
    tempMessageRef.current = value
  }

  const sendMessageHandler = (message: string) => {
    if (message !== '') {
      const data = { room, name, message }
      socket.emit('sendmessage', data)
      setTempMessage('')

      const chatDiv = document.getElementById('chat')
      setTimeout(() => {
        chatDiv &&
          chatDiv.scrollTo({
            top: chatDiv.scrollHeight + 41,
            behavior: 'smooth'
          })
      }, 200)
    }
  }

  const onEmojiClickHandler = (e: EmojiClickData) => {
    const { emoji } = e
    setShowEmojies(false)
    setTempMessage(`${tempMessage}${emoji}`)
  }

  return (
    <>
      <div className="room-top">
        <div className="room-top__header">Room: {room}</div>
        <Button label="Leave" onClick={leaveRoomHandler} width={120} />
      </div>
      <div className="room-body">
        <div className="room-body__users">
          <Users users={users} numberOfUsers={numberOfUsers} />
        </div>
        <div className="room-body__chat" id="chat">
          <Messages state={state} name={name} />
        </div>
      </div>
      <div className="room-bottom">
        <Input type="text" inputRef={inputRef} onChange={tempMessageHandler} value={tempMessage} />
        <div className="room-emojies__container">
          <BsEmojiSmile
            className="room-emojies__emoji"
            onClick={() => setShowEmojies(!showEmojies)}
          />
          {showEmojies && (
            <div className="room-emojies__emojies">
              <EmojiPicker onEmojiClick={onEmojiClickHandler} />
            </div>
          )}
        </div>
        <div>
          <Button
            label="Send"
            onClick={() => sendMessageHandler(tempMessage)}
            width={120}
            disabled={tempMessage === ''}
          />
        </div>
      </div>
    </>
  )
}
