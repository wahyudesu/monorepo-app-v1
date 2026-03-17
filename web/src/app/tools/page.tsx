"use client";

import { useState } from "react";
import { Wand2, UserCheck, FileText, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const tools = [
  { id: "script", label: "Content Script Draft", icon: FileText, description: "Generate a draft script for your content" },
  { id: "branding", label: "Personal Branding Builder", icon: UserCheck, description: "Build your personal brand identity" },
] as const;

type ToolId = (typeof tools)[number]["id"];

// Dummy script generator
function generateScript(platform: string, topic: string, tone: string): string {
  const hooks: Record<string, string[]> = {
    casual: [
      `Hey guys! So today I wanna talk about ${topic}...`,
      `What's up everyone! Let me share something about ${topic} that blew my mind...`,
      `Ok so ${topic} — let's break this down real quick...`,
    ],
    professional: [
      `In today's content, we'll dive deep into ${topic} and why it matters for your growth.`,
      `Let's discuss ${topic} — one of the most important aspects of building your brand.`,
      `Welcome back. Today's topic is ${topic}, and here's what you need to know.`,
    ],
    funny: [
      `POV: You finally decided to learn about ${topic} 😂`,
      `Nobody: ... Absolutely nobody: ... Me at 3am learning about ${topic}:`,
      `If ${topic} was a person, I'd buy them dinner 🤣 Here's why...`,
    ],
  };

  const bodies: Record<string, string> = {
    casual: `\n\nSo here's the thing — most people get ${topic} completely wrong. They think it's just about showing up, but it's SO much more than that.\n\nFirst, you need to understand your audience. Who are they? What do they care about?\n\nSecond, consistency is key. You can't post once a month and expect results.\n\nThird, engage with your community. Reply to comments, DM people, build real connections.`,
    professional: `\n\nThere are three key pillars to mastering ${topic}:\n\n1. Strategy — Define clear objectives and KPIs for your content around ${topic}.\n\n2. Execution — Create a content calendar and maintain consistent output quality.\n\n3. Analysis — Track performance metrics and iterate based on data-driven insights.`,
    funny: `\n\nOk but seriously though, ${topic} is actually super important and here's the tea ☕\n\nStep 1: Stop overthinking it (I know, easier said than done 💀)\n\nStep 2: Just start creating. Your first 100 posts WILL be trash and that's literally fine.\n\nStep 3: Find your people. The algorithm rewards engagement, so make friends not just followers.`,
  };

  const ctas: Record<string, string> = {
    instagram: "\n\n💡 Save this for later and share it with someone who needs to hear this!\n\n#personalbrand #contentcreator #growthmindset",
    tiktok: "\n\n🔥 Follow for more tips like this! Part 2 coming soon...\n\nComment 'MORE' if you want the full breakdown!",
    twitter: "\n\nRetweet this if you agree 🔁\n\nFollow me for daily insights on personal branding and content strategy.",
    youtube: "\n\nIf you found this valuable, smash that like button and subscribe for more content like this every week!\n\nDrop a comment below — what's YOUR biggest challenge with this?",
  };

  const hookArr = hooks[tone] || hooks.casual;
  const hook = hookArr[Math.floor(Math.random() * hookArr.length)];
  const body = bodies[tone] || bodies.casual;
  const cta = ctas[platform] || ctas.instagram;

  return `[${platform.toUpperCase()} SCRIPT — ${tone.toUpperCase()} TONE]\n\n${hook}${body}${cta}`;
}

// Dummy branding builder
function generateBranding(name: string, niche: string, values: string, audience: string): string {
  if (!name || !niche) return "";

  const bios: Record<string, string> = {
    "tech": `${name} | Tech Creator & Digital Strategist 🚀\nHelping ${audience || "professionals"} navigate the digital landscape.\nTurning complex tech into simple, actionable insights.`,
    "lifestyle": `${name} | Lifestyle Creator ✨\nCurating the good life for ${audience || "millennials"}.\nAuthenticity over perfection. ${values || "Mindful living"} advocate.`,
    "business": `${name} | Business & Entrepreneurship 💼\nSharing the real side of building a brand.\nHelping ${audience || "entrepreneurs"} grow with proven strategies.`,
    "fitness": `${name} | Fitness & Wellness Coach 💪\nTransforming lives through ${values || "discipline & consistency"}.\n${audience || "Beginners"} welcome. Let's level up together.`,
  };

  const bio = bios[niche] || `${name} | ${niche} Creator 🌟\nPassionate about ${values || niche}.\nCreating content for ${audience || "a curious audience"}.`;

  const pillars = niche === "tech"
    ? ["Tech Reviews & Tutorials", "Industry News & Trends", "Career Growth Tips"]
    : niche === "lifestyle"
    ? ["Daily Routines & Rituals", "Product Reviews", "Wellness & Self-care"]
    : niche === "business"
    ? ["Startup Stories", "Marketing Strategies", "Mindset & Productivity"]
    : ["Educational Content", "Behind the Scenes", "Community Engagement"];

  return `═══════════════════════════════
  PERSONAL BRAND BLUEPRINT
═══════════════════════════════

📝 BIO:
${bio}

🎯 CONTENT PILLARS:
${pillars.map((p, i) => `  ${i + 1}. ${p}`).join("\n")}

🎨 BRAND VOICE:
Tone: ${values ? "Aligned with " + values : "Authentic & relatable"}
Style: Consistent visual identity across all platforms

📊 POSTING STRATEGY:
• Instagram: 4-5x/week (Reels + Carousel)
• TikTok: Daily (Short-form video)
• Twitter/X: 2-3x/day (Threads + Engagement)
• YouTube: 1-2x/week (Long-form + Shorts)

🚀 30-DAY QUICK WINS:
1. Optimize all social bios with the bio above
2. Create 10 pieces of pillar content
3. Engage with 20 accounts in your niche daily
4. Launch a signature content series
5. Collaborate with 2-3 creators in similar niche`;
}

function ScriptTool() {
  const [platform, setPlatform] = useState("instagram");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("casual");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setOutput(generateScript(platform, topic, tone));
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Platform</Label>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="instagram">📸 Instagram</SelectItem>
              <SelectItem value="tiktok">🎵 TikTok</SelectItem>
              <SelectItem value="twitter">𝕏 Twitter/X</SelectItem>
              <SelectItem value="youtube">▶️ YouTube</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="casual">😊 Casual</SelectItem>
              <SelectItem value="professional">💼 Professional</SelectItem>
              <SelectItem value="funny">😂 Funny</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Topic</Label>
          <Input placeholder="e.g. personal branding" value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>
      </div>
      <Button onClick={handleGenerate} disabled={!topic.trim()} className="gap-2">
        <Sparkles className="h-4 w-4" />
        Generate Script
      </Button>
      {output && (
        <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed">{output}</pre>
        </div>
      )}
    </div>
  );
}

