
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

const templates = [
  {
    id: 1,
    name: "Scratch Card",
    category: "Interactive",
    preview: "🎴",
    description: "Engaging scratch-to-reveal mechanics"
  },
  {
    id: 2,
    name: "Carousel",
    category: "Display",
    preview: "🎠", 
    description: "Swipeable image carousel"
  },
  {
    id: 3,
    name: "Carousel with Video",
    category: "Video",
    preview: "📹",
    description: "Video-enhanced carousel experience"
  },
  {
    id: 4,
    name: "Endless Runner",
    category: "Game",
    preview: "🏃",
    description: "Infinite scrolling game mechanics"
  },
  {
    id: 5,
    name: "Catch and Collect",
    category: "Game",
    preview: "🎯",
    description: "Interactive collection game",
    featured: true
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
  const [showMobilePreview, setShowMobilePreview] = useState(true)

  return (
    <div className="min-h-screen bg-wizora-background font-product">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
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

      <div className="flex">
        {/* Template Selection */}
        <div className="w-1/3 p-8 space-y-4">
          {templates.map((template) => (
            <Card 
              key={template.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedTemplate === template.id 
                  ? template.featured
                    ? 'ring-2 ring-blue-500 bg-gradient-wizora text-white'
                    : 'ring-2 ring-gray-300 bg-gray-100'
                  : 'hover:bg-gray-50 bg-white'
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{template.preview}</span>
                    <div>
                      <h3 className={`font-medium ${
                        selectedTemplate === template.id && template.featured ? 'text-white' : 'text-gray-900'
                      }`}>
                        {template.name}
                      </h3>
                      <p className={`text-sm ${
                        selectedTemplate === template.id && template.featured ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {template.description}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={selectedTemplate === template.id && template.featured ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {template.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Preview */}
        <div className="flex-1 p-8 flex flex-col items-center justify-center">
          <div className="relative">
            {/* Phone Frame */}
            <div className="w-80 h-[600px] bg-black rounded-[3rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                {/* Status Bar */}
                <div className="h-6 bg-gray-100 flex items-center justify-center">
                  <div className="flex space-x-1">
                    <div className="w-4 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-4 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-4 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                </div>

                {/* Game Preview Area */}
                <div className="flex-1 bg-gradient-to-b from-red-500 to-red-600 relative overflow-hidden">
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
                </div>

                {/* Navigation Bar */}
                <div className="h-16 bg-white border-t border-gray-200 flex items-center justify-center space-x-8">
                  <button className="p-2">←</button>
                  <button className="p-2">🏠</button>
                  <button className="p-2">⚏</button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Select a Layout to Preview
            </h3>
            <p className="text-gray-600 mb-6">
              Choose from our collection of interactive templates
            </p>
            <Button className="bg-gradient-wizora hover:opacity-90 text-white px-8 py-2 rounded-lg font-medium">
              USE
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Templates
