import FeedPost, { PostData } from "./FeedPost";
import { Info } from "lucide-react";

const mockPosts: PostData[] = [
  {
    id: "1",
    type: "news",
    author: "TechNews Daily",
    content: "Breaking: New study from Stanford University shows that critical thinking skills can be improved through structured digital literacy training. Researchers found a 40% improvement in misinformation detection among participants.",
    timestamp: "2 hours ago",
    credibilityScore: "high",
    emotionalTone: "neutral",
    aiInsights: {
      contentType: "This is a news article from a verified source (TechNews Daily). It cites an academic study from a reputable institution.",
      credibilityFlags: [
        "Links to peer-reviewed research",
        "Verified news source",
        "Uses specific data and statistics",
        "Neutral, factual language"
      ],
      algorithmFactors: [
        "High engagement from educational circles",
        "Shared by verified accounts",
        "Trending in technology category"
      ],
      emotionalTactics: ["Minimal emotional manipulation", "Focuses on facts and research"]
    }
  },
  {
    id: "2",
    type: "ad",
    author: "SuperVitamin Co.",
    content: "🔥 DOCTORS DON'T WANT YOU TO KNOW! This one miracle supplement will change your life! Limited time offer - 70% OFF! 🚨 Only 3 left in stock! Click now or miss out forever!",
    timestamp: "1 hour ago",
    credibilityScore: "low",
    emotionalTone: "urgent",
    aiInsights: {
      contentType: "This is a sponsored advertisement for a health product, using aggressive marketing tactics.",
      credibilityFlags: [
        "Uses sensationalist language ('DOCTORS DON'T WANT YOU TO KNOW')",
        "Creates false urgency ('Only 3 left!')",
        "Makes unverifiable claims ('miracle supplement')",
        "No scientific evidence provided",
        "Excessive use of emojis and caps lock"
      ],
      algorithmFactors: [
        "Paid promotion - boosted to reach more users",
        "Targeted based on your browsing history",
        "High click-through rate due to urgency tactics"
      ],
      emotionalTactics: [
        "Fear of missing out (FOMO)",
        "Appeal to authority ('DOCTORS')",
        "Artificial scarcity",
        "Sensationalism"
      ]
    }
  },
  {
    id: "3",
    type: "meme",
    author: "MemeLord_2024",
    content: "When you finally understand how social media algorithms work: [imagine meme showing person having mind blown moment] 🤯 Tag someone who needs to see this!",
    timestamp: "30 minutes ago",
    credibilityScore: "medium",
    emotionalTone: "humorous",
    aiInsights: {
      contentType: "This is a meme - content designed for entertainment and viral sharing. While harmless, it's optimized for engagement.",
      credibilityFlags: [
        "Entertainment content, not informational",
        "Designed to be shared ('Tag someone')",
        "No factual claims to verify"
      ],
      algorithmFactors: [
        "High engagement rate (shares, likes, comments)",
        "Uses trending format",
        "Call-to-action increases interaction",
        "Algorithm prioritizes engaging content"
      ],
      emotionalTactics: [
        "Humor to lower critical thinking",
        "Peer pressure ('Tag someone')",
        "Relatability to encourage sharing"
      ]
    }
  },
  {
    id: "4",
    type: "misinformation",
    author: "TruthSeeker1776",
    content: "WAKE UP PEOPLE! The government is using 5G towers to control your thoughts! My neighbor's cousin's friend works at a tech company and confirmed this. They're hiding it from mainstream media! Share before this gets deleted!!!",
    timestamp: "4 hours ago",
    credibilityScore: "low",
    emotionalTone: "fear-based",
    aiInsights: {
      contentType: "This post contains unverified claims and conspiracy theory elements. Multiple red flags indicate misinformation.",
      credibilityFlags: [
        "Extraordinary claims without evidence",
        "Appeals to 'hidden knowledge'",
        "Uses third-hand sourcing ('cousin's friend')",
        "Fear-mongering language",
        "Urgency to share 'before deletion'",
        "ALL CAPS to create alarm"
      ],
      algorithmFactors: [
        "Controversial content generates high engagement",
        "People commenting to debunk = more visibility",
        "Algorithm can't always distinguish truth from fiction"
      ],
      emotionalTactics: [
        "Fear and paranoia",
        "Appeal to 'us vs. them' mentality",
        "False urgency",
        "Conspiracy thinking"
      ]
    }
  },
  {
    id: "5",
    type: "opinion",
    author: "Sarah Martinez",
    content: "Unpopular opinion: I think we need better digital literacy education in schools. Kids are growing up online but nobody's teaching them how to verify information or understand algorithms. What do you all think?",
    timestamp: "5 hours ago",
    credibilityScore: "high",
    emotionalTone: "thoughtful",
    aiInsights: {
      contentType: "This is an opinion piece - a personal viewpoint that invites discussion. It's clearly labeled as opinion and encourages dialogue.",
      credibilityFlags: [
        "Clearly states it's an opinion",
        "Asks for input from others",
        "Reasonable, measured language",
        "Focuses on education and improvement"
      ],
      algorithmFactors: [
        "Question format increases comments",
        "Educational content may be prioritized",
        "Engagement from like-minded users"
      ],
      emotionalTactics: [
        "Appeal to shared concerns",
        "Open-ended question encourages participation",
        "Moderate, non-aggressive tone"
      ]
    }
  }
];

const DemoFeed = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-4 py-6">
      <div className="bg-card rounded-lg border border-border p-4 mb-6">
        <h2 className="font-semibold mb-2 flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          Interactive Demo Feed
        </h2>
        <p className="text-sm text-muted-foreground">
          Click "Show AI Analysis" on any post to see how we deconstruct social media content. 
          This demo shows different types of posts you might encounter online.
        </p>
      </div>
      
      {mockPosts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default DemoFeed;
