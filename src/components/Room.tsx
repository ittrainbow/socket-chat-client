import { useEffect, useState, useContext, useRef } from 'react'
import * as io from 'socket.io-client'
import { useParams, useNavigate } from 'react-router-dom'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { BsEmojiSmile } from 'react-icons/bs'

import { Users } from '.'
import { Button, Input } from '../UI'
import { MessageType } from '../heplers/types'
import { Context } from '../context/Context'
import Messages from './Messages'

const socket = io.connect('http://localhost:5001')

export const Room = () => {
  const { id } = useParams()
  const inputRef = useRef<HTMLInputElement>()
  const context = useContext(Context)
  const navigate = useNavigate()
  const { name, setName } = context
  const [room, setRoom] = useState<string>('')
  const [numberOfUsers, setNumberOfUsers] = useState<number>(0)
  const [users, setUsers] = useState<string[]>([])
  const [state, setState] = useState<MessageType[]>([])
  const [showEmojies, setShowEmojies] = useState<boolean>(false)
  const [tempMessage, setTempMessage] = useState<string>('')

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
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault()
      name && socket.emit('leaveroom', { room: id, name })
    })
  }, [name, id])

  const leaveRoomHandler = () => {
    socket.emit('leaveroom', { room, name })
    navigate('/')
  }

  const tempMessageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTempMessage(value)
  }

  const sendMessageHandler = () => {
    if (tempMessage !== '') {
      const data = { room, name, message: tempMessage }
      socket.emit('sendmessage', data)
      setTempMessage('')

      const chatDiv = document.getElementById('chat')
      setTimeout(() => {
        chatDiv &&
          chatDiv.scrollTo({
            top: chatDiv.scrollHeight + 41,
            behavior: 'smooth'
          })
      }, 20)
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
        <Button label="Leave" onClick={leaveRoomHandler} width={80} />
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
        <Button label="Send" onClick={sendMessageHandler} width={140} />
      </div>
    </>
  )
}