function BrandingTool() {
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("tech");
  const [values, setValues] = useState("");
  const [audience, setAudience] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    if (!name.trim()) return;
    setOutput(generateBranding(name, niche, values, audience));
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Your Name / Brand</Label>
          <Input placeholder="e.g. John Doe" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Niche</Label>
          <Select value={niche} onValueChange={setNiche}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">💻 Tech</SelectItem>
              <SelectItem value="lifestyle">✨ Lifestyle</SelectItem>
              <SelectItem value="business">💼 Business</SelectItem>
              <SelectItem value="fitness">💪 Fitness</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Core Values</Label>
          <Input placeholder="e.g. authenticity, growth" value={values} onChange={(e) => setValues(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Target Audience</Label>
          <Input placeholder="e.g. young professionals" value={audience} onChange={(e) => setAudience(e.target.value)} />
        </div>
      </div>
      <Button onClick={handleGenerate} disabled={!name.trim()} className="gap-2">
        <Wand2 className="h-4 w-4" />
        Build Brand Identity
      </Button>
      {output && (
        <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">{output}</pre>
        </div>
      )}
    </div>
  );
}

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<ToolId>("script");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Tools 🛠️</h1>
        <p className="text-sm text-muted-foreground">Personal branding & content creation tools</p>
      </div>

      {/* Tool selector */}
      <div className="flex gap-3">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={cn(
              "flex items-center gap-2 rounded-xl border px-4 py-3 text-left transition-all",
              activeTool === tool.id
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border/50 bg-card hover:border-border hover:shadow-sm"
            )}
          >
            <div className={cn(
              "rounded-lg p-2",
              activeTool === tool.id ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            )}>
              <tool.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">{tool.label}</p>
              <p className="text-[11px] text-muted-foreground">{tool.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Tool content */}
      <Card className="border-border/50">
        <CardContent className="p-6">
          {activeTool === "script" && <ScriptTool />}
          {activeTool === "branding" && <BrandingTool />}
        </CardContent>
      </Card>
    </div>
  );
}
