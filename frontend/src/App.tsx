import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SessionMonitor } from "@/components/SessionMonitor";
import { useEffect } from "react";
import axios from "axios";
import { supabase } from "@/lib/supabaseClient";


import Index from "./pages/Index";
import Creatives from "./pages/Creatives";
import Templates from "./pages/Templates";
import Assets from "./pages/Assets";
import Repository from "./pages/Repository";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute"; // 👈 import the wrapper
import PageNotFound from "./components/404";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const syncGoogleUser = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data?.session?.user;

      if (user) {
        try {
          await axios.post("http://localhost:3000/api/users/sync-user", {
            auth_id: user.id,
            email: user.email,
          });
          console.log("✅ Synced Google user globally");
        } catch (err) {
          console.error("❌ Global sync error:", err);
        }
      }
    };

    syncGoogleUser();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/PreviewScreen" element={<PreviewScreen />} />
            {/* ✅ Protected dashboard routes */}
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <SidebarProvider>
                    <div className="min-h-screen flex w-full bg-[#EDEBFF]">
                      <AppSidebar />
                      <SessionMonitor />
                    <main className="flex-1">
                      <div className="md:hidden p-4">
                        <SidebarTrigger />
                      </div>
                      <Routes>
                        <Route path="/" element={<Navigate to="/dashboard/creatives" replace />} />
                        <Route path="/404" element={<PageNotFound />} />
                        <Route path="/creatives" element={<Creatives />} />
                        <Route path="/templates" element={<Templates />} />
                        <Route path="/assets" element={<Assets />} />
                        <Route path="/repository" element={<Repository />} />
                      </Routes>
                    </main>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            }
          />

            {/* 🔁 Catch all other routes */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
export default App;
