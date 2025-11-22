import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Link2, CheckCircle2, AlertTriangle, Info } from "lucide-react";

interface AnalysisResult {
  type: "news" | "ad" | "opinion" | "misinformation" | "satire";
  credibilityScore: "high" | "medium" | "low";
  emotionalTone: string;
  contentType: string;
  credibilityFlags: string[];
  emotionalTactics: string[];
  algorithmFactors: string[];
  summary: string;
}

const ArticleVerifier = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setAnalysis(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-article", {
        body: { url },
      });

      if (error) throw error;

      if (data.error) {
        toast({
          title: "Analysis Failed",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      setAnalysis(data.analysis);
      toast({
        title: "Analysis Complete",
        description: "Article has been analyzed successfully",
      });
    } catch (error) {
      console.error("Error analyzing article:", error);
      toast({
        title: "Error",
        description: "Failed to analyze article. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "news":
        return "bg-trust-blue/10 text-trust-blue border-trust-blue/20";
      case "ad":
        return "bg-warning-amber/10 text-warning-amber border-warning-amber/20";
      case "opinion":
        return "bg-accent/10 text-accent border-accent/20";
      case "misinformation":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "satire":
        return "bg-secondary/10 text-secondary border-secondary/20";
      default:
        return "bg-muted";
    }
  };

  const getCredibilityIcon = (score: string) => {
    switch (score) {
      case "high":
        return <CheckCircle2 className="w-5 h-5 text-success-green" />;
      case "medium":
        return <Info className="w-5 h-5 text-warning-amber" />;
      case "low":
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="w-6 h-6 text-primary" />
            Article Verifier
          </CardTitle>
          <CardDescription>
            Paste a link to any article or webpage to get an AI-powered credibility analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              disabled={loading}
              className="flex-1"
            />
            <Button onClick={handleAnalyze} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing
                </>
              ) : (
                "Verify"
              )}
            </Button>
          </div>

          {analysis && (
            <div className="bg-info-light rounded-lg p-6 space-y-4 animate-in fade-in-50">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getCredibilityIcon(analysis.credibilityScore)}
                  <div>
                    <h3 className="font-semibold text-lg">
                      Credibility: {analysis.credibilityScore.toUpperCase()}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Emotional Tone: {analysis.emotionalTone}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className={getTypeColor(analysis.type)}>
                  {analysis.type}
                </Badge>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Summary</h4>
                <p className="text-sm text-muted-foreground">{analysis.summary}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">Content Analysis</Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">{analysis.contentType}</p>

                  {analysis.credibilityFlags.length > 0 && (
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">Credibility Signals:</p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {analysis.credibilityFlags.map((flag, idx) => (
                          <li key={idx}>{flag}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {analysis.emotionalTactics.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">Emotional Tactics</Badge>
                      </h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {analysis.emotionalTactics.map((tactic, idx) => (
                          <li key={idx}>{tactic}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysis.algorithmFactors.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">Algorithm Factors</Badge>
                      </h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {analysis.algorithmFactors.map((factor, idx) => (
                          <li key={idx}>{factor}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleVerifier;
