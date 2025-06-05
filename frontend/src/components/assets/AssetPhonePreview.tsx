import { useEffect, useState } from "react";
import IPhoneFrame from "@/components/ui/iphone-frame";

export const AssetPhonePreview = () => {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);

  useEffect(() => {
    const creativeId = sessionStorage.getItem("activeCreativeId");
    if (!creativeId) {
      console.warn("❌ No activeCreativeId found in sessionStorage");
      return;
    }

    // Supabase preview proxy
    setIframeUrl(`http://localhost:3000/api/preview/${creativeId}`);
  }, []);

  return (
    <div className="relative max-w-full max-h-full flex flex-col items-center">
      <IPhoneFrame size="small">
        <div className="w-[300px] h-[534px] bg-white border border-gray-300 shadow-md relative overflow-hidden">
          {iframeUrl ? (
            <div className="absolute top-[0px] left-0 origin-top-left scale-[0.55] w-[181.5%] h-[172.67%]">
              <iframe
                key={iframeUrl}
                src={iframeUrl}
                className=" w-[141.5%] h-[155.5%] scale-[0.55] absolute top-[0px] left-0 origin-top-left"
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
    </div>
  );
};
