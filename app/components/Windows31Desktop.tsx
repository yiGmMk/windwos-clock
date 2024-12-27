'use client'

import { useState, useEffect } from 'react'
import ProgramManager from './ProgramManager'
import Clock from './Clock'
import Calculator from './Calculator'
import Minesweeper from './Minesweeper'

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
    <div className="fixed inset-0 bg-[#c3c7cb] overflow-hidden">
      {/* Program Manager */}
      <div className="fixed left-[5vw] top-[5vh]">
        <ProgramManager />
      </div>

      {/* Clock */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Clock time={time} />
      </div>

      {/* Calculator */}
      <div className="fixed right-[5vw] top-[5vh]">
        <Calculator />
      </div>

      {/* Minesweeper */}
      <div className="fixed left-[5vw] bottom-[5vh]">
        <Minesweeper />
      </div>
    </div>
  )
}

