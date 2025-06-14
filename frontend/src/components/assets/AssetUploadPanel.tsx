import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AssetUploadItem } from "./AssetUploadItem";
import { supabase } from "@/lib/supabaseClient";
import layoutManifests from "@/data/layoutManifests.json";

interface AssetUploadPanelProps {
  onImageUpload: (type: string) => void;
  onUploadSuccess: () => void;
}

interface AssetDefinition {
  title: string;
  type: string;
  file?: string;
}

export const AssetUploadPanel = ({ onImageUpload, onUploadSuccess }: AssetUploadPanelProps) => {

  const [assets, setAssets] = useState<AssetDefinition[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchManifest = async () => {
      const creativeId = sessionStorage.getItem("activeCreativeId");
      console.log("activeCreativeId:", creativeId);
      if (!creativeId) {
        setError("No active creative ID found");
        return;
      }

      const { data, error: supabaseError } = await supabase
        .from("creatives")
        .select("layout")
        .eq("creative_id", creativeId)
        .single();

      if (supabaseError || !data?.layout) {
        console.error("Supabase error:", supabaseError?.message || "No layout found");
        setError("Layout not found");
        return;
      }

      const layoutName = data.layout;
      console.log("Supabase layoutName:", layoutName);

      try {
        const manifest = layoutManifests[layoutName];
        if (!manifest) {
          setError(`No manifest found for layout: ${layoutName}`);
          return;
        }

        console.log("Loaded manifest:", manifest);
        // Filter out overlay_logo and overlay_cta
        const filteredAssets = (manifest.replaceableAssets || []).filter(
          (asset: AssetDefinition) => !["overlay_logo", "overlay_cta"].includes(asset.type)
        );
        setAssets(filteredAssets);
      } catch (err) {
        console.error("Manifest load error:", err);
        setError("Failed to load manifest");
        setAssets([]);
      }
    };

    fetchManifest();
  }, []);
const handleUpload = async (type: string, file?: File) => {
  if (!file) return;

  // ✅ 1. Basic validations
  if (!file.type.startsWith("image/")) {
    alert("Only image files are allowed.");
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    alert("Max file size is 5MB.");
    return;
  }

  const creativeId = sessionStorage.getItem("activeCreativeId");
  if (!creativeId) {
    alert("No active creative ID found");
    return;
  }

  // ✅ 2. Prepare and send to backend
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);
  formData.append("creativeId", creativeId);

  const response = await fetch("http://localhost:3000/api/upload-asset", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json();
    console.error("❌ Upload failed:", err.error);
    alert("Upload failed: " + err.error);
  } else {
    console.log("✅ Upload successful for", type);
    onUploadSuccess();
  }
};

  if (error) {
    return (
      <ScrollArea className="h-[600px] px-4 py-4">
        <div>{error}</div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-[600px] px-4 py-4">
      <div className="space-y-4 pr-4 mt-0">
        {assets.map((asset) => (
          <AssetUploadItem
            key={asset.type}
            title={asset.title}
            type={asset.type}
            onUpload={handleUpload}
          />
        ))}
      </div>
    </ScrollArea>
  );
};