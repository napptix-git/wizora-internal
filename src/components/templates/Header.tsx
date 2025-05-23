
import React from "react"

export const Header: React.FC = () => {
  return (
    <div className="bg-white border border-[#4C36FF] rounded-lg shadow-md mb-6 px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src="/lovable-uploads/90b46b0c-2812-4d9c-9364-fb334c5e6ce2.png" 
            alt="WIZORA Logo" 
            className="h-8" 
          />
          <h1 className="text-2xl font-bold text-gray-900">Select a Layout</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-wizora"></div>
          <div>
            <div className="text-sm font-medium">Anushka Bhavsar</div>
            <div className="text-xs text-gray-500">Tech</div>
          </div>
        </div>
      </div>
    </div>
  )
}
