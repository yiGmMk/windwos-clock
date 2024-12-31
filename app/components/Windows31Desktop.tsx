'use client'

import { useState, useEffect } from 'react'
import { Clock } from './Clock'
import { BackgroundManager } from './BackgroundManager'

export default function Windows31Desktop() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <BackgroundManager>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Clock time={time} />
      </div>
    </BackgroundManager>
  )
}

