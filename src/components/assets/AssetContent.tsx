
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssetUploadPanel } from "./AssetUploadPanel"
import { ExtrasPanel } from "./ExtrasPanel"
import { AssetPhonePreview } from "./AssetPhonePreview"

interface AssetContentProps {
  onImageUpload: (type: string) => void;
  onPreview: () => void;
}

export const AssetContent = ({ onImageUpload, onPreview }: AssetContentProps) => {
  const [activeTab, setActiveTab] = useState("assets")

  return (
    <div className="bg-white border border-[#4C36FF] rounded-lg shadow-md overflow-hidden h-full">
      <div className="flex h-full">
        {/* Left Panel - Assets Options */}
        <div className="w-1/3 border-r border-gray-200 h-full">
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
            
            <TabsContent value="assets" className="mt-0 h-full">
              <AssetUploadPanel onImageUpload={onImageUpload} />
            </TabsContent>
            
            <TabsContent value="extras" className="mt-0 pr-4 h-full">
              <ExtrasPanel />
            </TabsContent>
          </Tabs>
        </div>

        {/* Center Preview */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <AssetPhonePreview onPreview={onPreview} />
        </div>
      </div>
    </div>
  )
}
