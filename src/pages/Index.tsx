import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import DemoFeed from "@/components/DemoFeed";
import ArticleVerifier from "@/components/ArticleVerifier";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Brain, Users } from "lucide-react";
import { User } from "@supabase/supabase-js";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {!user ? (
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <section className="text-center mb-16 pt-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-hero mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-hero">
              The Digital Literacy Lab
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Learn to navigate the digital world with confidence. 
              Understand algorithms, spot misinformation, and become a critical thinker online.
            </p>
            <Button size="lg" onClick={() => navigate("/auth")} className="shadow-lg">
              Start Your Journey
            </Button>
          </section>

          {/* Features Grid */}
          <section className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="border-trust-blue/20 hover:shadow-md transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-trust-blue/10 flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-trust-blue" />
                </div>
                <CardTitle>See Through the Feed</CardTitle>
                <CardDescription>
                  Learn how algorithms decide what you see and why certain content goes viral.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-trust-teal/20 hover:shadow-md transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-trust-teal/10 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-trust-teal" />
                </div>
                <CardTitle>Detect Misinformation</CardTitle>
                <CardDescription>
                  Build critical thinking skills to identify false claims, manipulated media, and biased sources.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/20 hover:shadow-md transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Age-Appropriate Learning</CardTitle>
                <CardDescription>
                  Tailored content for children, teens, and adults with lessons that match your experience level.
                </CardDescription>
              </CardHeader>
            </Card>
          </section>

          {/* Demo Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Experience the Lab</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Try our interactive demo to see how we analyze social media content. 
                Each post reveals hidden patterns, emotional tactics, and algorithm insights.
              </p>
            </div>
            <DemoFeed />
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-card rounded-2xl p-12 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to Become Digitally Literate?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join thousands of learners who are mastering the skills to navigate the internet safely and confidently.
            </p>
            <Button size="lg" onClick={() => navigate("/auth")}>
              Create Free Account
            </Button>
          </section>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8 space-y-8">
          <ArticleVerifier />
          <DemoFeed />
        </div>
      )}
    </div>
  );
};

export default Index;
