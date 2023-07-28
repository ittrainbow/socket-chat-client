import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Input } from '../UI'
import { Context } from '../context/Context'

export const Profile = () => {
  const { name, setName } = useContext(Context)
  const navigate = useNavigate()
  const [tempName, setTempName] = useState<string>('')

  useEffect(() => {
    setTempName(name || '')
  }, [name])

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTempName(value)
  }

  const submitHandler = () => {
    localStorage.setItem('socketRoomUsername', tempName)
    setName(tempName)
    navigate('/')
  }

  const clearHandler = () => {
    localStorage.removeItem('socketRoomUsername')
    setTempName('')
  }

  const cancelHandler = () => {
    navigate(-1)
  }

  return (
    <div className="profile-container ">
      <div className="header">Profile</div>
      <Input type="text" value={tempName} onChange={changeNameHandler} label="Username" />
      <Button onClick={submitHandler} label="Submit" disabled={tempName.length === 0} />
      <Button onClick={clearHandler} label="Clear profile" disabled={tempName.length === 0} />
      <Button onClick={cancelHandler} label="Cancel" disabled={tempName.length === 0} />
    </div>
  )
}
