'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function CountUp({ to }: { to: number }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const duration = 1200
    const steps = 40
    const increment = to / steps
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + increment, to)
      setCount(Math.round(current))
      if (current >= to) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, to])

  return <span ref={ref}>{count}</span>
}
