import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Download, Github, Linkedin, Mail, MapPin,
  Compass, Code2, Brain, Cpu, Database, Palette, GitBranch, Sparkles,
  GraduationCap, Award, Send, Eye, Bot, Layers, Rocket,
} from "lucide-react";

/* ---------- Reveal wrapper ---------- */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Hero ---------- */
import { AiOrb } from "./ai-orb";

function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      style={{
        background: `radial-gradient(360px circle at ${pos.x}px ${pos.y}px, color-mix(in oklab, var(--primary) 14%, transparent), transparent 60%)`,
        transition: "background 120ms linear",
      }}
    />
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section id="home" ref={ref} className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      {/* particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full animate-pulse-glow"
            style={{
              top: `${(i * 53) % 100}%`,
              left: `${(i * 37) % 100}%`,
              background: i % 3 === 0 ? "var(--secondary)" : "var(--foreground)",
              opacity: 0.35,
              animationDelay: `${(i % 8) * 0.4}s`,
            }}
          />
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-6">
        <div className="order-2 lg:order-1">
          <Reveal>
            <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Open to software engineering & AI developer roles
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-4xl leading-[1.06] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-muted-foreground text-xl sm:text-2xl block mb-3 font-normal">Pamela Adom Osom Boafo</span>
              <span className="text-gradient">Building intelligent software solutions with code, creativity, and AI.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
              {["Software Engineer", "Full-Stack Developer", "AI Application Builder"].map((t) => (
                <span key={t} className="glass rounded-full px-3 py-1.5 text-muted-foreground">{t}</span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Software Engineering student specializing in full-stack development, mobile
              applications, backend systems, and AI-powered applications.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="group relative inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))", boxShadow: "var(--shadow-glow)" }}>
                View My Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all hover:scale-[1.02] hover:border-primary/40">
                <Download className="h-4 w-4" /> Download CV
              </a>
              <a href="#contact" className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all hover:scale-[1.02]">
                Contact
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-10 flex items-center gap-3">
              {[
                { icon: Github, href: "https://github.com/AdomPamela", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/pamela-osom-boafo-976752352/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:osomboafopamela@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={label}
                  className="glass grid h-11 w-11 place-items-center rounded-full transition-all hover:scale-110 hover:border-primary/40 hover:shadow-[0_0_30px_-5px_var(--primary)]">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              <div className="ml-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> Chengdu, Sichuan, China
              </div>
            </div>
          </Reveal>

        </div>

        <div className="order-1 lg:order-2">
          <AiOrb />
        </div>
      </motion.div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground">
        <div className="flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em]">
          <span>Scroll</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-foreground/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Section shell ---------- */
function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-14 max-w-2xl">
      <Reveal>
        <div className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
          <span className="text-primary">/</span> {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p className="mt-4 text-muted-foreground sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- About ---------- */
const timeline = [
  { icon: "🇬🇭", label: "Ghanaian, studying in China" },
  { icon: "💻", label: "Software Engineering" },
  { icon: "🌐", label: "Full-Stack Web Development" },
  { icon: "📱", label: "Mobile App Development" },
  { icon: "🧠", label: "AI Application Development" },
  { icon: "🗄️", label: "Backend & Databases" },
  { icon: "🚀", label: "Product Building" },
];

function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="About" title="Engineer, builder, product thinker." />


        <div className="grid gap-12 lg:grid-cols-[380px_1fr]">
          <Reveal>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm">
              <div className="absolute -inset-1 rounded-3xl animate-spin-slow opacity-70"
                style={{ background: "conic-gradient(from 0deg, var(--primary), var(--secondary), var(--accent), var(--primary))", filter: "blur(14px)" }} />
              <div className="glass-strong relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-3xl">
                <div className="grid h-40 w-40 place-items-center rounded-full font-display text-6xl font-semibold text-primary-foreground"
                  style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))", boxShadow: "var(--shadow-glow)" }}>
                  PB
                </div>
                <div className="mt-6 text-center">
                  <div className="font-display text-lg font-semibold">Pamela A. O. Boafo</div>
                  <div className="text-xs text-muted-foreground">Software Engineering · AI</div>
                </div>
                <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Pamela is a Software Engineering student with practical experience developing
                full-stack applications, mobile applications, backend systems, and AI-powered
                solutions — working with React Native, Expo, TypeScript, React, Vue.js, Python,
                Django, Supabase, PostgreSQL and machine learning technologies.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 text-muted-foreground">
                She enjoys transforming ideas into functional products and using AI-assisted
                development workflows to accelerate software creation — from first prototype
                to production-ready release.
              </p>
            </Reveal>


            <Reveal delay={0.16}>
              <div className="mt-10">
                <div className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">Journey</div>
                <ol className="grid gap-3 sm:grid-cols-2">
                  {timeline.map((t, i) => (
                    <li key={t.label} className="glass card-hover flex items-center gap-3 rounded-2xl p-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg"
                        style={{ background: "color-mix(in oklab, var(--primary) 18%, transparent)" }}>
                        {t.icon}
                      </span>
                      <div>
                        <div className="text-[10px] font-mono text-muted-foreground">Step 0{i + 1}</div>
                        <div className="text-sm font-medium">{t.label}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { t: "Current focus", d: "Full-stack & mobile product engineering" },
                  { t: "Career goal", d: "AI engineering & full-stack roles" },
                  { t: "Core strength", d: "Turning ideas into shipped software" },
                ].map((c) => (

                  <div key={c.t} className="glass rounded-2xl p-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{c.t}</div>
                    <div className="mt-2 text-sm">{c.d}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
const skillGroups: { title: string; icon: React.ComponentType<{ className?: string }>; items: string[] }[] = [
  { title: "Programming Languages", icon: Code2, items: ["Python", "JavaScript", "TypeScript", "Java", "Kotlin", "HTML5", "CSS3"] },
  { title: "Frontend Development", icon: Palette, items: ["React", "React Native", "Expo", "Vue.js", "Vue Router", "Pinia", "Component Architecture"] },
  { title: "Backend Development", icon: Cpu, items: ["Python", "Django", "Django REST Framework", "REST APIs", "Authentication Systems", "Database Design"] },
  { title: "Databases", icon: Database, items: ["Supabase", "PostgreSQL", "SQLite"] },
  { title: "Artificial Intelligence", icon: Brain, items: ["Python AI Development", "Machine Learning Fundamentals", "Computer Vision", "AI Model Integration"] },
  { title: "Development Tools", icon: GitBranch, items: ["Git", "GitHub", "VS Code", "Android Studio", "AI Coding Assistants"] },
];


function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Skills" title="A toolkit built for shipping and researching." description="From product-quality mobile apps to computer-vision experiments — the stack I reach for." />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.05}>
              <div className="glass card-hover group relative overflow-hidden rounded-3xl p-6">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                  style={{ background: "color-mix(in oklab, var(--primary) 55%, transparent)" }} />
                <div className="relative flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl"
                    style={{ background: "color-mix(in oklab, var(--primary) 15%, transparent)", border: "1px solid var(--border)" }}>
                    <g.icon className="h-5 w-5 text-primary" />
                  </span>
                  <div>
                    <div className="font-display text-base font-semibold">{g.title}</div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground">{g.items.length} tools</div>
                  </div>
                </div>
                <div className="relative mt-5 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span key={it} className="rounded-full border px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                      style={{ borderColor: "var(--border)", background: "color-mix(in oklab, var(--surface) 60%, transparent)" }}>
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
const projects = [
  {
    name: "SYFoA Fellowship Management Platform",
    tag: "Full-Stack Mobile",
    icon: Layers,
    description: "A role-based fellowship management platform designed to improve communication and community organization.",
    features: ["User authentication & profile management", "Role-based access control", "Announcements & community features", "Secure backend integration"],
    tech: ["React Native", "Expo", "TypeScript", "Supabase", "PostgreSQL"],
    href: "#",
    repo: "https://github.com/AdomPamela",
  },
  {
    name: "PamCheck Productivity App",
    tag: "Mobile Application",
    icon: Bot,
    description: "A productivity-focused mobile application designed to help users manage tasks and improve personal organization.",
    features: ["Modern mobile interface", "Reusable component architecture", "Navigation architecture", "Backend integration"],
    tech: ["React Native", "Expo", "TypeScript", "Supabase"],
    href: "#",
    repo: "https://github.com/AdomPamela",
  },
  {
    name: "AI Eye Disease Detection System",
    tag: "Artificial Intelligence",
    icon: Eye,
    description: "An AI-powered healthcare concept exploring intelligent image-based disease detection.",
    features: ["Image classification pipeline", "AI model experimentation", "Computer vision workflows", "Healthcare technology application"],
    tech: ["Python", "Machine Learning", "Computer Vision"],
    href: "#",
    repo: "https://github.com/AdomPamela",
  },
  {
    name: "Beauty & Lifestyle Android App",
    tag: "Android Application",
    icon: Palette,
    description: "A multi-category lifestyle Android application featuring authentication, content browsing, and local data management.",
    features: ["Native Android UI", "User authentication", "Multi-category content browsing", "Local SQLite persistence"],
    tech: ["Kotlin", "Android Studio", "SQLite"],
    href: "#",
    repo: "https://github.com/AdomPamela",
  },
  {
    name: "miniMall WeChat Mini Program",
    tag: "E-commerce",
    icon: Rocket,
    description: "An e-commerce mini program with product listings, shopping features, navigation, and API integration.",
    features: ["Product listings & detail views", "Shopping cart flow", "Tab-based navigation", "External API integration"],
    tech: ["JavaScript", "WeChat Mini Program", "REST APIs"],
    href: "#",
    repo: "https://github.com/AdomPamela",
  },
];


function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Featured Work" title="Selected projects." description="Full-stack, mobile and AI applications built end-to-end — from data model to shipped interface." />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <article className="glass card-hover group relative flex h-full flex-col overflow-hidden rounded-3xl">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--primary) 45%, transparent), color-mix(in oklab, var(--secondary) 35%, transparent))" }} />
                  <div className="absolute inset-0 grid-bg opacity-40" />
                  <div className="relative flex h-full items-center justify-center">
                    <div className="glass-strong grid h-24 w-24 place-items-center rounded-3xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <p.icon className="h-10 w-10 text-foreground" />
                    </div>
                  </div>
                  <div className="absolute right-4 top-4">
                    <span className="glass rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">{p.tag}</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--secondary)" }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="font-mono rounded-full border px-2.5 py-0.5 text-[10px] text-muted-foreground"
                        style={{ borderColor: "var(--border)" }}>{t}</span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-3 border-t pt-4" style={{ borderColor: "var(--border)" }}>
                    <a href={p.repo} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                    <a href={p.href} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                      <ArrowUpRight className="h-3.5 w-3.5" /> Live Demo
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- AI-Augmented Software Engineering ---------- */
const aiWorkflow = [
  { icon: Bot, title: "AI-assisted coding", desc: "Pairing with AI assistants to write, review and refactor production code faster." },
  { icon: Rocket, title: "Rapid MVP development", desc: "Going from concept to a working prototype in days, not weeks." },
  { icon: Compass, title: "AI debugging workflows", desc: "Isolating failures and reasoning through stack traces with AI in the loop." },
  { icon: Sparkles, title: "Prompt engineering", desc: "Designing precise prompts and context for reliable, repeatable output." },
  { icon: Layers, title: "Product prototyping", desc: "Turning product ideas into interactive, testable software artifacts." },
  { icon: Cpu, title: "Architecture exploration", desc: "Comparing system designs and trade-offs before committing to an approach." },
];

function AiWorkflow() {
  return (
    <section id="ai" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="glass-strong relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-40 blur-3xl" style={{ background: "var(--primary)" }} />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full opacity-30 blur-3xl" style={{ background: "var(--secondary)" }} />
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />

          <div className="relative max-w-3xl">
            <div className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
              <span className="text-primary">/</span> AI-Augmented Engineering
            </div>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              AI as an engineering accelerator.
            </h2>
            <p className="mt-4 text-muted-foreground sm:text-lg">
              Using AI tools as engineering accelerators for rapid prototyping, debugging,
              architecture exploration, documentation, and product iteration.
            </p>
          </div>

          <div className="relative mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aiWorkflow.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.05}>
                <div className="glass card-hover h-full rounded-2xl p-5">
                  <r.icon className="h-6 w-6 text-secondary" />
                  <div className="mt-4 font-display text-base font-semibold">{r.title}</div>
                  <div className="mt-1.5 text-xs text-muted-foreground">{r.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ---------- Experience ---------- */
const experiences = [
  { time: "2024", title: "Android Development Projects", org: "Kotlin · Android Studio · SQLite", desc: "Built multi-screen Android applications with authentication, content browsing and local data persistence." },
  { time: "2024 — 2025", title: "Vue.js Web Development", org: "Vue 3 · Vue Router · Pinia", desc: "Developed component-driven web interfaces with client-side routing, shared state and API integration." },
  { time: "2026", title: "React Native Full-Stack Development", org: "React Native · Expo · TypeScript · Supabase", desc: "Shipped production-style mobile apps with authentication, role-based access and PostgreSQL-backed APIs." },
  { time: "2026", title: "AI Application Development", org: "Python · Machine Learning · Computer Vision", desc: "Explored image classification and model integration for healthcare-oriented AI applications." },
  { time: "2026", title: "AI-Augmented Software Engineering", org: "AI-assisted workflow", desc: "Using AI tooling for rapid prototyping, debugging, architecture exploration and documentation." },
];


function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader eyebrow="Experience" title="What I've been working on." />
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px sm:left-1/2" style={{ background: "linear-gradient(to bottom, transparent, var(--border), transparent)" }} />
          <ol className="space-y-8">
            {experiences.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.06}>
                <li className={`relative grid gap-4 pl-12 sm:grid-cols-2 sm:gap-8 sm:pl-0`}>
                  <div className="absolute left-4 top-4 h-3 w-3 -translate-x-1/2 rounded-full sm:left-1/2"
                    style={{ background: "var(--primary)", boxShadow: "0 0 0 6px color-mix(in oklab, var(--primary) 20%, transparent)" }} />
                  <div className={i % 2 === 0 ? "sm:text-right sm:pr-10" : "sm:order-2 sm:pl-10"}>
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{e.time}</div>
                    <div className="mt-1 font-display text-lg font-semibold">{e.title}</div>
                    <div className="text-sm text-muted-foreground">{e.org}</div>
                  </div>
                  <div className={i % 2 === 0 ? "sm:pl-10" : "sm:order-1 sm:pr-10 sm:text-right"}>
                    <div className="glass rounded-2xl p-4 text-sm text-muted-foreground">{e.desc}</div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- Education + Certifications ---------- */
function Education() {
  return (
    <section id="education" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Education" title="Academic background." />
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="glass-strong relative overflow-hidden rounded-3xl p-8">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-40 blur-3xl"
                style={{ background: "var(--primary)" }} />
              <div className="relative flex items-start gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-2xl"
                  style={{ background: "color-mix(in oklab, var(--primary) 18%, transparent)", border: "1px solid var(--border)" }}>
                  <GraduationCap className="h-7 w-7 text-primary" />
                </span>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">2023 — Present</div>
                  <h3 className="mt-1 font-display text-2xl font-semibold">Chengdu Neusoft University</h3>
                  <div className="text-muted-foreground">Bachelor of Software Engineering</div>
                </div>
              </div>
              <p className="relative mt-6 max-w-xl text-sm text-muted-foreground">
                Focused coursework across software engineering, algorithms, mobile
                development and artificial intelligence — complemented by independent
                projects and research reading.
              </p>
              <div className="relative mt-6 flex flex-wrap gap-2">
                {["Software Engineering", "Artificial Intelligence", "Object-Oriented Design", "Python Application Development", "Software Testing", "Database Systems"].map((c) => (
                  <span key={c} className="glass rounded-full px-3 py-1 text-xs text-muted-foreground">{c}</span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass h-full rounded-3xl p-8">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-secondary" />
                <h3 className="font-display text-xl font-semibold">Certifications</h3>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">In progress and planned.</p>
              <ul className="mt-6 space-y-3">
                {["Machine Learning", "Python for AI", "Deep Learning Specialization", "Cloud Computing", "Computer Vision"].map((c) => (
                  <li key={c} className="glass flex items-center justify-between rounded-2xl px-4 py-3 text-sm">
                    <span>{c}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Planned</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function Stats() {
  const stats = [
    { v: 5, s: "+", l: "Projects shipped" },
    { v: 25, s: "+", l: "Technologies used" },
    { v: 3, s: "yr", l: "Engineering journey" },
    { v: 4, s: "", l: "Platforms: web, mobile, AI, backend" },

  ];
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="glass-strong grid grid-cols-2 gap-6 rounded-3xl p-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-4xl font-semibold text-gradient sm:text-5xl">
                <Counter to={s.v} suffix={s.s} />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */


/* ---------- Contact ---------- */
function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { [k: string]: string } = {};
    if (form.name.trim().length < 2) errs.name = "Please enter your name";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (form.message.trim().length < 10) errs.message = "Tell me a bit more (10+ chars)";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/osomboafopamela@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio contact from ${form.name}`,
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Contact" title="Let's build something meaningful." description="Interested in collaboration, software engineering opportunities, and innovative technology projects." />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "osomboafopamela@gmail.com", href: "mailto:osomboafopamela@gmail.com" },
              { icon: Github, label: "GitHub", value: "github.com/AdomPamela", href: "https://github.com/AdomPamela" },
              { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/pamela-osom-boafo", href: "https://www.linkedin.com/in/pamela-osom-boafo-976752352/" },
              { icon: MapPin, label: "Location", value: "Chengdu, Sichuan, China" },
            ].map((c, i) => {
              const external = c.href?.startsWith("http");
              return (
                <Reveal key={c.label} delay={i * 0.05}>
                  {c.href ? (
                    <a href={c.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="glass card-hover flex items-center gap-4 rounded-2xl p-5">
                      <span className="grid h-11 w-11 place-items-center rounded-xl"
                        style={{ background: "color-mix(in oklab, var(--primary) 18%, transparent)", border: "1px solid var(--border)" }}>
                        <c.icon className="h-5 w-5 text-primary" />
                      </span>
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground">{c.label}</div>
                        <div className="text-sm break-all">{c.value}</div>
                      </div>
                    </a>
                  ) : (
                    <div className="glass flex items-center gap-4 rounded-2xl p-5">
                      <span className="grid h-11 w-11 place-items-center rounded-xl"
                        style={{ background: "color-mix(in oklab, var(--primary) 18%, transparent)", border: "1px solid var(--border)" }}>
                        <c.icon className="h-5 w-5 text-primary" />
                      </span>
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground">{c.label}</div>
                        <div className="text-sm">{c.value}</div>
                      </div>
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <form onSubmit={submit} noValidate className="glass-strong rounded-3xl p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground" htmlFor="name">Name</label>
                  <input
                    id="name" type="text" maxLength={100}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-2 w-full rounded-xl bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                    style={{ border: "1px solid var(--border)" }}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground" htmlFor="email">Email</label>
                  <input
                    id="email" type="email" maxLength={255}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-2 w-full rounded-xl bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                    style={{ border: "1px solid var(--border)" }}
                    placeholder="you@domain.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>
              <div className="mt-4">
                <label className="text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground" htmlFor="message">Message</label>
                <textarea
                  id="message" rows={6} maxLength={2000}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-2 w-full resize-none rounded-xl bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  style={{ border: "1px solid var(--border)" }}
                  placeholder="Tell me about your project, role, or research idea…"
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="text-xs text-muted-foreground">
                  {status === "sent" && "Thanks — I'll get back to you soon."}
                  {status === "sending" && "Sending…"}
                  {status === "error" && (
                    <>Couldn't send. Email me at{" "}
                      <a className="underline" href="mailto:osomboafopamela@gmail.com">osomboafopamela@gmail.com</a>.</>
                  )}
                  {status === "idle" && "I usually reply within a few days."}
                </div>
                <button type="submit" disabled={status === "sending"}
                  className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:scale-[1.02] disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))", boxShadow: "var(--shadow-glow)" }}>
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="relative border-t py-10" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="text-xs text-muted-foreground">
          Designed &amp; Developed by <span className="text-foreground">Pamela Adom</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <a href="#home" className="hover:text-foreground">Back to top</a>
          <span>·</span>
          <span>© 2026 · All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
export function PortfolioPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <CursorGlow />
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Pamela Adom Osom Boafo",
            jobTitle: "Software Engineer | Full-Stack Developer | AI Application Builder",
            nationality: "Ghanaian",
            alumniOf: "Chengdu Neusoft University",
            address: { "@type": "PostalAddress", addressLocality: "Chengdu", addressRegion: "Sichuan", addressCountry: "CN" },
            knowsAbout: ["Artificial Intelligence", "Machine Learning", "Computer Vision", "Software Engineering", "Healthtech"],
            email: "mailto:osomboafopamela@gmail.com",
            url: "https://github.com/AdomPamela",
            sameAs: [
              "https://github.com/AdomPamela",
              "https://www.linkedin.com/in/pamela-osom-boafo-976752352/",
            ],
          }),
        }}
      />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <AiWorkflow />
      <Experience />
      <Education />
      <Stats />

      <Contact />
      <Footer />
    </div>
  );
}
