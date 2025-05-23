
import { Button } from "@/components/ui/button"
import IPhoneFrame from "@/components/ui/iphone-frame"

interface AssetPhonePreviewProps {
  onPreview: () => void;
}

export const AssetPhonePreview = ({ onPreview }: AssetPhonePreviewProps) => {
  return (
    <div className="relative max-w-full max-h-full flex flex-col items-center">
      <IPhoneFrame size="small">
        {/* Example TELMORE ad preview - Using a pink striped background */}
        <div className="flex-1 bg-pink-100 relative overflow-hidden">
          <div className="absolute inset-0 flex flex-col">
            <div className="w-full h-full bg-pink-100 flex flex-col items-center">
              {/* Stripe pattern */}
              <div className="absolute inset-0">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="h-12 bg-pink-200"
                    style={{ marginTop: `${i * 24}px` }}
                  ></div>
                ))}
              </div>
              
              {/* Content */}
              <div className="z-10 w-full flex flex-col items-center mt-6">
                <div className="text-blue-700 font-bold text-lg tracking-widest mb-6">
                  T E L M O R E
                </div>
                
                <div className="bg-yellow-400 w-48 h-48 flex items-center justify-center">
                  {/* This would be replaced by the user's uploaded image */}
                  <div className="text-lg">👐 Sample image placeholder</div>
                </div>
                
                <div className="mt-6">
                  <Button className="bg-cyan-400 text-blue-900 hover:bg-cyan-500 px-4 py-2 rounded-sm font-medium text-sm">
                    SE HER HVORDAN
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IPhoneFrame>

      {/* Preview button only */}
      <div className="mt-4 flex justify-center">
        <Button 
          variant="outline" 
          className="border-[#4C36FF] text-[#4C36FF] hover:bg-[#4C36FF] hover:text-white px-8 py-2 rounded-lg font-medium"
          onClick={onPreview}
        >
          Preview Creative
        </Button>
      </div>
    </div>
  )
}
