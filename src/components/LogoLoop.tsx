import { useState, useRef } from 'react'

interface Logo {
  node?: React.ReactNode
  src?: string
  alt?: string
  title?: string
  href?: string
}

interface LogoLoopProps {
  logos: Logo[]
  speed?: number
  direction?: 'left' | 'right' | 'up' | 'down'
  logoHeight?: number
  gap?: number
  hoverSpeed?: number
  scaleOnHover?: boolean
  fadeOut?: boolean
  fadeOutColor?: string
  ariaLabel?: string
}

export default function LogoLoop({
  logos,
  speed = 100,
  direction = 'left',
  logoHeight = 48,
  gap = 40,
  hoverSpeed = 0,
  scaleOnHover = false,
  fadeOut = false,
  fadeOutColor = '#ffffff',
  ariaLabel = 'Logo loop'
}: LogoLoopProps) {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentSpeed = isHovered ? hoverSpeed : speed
  const isHorizontal = direction === 'left' || direction === 'right'

  const duplicatedLogos = [...logos, ...logos]

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: isHorizontal ? `${logoHeight}px` : '100%',
        overflow: 'hidden',
        maskImage: fadeOut 
          ? `linear-gradient(to ${direction === 'left' || direction === 'up' ? 'right' : 'left'}, transparent, ${fadeOutColor} 10%, ${fadeOutColor} 90%, transparent)`
          : 'none',
        WebkitMaskImage: fadeOut
          ? `linear-gradient(to ${direction === 'left' || direction === 'up' ? 'right' : 'left'}, transparent, ${fadeOutColor} 10%, ${fadeOutColor} 90%, transparent)`
          : 'none',
      }}
      aria-label={ariaLabel}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: isHorizontal ? 'row' : 'column',
          gap: `${gap}px`,
          height: isHorizontal ? '100%' : 'auto',
          width: isHorizontal ? 'auto' : '100%',
          animation: `logo-scroll-${direction} ${currentSpeed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <a
            key={index}
            href={logo.href}
            target={logo.href ? '_blank' : undefined}
            rel={logo.href ? 'noopener noreferrer' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: `${logoHeight}px`,
              width: isHorizontal ? 'auto' : '100%',
              textDecoration: 'none',
              color: 'inherit',
              transition: scaleOnHover ? 'transform 0.3s ease' : 'none',
            }}
            onMouseEnter={(e) => {
              if (scaleOnHover) {
                e.currentTarget.style.transform = 'scale(1.2)'
              }
            }}
            onMouseLeave={(e) => {
              if (scaleOnHover) {
                e.currentTarget.style.transform = 'scale(1)'
              }
            }}
          >
            {logo.node && (
              <div style={{ fontSize: `${logoHeight}px`, display: 'flex', alignItems: 'center' }}>
                {logo.node}
              </div>
            )}
            {logo.src && (
              <img
                src={logo.src}
                alt={logo.alt || logo.title || ''}
                style={{
                  height: `${logoHeight}px`,
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            )}
            {!logo.node && !logo.src && (
              <span>{logo.title}</span>
            )}
          </a>
        ))}
      </div>
      <style>{`
        @keyframes logo-scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes logo-scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes logo-scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        @keyframes logo-scroll-down {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

