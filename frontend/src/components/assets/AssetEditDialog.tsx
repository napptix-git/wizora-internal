import { useState, useCallback, useEffect } from "react"
import Cropper from "react-easy-crop"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { X, Crop } from "lucide-react"

interface AssetEditDialogProps {
  isOpen: boolean
  onClose: () => void
  imageName?: string
  onSave?: (editedImage: { file: File }) => void
  file?: File | null
}

const aspectRatios = [
  { ratio: "2:3", value: 2 / 3, label: "2:3" },
  { ratio: "16:9", value: 16 / 9, label: "16:9" },
  { ratio: "9:16", value: 9 / 16, label: "9:16" },
  { ratio: "1:1", value: 1, label: "1:1" },
  { ratio: "4:3", value: 4 / 3, label: "4:3" },
  { ratio: "3:4", value: 3 / 4, label: "3:4" }
]

// Helper to get cropped image as a File
async function getCroppedImg(
  imageSrc: string,
  crop: any,
  fileName: string,
  aspect: number | undefined,
  quality: number
): Promise<File> {
  const image = new window.Image();
  image.src = imageSrc;
  await new Promise((resolve) => { image.onload = resolve });

  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d')!;

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) throw new Error('Canvas is empty');
      const pngName = fileName.replace(/\.(jpg|jpeg|webp|gif)$/i, ".png"); // ✅ Force .png
      resolve(new File([blob], pngName, { type: "image/png" })); // ✅ Force PNG blob
    }, "image/png", quality / 100);
  });
}


export const AssetEditDialog = ({
  isOpen,
  onClose,
  imageName,
  onSave,
  file
}: AssetEditDialogProps) => {
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>("1:1")
  const [compressionLevel, setCompressionLevel] = useState([100])
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  // Load image preview when file changes
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [file])

  // Reset crop and zoom when aspect ratio or image changes
  useEffect(() => {
    if (imageUrl) {
      setZoom(1)
      setCrop({ x: 0, y: 0 })
    }
  }, [selectedAspectRatio, imageUrl])

  // Reset aspect ratio to default on clear selection
  const handleClearAspect = () => setSelectedAspectRatio("1:1")

  // Determine aspect for Cropper
  const aspect =
    selectedAspectRatio
      ? aspectRatios.find((ar) => ar.ratio === selectedAspectRatio)?.value
      : undefined

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

 const handleSave = async () => {
  if (!imageUrl) return;

  try {
    // Only try cropping if crop area is set
    if (croppedAreaPixels) {
      const croppedFile = await getCroppedImg(
      imageUrl,
      croppedAreaPixels,
      imageName || "cropped.png",
      aspect,
      compressionLevel[0]
      );
      onSave?.({ file: croppedFile });
    } else if (file) {
      // 🔁 Fallback: no crop? just return original file
      onSave?.({ file });
    }
  } catch (err) {
    console.warn("⚠️ Cropping failed, using original file.", err);
    if (file) onSave?.({ file });
  } finally {
    onClose();
  }
};

  if (!isOpen || !file) return null

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

            {/* Real image cropping */}
            <div className="flex-1 flex items-center justify-center">
              {imageUrl && (
                <div className="relative w-96 h-96 bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <Cropper
                    image={imageUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right side - Controls */}
          <div className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col overflow-y-auto max-h-[80vh]">
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
                    {ar.label}
                  </Button>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAspect}
                className="mt-2 text-xs w-full"
              >
                Clear Selection
              </Button>
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
                <div>Original: {file && file.name}</div>
                <div>Format: {file && file.type}</div>
                <div>Size: ~{file && (file.size / 1024 / 1024).toFixed(2)} MB</div>
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