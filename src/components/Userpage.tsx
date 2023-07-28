import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Home } from '.'

export const Userpage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const name = localStorage.getItem('socketRoomUsername')
    !name && navigate('/profile')  // eslint-disable-next-line
  }, [])

  return <Home />
}
