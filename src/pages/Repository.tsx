
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FolderIcon, ImageIcon, Upload } from "lucide-react"

const Repository = () => {
  const folders = [
    {
      name: "Backgrounds",
      count: 15,
      lastUpdated: "2 days ago"
    },
    {
      name: "Characters", 
      count: 8,
      lastUpdated: "1 week ago"
    },
    {
      name: "Objects",
      count: 23,
      lastUpdated: "3 days ago"
    },
    {
      name: "Logos",
      count: 5,
      lastUpdated: "1 day ago"
    }
  ]

  return (
    <div className="min-h-screen bg-wizora-background font-product">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Asset Repository</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>📖 Documentation</span>
              <span>🎧 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-wizora"></div>
              <div>
                <div className="text-sm font-medium">Anushka Bhavsar</div>
                <div className="text-xs text-gray-500">Tech</div>
              </div>
            </div>
            <Button className="bg-gradient-wizora hover:opacity-90 text-white px-6 py-2 rounded-lg font-medium">
              <Upload className="h-4 w-4 mr-2" />
              Upload Assets
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {folders.map((folder) => (
            <Card key={folder.name} className="shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <FolderIcon className="h-8 w-8 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{folder.name}</CardTitle>
                    <p className="text-sm text-gray-500">{folder.count} files</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Last updated: {folder.lastUpdated}</span>
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(folder.count, 3) }).map((_, i) => (
                      <ImageIcon key={i} className="h-4 w-4 text-gray-300" />
                    ))}
                    {folder.count > 3 && (
                      <span className="text-xs text-gray-400">+{folder.count - 3}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Repository
