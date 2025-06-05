import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PreviewScreen from "@/components/PreviewScreen"
import { AssetsHeader } from "@/components/assets/AssetsHeader"
import { AssetContent } from "@/components/assets/AssetContent"
import { LoadingOverlay } from "@/components/assets/LoadingOverlay"

const Assets = () => {
  const [creativeId, setCreativeId] = useState<string | null>(null)

  useEffect(() => {
    const storedId = sessionStorage.getItem("activeCreativeId")
    if (storedId) setCreativeId(storedId)
  }, [])

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
    setTimeout(() => {
      setIsPreviewLoading(false)
      setShowPreview(true)
    }, 2000)
  }

  const handleImageUpload = (type: string) => {
    console.log(`Uploading image for ${type}`)
  }

  return (
    <div className="min-h-screen bg-wizora-background font-product p-6">
      {isPreviewLoading && <LoadingOverlay />}
      {showPreview && (
        <PreviewScreen onClose={() => setShowPreview(false)} />
      )}
      <AssetsHeader />
      <div style={{ height: '(100vh)' }}>
        <AssetContent 
          onImageUpload={handleImageUpload} 
          onPreview={handlePreview} 
        />
      </div>
    </div>
  )
}

export default Assets
