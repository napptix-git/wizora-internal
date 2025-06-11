import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ExternalLink, UploadIcon } from "lucide-react";
// import { AssetEditDialog } from "./AssetEditDialog"

interface AssetUploadItemProps {
  title: string;
  onUpload: (type: string) => void;
  type: string;
}

export const AssetUploadItem = ({ title, onUpload, type }: AssetUploadItemProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    const creativeId = sessionStorage.getItem("activeCreativeId");
    if (!creativeId) {
      alert("No active creative ID");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    formData.append("creativeId", creativeId);

    try {
      const response = await fetch("http://localhost:3000/api/upload-asset", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        console.log("✅ Uploaded:", result.path);
        setUploadedImage(file.name);
        setIsEditDialogOpen(true);
        onUpload(type);
      } else {
        console.error("❌ Upload failed:", result.error);
        alert(`Upload failed: ${result.error}`);
      }
    } catch (err) {
      console.error("❌ Upload error:", err);
      alert("Upload failed. Check your connection or server.");
    }
  };

  const handleUploadClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) handleFileUpload(file);
    };
    input.click();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <Label className="font-medium">{title}</Label>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center border border-gray-300 border-dashed hover:border-blue-500 hover:bg-blue-50 transition-colors"
          onClick={handleUploadClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload or Drop Image
        </Button>
      </div>

      {/* Asset Edit Dialog for uploaded images */}
      {/* <AssetEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        imageName={uploadedImage || undefined}
        onSave={handleSaveEdit}
      /> */}
    </>
  );
};
