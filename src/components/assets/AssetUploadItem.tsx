
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ExternalLink, UploadIcon } from "lucide-react"

interface AssetUploadItemProps {
  title: string;
  onUpload: (type: string) => void;
  type: string;
}

export const AssetUploadItem = ({ title, onUpload, type }: AssetUploadItemProps) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <Label className="font-medium">{title}</Label>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center border border-gray-300"
        onClick={() => onUpload(type)}
      >
        <UploadIcon className="mr-2 h-4 w-4" />
        Upload Image
      </Button>
    </div>
  )
}
