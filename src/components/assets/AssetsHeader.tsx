
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const AssetsHeader = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-lg shadow-md mb-6 px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-[#4C36FF] hover:bg-[#3d2bcc] p-0 flex items-center justify-center"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </Button>
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
