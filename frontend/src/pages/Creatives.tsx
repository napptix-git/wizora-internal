
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Settings, BarChart, Filter, Search } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabaseClient"
import { useEffect } from "react"
import axios from "axios"

const Creatives = () => {
  const [isNewCreativeOpen, setIsNewCreativeOpen] = useState(false)
  const [creativeName, setCreativeName] = useState("")
const [creatives, setCreatives] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const navigate = useNavigate()
  const { toast } = useToast()

useEffect(() => {
  const fetchCreatives = async () => {
    const user = await supabase.auth.getUser()
    const userId = user.data.user?.id

    if (!userId) return

    const { data, error } = await supabase
      .from("creatives")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })

    if (error) {
      console.error("Error fetching creatives:", error)
      toast({
        title: "Error",
        description: "Could not fetch your creatives.",
        variant: "destructive"
      })
    } else {
      const mapped = data.map((item, index) => ({
  id: index + 1,
  name: item.creative_name || "-",
  lastEdit: item.updated_at ? new Date(item.updated_at).toLocaleString() : "-",
  layout: item.layout || "-",
  imps: item.impressions ? `${item.impressions}K` : "-",
  clicks: item.clicks !== null ? `${item.clicks.toFixed(1)}%` : "-",
  engagement: item.engagement !== null ? `${item.engagement.toFixed(1)}%` : "-",
  status: item.is_active ? "active" : "paused"
}))

setCreatives(mapped)

    }
  }

  fetchCreatives()
}, [])

const generateCreativeId = (): string => {
  return Math.random().toString(36).substring(2, 12); // 10-character alphanumeric
};


const handleCreateCreative = async () => {
  if (!creativeName.trim()) {
    toast({
      title: "Name Required",
      description: "Please enter a creative name.",
      variant: "destructive"
    });
    return;
  }

  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;
  const email = user.data.user?.email;

  if (!userId || !email) {
    toast({
      title: "Authentication error",
      description: "Please log in again.",
      variant: "destructive"
    });
    return;
  }

  // ✅ Generate 10-char unique creativeId
  const creativeId = generateCreativeId();

  // ✅ Insert into Supabase DB
  const { data, error } = await supabase.from("creatives").insert([
    {
      user_id: userId,
      email,
      creative_name: creativeName,
      layout: "Choose Layout",
      creative_id: creativeId, // <— New field
      is_active: false,
      impressions: 0,
      clicks: 0,
      engagement: 0
    }
  ]).select("id, creative_id");

  if (error) {
    toast({
      title: "Error creating creative",
      description: error.message,
      variant: "destructive"
    });
    return;
  }

  const createdCreative = data?.[0];
  sessionStorage.setItem("currentCreativeRowId", createdCreative.id);
  sessionStorage.setItem("activeCreativeId", createdCreative.creative_id); // ✅ Store creative_id for upload
  setCreativeName("");
  setIsNewCreativeOpen(false);
  navigate("/dashboard/templates");
};


  
  const toggleCreativeStatus = (id: number) => {
    setCreatives(creatives.map(creative => {
      if (creative.id === id) {
        const newStatus = creative.status === "active" ? "paused" : "active"
        return { ...creative, status: newStatus }
      }
      return creative
    }))
  }

  const handleEditCreative = (id: number) => {
    navigate("/dashboard/assets")
  }

  const handlePreviewCreative = (id: number) => {
  navigate(`/dashboard/PreviewScreen?creativeId=${id}`);
};

  const handleCreativeClick = (id: number) => {
    // Navigate to assets page for existing creatives
    navigate("/dashboard/assets")
  }

  // Filter creatives based on search and filter
  const filteredCreatives = creatives.filter((creative) => {
  const name = creative?.creative_name || "" // fallback if missing
  const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase())
  const matchesFilter = filterStatus === "all" || creative.status === filterStatus
  return matchesSearch && matchesFilter
})


  return (
    <div className="h-screen bg-wizora-background font-product flex flex-col">
      {/* Header */}
      <div className="px-8 py-6 flex-shrink-0">
        <div className="bg-white rounded-lg shadow-md px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">My Creatives</h1>
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
              <Dialog open={isNewCreativeOpen} onOpenChange={setIsNewCreativeOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-wizora hover:opacity-90 text-white px-6 py-2 rounded-lg font-medium">
                    + New Creative
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Enter Creative Name</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="creative-name">Creative Name</Label>
                      <Input
                        id="creative-name"
                        placeholder="Enter creative name"
                        value={creativeName}
                        onChange={(e) => setCreativeName(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <Button 
                      onClick={handleCreateCreative}
                      className="w-full bg-gradient-wizora hover:opacity-90 text-white"
                    >
                      Save
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8 flex-1 min-h-0">
        <Card className="shadow-sm bg-white rounded-lg h-full flex flex-col">
          <CardHeader className="flex-shrink-0 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Creative Performance</CardTitle>
              <div className="flex items-center space-x-3">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64 h-9"
                  />
                </div>
                {/* Filter */}
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32 h-9">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 min-h-0 p-0">
            <div className="h-full flex flex-col">
              {/* Table Header */}
              <div className="px-6 pb-4 border-b border-gray-200 flex-shrink-0">
                <div className="grid grid-cols-7 gap-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  <div>NAME</div>
                  <div>LAYOUT</div>
                  <div>LAST EDIT</div>
                  <div>IMPS</div>
                  <div>CLICKS%</div>
                  <div>ENG%</div>
                  <div>ACTIONS</div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 min-h-0">
                <ScrollArea className="h-full">
                  <div className="px-6 py-2">
                    {filteredCreatives.map((creative) => (
                      <div key={creative.id} className="grid grid-cols-7 gap-4 items-center py-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <Switch 
                              checked={creative.status === 'active'}
                              onCheckedChange={() => toggleCreativeStatus(creative.id)}
                              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300 w-9 h-5"
                            />
                          </div>
                          <span 
                            className="font-medium text-gray-900 cursor-pointer hover:text-[#4C36FF]"
                            onClick={() => handleCreativeClick(creative.id)}
                          >
                            {creative.name}
                          </span>
                        </div>
                        <div>
                          <Badge variant="outline" className="text-xs">
                            {creative.layout}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">{creative.lastEdit}</div>
                        <div className="text-sm font-medium">{creative.imps}</div>
                        <div className="text-sm font-medium">{creative.clicks}</div>
                        <div className="text-sm font-medium">{creative.engagement}</div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="p-2"
                          onClick={() => handlePreviewCreative(creative.id)}>
                            <Eye className="h-4 w-4 text-gray-600 ml-[-9px]" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-2"
                            onClick={() => handleEditCreative(creative.id)}
                          >
                            <Edit className="h-4 w-4 text-gray-600 ml-[-9px]" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-2">
                            <Settings className="h-4 w-4 text-gray-600 ml-[-9px]" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-2">
                            <BarChart className="h-3 w-3 text-gray-600 ml-[-9px]"/>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Creatives
