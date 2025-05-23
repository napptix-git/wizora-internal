import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadIcon, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom"
import { ScrollArea } from "@/components/ui/scroll-area"
import PreviewScreen from "@/components/PreviewScreen"
import IPhoneFrame from "@/components/ui/iphone-frame"

const Assets = () => {
  const [activeTab, setActiveTab] = useState("assets")
  const [previewContent, setPreviewContent] = useState({
    background: null,
    frontImage: null,
    leftImage: null,
    rearImage: null,
    rightImage: null
  })
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const navigate = useNavigate()

  const handlePreview = () => {
    setIsPreviewLoading(true)
    
    // Simulate loading screen for 2 seconds
    setTimeout(() => {
      setIsPreviewLoading(false)
      setShowPreview(true)
    }, 2000)
  }

  // Demo function to simulate image upload
  const handleImageUpload = (type: string) => {
    console.log(`Uploading image for ${type}`)
  }

  return (
    <div className="min-h-screen bg-wizora-background font-product p-6">
      {/* Loading overlay */}
      {isPreviewLoading && (
        <div className="fixed inset-0 bg-[#4C36FF] flex flex-col items-center justify-center z-50">
          <h1 className="text-4xl font-bold text-[#EDEBFF] mb-2 font-gulfs">WIZORA</h1>
          <p className="text-[#EDEBFF] text-lg mb-6">Your Playable Ad Wizard</p>
          <div className="h-0.5 w-48 bg-[#EDEBFF] bg-opacity-30 relative overflow-hidden">
            <div className="h-full bg-[#EDEBFF] absolute left-0 w-1/3 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
          </div>
          <p className="text-[#EDEBFF] text-sm mt-2 opacity-70">loading your preview</p>
        </div>
      )}

      {/* Preview screen */}
      {showPreview && (
        <PreviewScreen onClose={() => setShowPreview(false)} />
      )}

      {/* Header */}
      <div className="bg-white border border-[#4C36FF] rounded-lg shadow-md mb-6 px-8 py-6">
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

      <div className="flex gap-6">
        {/* Left Panel - Combined area with island box styling */}
        <div className="w-1/3">
          <div className="bg-white border border-[#4C36FF] rounded-lg shadow-md h-[650px] overflow-hidden">
            <Tabs 
              defaultValue="assets" 
              className="w-full h-full"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid grid-cols-2 px-4 pt-4">
                <TabsTrigger value="assets" className="data-[state=active]:bg-blue-100 data-[state=active]:text-[#4C36FF]">Assets</TabsTrigger>
                <TabsTrigger value="extras" className="data-[state=active]:bg-blue-100 data-[state=active]:text-[#4C36FF]">Extras</TabsTrigger>
              </TabsList>
              
              <ScrollArea className="h-[600px] px-4 py-4">
                <TabsContent value="assets" className="space-y-4 pr-4 mt-0">
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
                
                <TabsContent value="extras" className="mt-0 pr-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-[#4C36FF]">
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
              </ScrollArea>
            </Tabs>
          </div>
        </div>

        {/* Center Preview */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-white border border-[#4C36FF] rounded-lg shadow-md p-8 flex flex-col items-center justify-center">
            <div className="relative">
              <IPhoneFrame>
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
              </IPhoneFrame>
            </div>

            {/* Preview button only */}
            <div className="mt-8">
              <Button 
                variant="outline" 
                className="border-[#4C36FF] text-[#4C36FF] hover:bg-[#4C36FF] hover:text-white px-8 py-2 rounded-lg font-medium"
                onClick={handlePreview}
              >
                Preview Creative
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Assets
