import { memo } from 'react'

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
        const floatStyle = `message__float-${myMessage ? 'right' : 'left'}`

        return (
          <div key={index} className="message__container">
            <div className="message">
              <div className={floatStyle}>
                <div className="message__header">
                  <div className="message__header__inner">{name}</div> {time}
                </div>
                <div className="message__text">{message}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default memo(Messages)
