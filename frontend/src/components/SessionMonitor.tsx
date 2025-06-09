import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useAuthSession } from "@/hooks/useAuthSession";

export const SessionMonitor = () => {
  const { expiresAt } = useAuthSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!expiresAt) return;

    const now = Math.floor(Date.now() / 1000);
    const delay = (expiresAt - now) * 1000;

    const timer = setTimeout(async () => {
      alert("🕒 Your session has expired. Logging out...");
      await supabase.auth.signOut();
      navigate("/login");
    }, delay);

    return () => clearTimeout(timer);
  }, [expiresAt, navigate]);

  return null;
};
