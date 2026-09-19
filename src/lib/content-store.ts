import { useEffect, useState } from "react";

export interface WebsiteItem {
  id: string;
  name: string;
  url: string;
  tag: string;
}

export interface GraphicItem {
  id: string;
  title: string;
  type: string;
  format: string;
  link: string;
  embedUrl: string;
}

export interface ReelItem {
  id: string;
  title: string;
  link: string;
  embedUrl: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  instagram: string;
  linkedin: string;
  tagline: string;
}

export interface SiteContent {
  sites: WebsiteItem[];
  graphics: GraphicItem[];
  reels: ReelItem[];
  industries: string[];
  contact: ContactInfo;
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  sites: [
    { id: "site-1", name: "Modinea", url: "modinea.in", tag: "E-Commerce" },
    { id: "site-2", name: "Pro-Dev", url: "pro-dev.in", tag: "Development" },
    { id: "site-3", name: "Second Brick", url: "secondbrick.in", tag: "Real Estate" },
    { id: "site-4", name: "Ni True Media", url: "nitruemedia.vercel.app", tag: "Media" },
    { id: "site-5", name: "Rituraj Gupta", url: "riturajgupta.vercel.app", tag: "Personal Brand" },
    { id: "site-6", name: "World of Badge", url: "worldofbadge.com", tag: "Branding" },
  ],
  graphics: [
    {
      id: "DRZS6L6jRtL",
      title: "Astrology Carousel",
      type: "Social Carousel",
      format: "4:5",
      link: "https://www.instagram.com/p/DRZS6L6jRtL/?stkn=bjNmY2R3eHNpNWpy",
      embedUrl: "https://www.instagram.com/p/DRZS6L6jRtL/embed/",
    },
    {
      id: "DbsFtamjHuT",
      title: "Jewellery Carousel",
      type: "Product Carousel",
      format: "4:5",
      link: "https://www.instagram.com/p/DbsFtamjHuT/?stkn=eHo1ZWd4ODRwdTJy",
      embedUrl: "https://www.instagram.com/p/DbsFtamjHuT/embed/",
    },
    {
      id: "Db2ZntBODIq",
      title: "Restaurant Post",
      type: "Social Feed Post",
      format: "1:1",
      link: "https://www.instagram.com/p/Db2ZntBODIq/?stkn=MXY5azRiZTd0d2llMA==",
      embedUrl: "https://www.instagram.com/p/Db2ZntBODIq/embed/",
    },
    {
      id: "DOtEW_Hkwev",
      title: "Artrooms Carousel",
      type: "Editorial Carousel",
      format: "4:5",
      link: "https://www.instagram.com/p/DOtEW_Hkwev/?stkn=MWE4ZGNjZDdqcWQ4bA==",
      embedUrl: "https://www.instagram.com/p/DOtEW_Hkwev/embed/",
    },
    {
      id: "DRl4A9BjNd8",
      title: "Educational Carousel",
      type: "Educational Series",
      format: "4:5",
      link: "https://www.instagram.com/p/DRl4A9BjNd8/?stkn=aHdqYnAzZHIxNHIx",
      embedUrl: "https://www.instagram.com/p/DRl4A9BjNd8/embed/",
    },
    {
      id: "DL9_WJpSb8J",
      title: "Educational Carousel 2",
      type: "Guide & Insights",
      format: "4:5",
      link: "https://www.instagram.com/p/DL9_WJpSb8J/?img_index=1&stkn=YTN6d3Y0dzY4bjgx",
      embedUrl: "https://www.instagram.com/p/DL9_WJpSb8J/embed/",
    },
  ],
  reels: [
    {
      id: "Dc5ZYpwO-JI",
      title: "Brand Reel · Visual Story",
      link: "https://www.instagram.com/reel/Dc5ZYpwO-JI/?stkn=MTF6c3N2OGlnMThwNA==",
      embedUrl: "https://www.instagram.com/reel/Dc5ZYpwO-JI/embed/",
    },
    {
      id: "Db2aVfAuRRs",
      title: "Culinary Cut · Commercial",
      link: "https://www.instagram.com/p/Db2aVfAuRRs/?stkn=aHc2Z3B2dHE0bXQ=",
      embedUrl: "https://www.instagram.com/p/Db2aVfAuRRs/embed/",
    },
    {
      id: "DcLkvqSOTnB",
      title: "Fashion & Lifestyle Reel",
      link: "https://www.instagram.com/p/DcLkvqSOTnB/?stkn=MW5reDF6OW1maDd2eA==",
      embedUrl: "https://www.instagram.com/p/DcLkvqSOTnB/embed/",
    },
    {
      id: "Db2ZntBODIq-reel",
      title: "Dining Experience Feature",
      link: "https://www.instagram.com/p/Db2ZntBODIq/?stkn=NzVrcGNyOXRwNHRs",
      embedUrl: "https://www.instagram.com/p/Db2ZntBODIq/embed/",
    },
    {
      id: "DbumLRsosPp",
      title: "Product Launch Sequence",
      link: "https://www.instagram.com/reel/DbumLRsosPp/?stkn=MXVjMDNvcjQxejE1dw==",
      embedUrl: "https://www.instagram.com/reel/DbumLRsosPp/embed/",
    },
    {
      id: "Dbi4Z4wIQDn",
      title: "Dynamic Visual Edit",
      link: "https://www.instagram.com/reel/Dbi4Z4wIQDn/?stkn=MTY5eXQ4cWU1b2Y2Mw==",
      embedUrl: "https://www.instagram.com/reel/Dbi4Z4wIQDn/embed/",
    },
    {
      id: "Dbdh8MhIlUL",
      title: "Motion Campaign Reel",
      link: "https://www.instagram.com/reel/Dbdh8MhIlUL/?stkn=aG9ubW05NmIzdHpw",
      embedUrl: "https://www.instagram.com/reel/Dbdh8MhIlUL/embed/",
    },
    {
      id: "DRZS6L6jRtL-reel",
      title: "Astrology & Insight Reel",
      link: "https://www.instagram.com/p/DRZS6L6jRtL/?stkn=bjNmY2R3eHNpNWpy",
      embedUrl: "https://www.instagram.com/p/DRZS6L6jRtL/embed/",
    },
  ],
  industries: [
    "Luxury & Retail",
    "Beauty",
    "Real Estate",
    "Film Equipment",
    "Personal Brands",
    "Spiritual & Wellbeing",
    "Astrology",
    "Media",
    "Fragrance & Lifestyle",
    "Fashion",
    "Education",
  ],
  contact: {
    email: "kredence.co@gmail.com",
    phone: "+91 8879513666",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    tagline: "A multidisciplinary creative studio — branding, digital, content, video and marketing under one roof.",
  },
};

