
import React from "react"
import { Template } from "../TemplateCard"

interface DefaultPreviewProps {
  template: Template | undefined
}

export const DefaultPreview: React.FC<DefaultPreviewProps> = ({ template }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="bg-white bg-opacity-10 w-64 h-64 rounded-lg flex items-center justify-center">
        <div className="text-6xl">{template?.preview || "🎮"}</div>
      </div>
      <div className="mt-4 text-white font-medium">
        {template?.name || "Interactive Experience"}
      </div>
    </div>
  )
}
