import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/lib/content-store";
import { Reveal, SectionHeader, PlaceholderBlock, DoodleStar, DoodleArrow } from "./bits";

export function Websites() {
  const { content } = useSiteContent();
  const sites = content.sites;

  return (
    <section id="work" className="bg-charcoal px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="03"
          label="Websites we've built"
          title="Sites with a pulse"
          ghost="SITES"
          invert
          note="Hover a frame to wake the site up."
        />
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {sites.map((s, i) => (
            <Reveal key={s.id || s.name} delay={i * 60} rotate={i % 2 ? 1.5 : -1.5}>
              <a
                href={s.url.startsWith("http") ? s.url : `https://${s.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-paper border-teal/60 relative border-2 p-3 transition-all duration-500 hover:-translate-y-2 hover:rotate-0 hover:shadow-lift block cursor-pointer"
              >
                <div className="border-charcoal/15 mb-2 flex items-center gap-2 border-b pb-2">
                  <span className="bg-teal size-2.5 rounded-full" />
                  <span className="bg-charcoal/25 size-2.5 rounded-full" />
                  <span className="bg-charcoal/25 size-2.5 rounded-full" />
                  <span className="bg-paper-dim font-mono text-charcoal/60 ml-2 flex-1 truncate px-2 py-1 text-[10px] tracking-wider">
                    {s.url}
                  </span>
                </div>
                <div className="relative overflow-hidden">
                  <PlaceholderBlock label="Website Screenshot" tall />
                  <div className="bg-teal/90 absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-500 group-hover:translate-y-0">
                    <span className="font-mono text-charcoal inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase">
                      Visit Website <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <h3 className="font-display text-charcoal text-2xl">{s.name}</h3>
                  <span className="font-mono text-charcoal/60 text-[10px] tracking-[0.2em] uppercase">
                    {s.tag}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Graphics() {
  const { content } = useSiteContent();
  const graphics = content.graphics;

  return (
    <section id="graphics" className="paper-grain border-charcoal/15 overflow-hidden border-y px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="04"
          label="Static graphics"
          title="Made to hold a gaze"
          ghost="GRAPHICS"
          note="Campaigns, posters, social systems and printed pieces — pinned to one working wall."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {graphics.map((graphic, i) => (
            <Reveal
              key={graphic.id || graphic.title}
              delay={i * 60}
              rotate={i % 3 === 0 ? -1 : i % 3 === 1 ? 1 : -0.5}
            >
              <article className="group bg-card border-charcoal/20 relative flex flex-col border p-3 shadow-paper transition-all duration-500 hover:-translate-y-2 hover:rotate-0 hover:border-teal hover:shadow-lift">
                <div className="border-charcoal/15 mb-2 flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-teal size-2 rounded-full" />
                    <span className="font-mono text-charcoal/60 text-[10px] tracking-wider uppercase">
                      0{i + 1} / {graphic.type}
                    </span>
                  </div>
                  <span className="font-mono text-charcoal/50 text-[10px] tracking-wider">
                    {graphic.format}
                  </span>
                </div>

                <div className="bg-paper-dim relative h-[480px] w-full overflow-hidden border border-charcoal/15">
                  <iframe
                    src={graphic.embedUrl || (graphic.link.includes("instagram.com") ? `${graphic.link.split("?")[0]}embed/` : "")}
                    className="h-full w-full border-0 bg-white"
                    title={graphic.title}
                    loading="lazy"
                    allow="encrypted-media"
                    scrolling="no"
                  />
                  <a
                    href={graphic.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-charcoal/80 absolute inset-0 flex opacity-0 backdrop-blur-[2px] items-center justify-center transition-all duration-300 group-hover:opacity-100"
                  >
                    <span className="bg-teal text-charcoal font-mono inline-flex items-center gap-2 px-5 py-3 text-xs tracking-[0.2em] uppercase font-bold shadow-paper transition-transform duration-300 group-hover:scale-105">
                      Open on Instagram <ArrowUpRight className="size-4" />
                    </span>
                  </a>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <h3 className="font-display text-charcoal text-xl">{graphic.title}</h3>
                  <a
                    href={graphic.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal font-mono inline-flex items-center gap-1 text-[11px] uppercase tracking-wider hover:underline"
                  >
                    Instagram <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Videos() {
  const { content } = useSiteContent();
  const reels = content.reels;

  return (
    <section id="videos" className="paper-grain px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="05"
          label="Videos edited"
          title="Cuts that hold"
          ghost="CUTS"
          note="Scroll sideways to browse and play all reels."
        />
      </div>
      <div className="scrollbar-none -mx-6 flex snap-x gap-6 overflow-x-auto px-6 pb-6 pt-2">
        {reels.map((reel, i) => (
          <Reveal key={reel.id || reel.link} delay={i * 50} rotate={i % 2 ? 1 : -1} className="shrink-0 snap-start">
            <article className="group bg-card border-charcoal/20 w-[21rem] sm:w-[23rem] flex flex-col border p-3 shadow-paper transition-all duration-400 hover:-translate-y-2 hover:border-teal hover:shadow-lift">
              <div className="border-charcoal/15 mb-2 flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="bg-teal size-2 rounded-full" />
                  <span className="font-mono text-charcoal/60 text-[10px] tracking-wider uppercase">
                    Reel 0{i + 1}
                  </span>
                </div>
                <a
                  href={reel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal font-mono inline-flex items-center gap-1 text-[10px] uppercase tracking-wider hover:underline"
                >
                  Instagram <ArrowUpRight className="size-3" />
                </a>
              </div>

              <div className="bg-paper-dim relative h-[500px] w-full overflow-hidden border border-charcoal/15">
                <iframe
                  src={reel.embedUrl || (reel.link.includes("instagram.com") ? `${reel.link.split("?")[0]}embed/` : "")}
                  className="h-[125%] w-[125%] origin-top-left scale-[0.8] border-0 bg-white"
                  title={reel.title}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  scrolling="no"
                />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <h3 className="font-mono text-charcoal text-[11px] tracking-[0.15em] uppercase truncate">
                  {reel.title}
                </h3>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const LOGOS = [
  { name: "Cinephile In Frame", image: "/images/logos/cinephile.png" },
  { name: "N1 True Media", image: "/images/logos/n1truemedia.png" },
  { name: "Neeleshwer Developers", image: "/images/logos/neeleshwer.png" },
  { name: "Modinea", image: "/images/logos/modinea.png" },
  { name: "Rituraj Gupta", image: "/images/logos/riturajgupta.png" },
];

export function Logos() {
  return (
    <section className="bg-paper border-charcoal/15 border-y px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="06"
          label="Logos & marks"
          title="Marks on paper"
          ghost="MARKS"
          note="Each one pinned up, slightly crooked. Hover to bring it into focus."
        />
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {LOGOS.map((l, i) => (
            <Reveal key={l.name} delay={i * 45} rotate={i % 2 ? 1.5 : -1.5}>
              <div
                className="group tape bg-card border-charcoal/20 grid aspect-square place-items-center border p-4 shadow-paper transition-all duration-400 hover:-translate-y-2 hover:rotate-0 hover:shadow-lift"
              >
                <div className="flex h-full w-full flex-col items-center justify-between py-2 text-center">
                  <div className="flex flex-1 items-center justify-center p-2">
                    {l.image ? (
                      <img
                        src={l.image}
                        alt={l.name}
                        className="max-h-24 max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="border-charcoal/30 group-hover:border-teal group-hover:bg-teal/15 mx-auto grid size-16 place-items-center border-2 transition-all duration-400">
                        <span className="font-display text-charcoal text-2xl">{l.name[0]}</span>
                      </div>
                    )}
                  </div>
                  <p className="font-mono text-charcoal/70 group-hover:text-charcoal mt-2 text-[10px] tracking-[0.2em] uppercase font-semibold transition-colors">
                    {l.name}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const BRANDS = [
  "Porsche",
  "The Bicester Collection",
  "Radhika Ramuka Jewellery",
  "Get FiBAR",
  "Modinea",
  "Second Brick",
  "Shubh Sagar Virar",
  "N1 True Media",
  "Rituraj Gupta",
  "Crylic Claws",
  "Arabic Scent House",
  "Cinephile In Frame",
  "Neeleshwer Developers",
  "Poonam Sharma",
  "The Blossom Story",
  "Pro-Dev",
  "World of Badge",
];
const OFFSETS = [
  "-4deg", "3deg", "-2deg", "4deg", "-3deg", "2deg",
  "-4deg", "3deg", "-2deg", "4deg", "-3deg", "2deg",
  "-3deg", "4deg", "-2deg", "3deg", "-4deg"
];

export function Brands() {
  return (
    <section className="relative px-6 py-28">
      <DoodleArrow className="text-charcoal/40 absolute left-10 top-24 hidden size-24 lg:block" />
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="07"
          label="Brands we've worked with"
          title="Good company"
          ghost="GOOD"
          note="Grey until you look at them properly."
        />
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {BRANDS.map((b, i) => (
            <Reveal key={b} delay={i * 55} rotate={0}>
              <div
                className="group border-teal/70 bg-card grid h-32 place-items-center border-2 grayscale transition-all duration-400 hover:grayscale-0 hover:scale-105 hover:shadow-lift"
                style={{ rotate: OFFSETS[i], marginTop: i % 3 === 1 ? "1.5rem" : undefined }}
              >
                <span className="font-display text-charcoal/50 group-hover:text-teal text-3xl transition-colors duration-300">
                  {b}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Industries() {
  const { content } = useSiteContent();
  const industries = content.industries;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const topRowCount = Math.floor(industries.length / 2);
  const topRow = industries.slice(0, topRowCount);
  const bottomRow = industries.slice(topRowCount);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setTilt({
        x: ((e.clientX - r.left) / r.width - 0.5) * 14,
        y: ((e.clientY - r.top) / r.height - 0.5) * 14,
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="bg-charcoal overflow-hidden px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="08"
          label="Industries"
          title="Where we've worked"
          ghost="WHERE"
          invert
          note="Move your cursor — the cloud leans with you."
        />
        <div ref={wrapRef} className="flex flex-col items-center gap-4 py-6">
          {/* Top Row */}
          <div className="flex flex-wrap justify-center gap-4">
            {topRow.map((tag, i) => (
              <Reveal key={tag} delay={i * 40} rotate={0}>
                <span
                  className={cn(
                    "wiggle-hover font-mono inline-block cursor-default px-5 py-3 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:scale-110",
                    i % 2
                      ? "bg-teal text-charcoal"
                      : "text-paper border-teal/70 border-2 hover:bg-teal hover:text-charcoal",
                  )}
                  style={{
                    transform: `translate3d(${tilt.x * ((i % 4) + 1) * 0.35}px, ${tilt.y * ((i % 3) + 1) * 0.35}px, 0) rotate(${i % 2 ? 1.5 : -1.5}deg)`,
                  }}
                >
                  {tag}
                </span>
              </Reveal>
            ))}
          </div>

          {/* Bottom Row (has more than top row) */}
          <div className="flex flex-wrap justify-center gap-4">
            {bottomRow.map((tag, idx) => {
              const i = idx + topRowCount;
              return (
                <Reveal key={tag} delay={i * 40} rotate={0}>
                  <span
                    className={cn(
                      "wiggle-hover font-mono inline-block cursor-default px-5 py-3 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:scale-110",
                      i % 2
                        ? "bg-teal text-charcoal"
                        : "text-paper border-teal/70 border-2 hover:bg-teal hover:text-charcoal",
                    )}
                    style={{
                      transform: `translate3d(${tilt.x * ((i % 4) + 1) * 0.35}px, ${tilt.y * ((i % 3) + 1) * 0.35}px, 0) rotate(${i % 2 ? 1.5 : -1.5}deg)`,
                    }}
                  >
                    {tag}
                  </span>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function IndustryMarquee() {
  const { content } = useSiteContent();
  const industries = content.industries;

  return (
    <div className="bg-charcoal border-teal/25 overflow-hidden border-y py-4">
      <div className="marquee-track flex w-max gap-10">
        {[...industries, ...industries].map((t, i) => (
          <span key={`${t}-${i}`} className="font-display text-paper/25 text-3xl sm:text-4xl whitespace-nowrap">
            {t} <span className="text-teal">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
