
import React from "react"

export const CarouselPreview: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex space-x-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
        <div className="w-2 h-2 rounded-full bg-white"></div>
        <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
      </div>
      <div className="bg-white w-64 h-64 rounded-lg flex items-center justify-center shadow-lg">
        <div className="text-6xl">🚗</div>
      </div>
      <div className="mt-4 text-white">Swipe to see more</div>
    </div>
  )
}
