import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Input } from '../UI'
import { socket } from '../socket/socket'

export const Home = () => {
  const navigate = useNavigate()
  const name = localStorage.getItem('socketRoomUsername') || ''
  const [room, setRoom] = useState<string>('')
  const [rooms, setRooms] = useState<string[]>([])
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

  const createRoomHandler = () => {
    socket.emit('createroom', { room, name })
    navigate(`/room/${room}`)
  }

  useEffect(() => {
    socket.emit('inithome')
    socket.on('getrooms', (rooms) => setRooms(rooms))
  }, [])

  useEffect(() => {
    setButtonDisabled(room.length === 0 || name.length === 0)
  }, [room, name])

  const setRoomHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setRoom(value)
  }

  const profileHandler = () => {
    navigate('/profile')
  }

  const pickRoomHandler = (room: string) => {
    navigate(`/room/${room}`)
  }
  return (
    <>
      <div className="header">Home</div>
      <div className="home-form">
        Welcome, {name}
        <div className="home-container">
          <Input value={room} type="text" onChange={setRoomHandler} label="Room name" />
          <Button label="Create Room" onClick={createRoomHandler} disabled={buttonDisabled} />
          {rooms.map((room) => {
            return (
              <div key={room} className="home-element-container">
                <Button label={room} onClick={() => pickRoomHandler(room)} />
              </div>
            )
          })}
        </div>
        <div className="home-bottom">
          <Button label="Edit profile" onClick={profileHandler} />
        </div>
      </div>
    </>
  )
}
