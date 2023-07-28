import { Route, Routes } from 'react-router-dom'
import { Userpage, Room, Profile } from '../components'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Userpage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/room/:id" element={<Room />} />
    </Routes>
  )
}
