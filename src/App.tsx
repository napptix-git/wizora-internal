
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Templates from "./pages/Templates";
import Assets from "./pages/Assets";
import Creatives from "./pages/Creatives";
import Repository from "./pages/Repository";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import SessionMonitor from "./components/SessionMonitor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <SessionMonitor />
        <SidebarProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <div className="flex h-screen w-full">
                  <AppSidebar />
                  <main className="flex-1">
                    <Index />
                  </main>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/templates" element={
              <ProtectedRoute>
                <div className="flex h-screen w-full">
                  <AppSidebar />
                  <main className="flex-1">
                    <Templates />
                  </main>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/assets" element={
              <ProtectedRoute>
                <div className="flex h-screen w-full">
                  <AppSidebar />
                  <main className="flex-1">
                    <Assets />
                  </main>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/creatives" element={
              <ProtectedRoute>
                <div className="flex h-screen w-full">
                  <AppSidebar />
                  <main className="flex-1">
                    <Creatives />
                  </main>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/repository" element={
              <ProtectedRoute>
                <div className="flex h-screen w-full">
                  <AppSidebar />
                  <main className="flex-1">
                    <Repository />
                  </main>
                </div>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
