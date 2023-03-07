import { useEffect } from 'react'

const NotifcationStyle = {
  background: '#eae1f9',
  padding: '13px 15px',
  margin: '15px 0',
  borderRadius: '3px'
}

const Notification = ({ setNotification, notification }) => {
  useEffect(() => {
    if(notification === '') return
    let timeout = setTimeout(() => {
      setNotification('')
    }, 5000)
    return () => {
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification])

  if(notification === ''){
    return ''
  }

  return <div style={NotifcationStyle}>{notification}</div>
}

export default Notification