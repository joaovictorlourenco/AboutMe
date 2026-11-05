// Adapted from Aceternity UI: https://ui.aceternity.com/registry/3d-card.json
import { useRef, type ReactNode, type PointerEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'motion/react';

export function CardContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // Aceternity Card Spotlight's pointer mask, without its optional WebGL canvas.
  // https://ui.aceternity.com/registry/card-spotlight.json
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const maskImage = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)`;
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== 'mouse' || !containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (event.clientX - left - width / 2) / 40;
    const y = (event.clientY - top - height / 2) / 40;
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  }
  return <div className={`card-perspective ${className}`}>
    <div ref={containerRef} className="card-3d" onPointerMove={handlePointerMove}
      onPointerLeave={() => { if (containerRef.current) containerRef.current.style.transform = ''; }}>
      {children}
      <motion.div className="card-spotlight" aria-hidden="true" style={{ maskImage }} />
    </div>
  </div>;
}
