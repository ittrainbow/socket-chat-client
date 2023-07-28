import { useEffect, useContext } from 'react'

import { Router } from './router/Router'
import { Context } from './context/Context'

export const App = () => {
  const { setName } = useContext(Context)

  useEffect(() => {
    const name = localStorage.getItem('socketRoomUsername')
    name && setName(name) // eslint-disable-next-line
  }, [])
  return <Router />
}
