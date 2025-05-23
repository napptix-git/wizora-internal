
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ExternalLink, UploadIcon } from "lucide-react"
import { AssetEditDialog } from "./AssetEditDialog"

interface AssetUploadItemProps {
  title: string;
  onUpload: (type: string) => void;
  type: string;
}

export const AssetUploadItem = ({ title, onUpload, type }: AssetUploadItemProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleUploadClick = () => {
    // Simulate image upload
    const mockImageName = `uploaded-${type}-${Date.now()}.jpg`
    setUploadedImage(mockImageName)
    setIsEditDialogOpen(true)
    onUpload(type)
  }

  const handleSaveEdit = (editedImage: any) => {
    console.log("Uploaded asset edited:", editedImage)
    setIsEditDialogOpen(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      const file = files[0]
      setUploadedImage(file.name)
      setIsEditDialogOpen(true)
      onUpload(type)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <>
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <Label className="font-medium">{title}</Label>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center border border-gray-300 border-dashed hover:border-blue-500 hover:bg-blue-50 transition-colors"
          onClick={handleUploadClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload or Drop Image
        </Button>
      </div>

      {/* Asset Edit Dialog for uploaded images */}
      <AssetEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        imageName={uploadedImage || undefined}
        onSave={handleSaveEdit}
      />
    </>
  )
}
