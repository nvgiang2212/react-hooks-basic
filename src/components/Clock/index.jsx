import React, { useEffect, useState } from 'react';

function formatTime(date) {
  if (!date) return ''

  const hours = `0${date.getHours()}`.slice(-2)
  const minutes = `0${date.getMinutes()}`.slice(-2)
  const seconds = `0${date.getSeconds()}`.slice(-2)

  return `${hours}:${minutes}:${seconds}`
}

function Clock() {
  const [timeString, setTimeString] = useState('')

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const now = new Date()
      // HH:mm:ss
      const newTimeString = formatTime(now)

      setTimeString(newTimeString)
    }, 1000);

    return () => {
      if (timeInterval) {
        clearInterval(timeInterval)
      }
    }
  }, [])

  return (
    <h1 style={{ fontSize: '42px' }}>{timeString}</h1>
  );
}

export default Clock;