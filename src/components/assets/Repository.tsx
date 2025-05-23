
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { FolderIcon, ImageIcon, X, Edit } from "lucide-react"
import { AssetEditDialog } from "./AssetEditDialog"

interface RepositoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Repository = ({ isOpen, onClose }: RepositoryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const folders = [
    {
      name: "Backgrounds",
      files: ["bg1.jpg", "bg2.png", "bg3.jpg"]
    },
    {
      name: "Characters",
      files: ["char1.png", "char2.png", "char3.png"]
    },
    {
      name: "Objects",
      files: ["obj1.png", "obj2.jpg", "obj3.png"]
    }
  ]

  const handleImageClick = (file: string) => {
    setSelectedImage(file)
  }

  const handleEditAsset = () => {
    if (selectedImage) {
      setIsEditDialogOpen(true)
    }
  }

  const handleSaveEdit = (editedImage: any) => {
    console.log("Asset edited:", editedImage)
    setSelectedImage(null)
    setIsEditDialogOpen(false)
  }

  if (!isOpen) return null

  return (
    <>
      <div className="absolute top-0 right-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg z-10 transform transition-transform duration-300">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Asset Repository</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Asset Edit Button */}
        <div className="px-4 py-3 border-b border-gray-200">
          <Button 
            variant="outline" 
            size="sm" 
            className={`w-full ${!selectedImage ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleEditAsset}
            disabled={!selectedImage}
          >
            <Edit className="h-4 w-4 mr-2" />
            Asset Edit
          </Button>
          {selectedImage && (
            <p className="text-xs text-gray-500 mt-1">Selected: {selectedImage}</p>
          )}
        </div>
        
        <ScrollArea className="h-[calc(100%-140px)] p-4">
          <div className="space-y-4">
            {folders.map((folder) => (
              <div key={folder.name} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-3">
                  <FolderIcon className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-gray-900">{folder.name}</span>
                </div>
                
                <ScrollArea className="h-32">
                  <div className="grid grid-cols-2 gap-2 pr-4">
                    {folder.files.map((file) => (
                      <div 
                        key={file}
                        className={`border rounded p-2 cursor-pointer transition-all ${
                          selectedImage === file 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("text/plain", file)
                        }}
                        onClick={() => handleImageClick(file)}
                      >
                        <div className="flex flex-col items-center space-y-1">
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                          <span className="text-xs text-gray-600 truncate w-full text-center">
                            {file}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Asset Edit Dialog */}
      <AssetEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        imageName={selectedImage || undefined}
        onSave={handleSaveEdit}
      />
    </>
  )
}
