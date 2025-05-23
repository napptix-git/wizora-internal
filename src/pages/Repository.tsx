
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FolderIcon, ImageIcon, Upload, Search, Plus, Trash2, Download } from "lucide-react"

const Repository = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  
  const folders = [
    {
      name: "Backgrounds",
      files: [
        { name: "bg1.jpg", size: "2.1 MB", date: "2023-12-01" },
        { name: "bg2.png", size: "1.8 MB", date: "2023-12-02" },
        { name: "bg3.jpg", size: "3.2 MB", date: "2023-12-03" },
        { name: "bg4.png", size: "2.5 MB", date: "2023-12-04" },
        { name: "bg5.jpg", size: "1.9 MB", date: "2023-12-05" }
      ]
    },
    {
      name: "Characters", 
      files: [
        { name: "char1.png", size: "800 KB", date: "2023-11-28" },
        { name: "char2.png", size: "750 KB", date: "2023-11-29" },
        { name: "char3.png", size: "900 KB", date: "2023-11-30" }
      ]
    },
    {
      name: "Objects",
      files: [
        { name: "obj1.png", size: "500 KB", date: "2023-11-25" },
        { name: "obj2.jpg", size: "650 KB", date: "2023-11-26" },
        { name: "obj3.png", size: "720 KB", date: "2023-11-27" }
      ]
    },
    {
      name: "Logos",
      files: [
        { name: "logo1.svg", size: "120 KB", date: "2023-11-20" },
        { name: "logo2.png", size: "300 KB", date: "2023-11-21" }
      ]
    }
  ]

  const filteredFolders = folders.filter(folder => 
    folder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    folder.files.some(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

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
        {/* File Explorer Interface */}
        <Card className="shadow-sm bg-white border border-[#4C36FF]">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">File Explorer</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Folder
                </Button>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex h-96">
              {/* Left Panel - Folders */}
              <div className="w-1/3 border-r border-gray-200 pr-4">
                <h3 className="font-medium text-gray-900 mb-4">Folders</h3>
                <ScrollArea className="h-80">
                  <div className="space-y-2">
                    {filteredFolders.map((folder) => (
                      <div 
                        key={folder.name}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedFolder === folder.name 
                            ? 'bg-blue-50 border border-blue-200' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedFolder(folder.name)}
                      >
                        <FolderIcon className="h-5 w-5 text-blue-600" />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{folder.name}</div>
                          <div className="text-xs text-gray-500">{folder.files.length} files</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Right Panel - Files */}
              <div className="flex-1 pl-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">
                    {selectedFolder ? `Files in ${selectedFolder}` : 'Select a folder to view files'}
                  </h3>
                  {selectedFolder && (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download All
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Selected
                      </Button>
                    </div>
                  )}
                </div>
                
                <ScrollArea className="h-72">
                  {selectedFolder ? (
                    <div className="grid grid-cols-4 gap-4">
                      {folders.find(f => f.name === selectedFolder)?.files.map((file) => (
                        <div 
                          key={file.name}
                          className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <ImageIcon className="h-12 w-12 text-gray-400" />
                            <div className="text-center">
                              <div className="text-sm font-medium text-gray-900 truncate w-full">
                                {file.name}
                              </div>
                              <div className="text-xs text-gray-500">{file.size}</div>
                              <div className="text-xs text-gray-400">{file.date}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      Select a folder from the left panel to view its contents
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Repository
