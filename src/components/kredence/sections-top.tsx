import { useState } from "react";
import { ArrowUpRight, Sparkles, Play, PenTool, Megaphone, MonitorSmartphone, Clapperboard, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Reveal,
  SectionHeader,
  useCursorParallax,
  DoodleArrow,
  DoodleStar,
  DoodleSquiggle,
  DoodleSpiral,
  PlaceholderBlock,
} from "./bits";

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <header className="bg-paper/85 border-charcoal/15 sticky top-0 z-50 border-b backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <a href="#top" className="group flex items-center gap-2">
          <span className="bg-teal text-charcoal font-display grid size-9 place-items-center text-xl transition-transform duration-300 group-hover:rotate-12">
            K
          </span>
          <span className="font-display text-charcoal text-2xl tracking-tight">KREDENCE</span>
        </a>
        <ul className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="nav-link font-mono text-charcoal text-xs tracking-[0.2em] uppercase">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="bg-teal font-mono text-charcoal group inline-flex items-center gap-2 border-2 border-transparent px-4 py-2 text-xs tracking-[0.18em] uppercase transition-all duration-300 hover:border-charcoal hover:shadow-sticker"
        >
          Let&apos;s Talk
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
        </a>
      </nav>
    </header>
  );
}

export function Hero() {
  const p = useCursorParallax(26);
  return (
    <section id="top" className="paper-grain relative overflow-hidden px-6 pt-24 pb-32">
      <div
        className="bg-teal/25 pointer-events-none absolute -top-40 -right-32 size-[34rem] rounded-full blur-3xl"
        style={{ transform: `translate3d(${-p.x}px, ${-p.y}px, 0)` }}
      />
      <div className="relative mx-auto max-w-6xl text-center">
        <Reveal rotate={0} className="mb-8 inline-flex">
          <span className="sticker font-mono text-charcoal inline-block -rotate-2 px-3 py-1 text-[11px] tracking-[0.24em] uppercase">
            Multidisciplinary Creative Studio · Est. Mumbai
          </span>
        </Reveal>

        <Reveal delay={60} rotate={0}>
          <h1 className="font-display text-charcoal text-[2.75rem] leading-[0.88] sm:text-7xl lg:text-[7rem]">
            MARKETING
            <br />
            WITHOUT{" "}
            <span className="bg-teal text-charcoal px-4 py-1 -rotate-2 inline-block shadow-sticker font-display tracking-tight">
              HUMOR
            </span>
            <br />
            <span className="mt-6 block font-body text-xl font-medium tracking-tight text-charcoal/90 sm:text-3xl lg:text-4xl">
              is like <span className="marker-underline text-charcoal">rajma without chawal</span>{" "}
              <span className="font-mono text-teal font-bold">(ugh)</span>
            </span>
          </h1>
        </Reveal>

        <Reveal delay={140} className="mx-auto mt-8 max-w-xl">
          <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
            Kredence is a creative studio stitching together strategy, branding, content, video,
            digital and marketing — one messy, deliberate collage at a time.
          </p>
        </Reveal>

        <Reveal delay={200} rotate={0} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#work"
            className="bg-charcoal text-paper font-mono group inline-flex items-center gap-3 px-6 py-4 text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:bg-teal hover:text-charcoal"
          >
            See The Work
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
          </a>
          <a
            href="#services"
            className="sticker font-mono text-charcoal inline-flex items-center gap-2 px-6 py-4 text-xs tracking-[0.2em] uppercase"
          >
            <Sparkles className="text-teal size-4" /> What We Do
          </a>
        </Reveal>

        {/* floating collage elements */}
        <div className="pointer-events-none absolute -inset-x-12 inset-y-0 hidden lg:block" aria-hidden>
          <div
            className="floaty absolute -top-4 -left-12 lg:-left-20 w-36 lg:w-40 rotate-[-8deg] z-0"
            style={{ ["--r" as string]: "-8deg", transform: `translate3d(${p.x}px, ${p.y}px, 0)` }}
          >
            <div className="tape bg-card border-charcoal/20 border p-2 shadow-paper">
              <PlaceholderBlock label="Photo" />
              <p className="font-mono text-charcoal/60 mt-2 text-[10px] tracking-widest uppercase">
                shoot_01.jpg
              </p>
            </div>
          </div>
          <div
            className="floaty absolute -bottom-4 -right-10 lg:-right-16 w-36 lg:w-40 rotate-[7deg] z-0"
            style={{ ["--r" as string]: "7deg", transform: `translate3d(${-p.x}px, ${-p.y}px, 0)` }}
          >
            <div className="bg-card border-charcoal/20 border p-2 shadow-paper">
              <PlaceholderBlock label="Reel" />
              <p className="font-mono text-charcoal/60 mt-2 text-[10px] tracking-widest uppercase">
                edit_v3.mp4
              </p>
            </div>
          </div>
          <DoodleStar className="text-teal absolute top-20 right-16 size-12 rotate-12" />
          <DoodleSpiral className="text-charcoal/40 absolute bottom-16 -left-8 size-14" />
          <DoodleArrow className="text-charcoal/50 absolute top-1/3 -left-14 size-20 -rotate-12" />
          <DoodleSquiggle className="text-teal absolute right-1/4 bottom-2 w-28" />
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="bg-paper-dim border-charcoal/15 border-y px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="01"
          label="Who we are"
          title="A studio, not a factory"
          ghost="A STUDIO"
          note="Small team, wide range. Everything is made in-house, which is why the strategy and the last frame of the edit still sound like the same brand."
        />

        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" rotate={-2}>
            <div className="tape bg-card border-charcoal/20 relative border p-3 shadow-paper transition-transform duration-500 hover:rotate-1">
              <PlaceholderBlock label="Studio Photo" tall />
              <p className="font-mono text-charcoal/60 mt-3 text-[10px] tracking-[0.2em] uppercase">
                the_desk.jpg
              </p>
              <span className="bg-teal font-mono text-charcoal absolute -right-5 -bottom-6 rotate-[-6deg] px-3 py-2 text-[10px] tracking-widest uppercase shadow-sticker">
                2026
              </span>
            </div>
          </Reveal>

          <div className="space-y-8 lg:col-span-7">
            <Reveal rotate={1}>
              <p className="font-display text-charcoal text-4xl leading-[0.95] md:text-5xl">
                We treat brand, content and media as{" "}
                <span className="marker-underline">one continuous</span> conversation.
              </p>
            </Reveal>
            <Reveal delay={90} rotate={-1}>
              <p className="text-muted-foreground max-w-2xl leading-relaxed">
                You bring the idea, product, or growth challenge. Kredence connects high-level business
                strategy, in-house podcast and video production, custom digital development, and search
                marketing into one deliberate, continuous workflow.
              </p>
            </Reveal>
            <div className="flex flex-wrap gap-4">
              {[
                { k: "150+", v: "crazy ideas" },
                { k: "60+", v: "revolutions" },
                { k: "3", v: "people doing just what they feel like" },
              ].map((s, i) => (
                <Reveal key={s.k} delay={120 + i * 80} rotate={i % 2 ? 2 : -2}>
                  <div className="sticker px-5 py-4">
                    <p className="font-display text-charcoal text-3xl">{s.k}</p>
                    <p className="font-mono text-charcoal/60 text-[10px] tracking-[0.2em] uppercase">
                      {s.v}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200} rotate={0}>
              <div className="relative inline-block">
                <p className="font-mono text-teal text-sm -rotate-2">
                  ↳ handwritten note: &ldquo;make it weird, keep it useful&rdquo;
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    id: "branding",
    icon: PenTool,
    title: "Branding & Logo",
    blurb: "Identity systems built to survive contact with the real world.",
    items: ["Positioning & naming", "Logo & identity", "Brand guidelines", "Packaging"],
    pos: "lg:col-span-5 lg:row-span-2",
    rot: "-2deg",
  },
  {
    id: "content",
    icon: Clapperboard,
    title: "Content & Video",
    blurb: "Shoot, edit, grade, deliver — long form to nine-second hooks.",
    items: ["Video editing", "Motion graphics", "Photography", "Reels & shorts"],
    pos: "lg:col-span-4",
    rot: "1.5deg",
  },
  {
    id: "social",
    icon: Share2,
    title: "Social Media",
    blurb: "Always-on calendars that actually sound like the brand.",
    items: ["Content calendars", "Community", "Creator collabs", "Reporting"],
    pos: "lg:col-span-3",
    rot: "-1deg",
  },
  {
    id: "digital",
    icon: MonitorSmartphone,
    title: "Digital & Web",
    blurb: "Sites and interfaces that load fast and feel handmade.",
    items: ["Web design", "Development", "UI systems", "E-commerce"],
    pos: "lg:col-span-3",
    rot: "2deg",
  },
  {
    id: "marketing",
    icon: Megaphone,
    title: "Marketing & Campaigns",
    blurb: "Ideas with a media plan attached.",
    items: ["Campaign strategy", "Performance media", "Launches", "Influencer"],
    pos: "lg:col-span-4",
    rot: "-1.5deg",
  },
];

export function Services() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section id="services" className="relative px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="02"
          label="Services"
          title="Six rooms, one studio"
          ghost="SIX ROOMS"
          note="Hover any node to straighten it out and see what's inside."
        />
        <div className="grid gap-6 lg:grid-cols-12">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const isOn = active === s.id;
            return (
              <Reveal key={s.id} delay={i * 70} className={cn(s.pos)} rotate={0}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(s.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(s.id)}
                  onBlur={() => setActive(null)}
                  className="bg-card border-charcoal/20 group h-full w-full border p-6 text-left shadow-paper transition-all duration-400 hover:-translate-y-2 hover:shadow-lift"
                  style={{ rotate: isOn ? "0deg" : s.rot }}
                >
                  <span className="bg-teal/25 text-charcoal group-hover:bg-teal mb-5 inline-grid size-12 place-items-center transition-colors duration-300">
                    <Icon className="size-6 transition-transform duration-500 group-hover:rotate-12" />
                  </span>
                  <p className="font-mono text-charcoal/55 text-[10px] tracking-[0.24em] uppercase">
                    0{i + 1} / service
                  </p>
                  <h3 className="font-display text-charcoal mt-1 text-3xl">{s.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{s.blurb}</p>
                  <ul
                    className={cn(
                      "grid overflow-hidden transition-all duration-500",
                      isOn ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <li className="min-h-0 overflow-hidden">
                      <ul className="space-y-1.5">
                        {s.items.map((it) => (
                          <li key={it} className="font-mono text-charcoal/70 flex items-center gap-2 text-[11px] tracking-wider uppercase">
                            <span className="bg-teal size-1.5" /> {it}
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </button>
              </Reveal>
            );
          })}
          <Reveal delay={400} className="lg:col-span-3" rotate={3}>
            <div className="bg-teal text-charcoal flex h-full flex-col justify-between p-6 shadow-paper">
              <Play className="size-8" />
              <p className="font-display mt-8 text-3xl leading-none">
                Need all of it at once? That&apos;s the usual ask.
              </p>
              <a href="#contact" className="font-mono mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase underline underline-offset-4">
                Start a project <ArrowUpRight className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
