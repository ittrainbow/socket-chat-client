import { memo} from 'react'

import { MessageType, getTime } from '../heplers'

type MessagePropsType = {
  state: MessageType[]
  name: string | null
}

const Messages = (props: MessagePropsType) => {
  const { state } = props

  return (
    <div className="messages">
      {state.map((msg: MessageType, index: number) => {
        const {
          user: { name },
          message,
          timestamp
        } = msg
        const time = getTime(timestamp)
        const myMessage = name === props.name
        const classes = `messages__${myMessage ? 'my-message' : 'other-message'}`
        return (
          <div key={index} className="messages__message">
            <div className="messages__message-header">
              <div className="messages__message-header__inner">{name}</div> {time}
            </div>
            <div className={classes}>
              {message}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default memo(Messages)