const STORAGE_KEY = "kredence_studio_content_v1";

export function parseInstagramUrl(rawUrl: string): {
  id: string;
  isReel: boolean;
  canonicalUrl: string;
  embedUrl: string;
} {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return { id: "", isReel: false, canonicalUrl: "", embedUrl: "" };
  }

  // Check for /reel/ or /p/ or /tv/ pattern
  const reelMatch = trimmed.match(/\/reel\/([A-Za-z0-9_-]+)/);
  const postMatch = trimmed.match(/\/p\/([A-Za-z0-9_-]+)/);
  const tvMatch = trimmed.match(/\/tv\/([A-Za-z0-9_-]+)/);

  if (reelMatch && reelMatch[1]) {
    const id = reelMatch[1];
    return {
      id,
      isReel: true,
      canonicalUrl: `https://www.instagram.com/reel/${id}/`,
      embedUrl: `https://www.instagram.com/reel/${id}/embed/`,
    };
  }

  if (postMatch && postMatch[1]) {
    const id = postMatch[1];
    return {
      id,
      isReel: false,
      canonicalUrl: `https://www.instagram.com/p/${id}/`,
      embedUrl: `https://www.instagram.com/p/${id}/embed/`,
    };
  }

  if (tvMatch && tvMatch[1]) {
    const id = tvMatch[1];
    return {
      id,
      isReel: false,
      canonicalUrl: `https://www.instagram.com/tv/${id}/`,
      embedUrl: `https://www.instagram.com/p/${id}/embed/`,
    };
  }

  // Fallback: If just an ID was pasted
  const idOnly = trimmed.replace(/[^A-Za-z0-9_-]/g, "");
  return {
    id: idOnly,
    isReel: false,
    canonicalUrl: `https://www.instagram.com/p/${idOnly}/`,
    embedUrl: `https://www.instagram.com/p/${idOnly}/embed/`,
  };
}

export function getStoredSiteContent(): SiteContent {
  if (typeof window === "undefined") return DEFAULT_SITE_CONTENT;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_SITE_CONTENT;
    const parsed = JSON.parse(stored);
    return {
      sites: parsed.sites || DEFAULT_SITE_CONTENT.sites,
      graphics: parsed.graphics || DEFAULT_SITE_CONTENT.graphics,
      reels: parsed.reels || DEFAULT_SITE_CONTENT.reels,
      industries: parsed.industries || DEFAULT_SITE_CONTENT.industries,
      contact: { ...DEFAULT_SITE_CONTENT.contact, ...(parsed.contact || {}) },
    };
  } catch {
    return DEFAULT_SITE_CONTENT;
  }
}

export function saveSiteContent(content: SiteContent) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    window.dispatchEvent(new Event("kredence-content-update"));
  } catch (err) {
    console.error("Failed to save content to localStorage", err);
  }
}

export function resetSiteContentToDefaults(): SiteContent {
  saveSiteContent(DEFAULT_SITE_CONTENT);
  return DEFAULT_SITE_CONTENT;
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setContent(getStoredSiteContent());
    setIsLoaded(true);

    const onUpdate = () => {
      setContent(getStoredSiteContent());
    };

    window.addEventListener("kredence-content-update", onUpdate);
    window.addEventListener("storage", onUpdate);

    return () => {
      window.removeEventListener("kredence-content-update", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  const updateContent = (updater: (prev: SiteContent) => SiteContent) => {
    setContent((prev) => {
      const next = updater(prev);
      saveSiteContent(next);
      return next;
    });
  };

  return {
    content,
    isLoaded,
    updateContent,
    resetToDefaults: () => {
      const def = resetSiteContentToDefaults();
      setContent(def);
    },
  };
}
