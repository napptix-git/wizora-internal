
import { useState } from "react"
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

      {/* Single container for template selection and preview */}
      <div className="bg-white border border-[#4C36FF] rounded-lg shadow-md overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
        <div className="flex h-full">
          {/* Template Selection */}
          <div className="w-1/2 border-r border-gray-200">
            <TemplateSelector 
              templates={templates}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
            />
          </div>

          {/* Mobile Preview */}
          <div className="w-1/2 flex flex-col items-center justify-center p-8">
            <PreviewContainer 
              selectedTemplate={selectedTemplate}
              templates={templates}
              previewBackground={previewBackground}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Templates
