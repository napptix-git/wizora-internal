
import { useState } from "react"
import { AppSidebar } from "@/components/AppSidebar"
import { Header } from "@/components/templates/Header"
import { TemplateSelector } from "@/components/templates/TemplateSelector"
import { PreviewContainer } from "@/components/templates/PreviewContainer"
import { templates } from "@/data/templates"

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(5)
  const [activeTab, setActiveTab] = useState("assets")
  
  // Preview states
  const [previewBackground, setPreviewBackground] = useState("bg-gradient-to-b from-red-500 to-red-600")

  return (
    <div className="min-h-screen bg-wizora-background font-product p-6">
      <Header />

      <div className="flex gap-6">
        {/* Sidebar Menu */}
        <div className="w-1/4">
          <AppSidebar />
        </div>
        
        {/* Template Selection */}
        <div className="w-1/3">
          <TemplateSelector 
            templates={templates}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
        </div>

        {/* Mobile Preview */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <PreviewContainer 
            selectedTemplate={selectedTemplate}
            templates={templates}
            previewBackground={previewBackground}
          />
        </div>
      </div>
    </div>
  )
}

export default Templates
