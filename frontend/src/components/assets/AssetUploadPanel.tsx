import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AssetUploadItem } from "./AssetUploadItem";
import { supabase } from "@/lib/supabaseClient";
import layoutManifests from "@/data/layoutManifests.json";

interface AssetUploadPanelProps {
  onImageUpload: (type: string) => void;
}

interface AssetDefinition {
  title: string;
  type: string;
  file?: string;
}

export const AssetUploadPanel = ({ onImageUpload }: AssetUploadPanelProps) => {
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
            onUpload={onImageUpload}
          />
        ))}
      </div>
    </ScrollArea>
  );
};