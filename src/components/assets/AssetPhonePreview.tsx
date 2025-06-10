import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import IPhoneFrame from "@/components/ui/iphone-frame";
import PreviewScreen from "@/components/PreviewScreen";

interface AssetPhonePreviewProps {
  onPreview?: () => void;
}

export const AssetPhonePreview = ({ onPreview }: AssetPhonePreviewProps) => {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [showPreviewScreen, setShowPreviewScreen] = useState(false);

  useEffect(() => {
    const creativeId = sessionStorage.getItem("currentCreativeId");
    if (!creativeId) {
      console.warn("❌ No activeCreativeId found in sessionStorage");
      return;
    }
    console.log("🔍 Loaded creativeId in AssetPhonePreview:", creativeId);
    setIframeUrl(`http://localhost:3000/api/preview/${creativeId}`);
  }, []);

  const handlePreview = () => {
    if (onPreview) {
      onPreview(); // Use external handler if provided
    } else {
      setShowPreviewScreen(true); // Fallback to internal logic
    }
  };

  const closePreview = () => {
    setShowPreviewScreen(false);
  };

  return (
    <div className="relative max-w-full max-h-full flex flex-col items-center">
      <IPhoneFrame size="small">
        <div className="w-[300px] h-[534px] bg-white border border-gray-300 shadow-md relative overflow-hidden">
          {iframeUrl ? (
            <div className="absolute top-[0px] left-[-2px] origin-top-left scale-[0.6] w-[400px] h-[720px]">
              <iframe
                key={iframeUrl}
                src={iframeUrl}
                className="w-full h-full absolute top-[0px] left-[-2px] border-none"
                title="Creative Preview"
                allow="fullscreen"
              />
            </div>
          ) : (
            <div className="text-center text-gray-500 text-sm mt-20">
              Loading preview...
            </div>
          )}
        </div>
      </IPhoneFrame>

      <div className="mt-4 flex justify-center">
        <Button
          variant="outline"
          className="border-[#4C36FF] text-[#4C36FF] hover:bg-[#4C36FF] hover:text-white px-8 py-2 rounded-lg font-medium"
          onClick={handlePreview}
        >
          Preview Creative
        </Button>
      </div>

      {/* Preview overlay only if internal state is used */}
      {showPreviewScreen && <PreviewScreen onClose={closePreview} />}
    </div>
  );
};
