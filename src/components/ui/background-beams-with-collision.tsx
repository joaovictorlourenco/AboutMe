// Adapted from Aceternity UI: https://ui.aceternity.com/registry/background-beams-with-collision.json
// Responsive collision height replaces the original per-beam geometry polling.
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';

const beams = [
  { position: 4, duration: 2.3, delay: 0 },
  { position: 20, duration: 3.1, delay: 0.65 },
  { position: 39, duration: 2.8, delay: 0.25 },
  { position: 57, duration: 3.5, delay: 1.1 },
  { position: 77, duration: 2.5, delay: 0.4 },
  { position: 96, duration: 3.2, delay: 0.9 },
];

export function BackgroundBeamsWithCollision() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15 });
  const reduced = useReducedMotion();
  const [height, setHeight] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height));
    observer.observe(ref.current);
    const visibility = () => setHidden(document.hidden);
    visibility();
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  const active = inView && !reduced && !paused && !hidden && height > 0;
  return <div className="hero-effects" data-playing={active}>
    <div ref={ref} id="hero-beams" className="hero-beam-stage" aria-hidden="true">
      {active && beams.map(beam => <CollisionMechanism key={beam.position} {...beam} height={height} />)}
      <div className="hero-beam-floor" />
    </div>
    <button type="button" className="hero-effect-toggle" aria-controls="hero-beams"
      onClick={() => setPaused(value => !value)}>
      {paused ? 'Retomar animação' : 'Pausar animação'}
    </button>
  </div>;
}

function CollisionMechanism({ position, duration, delay, height }: {
  position: number; duration: number; delay: number; height: number;
}) {
  const [collision, setCollision] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!collision) return;
    const timer = setTimeout(() => {
      setCollision(false);
      setCycle(value => value + 1);
    }, 1100);
    return () => clearTimeout(timer);
  }, [collision]);

  return <div className="hero-beam-lane" style={{ left: `${position}%` }}>
    <motion.div key={`${cycle}-${height}`} className="hero-beam-trail"
      style={{ visibility: collision ? 'hidden' : 'visible' }}
      initial={{ y: -160, opacity: 0 }}
      animate={{ y: height - 184, opacity: [0, 0.85, 0.85, 1] }}
      transition={{ duration, delay: cycle === 0 ? delay : 0.5, ease: 'linear' }}
      onAnimationComplete={() => setCollision(true)} />
    <AnimatePresence>
      {collision && <Explosion key={cycle} />}
    </AnimatePresence>
  </div>;
}

function Explosion() {
  return <div className="hero-beam-explosion">
    <motion.div className="hero-beam-flash" initial={{ opacity: 0.8, scaleX: 0.2 }}
      animate={{ opacity: 0, scaleX: 1.8 }} transition={{ duration: 0.8, ease: 'easeOut' }} />
    {Array.from({ length: 16 }, (_, index) => (
      <motion.span key={index} className="hero-beam-particle"
        initial={{ x: 0, y: 0, opacity: 1 }}
        animate={{ x: (index - 7.5) * 9, y: -18 - (index % 5) * 11, opacity: 0 }}
        transition={{ duration: 0.55 + (index % 4) * 0.12, ease: 'easeOut' }} />
    ))}
  </div>;
}
