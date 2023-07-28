type UsersPropsType = {
  users: string[]
  numberOfUsers: number
}

export const Users = ({ users, numberOfUsers }: UsersPropsType) => {
  return (
    <>
      <div className="users__header">{numberOfUsers} active users:</div>
      {users.map((el, index) => {
        return (
          <div key={index} className="users__list-element">
            {el}
          </div>
        )
      })}
    </>
  )
}
