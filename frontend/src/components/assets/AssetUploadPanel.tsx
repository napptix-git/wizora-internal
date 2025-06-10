
import { ScrollArea } from "@/components/ui/scroll-area"
import { AssetUploadItem } from "./AssetUploadItem"

interface AssetUploadPanelProps {
  onImageUpload: (type: string) => void;
}

export const AssetUploadPanel = ({ onImageUpload }: AssetUploadPanelProps) => {
  const assetTypes = [
    { title: "Background", type: "background" },
    { title: "Front Image", type: "frontImage" },
    { title: "Left Image", type: "leftImage" },
    { title: "Rear Image", type: "rearImage" },
    { title: "Right Image", type: "rightImage" }
  ]

  return (
    <ScrollArea className="h-[600px] px-4 py-4">
      <div className="space-y-4 pr-4 mt-0">
        {assetTypes.map((asset) => (
          <AssetUploadItem 
            key={asset.type}
            title={asset.title}
            type={asset.type}
            onUpload={onImageUpload}
          />
        ))}
      </div>
    </ScrollArea>
  )
}
