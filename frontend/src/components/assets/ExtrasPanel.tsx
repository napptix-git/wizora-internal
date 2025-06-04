
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const ExtrasPanel = () => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h3 className="font-medium mb-2">Additional Settings</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="cta-text">CTA Button Text</Label>
          <Input id="cta-text" placeholder="Enter CTA text" />
        </div>
        <div>
          <Label htmlFor="headline">Headline</Label>
          <Input id="headline" placeholder="Enter headline" />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input id="description" placeholder="Enter description" />
        </div>
      </div>
    </div>
  )
}
