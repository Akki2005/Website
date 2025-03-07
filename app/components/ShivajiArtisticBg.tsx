export function ShivajiArtisticBg() {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="shivaji-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            {/* Stylized Sword */}
            <path d="M100 20 L110 80 L90 80 Z" fill="#B22222" />
            <path d="M95 80 L105 80 L100 180 Z" fill="#B22222" />

            {/* Bhavani Sword Handle */}
            <path d="M90 70 Q100 60 110 70 Q100 80 90 70" fill="#FF9933" />

            {/* Stylized Fort */}
            <path
              d="M20 120 L40 100 L60 120 L80 100 L100 120 L120 100 L140 120 L160 100 L180 120 L180 140 L20 140 Z"
              fill="none"
              stroke="#B22222"
              strokeWidth="2"
            />

            {/* Maratha Flag */}
            <rect x="70" y="30" width="20" height="30" fill="#FF9933" />
            <circle cx="80" cy="45" r="5" fill="#B22222" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#shivaji-pattern)" />
      </svg>
    </div>
  )
}

