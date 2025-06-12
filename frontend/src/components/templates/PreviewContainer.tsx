import React from "react"
import { Button } from "@/components/ui/button"
import IPhoneFrame from "@/components/ui/iphone-frame"
import { supabase } from "@/lib/supabaseClient"
import { Template } from "./TemplateCard"
import { useNavigate } from "react-router-dom"

interface PreviewContainerProps {
  selectedTemplate: number | null
  templates: Template[]
  previewBackground: string
}

export const PreviewContainer: React.FC<PreviewContainerProps> = ({
  selectedTemplate,
  templates,
  previewBackground,
}) => {
  const navigate = useNavigate()
  const currentTemplate = templates.find((t) => t.id === selectedTemplate)

 const handleUse = async () => {
  const layoutName = currentTemplate?.name;
  const creativeRowId = sessionStorage.getItem("currentCreativeRowId");

  if (!layoutName || !creativeRowId) {
    alert("Missing layout name or creative ID");
    return;
  }

  try {
    // Step 1: Upload layout to Supabase Storage
    const response = await fetch(`http://localhost:3000/api/${layoutName}/${creativeRowId}`, {
      method: "POST",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Upload failed");
    }

    // Step 2: Get the creative_id from DB
    const { data, error } = await supabase
      .from("creatives")
      .select("creative_id")
      .eq("id", creativeRowId)
      .single();

    if (error || !data?.creative_id) {
      throw new Error("Creative ID not found in Supabase");
    }

    const creativeId = data.creative_id;

    // ✅ Step 3: Update the layout name in the creatives table
    const { error: updateError } = await supabase
      .from("creatives")
      .update({ layout: layoutName })
      .eq("creative_id", creativeId);

    if (updateError) {
      throw new Error("Failed to update layout name in DB");
    }

    // Step 4: Store for preview and navigate
    
    sessionStorage.setItem("activeCreativeId", creativeId);
    navigate("/dashboard/assets");
  } catch (err) {
    alert("❌ Upload failed: " + err.message);
  }
};

  return (
    <div className="h-full w-full flex items-center justify-center px-4 py-6">
      <div className="flex flex-col items-center justify-center gap-4 max-h-[calc(100vh-60px)]">
        {/* 📱 Mobile Frame */}
        <div
          className="
            w-[140px]
            sm:w-[180px]
            md:w-[200px]
            lg:w-[220px]
            xl:w-[240px]
            aspect-[9/16]
            rounded-2xl
            bg-transparent
          "
        >
          <IPhoneFrame size="small">
            <div className={`w-full h-full bg-[#4c36ff] relative`}>
              {/* Preview Wrapper for iframe or fallback components */}
              <div className="w-full h-full preview-wrapper">
                
               {currentTemplate?.name ? (
  <div className="wrapper w-full h-full overflow-hidden relative">
<div className="absolute top-[0px] left-0 origin-top-left scale-[0.55] w-[181.5%] h-[172.67%]">

    <iframe
      src={`http://localhost:3000/layouts/${currentTemplate.name}/index.html`}
      className="w-full h-full border-none"
      allow="fullscreen"
      title="Creative Preview"
    />
  </div>
</div>


) : (
  <div className="flex items-center justify-center w-full h-full text-white text-xl">
    Select a Layout.
  </div>
)}
              </div>
            </div>
          </IPhoneFrame>
        </div>

        {/* 🟣 Use Button */}
        <Button
          onClick={handleUse}
          className="bg-gradient-wizora hover:opacity-90 text-white px-6 py-1.5 rounded-lg font-medium text-sm"
        >
          USE
        </Button>
      </div>
    </div>
  )
}
