import { useEffect, useRef } from 'react'

interface GradientTextProps {
  colors: string[]
  animationSpeed?: number
  showBorder?: boolean
  className?: string
  children: React.ReactNode
}

export default function GradientText({
  colors,
  animationSpeed = 3,
  showBorder = false,
  className = '',
  children
}: GradientTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const element = textRef.current
    const colorStops = colors.map((color, index) => 
      `${color} ${(index / (colors.length - 1)) * 100}%`
    ).join(', ')

    const gradient = `linear-gradient(90deg, ${colorStops})`
    const gradientSize = colors.length * 100

    element.style.backgroundImage = gradient
    element.style.backgroundSize = `${gradientSize}% 100%`
    element.style.backgroundClip = 'text'
    element.style.webkitBackgroundClip = 'text'
    element.style.webkitTextFillColor = 'transparent'
    element.style.animation = `gradient-shift ${animationSpeed}s ease infinite`

    const style = document.createElement('style')
    style.textContent = `
      @keyframes gradient-shift {
        0% {
          background-position: 0% 50%;
        }
        100% {
          background-position: ${gradientSize}% 50%;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [colors, animationSpeed])

  return (
    <span
      ref={textRef}
      className={className}
      style={{
        display: 'inline-block',
        border: showBorder ? '2px solid currentColor' : 'none',
        padding: showBorder ? '4px 8px' : '0',
        borderRadius: showBorder ? '4px' : '0',
      }}
    >
      {children}
    </span>
  )
}

