
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Creatives from "./pages/Creatives";
import Templates from "./pages/Templates";
import Assets from "./pages/Assets";
import Repository from "./pages/Repository";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={
            <SidebarProvider>
              <div className="min-h-screen flex w-full bg-[#EDEBFF]">
                <AppSidebar />
                <main className="flex-1">
                  <div className="md:hidden p-4">
                    <SidebarTrigger />
                  </div>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard/creatives" replace />} />
                    <Route path="/creatives" element={<Creatives />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/assets" element={<Assets />} />
                    <Route path="/repository" element={<Repository />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </SidebarProvider>
          } />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
