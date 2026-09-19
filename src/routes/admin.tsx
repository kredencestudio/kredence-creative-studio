import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Download,
  ExternalLink,
  Globe,
  Image as ImageIcon,
  Plus,
  RefreshCw,
  Sparkles,
  Tag,
  Trash2,
  Upload,
  Video,
  MoveUp,
  MoveDown,
  Info,
} from "lucide-react";
import {
  useSiteContent,
  parseInstagramUrl,
  type WebsiteItem,
  type GraphicItem,
  type ReelItem,
  type SiteContent,
} from "@/lib/content-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [{ title: "Kredence Studio — Admin Content Manager" }],
  }),
});

function AdminPage() {
  const { content, updateContent, resetToDefaults, isLoaded } = useSiteContent();
  const [activeTab, setActiveTab] = useState<"websites" | "graphics" | "reels" | "industries" | "contact" | "data">("websites");
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // --- Handlers for Websites ---
  const handleAddWebsite = () => {
    const newItem: WebsiteItem = {
      id: `site-${Date.now()}`,
      name: "New Project",
      url: "example.com",
      tag: "Branding",
    };
    updateContent((prev) => ({
      ...prev,
      sites: [...prev.sites, newItem],
    }));
    showNotification("Added new website card");
  };

  const handleUpdateWebsite = (index: number, field: keyof WebsiteItem, value: string) => {
    updateContent((prev) => {
      const sites = [...prev.sites];
      sites[index] = { ...sites[index], [field]: value };
      return { ...prev, sites };
    });
  };

  const handleDeleteWebsite = (index: number) => {
    if (window.confirm("Are you sure you want to remove this website?")) {
      updateContent((prev) => ({
        ...prev,
        sites: prev.sites.filter((_, i) => i !== index),
      }));
      showNotification("Removed website");
    }
  };

  const handleMoveWebsite = (index: number, direction: "up" | "down") => {
    updateContent((prev) => {
      const sites = [...prev.sites];
      const targetIdx = direction === "up" ? index - 1 : index + 1;
      if (targetIdx < 0 || targetIdx >= sites.length) return prev;
      const temp = sites[index];
      sites[index] = sites[targetIdx];
      sites[targetIdx] = temp;
      return { ...prev, sites };
    });
  };

  // --- Handlers for Static Graphics ---
  const handleAddGraphic = () => {
    const newItem: GraphicItem = {
      id: `custom-${Date.now()}`,
      title: "New Graphic Campaign",
      type: "Social Carousel",
      format: "4:5",
      link: "https://www.instagram.com",
      embedUrl: "",
    };
    updateContent((prev) => ({
      ...prev,
      graphics: [...prev.graphics, newItem],
    }));
    showNotification("Added new static graphic card");
  };

  const handleUpdateGraphicUrl = (index: number, rawUrl: string) => {
    const parsed = parseInstagramUrl(rawUrl);
    updateContent((prev) => {
      const graphics = [...prev.graphics];
      graphics[index] = {
        ...graphics[index],
        id: parsed.id || graphics[index].id,
        link: rawUrl,
        embedUrl: parsed.embedUrl || (rawUrl.includes("instagram.com") ? `${rawUrl.split("?")[0]}embed/` : ""),
      };
      return { ...prev, graphics };
    });
  };

  const handleUpdateGraphicField = (index: number, field: keyof GraphicItem, value: string) => {
    updateContent((prev) => {
      const graphics = [...prev.graphics];
      graphics[index] = { ...graphics[index], [field]: value };
      return { ...prev, graphics };
    });
  };

  const handleDeleteGraphic = (index: number) => {
    if (window.confirm("Are you sure you want to remove this static graphic?")) {
      updateContent((prev) => ({
        ...prev,
        graphics: prev.graphics.filter((_, i) => i !== index),
      }));
      showNotification("Removed static graphic");
    }
  };

  const handleMoveGraphic = (index: number, direction: "up" | "down") => {
    updateContent((prev) => {
      const graphics = [...prev.graphics];
      const targetIdx = direction === "up" ? index - 1 : index + 1;
      if (targetIdx < 0 || targetIdx >= graphics.length) return prev;
      const temp = graphics[index];
      graphics[index] = graphics[targetIdx];
      graphics[targetIdx] = temp;
      return { ...prev, graphics };
    });
  };

  // --- Handlers for Video Reels ---
  const handleAddReel = () => {
    const newItem: ReelItem = {
      id: `reel-${Date.now()}`,
      title: "New Video Reel",
      link: "https://www.instagram.com/reel/",
      embedUrl: "",
    };
    updateContent((prev) => ({
      ...prev,
      reels: [...prev.reels, newItem],
    }));
    showNotification("Added new video reel card");
  };

  const handleUpdateReelUrl = (index: number, rawUrl: string) => {
    const parsed = parseInstagramUrl(rawUrl);
    updateContent((prev) => {
      const reels = [...prev.reels];
      reels[index] = {
        ...reels[index],
        id: parsed.id || reels[index].id,
        link: rawUrl,
        embedUrl: parsed.embedUrl || (rawUrl.includes("instagram.com") ? `${rawUrl.split("?")[0]}embed/` : ""),
      };
      return { ...prev, reels };
    });
  };

  const handleUpdateReelTitle = (index: number, title: string) => {
    updateContent((prev) => {
      const reels = [...prev.reels];
      reels[index] = { ...reels[index], title };
      return { ...prev, reels };
    });
  };

  const handleDeleteReel = (index: number) => {
    if (window.confirm("Are you sure you want to remove this video reel?")) {
      updateContent((prev) => ({
        ...prev,
        reels: prev.reels.filter((_, i) => i !== index),
      }));
      showNotification("Removed video reel");
    }
  };

  const handleMoveReel = (index: number, direction: "up" | "down") => {
    updateContent((prev) => {
      const reels = [...prev.reels];
      const targetIdx = direction === "up" ? index - 1 : index + 1;
      if (targetIdx < 0 || targetIdx >= reels.length) return prev;
      const temp = reels[index];
      reels[index] = reels[targetIdx];
      reels[targetIdx] = temp;
      return { ...prev, reels };
    });
  };

  // --- Handlers for Industries ---
  const [newIndustryText, setNewIndustryText] = useState("");

  const handleAddIndustry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIndustryText.trim()) return;
    updateContent((prev) => ({
      ...prev,
      industries: [...prev.industries, newIndustryText.trim()],
    }));
    setNewIndustryText("");
    showNotification("Added industry tag");
  };

  const handleDeleteIndustry = (index: number) => {
    updateContent((prev) => ({
      ...prev,
      industries: prev.industries.filter((_, i) => i !== index),
    }));
    showNotification("Removed industry tag");
  };

  const handleMoveIndustry = (index: number, direction: "up" | "down") => {
    updateContent((prev) => {
      const industries = [...prev.industries];
      const targetIdx = direction === "up" ? index - 1 : index + 1;
      if (targetIdx < 0 || targetIdx >= industries.length) return prev;
      const temp = industries[index];
      industries[index] = industries[targetIdx];
      industries[targetIdx] = temp;
      return { ...prev, industries };
    });
  };

  // --- Handlers for JSON Export / Import ---
  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kredence-content-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification("Content exported to JSON file");
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string) as SiteContent;
        if (parsed.sites && parsed.graphics && parsed.reels && parsed.industries) {
          updateContent(() => parsed);
          showNotification("Imported content successfully!");
        } else {
          alert("Invalid backup file structure.");
        }
      } catch {
        alert("Could not parse JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm("Reset all content back to studio factory defaults? Any custom edits will be reverted.")) {
      resetToDefaults();
      showNotification("Reset back to default content");
    }
  };

  return (
    <div className="bg-charcoal text-paper min-h-screen selection:bg-teal selection:text-charcoal">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded border-2 border-teal bg-charcoal px-4 py-3 font-mono text-xs text-teal shadow-2xl animate-in fade-in slide-in-from-bottom-2">
          <Check className="size-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header Bar */}
      <header className="sticky top-0 z-40 border-b border-teal/20 bg-charcoal/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="group flex items-center gap-2 font-mono text-xs text-paper/70 transition-colors hover:text-teal"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Site</span>
            </Link>
            <span className="text-paper/20">|</span>
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center bg-teal font-display text-lg font-bold text-charcoal">
                K
              </span>
              <h1 className="font-display text-xl tracking-tight uppercase sm:text-2xl">
                Studio Content Manager
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 font-mono text-[10px] text-teal/80 sm:flex">
              <span className="size-2 animate-ping rounded-full bg-teal" />
              Auto-saved to browser
            </span>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 border border-teal/50 bg-teal/10 px-3.5 py-1.5 font-mono text-xs text-teal transition-all hover:bg-teal hover:text-charcoal"
            >
              <span>View Live Site</span>
              <ExternalLink className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 font-mono text-xs">
          {[
            { id: "websites", label: "03 Websites", count: content.sites.length, icon: Globe },
            { id: "graphics", label: "04 Static Graphics", count: content.graphics.length, icon: ImageIcon },
            { id: "reels", label: "05 Video Reels", count: content.reels.length, icon: Video },
            { id: "industries", label: "08 Industries", count: content.industries.length, icon: Tag },
            { id: "contact", label: "Studio Info", count: null, icon: Info },
            { id: "data", label: "Backup & Reset", count: null, icon: RefreshCw },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 border-b-2 px-4 py-3 uppercase tracking-wider transition-colors whitespace-nowrap",
                  isActive
                    ? "border-teal text-teal font-bold bg-teal/5"
                    : "border-transparent text-paper/60 hover:text-paper hover:border-paper/30",
                )}
              >
                <Icon className="size-3.5" />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.2 text-[10px]",
                      isActive ? "bg-teal text-charcoal" : "bg-paper/10 text-paper/60",
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* ============================================================= */}
        {/* TAB 1: WEBSITES */}
        {/* ============================================================= */}
        {activeTab === "websites" && (
          <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 border-b border-paper/10 pb-6 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-3xl tracking-tight uppercase">
                  Websites We've Built (Section 03)
                </h2>
                <p className="mt-1 font-mono text-xs text-paper/60">
                  Manage the interactive website browser preview cards displayed under "Sites with a pulse".
                </p>
              </div>
              <button
                onClick={handleAddWebsite}
                className="inline-flex items-center gap-2 bg-teal px-4 py-2.5 font-mono text-xs font-bold text-charcoal uppercase tracking-wider transition-transform hover:scale-105"
              >
                <Plus className="size-4" /> Add Website
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.sites.map((site, index) => (
                <div
                  key={site.id}
                  className="group relative flex flex-col border-2 border-teal/40 bg-card p-5 shadow-paper transition-all hover:border-teal"
                >
                  <div className="mb-4 flex items-center justify-between border-b border-paper/10 pb-3">
                    <span className="font-mono text-xs font-bold text-teal">
                      Card 0{index + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveWebsite(index, "up")}
                        disabled={index === 0}
                        title="Move Up"
                        className="rounded p-1 text-paper/50 hover:bg-paper/10 hover:text-paper disabled:opacity-20"
                      >
                        <MoveUp className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveWebsite(index, "down")}
                        disabled={index === content.sites.length - 1}
                        title="Move Down"
                        className="rounded p-1 text-paper/50 hover:bg-paper/10 hover:text-paper disabled:opacity-20"
                      >
                        <MoveDown className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteWebsite(index)}
                        title="Delete Website"
                        className="rounded p-1 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[10px] text-paper/50 uppercase tracking-widest">
                        Project Name
                      </label>
                      <input
                        type="text"
                        value={site.name}
                        onChange={(e) => handleUpdateWebsite(index, "name", e.target.value)}
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-display text-lg text-paper focus:border-teal focus:outline-none"
                        placeholder="e.g. Modinea"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-paper/50 uppercase tracking-widest">
                        Domain / URL
                      </label>
                      <input
                        type="text"
                        value={site.url}
                        onChange={(e) => handleUpdateWebsite(index, "url", e.target.value)}
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                        placeholder="e.g. modinea.in"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-paper/50 uppercase tracking-widest">
                        Category Tag
                      </label>
                      <input
                        type="text"
                        value={site.tag}
                        onChange={(e) => handleUpdateWebsite(index, "tag", e.target.value)}
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                        placeholder="e.g. E-Commerce"
                      />
                    </div>
                  </div>

                  {/* Browser Mockup Preview */}
                  <div className="mt-5 rounded border border-paper/10 bg-paper-dim p-2.5">
                    <div className="flex items-center gap-1.5 border-b border-charcoal/10 pb-1.5 font-mono text-[10px] text-charcoal/60">
                      <span className="size-2 rounded-full bg-teal" />
                      <span className="size-2 rounded-full bg-charcoal/20" />
                      <span className="size-2 rounded-full bg-charcoal/20" />
                      <span className="ml-1 truncate font-semibold">{site.url || "url.com"}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between font-mono text-xs">
                      <span className="font-display text-charcoal">{site.name || "Untitled"}</span>
                      <span className="text-[9px] uppercase text-charcoal/60">{site.tag}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 2: STATIC GRAPHICS */}
        {/* ============================================================= */}
        {activeTab === "graphics" && (
          <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 border-b border-paper/10 pb-6 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-3xl tracking-tight uppercase">
                  Static Graphics & Carousels (Section 04)
                </h2>
                <p className="mt-1 font-mono text-xs text-paper/60">
                  Paste any Instagram post/carousel link. The system automatically derives the embed iframe and direct link.
                </p>
              </div>
              <button
                onClick={handleAddGraphic}
                className="inline-flex items-center gap-2 bg-teal px-4 py-2.5 font-mono text-xs font-bold text-charcoal uppercase tracking-wider transition-transform hover:scale-105"
              >
                <Plus className="size-4" /> Add Graphic Card
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.graphics.map((graphic, index) => (
                <div
                  key={graphic.id + index}
                  className="group relative flex flex-col border-2 border-teal/40 bg-card p-5 shadow-paper transition-all hover:border-teal"
                >
                  <div className="mb-4 flex items-center justify-between border-b border-paper/10 pb-3">
                    <span className="font-mono text-xs font-bold text-teal">
                      Graphic 0{index + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveGraphic(index, "up")}
                        disabled={index === 0}
                        title="Move Up"
                        className="rounded p-1 text-paper/50 hover:bg-paper/10 hover:text-paper disabled:opacity-20"
                      >
                        <MoveUp className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveGraphic(index, "down")}
                        disabled={index === content.graphics.length - 1}
                        title="Move Down"
                        className="rounded p-1 text-paper/50 hover:bg-paper/10 hover:text-paper disabled:opacity-20"
                      >
                        <MoveDown className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteGraphic(index)}
                        title="Delete Graphic"
                        className="rounded p-1 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[10px] text-paper/50 uppercase tracking-widest">
                        Instagram Post Link (Paste URL here)
                      </label>
                      <input
                        type="url"
                        value={graphic.link}
                        onChange={(e) => handleUpdateGraphicUrl(index, e.target.value)}
                        className="mt-1 w-full border border-teal/40 bg-charcoal px-3 py-2 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                        placeholder="https://www.instagram.com/p/..."
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-paper/50 uppercase tracking-widest">
                        Piece Title
                      </label>
                      <input
                        type="text"
                        value={graphic.title}
                        onChange={(e) => handleUpdateGraphicField(index, "title", e.target.value)}
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-display text-lg text-paper focus:border-teal focus:outline-none"
                        placeholder="e.g. Astrology Carousel"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] text-paper/50 uppercase tracking-widest">
                          Type
                        </label>
                        <input
                          type="text"
                          value={graphic.type}
                          onChange={(e) => handleUpdateGraphicField(index, "type", e.target.value)}
                          className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-1.5 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                          placeholder="e.g. Social Carousel"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-paper/50 uppercase tracking-widest">
                          Format
                        </label>
                        <input
                          type="text"
                          value={graphic.format}
                          onChange={(e) => handleUpdateGraphicField(index, "format", e.target.value)}
                          className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-1.5 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                          placeholder="4:5 or 1:1"
                        />
                      </div>
                    </div>

                    {/* Live Instagram Preview */}
                    <div className="mt-4">
                      <label className="mb-1 block font-mono text-[10px] text-paper/50 uppercase tracking-widest">
                        Live Embed Preview
                      </label>
                      <div className="relative h-64 w-full overflow-hidden border border-teal/20 bg-white">
                        {graphic.embedUrl ? (
                          <iframe
                            src={graphic.embedUrl}
                            className="h-full w-full border-0"
                            title={graphic.title}
                            loading="lazy"
                            allow="encrypted-media"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center p-4 text-center font-mono text-xs text-charcoal/50">
                            Paste an Instagram link above to load preview
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 3: VIDEO REELS */}
        {/* ============================================================= */}
        {activeTab === "reels" && (
          <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 border-b border-paper/10 pb-6 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-3xl tracking-tight uppercase">
                  Video Reels & Cuts (Section 05)
                </h2>
                <p className="mt-1 font-mono text-xs text-paper/60">
                  Paste any Instagram Reel link. Playable players with custom hover reveal are automatically generated.
                </p>
              </div>
              <button
                onClick={handleAddReel}
                className="inline-flex items-center gap-2 bg-teal px-4 py-2.5 font-mono text-xs font-bold text-charcoal uppercase tracking-wider transition-transform hover:scale-105"
              >
                <Plus className="size-4" /> Add Video Reel
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {content.reels.map((reel, index) => (
                <div
                  key={reel.id + index}
                  className="group relative flex flex-col border-2 border-teal/40 bg-card p-5 shadow-paper transition-all hover:border-teal"
                >
                  <div className="mb-4 flex items-center justify-between border-b border-paper/10 pb-3">
                    <span className="font-mono text-xs font-bold text-teal">
                      Reel 0{index + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveReel(index, "up")}
                        disabled={index === 0}
                        title="Move Left/Up"
                        className="rounded p-1 text-paper/50 hover:bg-paper/10 hover:text-paper disabled:opacity-20"
                      >
                        <MoveUp className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveReel(index, "down")}
                        disabled={index === content.reels.length - 1}
                        title="Move Right/Down"
                        className="rounded p-1 text-paper/50 hover:bg-paper/10 hover:text-paper disabled:opacity-20"
                      >
                        <MoveDown className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteReel(index)}
                        title="Delete Reel"
                        className="rounded p-1 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[10px] text-paper/50 uppercase tracking-widest">
                        Instagram Reel Link
                      </label>
                      <input
                        type="url"
                        value={reel.link}
                        onChange={(e) => handleUpdateReelUrl(index, e.target.value)}
                        className="mt-1 w-full border border-teal/40 bg-charcoal px-3 py-2 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                        placeholder="https://www.instagram.com/reel/..."
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-paper/50 uppercase tracking-widest">
                        Reel Title / Description
                      </label>
                      <input
                        type="text"
                        value={reel.title}
                        onChange={(e) => handleUpdateReelTitle(index, e.target.value)}
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                        placeholder="e.g. Brand Reel · Visual Story"
                      />
                    </div>

                    {/* Reel Preview */}
                    <div className="mt-4">
                      <label className="mb-1 block font-mono text-[10px] text-paper/50 uppercase tracking-widest">
                        Player Preview
                      </label>
                      <div className="relative h-72 w-full overflow-hidden border border-teal/20 bg-white">
                        {reel.embedUrl ? (
                          <iframe
                            src={reel.embedUrl}
                            className="h-full w-full border-0"
                            title={reel.title}
                            loading="lazy"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center p-4 text-center font-mono text-xs text-charcoal/50">
                            Paste an Instagram reel link to preview
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 4: INDUSTRIES */}
        {/* ============================================================= */}
        {activeTab === "industries" && (
          <div className="space-y-8">
            <div className="border-b border-paper/10 pb-6">
              <h2 className="font-display text-3xl tracking-tight uppercase">
                Industries Where We've Worked (Section 08)
              </h2>
              <p className="mt-1 font-mono text-xs text-paper/60">
                Add, remove, or rearrange tags. The site automatically centers them and ensures the bottom row has more items than the top row.
              </p>
            </div>

            {/* Add New Tag */}
            <form onSubmit={handleAddIndustry} className="flex max-w-lg items-center gap-3">
              <input
                type="text"
                value={newIndustryText}
                onChange={(e) => setNewIndustryText(e.target.value)}
                placeholder="Enter industry name (e.g. Architecture)"
                className="flex-1 border border-paper/20 bg-card px-4 py-2.5 font-mono text-xs text-paper focus:border-teal focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-teal px-5 py-2.5 font-mono text-xs font-bold text-charcoal uppercase tracking-wider transition-transform hover:scale-105"
              >
                <Plus className="size-4" /> Add Tag
              </button>
            </form>

            {/* List of current tags */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs tracking-widest text-teal uppercase">
                Current Tags ({content.industries.length} total)
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {content.industries.map((ind, index) => (
                  <div
                    key={ind + index}
                    className="flex items-center justify-between border border-teal/40 bg-card px-4 py-3 font-mono text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-teal">{index + 1}.</span>
                      <span className="uppercase text-paper">{ind}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveIndustry(index, "up")}
                        disabled={index === 0}
                        className="p-1 text-paper/40 hover:text-paper disabled:opacity-20"
                      >
                        <MoveUp className="size-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveIndustry(index, "down")}
                        disabled={index === content.industries.length - 1}
                        className="p-1 text-paper/40 hover:text-paper disabled:opacity-20"
                      >
                        <MoveDown className="size-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteIndustry(index)}
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Live Preview of rows */}
            <div className="rounded border border-teal/30 bg-card p-6">
              <h4 className="mb-4 font-mono text-xs text-paper/60 uppercase tracking-widest">
                Live Cloud Preview (Top vs Bottom Row)
              </h4>
              <div className="flex flex-col items-center gap-4 py-4">
                {/* Top Row */}
                <div className="flex flex-wrap justify-center gap-3">
                  {content.industries.slice(0, Math.floor(content.industries.length / 2)).map((tag, i) => (
                    <span
                      key={tag}
                      className={cn(
                        "font-mono px-4 py-2 text-[10px] tracking-widest uppercase border",
                        i % 2 ? "bg-teal text-charcoal border-teal" : "text-paper border-teal/60",
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Bottom Row */}
                <div className="flex flex-wrap justify-center gap-3">
                  {content.industries.slice(Math.floor(content.industries.length / 2)).map((tag, idx) => {
                    const i = idx + Math.floor(content.industries.length / 2);
                    return (
                      <span
                        key={tag}
                        className={cn(
                          "font-mono px-4 py-2 text-[10px] tracking-widest uppercase border",
                          i % 2 ? "bg-teal text-charcoal border-teal" : "text-paper border-teal/60",
                        )}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 5: STUDIO INFO & CONTACT */}
        {/* ============================================================= */}
        {activeTab === "contact" && (
          <div className="max-w-2xl space-y-6">
            <div className="border-b border-paper/10 pb-6">
              <h2 className="font-display text-3xl tracking-tight uppercase">
                Studio & Contact Information
              </h2>
              <p className="mt-1 font-mono text-xs text-paper/60">
                Update global contact emails, phone numbers, and footer information.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] text-paper/50 uppercase tracking-widest">
                  Primary Contact Email
                </label>
                <input
                  type="email"
                  value={content.contact.email}
                  onChange={(e) =>
                    updateContent((prev) => ({
                      ...prev,
                      contact: { ...prev.contact, email: e.target.value },
                    }))
                  }
                  className="mt-1 w-full border border-paper/20 bg-card px-4 py-2.5 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-paper/50 uppercase tracking-widest">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={content.contact.phone}
                  onChange={(e) =>
                    updateContent((prev) => ({
                      ...prev,
                      contact: { ...prev.contact, phone: e.target.value },
                    }))
                  }
                  className="mt-1 w-full border border-paper/20 bg-card px-4 py-2.5 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-paper/50 uppercase tracking-widest">
                  Studio Tagline / Description
                </label>
                <textarea
                  rows={3}
                  value={content.contact.tagline}
                  onChange={(e) =>
                    updateContent((prev) => ({
                      ...prev,
                      contact: { ...prev.contact, tagline: e.target.value },
                    }))
                  }
                  className="mt-1 w-full border border-paper/20 bg-card px-4 py-2.5 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 6: BACKUP, EXPORT & RESET */}
        {/* ============================================================= */}
        {activeTab === "data" && (
          <div className="max-w-2xl space-y-8">
            <div className="border-b border-paper/10 pb-6">
              <h2 className="font-display text-3xl tracking-tight uppercase">
                Data Backup & Reset
              </h2>
              <p className="mt-1 font-mono text-xs text-paper/60">
                Export your configured content as a JSON file or restore from a previous backup.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col justify-between border-2 border-teal/40 bg-card p-6 shadow-paper">
                <div>
                  <h3 className="font-display text-xl uppercase">Export JSON</h3>
                  <p className="mt-2 font-mono text-xs text-paper/60">
                    Download a full backup of all current websites, static graphics, video reels, and industries.
                  </p>
                </div>
                <button
                  onClick={handleExportJson}
                  className="mt-6 inline-flex items-center justify-center gap-2 bg-teal px-4 py-2.5 font-mono text-xs font-bold text-charcoal uppercase tracking-wider transition-transform hover:scale-105"
                >
                  <Download className="size-4" /> Download Backup (.json)
                </button>
              </div>

              <div className="flex flex-col justify-between border-2 border-teal/40 bg-card p-6 shadow-paper">
                <div>
                  <h3 className="font-display text-xl uppercase">Import JSON</h3>
                  <p className="mt-2 font-mono text-xs text-paper/60">
                    Upload a previously exported JSON backup file to restore all content instantly.
                  </p>
                </div>
                <label className="mt-6 inline-flex cursor-pointer items-center justify-center gap-2 border border-teal bg-teal/10 px-4 py-2.5 font-mono text-xs font-bold text-teal uppercase tracking-wider transition-colors hover:bg-teal hover:text-charcoal">
                  <Upload className="size-4" /> Upload JSON File
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJson}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="rounded border border-red-500/30 bg-red-950/10 p-6">
              <h3 className="font-display text-xl text-red-400 uppercase">Factory Reset</h3>
              <p className="mt-1 font-mono text-xs text-paper/60">
                Revert all links, carousels, video reels, and industry tags back to the original studio configuration.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 inline-flex items-center gap-2 border border-red-500/50 bg-red-500/10 px-4 py-2 font-mono text-xs text-red-400 uppercase tracking-wider transition-colors hover:bg-red-500 hover:text-white"
              >
                <RefreshCw className="size-3.5" /> Reset Everything to Defaults
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
