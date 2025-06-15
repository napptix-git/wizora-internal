// src/pages/Templates.tsx

import { useEffect, useState } from "react"
import { Header } from "@/components/templates/Header"
import { TemplateSelector } from "@/components/templates/TemplateSelector"
import { PreviewContainer } from "@/components/templates/PreviewContainer"
import { Template } from "@/components/templates/TemplateCard"
import axios from "axios"
import { supabase } from "@/lib/supabaseClient"



const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("assets")
  const [templates, setTemplates] = useState<Template[]>([])
  const [previewBackground, setPreviewBackground] = useState("bg-gradient-to-b from-red-500 to-red-600")

  // Fetch templates from backend/layouts directory
useEffect(() => {
  const fetchLayouts = async () => {
    try {
      const res = await fetch("https://wizora-backend.onrender.com/api/layouts");
      const data = await res.json();
      if (Array.isArray(data.layouts)) {
        setTemplates(data.layouts.map((layout, index) => ({
          id: index + 1,
          name: layout.name || layout,
          description: layout.description || "Default description",
          preview: layout.preview || "📱",
          category: layout.category || "Default"
        })));
      } else {
        console.warn("Invalid layout data:", data);
      }
    } catch (err) {
      console.error("Layout fetch failed:", err);
      // Retry once after 1 sec
      setTimeout(fetchLayouts, 1000);
    }
  };

  fetchLayouts();
}, [])
  
   useEffect(() => {
    const saveSelectedLayout = async () => {
      const creativeId = sessionStorage.getItem("activeCreativeId")
      const selected = templates.find(t => t.id === selectedTemplate)

      if (creativeId && selected) {
        const { error } = await supabase
          .from("creatives")
          .update({ layout: selected.name })
          .eq("creative_id", creativeId)

        if (error) {
          console.error("Failed to update layout:", error.message)
        } else {
          console.log("Layout updated in Supabase:", selected.name)
        }
      }
    }

    saveSelectedLayout()
  }, [selectedTemplate])
  return (
    <div className="min-h-screen bg-wizora-background font-product p-6">
      <Header />

      <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: '100vh' }}>
        <div className="flex h-full">
          <div className="w-1/2 border-r border-gray-200">
            <TemplateSelector 
              templates={templates}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
            />
          </div>

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
