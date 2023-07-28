import moment from 'moment/moment'

export const getTime = (timestamp: number) => {
  const day = new Date(timestamp).toString().substring(0, 15)
  const today = new Date().toString().substring(0, 15)
  const date = moment(timestamp).format().substring(0, 16).replace('T', ' ')

  return date.substring(day === today ? 11 : 5, 16)
}
