import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import IPhoneFrame from '@/components/ui/iphone-frame';
import QRCode from "react-qr-code"; // <-- Add this import
import { useNavigate } from 'react-router-dom'; // <-- Add this import

interface PreviewScreenProps {
  onClose?: () => void;
}

const PreviewScreen: React.FC<PreviewScreenProps> = ({ onClose }) => {
  const [showQR, setShowQR] = useState(false);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [creativeId, setCreativeId] = useState<string | null>(null);
  const navigate = useNavigate(); // <-- Add this line

  useEffect(() => {
    const creativeId = sessionStorage.getItem("activeCreativeId");
    if (creativeId) {
      setCreativeId(creativeId);
      setIframeUrl(`https://wizora-backend.onrender.com/api/preview/${creativeId}`);
    }
  }, []);

  // The URL you want the QR code to point to:
  const localIp = "192.168.29.64"; // <-- your local IP here
  const qrUrl = creativeId
    ? `https://wizora-backend.onrender.com/api/preview/${creativeId}`
    : `https://wizora-backend.onrender.com/`;

  // Handler for close button
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/dashboard/creatives'); // <-- Navigate to Creatives page
    }
  };

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
        <Button 
          variant="outline" 
          className="border-white text-[#4c36ff] hover:bg-white hover:text-black"
          onClick={handleClose} // <-- Use new handler
        >
          Close Preview
        </Button>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
        <IPhoneFrame size="small">
        <div className="w-[300px] h-[534px] bg-white border border-gray-300 shadow-md relative overflow-hidden">
          {iframeUrl ? (
            <div className="absolute top-[0px] left-[-2px] origin-top-left scale-[0.6] w-[400px] h-[720px]">
              <iframe
                src={iframeUrl}
                className="w-full h-full absolute top-[0px] left-[-2px] border-none"
                title="Creative Preview"
                allow="fullscreen"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No creative preview available.
            </div>
          )}
        </div>
      </IPhoneFrame>
        
        {/* Button to show QR code */}
        <Button 
          className="mt-8"
          variant="outline"
          onClick={() => setShowQR(true)}
        >
          Show QR Code
        </Button>

        {/* QR Code Popup */}
        {showQR && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-200 flex items-center justify-center mb-4 border border-gray-300 rounded">
                {/* Render the QR code here */}
                <QRCode value={qrUrl} size={150} />
              </div>
              <p className="text-gray-600 text-sm mb-4">Scan this to view on your phone</p>
              <Button 
                className='bg-[white] text-[#4c36ff] border border-2px hover:bg-[#4c36ff] hover:text-white'
                onClick={() => setShowQR(false)}>Close</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewScreen;