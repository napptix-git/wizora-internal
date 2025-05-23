
import React from "react"
import { Button } from "@/components/ui/button"

export const CatchCollectPreview: React.FC = () => {
  return (
    <>
      {/* Christmas decorations */}
      <div className="absolute top-4 left-4 text-white text-2xl">❄️</div>
      <div className="absolute top-4 right-4 text-white text-2xl">🎄</div>
      
      {/* Content */}
      <div className="flex items-center justify-center h-full">
        <div className="bg-yellow-400 w-64 h-64 flex items-center justify-center">
          <div className="text-6xl">🙌</div>
        </div>
      </div>
      
      {/* CTA Button */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
        <Button className="bg-gradient-wizora hover:opacity-90 text-white px-6 py-2 rounded-lg font-medium">
          SE HER HVORDAN
        </Button>
      </div>
    </>
  )
}
