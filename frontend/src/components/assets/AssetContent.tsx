import { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";
import { AssetUploadPanel } from "./AssetUploadPanel";
import { ExtrasPanel } from "./ExtrasPanel";
import { AssetPhonePreview, AssetPhonePreviewRef } from "./AssetPhonePreview";
import { Repository } from "./Repository";
import { Ref } from "react";

interface AssetContentProps {
  onImageUpload: (type: string) => void;
  onPreview: () => void;
  onUploadSuccess: () => void;
  previewRef: Ref<AssetPhonePreviewRef>;
}

export const AssetContent: React.FC<AssetContentProps> = ({
  onImageUpload,
  onPreview,
  onUploadSuccess,
  previewRef, // ✅ use this from props
}) => {
  const [activeTab, setActiveTab] = useState("assets");
  const [isRepositoryOpen, setIsRepositoryOpen] = useState(false);

  const handleImageUpload = (type: string) => {
    onImageUpload(type);
    // ✅ use the ref passed from props
    if (previewRef && typeof previewRef !== "function" && previewRef.current) {
      previewRef.current.refreshPreview();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full relative">
      {/* Repository button in top right */}
      <div className="absolute top-4 right-4 z-20">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsRepositoryOpen(!isRepositoryOpen)}
          className="border-[#4C36FF] text-[#4C36FF] hover:bg-[#4C36FF] hover:text-white"
        >
          <Database className="h-4 w-4 mr-2" />
          Open Repository
        </Button>
      </div>

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
              <TabsTrigger
                value="assets"
                className="data-[state=active]:bg-blue-100 data-[state=active]:text-[#4C36FF]"
              >
                Assets
              </TabsTrigger>
              <TabsTrigger
                value="extras"
                className="data-[state=active]:bg-blue-100 data-[state=active]:text-[#4C36FF]"
              >
                Extras
              </TabsTrigger>
            </TabsList>

            <TabsContent value="assets" className="mt-0 h-full">
              <AssetUploadPanel onImageUpload={onImageUpload} onUploadSuccess={onUploadSuccess} />
            </TabsContent>

            <TabsContent value="extras" className="mt-0 pr-4 h-full">
              <ExtrasPanel onImageUpload={handleImageUpload} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Center Preview - shifts left when repository is open */}
        <div
          className={`flex-1 flex flex-col items-center justify-center p-8 transition-all duration-300 ${
            isRepositoryOpen ? "mr-80" : ""
          }`}
        >
          <AssetPhonePreview onPreview={onPreview} ref={previewRef} />
        </div>

        {/* Repository sliding tray */}
        <Repository
          isOpen={isRepositoryOpen}
          onClose={() => setIsRepositoryOpen(false)}
        />
      </div>
    </div>
  );
};
