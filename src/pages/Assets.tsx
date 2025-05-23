
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadIcon, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom"

const Assets = () => {
  const [activeTab, setActiveTab] = useState("assets")
  const [previewContent, setPreviewContent] = useState({
    background: null,
    frontImage: null,
    leftImage: null,
    rearImage: null,
    rightImage: null
  })
  const navigate = useNavigate()

  const handlePreview = () => {
    // Handle the preview logic
    console.log("Preview creative")
  }

  const handleAppend = () => {
    // Handle the append logic
    console.log("Append creative")
    navigate("/dashboard/creatives")
  }

  // Demo function to simulate image upload
  const handleImageUpload = (type: string) => {
    console.log(`Uploading image for ${type}`)
  }

  return (
    <div className="min-h-screen bg-wizora-background font-product">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Customize Assets</h1>
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
        {/* Left Panel - Assets/Extras Tabs */}
        <div className="w-1/3 bg-white p-4">
          <Tabs 
            defaultValue="assets" 
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="assets" className="data-[state=active]:bg-blue-100 data-[state=active]:text-[#4C36FF]">Assets</TabsTrigger>
              <TabsTrigger value="extras" className="data-[state=active]:bg-blue-100 data-[state=active]:text-[#4C36FF]">Extras</TabsTrigger>
            </TabsList>
            
            <TabsContent value="assets" className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-[#4C36FF]">
                <div className="flex justify-between items-center mb-2">
                  <Label className="font-medium">Background</Label>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center border border-gray-300"
                  onClick={() => handleImageUpload('background')}
                >
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-[#4C36FF]">
                <div className="flex justify-between items-center mb-2">
                  <Label className="font-medium">Front Image</Label>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center border border-gray-300"
                  onClick={() => handleImageUpload('frontImage')}
                >
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-[#4C36FF]">
                <div className="flex justify-between items-center mb-2">
                  <Label className="font-medium">Left Image</Label>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center border border-gray-300"
                  onClick={() => handleImageUpload('leftImage')}
                >
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-[#4C36FF]">
                <div className="flex justify-between items-center mb-2">
                  <Label className="font-medium">Rear Image</Label>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center border border-gray-300"
                  onClick={() => handleImageUpload('rearImage')}
                >
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-[#4C36FF]">
                <div className="flex justify-between items-center mb-2">
                  <Label className="font-medium">Right Image</Label>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center border border-gray-300"
                  onClick={() => handleImageUpload('rightImage')}
                >
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="extras">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Additional Settings</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cta-text">CTA Button Text</Label>
                    <Input id="cta-text" placeholder="Enter CTA text" />
                  </div>
                  <div>
                    <Label htmlFor="headline">Headline</Label>
                    <Input id="headline" placeholder="Enter headline" />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" placeholder="Enter description" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Center Preview */}
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

                {/* Example TELMORE ad preview - Using a pink striped background */}
                <div className="flex-1 bg-pink-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex flex-col">
                    <div className="w-full h-full bg-pink-100 flex flex-col items-center">
                      {/* Stripe pattern */}
                      <div className="absolute inset-0">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div 
                            key={i} 
                            className="h-16 bg-pink-200"
                            style={{ marginTop: `${i * 32}px` }}
                          ></div>
                        ))}
                      </div>
                      
                      {/* Content */}
                      <div className="z-10 w-full flex flex-col items-center mt-8">
                        <div className="text-blue-700 font-bold text-xl tracking-widest mb-8">
                          T E L M O R E
                        </div>
                        
                        <div className="bg-yellow-400 w-64 h-64 flex items-center justify-center">
                          {/* This would be replaced by the user's uploaded image */}
                          <div className="text-xl">👐 Sample image placeholder</div>
                        </div>
                        
                        <div className="mt-8">
                          <Button className="bg-cyan-400 text-blue-900 hover:bg-cyan-500 px-6 py-2 rounded-sm font-medium">
                            SE HER HVORDAN
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
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

          {/* Action buttons */}
          <div className="mt-8 flex space-x-4">
            <Button 
              className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-2 rounded-lg font-medium"
              onClick={handlePreview}
            >
              Preview Creative
            </Button>
            <Button 
              className="bg-gradient-wizora hover:opacity-90 text-white px-8 py-2 rounded-lg font-medium"
              onClick={handleAppend}
            >
              Append
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Assets
