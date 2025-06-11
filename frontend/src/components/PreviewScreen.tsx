
import React from 'react';
import { Button } from "@/components/ui/button";
import IPhoneFrame from '@/components/ui/iphone-frame';

interface PreviewScreenProps {
  onClose?: () => void;
}

const PreviewScreen: React.FC<PreviewScreenProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-[#EDEBFF] flex flex-col z-40">
      {/* Header Banner */}
      <div className="bg-[#4C36FF] text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/c05f9ec3-7bfd-4382-ae4b-194d12966e19.png" 
            alt="WIZORA Logo" 
            className="h-8" 
          />
          <span className="ml-4 text-sm opacity-70">Preview Mode</span>
        </div>
       {onClose && (
        <Button
          variant="outline"
          className="border-white text-white hover:bg-white hover:text-[#4C36FF]"
          onClick={onClose}
        >
          Close Preview
        </Button>
      )}
      </div>
      
      {/* Content Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <IPhoneFrame>
          {/* Ad Preview Content */}
          <div className="flex-1 bg-red-500 relative overflow-hidden">
            <div className="absolute inset-0 flex flex-col">
              {/* Christmas decorations */}
              <div className="absolute top-4 left-4 text-white text-2xl">❄️</div>
              <div className="absolute top-4 right-4 text-white text-2xl">🎄</div>
              
              {/* Content */}
              <div className="flex items-center justify-center h-full">
                <div className="bg-yellow-400 w-64 h-64 flex items-center justify-center">
                  <div className="text-6xl">🙌</div>
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
                <Button className="bg-cyan-400 text-blue-900 hover:bg-cyan-500 px-6 py-2 rounded-sm font-medium">
                  SE HER HVORDAN
                </Button>
              </div>
            </div>
          </div>
        </IPhoneFrame>
        
        {/* QR Code (example) */}
        <div className="ml-20 flex flex-col items-center">
          <div className="w-40 h-40 bg-white p-2 border border-gray-200 rounded-md">
            {/* Placeholder for QR Code */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              QR Code
            </div>
          </div>
          <p className="mt-4 text-gray-600 text-sm">Scan this to view on your phone</p>
        </div>
      </div>
    </div>
  );
};

export default PreviewScreen;
