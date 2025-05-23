import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import IPhoneFrame from "@/components/ui/iphone-frame"

const templates = [
  {
    id: 1,
    name: "Scratch Card",
    category: "Interactive",
    preview: "🎴",
    description: "Engaging scratch-to-reveal mechanics",
    previewImage: "scratchcard-preview.jpg"
  },
  {
    id: 2,
    name: "Carousel",
    category: "Display",
    preview: "🎠", 
    description: "Swipeable image carousel",
    previewImage: "carousel-preview.jpg"
  },
  {
    id: 3,
    name: "Carousel with Video",
    category: "Video",
    preview: "📹",
    description: "Video-enhanced carousel experience",
    previewImage: "carousel-video-preview.jpg"
  },
  {
    id: 4,
    name: "Endless Runner",
    category: "Game",
    preview: "🏃",
    description: "Infinite scrolling game mechanics",
    previewImage: "endless-runner-preview.jpg"
  },
  {
    id: 5,
    name: "Catch and Collect",
    category: "Game",
    preview: "🎯",
    description: "Interactive collection game",
    featured: true,
    previewImage: "catch-collect-preview.jpg"
  },
  {
    id: 6,
    name: "Pac-Man Style",
    category: "Game",
    preview: "👾",
    description: "Classic arcade-style gameplay"
  },
  {
    id: 7,
    name: "Branched Carousel",
    category: "Interactive",
    preview: "🌳",
    description: "Multi-path interactive experience"
  },
  {
    id: 8,
    name: "Custom Game",
    category: "Custom",
    preview: "🎮",
    description: "Build your own game mechanics"
  }
]

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(5)
  const [activeTab, setActiveTab] = useState("assets")
  const navigate = useNavigate()
  
  const handleUse = () => {
    navigate("/dashboard/assets")
  }
  
  // Preview states
  const [previewBackground, setPreviewBackground] = useState("bg-gradient-to-b from-red-500 to-red-600")
  
  // Get the selected template
  const currentTemplate = templates.find(t => t.id === selectedTemplate) || templates[0]

  return (
    <div className="min-h-screen bg-wizora-background font-product p-6">
      {/* Header */}
      <div className="bg-white border border-[#4C36FF] rounded-lg shadow-md mb-6 px-8 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Select a Layout</h1>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-wizora"></div>
            <div>
              <div className="text-sm font-medium">Anushka Bhavsar</div>
              <div className="text-xs text-gray-500">Tech</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Template Selection - Left tray with island box styling */}
        <div className="w-1/3">
          <div className="bg-white border border-[#4C36FF] rounded-lg shadow-md h-[650px] overflow-hidden">
            <ScrollArea className="h-full px-4 py-4">
              <div className="space-y-4 pr-4">
                {templates.map((template) => (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md border ${
                      selectedTemplate === template.id 
                        ? 'border-[#4C36FF] ring-2 ring-[#4C36FF] bg-gradient-wizora text-white'
                        : 'hover:bg-gray-50 bg-white border-gray-200'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{template.preview}</span>
                          <div>
                            <h3 className={`font-medium ${
                              selectedTemplate === template.id ? 'text-white' : 'text-gray-900'
                            }`}>
                              {template.name}
                            </h3>
                            <p className={`text-sm ${
                              selectedTemplate === template.id ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {template.description}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          variant={selectedTemplate === template.id ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {template.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Mobile Preview - iPhone style */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-white border border-[#4C36FF] rounded-lg shadow-md p-8 flex flex-col items-center justify-center">
            <div className="relative">
              <IPhoneFrame>
                {/* Game Preview Area */}
                <div className={`flex-1 ${previewBackground} relative overflow-hidden`}>
                  {selectedTemplate === 1 && (
                    <div className="flex items-center justify-center h-full">
                      <div className="bg-gray-100 w-64 h-64 rounded-lg flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-gray-300 opacity-50 rounded-lg"></div>
                        <div className="text-4xl z-10">🎁</div>
                        <div className="absolute bottom-4 text-center w-full text-gray-700 font-medium">Scratch to reveal</div>
                      </div>
                    </div>
                  )}
                  
                  {selectedTemplate === 2 && (
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
                  )}
                  
                  {selectedTemplate === 5 && (
                    <>
                      {/* Christmas decorations */}
                      <div className="absolute top-4 left-4 text-white text-2xl">❄️</div>
                      <div className="absolute top-4 right-4 text-white text-2xl">🎄</div>
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-white text-xl">
                        🎅 🧦 🧦 🧦 🎁
                      </div>

                      {/* Game area */}
                      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-48 h-64 bg-yellow-400 rounded-lg flex items-center justify-center">
                        <div className="text-6xl">🙌</div>
                      </div>

                      {/* Action button */}
                      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
                        <Button className="bg-gradient-wizora hover:opacity-90 text-white px-6 py-2 rounded-lg font-medium">
                          SE HER HVORDAN
                        </Button>
                      </div>

                      {/* Bottom decoration */}
                      <div className="absolute bottom-8 left-4 text-2xl">🎄</div>
                    </>
                  )}
                  
                  {/* Default preview for other templates */}
                  {![1, 2, 5].includes(selectedTemplate || 0) && (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="bg-white bg-opacity-10 w-64 h-64 rounded-lg flex items-center justify-center">
                        <div className="text-6xl">{templates.find(t => t.id === selectedTemplate)?.preview || "🎮"}</div>
                      </div>
                      <div className="mt-4 text-white font-medium">
                        {templates.find(t => t.id === selectedTemplate)?.name || "Interactive Experience"}
                      </div>
                    </div>
                  )}
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
        </div>
      </div>
    </div>
  )
}

export default Templates
