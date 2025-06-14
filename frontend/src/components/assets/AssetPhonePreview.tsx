import {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Button } from "@/components/ui/button";
import IPhoneFrame from "@/components/ui/iphone-frame";
import PreviewScreen from "@/components/PreviewScreen";

interface AssetPhonePreviewProps {
  onPreview?: () => void;
}

export interface AssetPhonePreviewRef {
  refreshPreview: () => void;
}

export const AssetPhonePreview = forwardRef<AssetPhonePreviewRef, AssetPhonePreviewProps>(
  ({ onPreview }, ref) => {
    const [iframeUrl, setIframeUrl] = useState<string | null>(null);
    const [showPreviewScreen, setShowPreviewScreen] = useState(false);
    const [activeCreativeId, setActiveCreativeId] = useState<string | null>(null);

    const generateUrl = () => {
      const id = sessionStorage.getItem("activeCreativeId");
      const timestamp = `${Date.now()}-${Math.random()}`;
      if (!id) {
        console.warn("❌ No activeCreativeId in sessionStorage");
        return;
      }
      const url = `http://localhost:3000/api/preview/${id}?t=${timestamp}`;
      setActiveCreativeId(id);
      console.log("🔄 Preview URL updated:", url);
      setIframeUrl(url);
    };

    useImperativeHandle(ref, () => ({
      refreshPreview: generateUrl,
    }));

    useEffect(() => {
      generateUrl();
    }, []);

    useEffect(() => {
      const id = sessionStorage.getItem("activeCreativeId");
      if (!id) return;

      const ws = new WebSocket("ws://localhost:4000");

      ws.onopen = () => {
        console.log("[WebSocket] Connected, subscribing to creativeId:", id);
        ws.send(JSON.stringify({ type: "subscribe", creativeId: id }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("[WebSocket] Message received:", data);

          if (data.type === "asset-updated" && data.creativeId === id) {
            console.log("[WebSocket] asset-updated for this creative, refreshing preview");
            generateUrl();
          }
        } catch (err) {
          console.error("[WebSocket] Message parse error:", err);
        }
      };

      ws.onerror = (err) => {
        console.error("[WebSocket] Error:", err);
      };

      return () => ws.close();
    }, []);

    const handlePreview = () => {
      if (onPreview) {
        onPreview();
      } else {
        setShowPreviewScreen(true);
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

        {showPreviewScreen && <PreviewScreen onClose={closePreview} />}
      </div>
    );
  }
);
