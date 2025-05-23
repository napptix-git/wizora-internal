
import React from "react"
import { Button } from "@/components/ui/button"
import IPhoneFrame from "@/components/ui/iphone-frame"
import { ScratchCardPreview } from "./previews/ScratchCardPreview"
import { CarouselPreview } from "./previews/CarouselPreview"
import { CatchCollectPreview } from "./previews/CatchCollectPreview"
import { DefaultPreview } from "./previews/DefaultPreview"
import { Template } from "./TemplateCard"
import { useNavigate } from "react-router-dom"

interface PreviewContainerProps {
  selectedTemplate: number | null
  templates: Template[]
  previewBackground: string
}

export const PreviewContainer: React.FC<PreviewContainerProps> = ({
  selectedTemplate,
  templates,
  previewBackground
}) => {
  const navigate = useNavigate()
  const currentTemplate = templates.find(t => t.id === selectedTemplate)
  
  const handleUse = () => {
    navigate("/dashboard/assets")
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative">
        <IPhoneFrame>
          {/* Game Preview Area */}
          <div className={`flex-1 ${previewBackground} relative overflow-hidden`}>
            {selectedTemplate === 1 && <ScratchCardPreview />}
            {selectedTemplate === 2 && <CarouselPreview />}
            {selectedTemplate === 5 && <CatchCollectPreview />}
            {![1, 2, 5].includes(selectedTemplate || 0) && <DefaultPreview template={currentTemplate} />}
          </div>
        </IPhoneFrame>
        
        {/* Use button */}
        <div className="mt-6 flex justify-center">
          <Button 
            onClick={handleUse}
            className="bg-gradient-wizora hover:opacity-90 text-white px-8 py-2 rounded-lg font-medium"
          >
            USE
          </Button>
        </div>
      </div>
    </div>
  )
}
