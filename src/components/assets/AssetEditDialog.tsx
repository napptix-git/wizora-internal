
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X, Crop } from "lucide-react"

interface AssetEditDialogProps {
  isOpen: boolean
  onClose: () => void
  imageName?: string
  onSave?: (editedImage: any) => void
}

const aspectRatios = [
  { ratio: "2:3", value: 2/3, label: "2:3" },
  { ratio: "16:9", value: 16/9, label: "16:9" },
  { ratio: "9:16", value: 9/16, label: "9:16" },
  { ratio: "1:1", value: 1, label: "1:1" },
  { ratio: "4:3", value: 4/3, label: "4:3" },
  { ratio: "3:4", value: 3/4, label: "3:4" }
]

export const AssetEditDialog = ({ isOpen, onClose, imageName, onSave }: AssetEditDialogProps) => {
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string | null>(null)
  const [compressionLevel, setCompressionLevel] = useState([100])
  const [cropArea, setCropArea] = useState({ x: 10, y: 10, width: 80, height: 80 })

  const handleSave = () => {
    console.log("Saving edited asset:", {
      imageName,
      aspectRatio: selectedAspectRatio,
      compression: compressionLevel[0],
      cropArea
    })
    onSave?.({
      imageName,
      aspectRatio: selectedAspectRatio,
      compression: compressionLevel[0],
      cropArea
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
        <div className="flex h-[80vh]">
          {/* Left side - Image cropping area */}
          <div className="flex-1 bg-gray-50 p-6 flex flex-col">
            <DialogHeader className="mb-4">
              <DialogTitle className="flex items-center gap-2">
                <Crop className="h-5 w-5" />
                Edit Asset: {imageName || "Untitled"}
              </DialogTitle>
            </DialogHeader>

            {/* Image preview area with crop overlay */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-96 h-96 bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-gray-500 text-center">
                  <div className="text-lg font-medium mb-2">Image Preview</div>
                  <div className="text-sm">{imageName || "No image selected"}</div>
                </div>
                
                {/* Crop overlay with dashed lines */}
                <div 
                  className="absolute border-2 border-dashed border-blue-500 bg-blue-500/10"
                  style={{
                    left: `${cropArea.x}%`,
                    top: `${cropArea.y}%`,
                    width: `${cropArea.width}%`,
                    height: `${cropArea.height}%`,
                  }}
                >
                  {/* Corner handles */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>

                {/* Aspect ratio overlays */}
                {aspectRatios.map((ar) => (
                  <div
                    key={ar.ratio}
                    className={`absolute border border-gray-400 border-dashed opacity-30 ${
                      selectedAspectRatio === ar.ratio ? 'border-blue-500 opacity-60' : ''
                    }`}
                    style={{
                      left: '10%',
                      top: '10%',
                      width: '80%',
                      height: `${80 / ar.value}%`,
                      maxHeight: '80%'
                    }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-6 left-0 text-xs px-1 py-0"
                    >
                      {ar.label}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Controls */}
          <div className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Edit Options</h3>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Aspect Ratio Selection */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">Aspect Ratio</h4>
              <div className="grid grid-cols-2 gap-2">
                {aspectRatios.map((ar) => (
                  <Button
                    key={ar.ratio}
                    variant={selectedAspectRatio === ar.ratio ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedAspectRatio(ar.ratio)}
                    className="text-xs"
                  >
                    {ar.ratio}
                  </Button>
                ))}
              </div>
              {selectedAspectRatio && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedAspectRatio(null)}
                  className="mt-2 text-xs w-full"
                >
                  Clear Selection
                </Button>
              )}
            </div>

            {/* Compression Slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium">Quality</h4>
                <span className="text-sm text-gray-500">{compressionLevel[0]}%</span>
              </div>
              <Slider
                value={compressionLevel}
                onValueChange={setCompressionLevel}
                max={100}
                min={10}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Smaller file</span>
                <span>Original size</span>
              </div>
            </div>

            {/* File Info */}
            <div className="mb-6 p-3 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium mb-2">File Info</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Original: 1920x1080</div>
                <div>Format: JPG</div>
                <div>Size: ~2.5 MB</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto space-y-2">
              <Button onClick={handleSave} className="w-full">
                Save Changes
              </Button>
              <Button variant="outline" onClick={onClose} className="w-full">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
