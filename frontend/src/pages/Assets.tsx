
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PreviewScreen from "@/components/PreviewScreen"
import { AssetsHeader } from "@/components/assets/AssetsHeader"
import { AssetContent } from "@/components/assets/AssetContent"
import { LoadingOverlay } from "@/components/assets/LoadingOverlay"

const Assets = () => {
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
      {isPreviewLoading && <LoadingOverlay />}

      {/* Preview screen */}
      {showPreview && (
        <PreviewScreen onClose={() => setShowPreview(false)} />
      )}

      {/* Header */}
      <AssetsHeader />

      {/* Single container for the entire content */}
      <div style={{ height: 'calc(100vh - 200px)' }}>
        <AssetContent 
          onImageUpload={handleImageUpload} 
          onPreview={handlePreview} 
        />
      </div>
    </div>
  )
}

export default Assets
