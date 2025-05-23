
import React from "react"

export const ScratchCardPreview: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-gray-100 w-64 h-64 rounded-lg flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gray-300 opacity-50 rounded-lg"></div>
        <div className="text-4xl z-10">🎁</div>
        <div className="absolute bottom-4 text-center w-full text-gray-700 font-medium">Scratch to reveal</div>
      </div>
    </div>
  )
}
