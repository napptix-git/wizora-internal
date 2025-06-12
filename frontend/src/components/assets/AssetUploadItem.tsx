import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ExternalLink, UploadIcon, X } from "lucide-react"
import { AssetEditDialog } from "./AssetEditDialog"

interface AssetUploadItemProps {
  title: string;
  onUpload: (type: string, file?: File) => void;
  type: string;
}

export const AssetUploadItem = ({ title, onUpload, type }: AssetUploadItemProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith("image/")) {
        setUploadedFile(file)
        setPreviewUrl(URL.createObjectURL(file))
        setIsEditDialogOpen(true)
      } else {
        setUploadedFile(file)
        setPreviewUrl(URL.createObjectURL(file))
        onUpload(type, file)
      }
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      const file = files[0]
      if (file.type.startsWith("image/")) {
        setUploadedFile(file)
        setPreviewUrl(URL.createObjectURL(file))
        setIsEditDialogOpen(true)
      } else {
        setUploadedFile(file)
        setPreviewUrl(URL.createObjectURL(file))
        onUpload(type, file)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

 const handleCancel = () => {
  if (uploadedFile) {
    // ⚠️ Auto-upload the original if dialog closed without saving
    onUpload(type, uploadedFile);
  }
  setIsEditDialogOpen(false);
};


  // When the user saves the edited image
  const handleSaveEdit = (editedImage: { file?: File }) => {
    if (editedImage?.file) {
      setUploadedFile(editedImage.file)
      setPreviewUrl(URL.createObjectURL(editedImage.file))
      onUpload(type, editedImage.file)
    }
    setIsEditDialogOpen(false)
  }

  const renderPreview = () => {
    if (!uploadedFile || !previewUrl) return null
    if (uploadedFile.type.startsWith("image/")) {
      return (
        <img
          src={previewUrl}
          alt="preview"
          className="w-16 h-16 object-cover rounded border"
        />
      )
    }
    if (uploadedFile.type.startsWith("video/")) {
      return (
        <video
          src={previewUrl}
          className="w-16 h-16 object-cover rounded border"
          controls
        />
      )
    }
    return null
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
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*,video/*"
        />
        {!uploadedFile ? (
          <Button
            variant="outline"
            className="w-full flex items-center justify-center border border-gray-300 border-dashed hover:border-blue-500 hover:bg-blue-50 transition-colors"
            onClick={handleUploadClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <UploadIcon className="mr-2 h-4 w-4" />
            Upload or Drop Asset
          </Button>
        ) : (
          <div className="flex items-center justify-between mt-2 bg-white border rounded p-2 w-full">
            <div className="flex items-center space-x-2">
              {renderPreview()}
              <span className="truncate">{uploadedFile.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 p-1"
              onClick={handleCancel}
              title="Remove"
            >
              <X className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        )}
      </div>

      {/* Only open dialog for images */}
      {uploadedFile && uploadedFile.type.startsWith("image/") && (
        <AssetEditDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          imageName={uploadedFile.name}
          file={uploadedFile}
          onSave={handleSaveEdit}
        />
      )}
    </>
  )
}
