import { ScrollArea } from "@/components/ui/scroll-area";
import { AssetUploadItem } from "./AssetUploadItem";

interface ExtrasPanelProps {
  onImageUpload: (type: string) => void;
}

export const ExtrasPanel = ({ onImageUpload }: ExtrasPanelProps) => {
  const extraTypes = [
    { title: "Overlay Logo Image", type: "Logo.png" },
    { title: "Overlay CTA Image", type: "Overlay.png" },
  ];

  return (
    <ScrollArea className="h-[600px] px-4 py-4">
      <div className="space-y-4 pr-4 mt-0">
        {extraTypes.map((item) => (
          <AssetUploadItem
            key={item.type}
            title={item.title}
            type={item.type}
            onUpload={onImageUpload}
          />
        ))}
      </div>
    </ScrollArea>
  );
};