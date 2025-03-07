import { Circle, Triangle, Square } from "lucide-react"

export function DecorativeGraphics() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Circle className="absolute top-10 left-10 text-red-200 opacity-50" size={100} />
      <Triangle className="absolute bottom-20 right-20 text-yellow-200 opacity-50" size={80} />
      <Square className="absolute top-1/2 left-1/4 text-blue-200 opacity-50" size={60} />
      <Circle className="absolute bottom-1/4 right-1/3 text-green-200 opacity-50" size={120} />
    </div>
  )
}

