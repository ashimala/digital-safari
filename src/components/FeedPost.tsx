import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, AlertTriangle, CheckCircle2, TrendingUp, MessageSquare } from "lucide-react";

export interface PostData {
  id: string;
  type: "news" | "ad" | "meme" | "misinformation" | "opinion";
  author: string;
  content: string;
  timestamp: string;
  credibilityScore: "high" | "medium" | "low";
  emotionalTone: string;
  aiInsights: {
    contentType: string;
    credibilityFlags: string[];
    algorithmFactors: string[];
    emotionalTactics: string[];
  };
}

interface FeedPostProps {
  post: PostData;
}

const FeedPost = ({ post }: FeedPostProps) => {
  const [showAnalysis, setShowAnalysis] = useState(false);

  const getTypeColor = () => {
    switch (post.type) {
      case "news":
        return "bg-trust-blue/10 text-trust-blue border-trust-blue/20";
      case "ad":
        return "bg-warning-amber/10 text-warning-amber border-warning-amber/20";
      case "meme":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "misinformation":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "opinion":
        return "bg-accent/10 text-accent border-accent/20";
      default:
        return "bg-muted";
    }
  };

  const getCredibilityIcon = () => {
    switch (post.credibilityScore) {
      case "high":
        return <CheckCircle2 className="w-4 h-4 text-success-green" />;
      case "medium":
        return <Info className="w-4 h-4 text-warning-amber" />;
      case "low":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center text-white font-bold text-sm">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-sm">{post.author}</p>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getCredibilityIcon()}
            <Badge variant="outline" className={getTypeColor()}>
              {post.type}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed">{post.content}</p>
        
        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            <TrendingUp className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            <MessageSquare className="w-4 h-4" />
            <span>Comment</span>
          </button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAnalysis(!showAnalysis)}
          className="w-full"
        >
          <Info className="w-4 h-4 mr-2" />
          {showAnalysis ? "Hide" : "Show"} AI Analysis
        </Button>

        {showAnalysis && (
          <div className="bg-info-light rounded-lg p-4 space-y-3 animate-in fade-in-50 slide-in-from-top-2">
            <div>
              <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">Content Type</Badge>
              </h4>
              <p className="text-sm text-muted-foreground">{post.aiInsights.contentType}</p>
            </div>

            {post.aiInsights.credibilityFlags.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">Credibility Signals</Badge>
                </h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {post.aiInsights.credibilityFlags.map((flag, idx) => (
                    <li key={idx}>{flag}</li>
                  ))}
                </ul>
              </div>
            )}

            {post.aiInsights.emotionalTactics.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">Emotional Tactics</Badge>
                </h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {post.aiInsights.emotionalTactics.map((tactic, idx) => (
                    <li key={idx}>{tactic}</li>
                  ))}
                </ul>
              </div>
            )}

            {post.aiInsights.algorithmFactors.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">Algorithm Factors</Badge>
                </h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {post.aiInsights.algorithmFactors.map((factor, idx) => (
                    <li key={idx}>{factor}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedPost;
