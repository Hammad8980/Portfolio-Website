import { useRef, useState, useEffect, type CSSProperties } from 'react';
import { motion } from 'framer-motion';

interface BadgePosition {
  id: string;
  label: string;
  initialX: number;
  initialY: number;
}

const desktopBadges: BadgePosition[] = [
  { id: 'react', label: 'React', initialX: 274, initialY: 214 },
  { id: 'nextjs', label: 'Next.js', initialX: 188, initialY: 344 },
  { id: 'typescript', label: 'TypeScript', initialX: 398, initialY: 555 },
  { id: 'nodejs', label: 'Node.js', initialX: 1150, initialY: 575 },
  { id: 'mongodb', label: 'MongoDB', initialX: 483, initialY: 172 },
  { id: 'aws', label: 'AWS', initialX: 1286, initialY: 434 },
  { id: 'stripe', label: 'Stripe', initialX: 742, initialY: 164 },
  { id: 'docker', label: 'Docker', initialX: 1155, initialY: 254 },
];

const mobileBadges: BadgePosition[] = [
  { id: 'react', label: 'React', initialX: 120, initialY: 100 },
  { id: 'nextjs', label: 'Next.js', initialX: 45, initialY: 125 },
  { id: 'typescript', label: 'TypeScript', initialX: 50, initialY: 250 },
  { id: 'nodejs', label: 'Node.js', initialX: 90, initialY: 280 },
  { id: 'mongodb', label: 'MongoDB', initialX: 240, initialY: 300 },
  { id: 'aws', label: 'AWS', initialX: 280, initialY: 100 },
  { id: 'stripe', label: 'Stripe', initialX: 335, initialY: 240 },
  { id: 'docker', label: 'Docker', initialX: 300, initialY: 260 },
];

interface AnimatedHeroProps {
  onAnimationComplete: () => void;
}

const AnimatedHero = ({ onAnimationComplete }: AnimatedHeroProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastProgressRef = useRef<number>(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    let ticking = false;
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = containerRef.current.offsetHeight;

      let newProgress: number;
      if (rect.top > 0) {
        newProgress = 0;
      } else if (rect.bottom <= windowHeight) {
        newProgress = 1;
        // Animation complete, trigger callback
        setTimeout(() => onAnimationComplete(), 500);
      } else {
        const scrolled = containerHeight - rect.bottom;
        const maxScroll = containerHeight - windowHeight;
        newProgress = Math.max(0, Math.min(1, scrolled / maxScroll));
      }

      if (Math.abs(newProgress - lastProgressRef.current) > 0.0001) {
        lastProgressRef.current = newProgress;
        setScrollProgress(newProgress);
      }
    };

    const rafHandler = () => {
      handleScroll();
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(rafHandler);
      }
    };

    handleScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [onAnimationComplete]);

  const badges = isMobile ? mobileBadges : desktopBadges;
  const centerX = isMobile ? 50 : 50;
  const centerY = isMobile ? 50 : 50;

  // Animation calculations
  const convergenceProgress = Math.min(1, scrollProgress / 0.8);
  const textOpacity = scrollProgress < 0.3 ? 1 - scrollProgress / 0.3 : 0;
  const finalTextOpacity = scrollProgress > 0.7 ? (scrollProgress - 0.7) / 0.3 : 0;

  const getBadgeStyle = (badge: BadgePosition) => {
    const currentX = badge.initialX + (centerX - badge.initialX) * convergenceProgress;
    const currentY = badge.initialY + (centerY - badge.initialY) * convergenceProgress;

    return {
      left: `${currentX}%`,
      top: `${currentY}%`,
      transform: 'translate(-50%, -50%)',
      opacity: scrollProgress < 0.9 ? 1 : 1 - (scrollProgress - 0.9) / 0.1,
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-white"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 z-10 flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-white">
        {/* Initial Text */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ opacity: textOpacity }}
        >
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Full-Stack Developer | AI SaaS Specialist
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Building scalable SaaS platforms with React, Next.js, TypeScript, and Node.js
            </p>
          </div>
        </div>

        {/* Animated Badges */}
        <div className="absolute inset-0 z-5">
          {badges.map((badge) => (
            <div
              key={badge.id}
              style={getBadgeStyle(badge) as CSSProperties}
              className="absolute inline-flex items-center justify-center border border-gray-200 bg-white px-4 py-2 rounded-lg shadow-sm"
            >
              <span className="text-sm font-medium text-gray-700">
                {badge.label}
              </span>
            </div>
          ))}
        </div>

        {/* Final Text */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ opacity: finalTextOpacity }}
        >
          <div className="text-center px-4">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: finalTextOpacity > 0.5 ? 1 : 0.8 }}
              className="mb-6"
            >
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#2159E8] to-[#1a47c4] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                HM
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Hi, I'm <span className="text-[#2159E8]">Hammad Mehmood</span>
            </h1>
            <p className="text-xl text-gray-600">
              Let's build something amazing together
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedHero;
