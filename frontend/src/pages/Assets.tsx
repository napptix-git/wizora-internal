import { useState, useEffect, useRef, MutableRefObject } from "react";
import { useNavigate } from "react-router-dom";
import PreviewScreen from "@/components/PreviewScreen";
import { AssetsHeader } from "@/components/assets/AssetsHeader";
import { AssetContent } from "@/components/assets/AssetContent";
import { LoadingOverlay } from "@/components/assets/LoadingOverlay";
import { AssetPhonePreviewRef } from "@/components/assets/AssetPhonePreview";

export interface AssetContentProps {
  onImageUpload: (type: string) => void;
  onPreview: () => void;
  onUploadSuccess: () => void;
  previewRef: MutableRefObject<AssetPhonePreviewRef | null>;
}

const Assets = () => {
  const [creativeId, setCreativeId] = useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<AssetPhonePreviewRef>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedId = sessionStorage.getItem("activeCreativeId");
    if (storedId) setCreativeId(storedId);
  }, []);

  const handlePreview = () => {
    setIsPreviewLoading(true);
    setTimeout(() => {
      setIsPreviewLoading(false);
      setShowPreview(true);
    }, 2000);
  };

  const handleImageUpload = (type: string) => {
    console.log(`Uploading image for ${type}`);
  };

  const handleUploadSuccess = () => {
    console.log("✅ Image upload success, refreshing preview.");
    previewRef.current?.refreshPreview();
  };

  return (
    <div className="min-h-screen bg-wizora-background font-product p-6">
      {isPreviewLoading && <LoadingOverlay />}
      {showPreview && <PreviewScreen onClose={() => setShowPreview(false)} />}
      <AssetsHeader />
      <div style={{ height: "100vh" }}>
        <AssetContent
        onImageUpload={handleImageUpload}
        onPreview={handlePreview}
        onUploadSuccess={handleUploadSuccess}
        previewRef={previewRef}
/>

      </div>
    </div>
  );
};

export default Assets;
