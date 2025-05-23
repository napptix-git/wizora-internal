
import { Button } from "@/components/ui/button"

export const AssetsHeader = () => {
  return (
    <div className="bg-white rounded-lg shadow-md mb-6 px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Customize Assets</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-wizora"></div>
          <div>
            <div className="text-sm font-medium">Anushka Bhavsar</div>
            <div className="text-xs text-gray-500">Tech</div>
          </div>
        </div>
      </div>
    </div>
  )
}
