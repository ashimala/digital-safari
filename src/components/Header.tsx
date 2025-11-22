import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { User, Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Shield } from "lucide-react";

interface Profile {
  first_name: string | null;
  last_name: string | null;
}

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer profile fetching
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("first_name, last_name")
      .eq("id", userId)
      .single();

    if (!error && data) {
      setProfile(data);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      toast.success("Signed out successfully");
      navigate("/auth");
    }
  };

  const getDisplayName = () => {
    if (profile?.first_name) {
      return profile.first_name;
    }
    return "User";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-hero">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Digital Literacy Lab</h1>
              <p className="text-xs text-muted-foreground">Learn. Verify. Navigate.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm font-medium">
                  Welcome, <span className="text-primary">{getDisplayName()}</span>
                </span>
                <Button onClick={handleSignOut} variant="outline" size="sm">
                  Sign Out
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate("/auth")} size="sm">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
