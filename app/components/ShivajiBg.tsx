export function ShivajiBg() {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern id="shivaji-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M50 15 L60 40 L90 50 L60 60 L50 85 L40 60 L10 50 L40 40 Z" fill="#B22222" />
          <circle cx="50" cy="50" r="5" fill="#FF9933" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#shivaji-pattern)" />
      </svg>
    </div>
  )
}

