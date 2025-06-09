import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function useAuthSession() {
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setExpiresAt(data.session.expires_at);
      }
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.expires_at) {
        setExpiresAt(session.expires_at);
      } else {
        setExpiresAt(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { expiresAt };
}
