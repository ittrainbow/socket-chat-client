import { useAppContext } from '../context/Context'

type UsersPropsType = {
  users: string[]
  numberOfUsers: number
}

export const Users = ({ users, numberOfUsers }: UsersPropsType) => {
  const { name } = useAppContext()

  return (
    <>
      <div className="users__header">{numberOfUsers} active users:</div>
      {users.map((el, index) => {
        const classes = `users__${name === el ? 'me' : 'user'}`
        return (
          <div key={index} className={classes}>
            {el}
          </div>
        )
      })}
    </>
  )
}
