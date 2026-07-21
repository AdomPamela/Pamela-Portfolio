import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

/**
 * A CSS/SVG "AI core" orb — layered glowing rings, orbiting nodes,
 * conic gradient, and parallax response to mouse position.
 * Deliberately no Three.js: keeps bundle lean and animation buttery.
 */
export function AiOrb() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 80, damping: 15 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 80, damping: 15 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <motion.div
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className="relative mx-auto aspect-square w-[min(78vw,520px)]"
    >
      {/* soft outer aura */}
      <div className="absolute inset-0 rounded-full blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--primary) 65%, transparent), transparent 60%)",
        }}
      />
      {/* rotating conic ring */}
      <div className="absolute inset-6 rounded-full animate-spin-slow"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, var(--primary) 60deg, transparent 120deg, var(--secondary) 220deg, transparent 300deg)",
          filter: "blur(12px)",
          opacity: 0.75,
        }}
      />
      {/* glass core */}
      <div className="absolute inset-[18%] rounded-full glass-strong flex items-center justify-center"
        style={{
          boxShadow:
            "inset 0 0 60px color-mix(in oklab, var(--primary) 40%, transparent), 0 40px 120px -20px color-mix(in oklab, var(--secondary) 45%, transparent)",
        }}
      >
        {/* inner grid */}
        <svg viewBox="0 0 200 200" className="h-[70%] w-[70%] opacity-70">
          <defs>
            <radialGradient id="g1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--secondary)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="70" fill="url(#g1)" />
          {Array.from({ length: 8 }).map((_, i) => (
            <circle
              key={i}
              cx="100"
              cy="100"
              r={20 + i * 8}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.14}
              strokeWidth="0.6"
              className="text-foreground"
            />
          ))}
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            const x1 = 100 + Math.cos(a) * 30;
            const y1 = 100 + Math.sin(a) * 30;
            const x2 = 100 + Math.cos(a) * 88;
            const y2 = 100 + Math.sin(a) * 88;
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="currentColor" strokeOpacity={0.10} strokeWidth="0.5"
                className="text-foreground" />
            );
          })}
        </svg>
      </div>

      {/* orbiting nodes */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 18 + i * 6, repeat: Infinity, ease: "linear" }}
          style={{ transform: `rotate(${i * 40}deg)` }}
        >
          <div
            className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full"
            style={{
              background: i % 2 ? "var(--secondary)" : "var(--accent)",
              boxShadow: `0 0 20px ${i % 2 ? "var(--secondary)" : "var(--accent)"}`,
            }}
          />
        </motion.div>
      ))}

      {/* floating dots */}
      {[
        { t: "8%", l: "12%" },
        { t: "72%", l: "6%" },
        { t: "18%", l: "88%" },
        { t: "82%", l: "78%" },
      ].map((p, i) => (
        <div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full animate-pulse-glow"
          style={{
            top: p.t,
            left: p.l,
            background: "var(--foreground)",
            opacity: 0.6,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}
    </motion.div>
  );
}
