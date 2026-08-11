import { useRef, useState, useEffect, useCallback, type CSSProperties } from 'react';

interface BadgePosition {
  id: string;
  label: string;
  initialX: number;
  initialY: number;
}

/**
 * Animation prompt (translated from TurnYourIdeas):
 *
 * Structure
 * - Tall scroll track (350vh) + sticky full-viewport stage
 * - Derive scrollProgress 0→1 from track position (RAF-throttled)
 * - Drive every visual with phase windows + easing (no random keyframes)
 * - Phase handoff: hard-stop at ~0.1 → auto-play 0.1 → 0.8;
 *   scrolling back past ~0.8 → auto-play 0.8 → 0.1
 * - Below the gate, scroll is free both ways (intro pop-in reverses with scroll)
 *
 * Phase timeline (scrollProgress)
 * 0.00–0.08  Pop-in: tech badges scale/fade in around the stage
 * 0.08–0.25  Headline exit: title/subtitle fade + slight scale down
 * 0.00–0.40  Converge: badges ease toward stage center
 * 0.15–0.28  Label fade: badge text disappears
 * 0.15–0.32  Normalize: badges equalize toward a shared size
 * 0.32–0.48  Morph: badges become circles and finish meeting at center
 * 0.48–0.58  Merge: individual circles collapse into one brand mark (HM)
 * 0.58–0.82  Reveal: brand mark + "Hi, I'm Hammad" fade/scale in
 * 0.82–1.00  Hold final state; signal parent that intro can unlock page content
 */

const INTRO_GATE = 0.1;
const MAIN_SEQUENCE_END = 0.8;
/** Must scroll clearly below the gate before hard-stop can re-arm (avoids float/snap flicker). */
const INTRO_REARM = 0.05;
const INTRO_SCROLL_DAMPING = 0.28;
const MAIN_SEQUENCE_DURATION_MS = 3200;
const REVERSE_SEQUENCE_DURATION_MS = 2600;

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
  { id: 'react', label: 'React', initialX: 70, initialY: 90 },
  { id: 'nextjs', label: 'Next.js', initialX: 300, initialY: 110 },
  { id: 'typescript', label: 'TypeScript', initialX: 40, initialY: 220 },
  { id: 'nodejs', label: 'Node.js', initialX: 320, initialY: 230 },
  { id: 'mongodb', label: 'MongoDB', initialX: 60, initialY: 320 },
  { id: 'aws', label: 'AWS', initialX: 310, initialY: 330 },
  { id: 'stripe', label: 'Stripe', initialX: 120, initialY: 160 },
  { id: 'docker', label: 'Docker', initialX: 260, initialY: 170 },
];

const DESKTOP_BASE = { width: 1440, height: 810, centerX: 720, centerY: 400 };
const MOBILE_BASE = { width: 390, height: 420, centerX: 195, centerY: 210 };

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const phaseProgress = (scroll: number, start: number, end: number) =>
  clamp01((scroll - start) / (end - start));

interface AnimatedHeroProps {
  onAnimationComplete: () => void;
}

const AnimatedHero = ({ onAnimationComplete }: AnimatedHeroProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastProgressRef = useRef(0);
  const completedRef = useRef(false);
  const isAutoScrolling = useRef(false);
  const mainSequenceStarted = useRef(false);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getProgressFromDOM = useCallback(() => {
    if (!containerRef.current) return 0;

    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const containerHeight = containerRef.current.offsetHeight;

    if (rect.top > 0) return 0;
    if (rect.bottom <= windowHeight) return 1;

    const scrolled = containerHeight - rect.bottom;
    const maxScroll = containerHeight - windowHeight;
    return clamp01(scrolled / maxScroll);
  }, []);

  const progressToScrollY = useCallback((targetProgress: number) => {
    if (!containerRef.current) return window.scrollY;

    const rect = containerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const containerTopAbsolute = rect.top + scrollY;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const maxScroll = Math.max(1, containerHeight - windowHeight);
    return containerTopAbsolute + targetProgress * maxScroll;
  }, []);

  const animateScroll = useCallback((targetY: number, duration: number) => {
    const startY = window.scrollY || window.pageYOffset;
    const distance = targetY - startY;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        isAutoScrolling.current = false;
      }
    };

    requestAnimationFrame(step);
  }, []);

  const startMainSequence = useCallback(() => {
    if (mainSequenceStarted.current || isAutoScrolling.current) return;
    mainSequenceStarted.current = true;
    isAutoScrolling.current = true;
    setScrollProgress(INTRO_GATE);
    lastProgressRef.current = INTRO_GATE;
    window.scrollTo(0, progressToScrollY(INTRO_GATE));
    animateScroll(progressToScrollY(MAIN_SEQUENCE_END), MAIN_SEQUENCE_DURATION_MS);
  }, [animateScroll, progressToScrollY]);

  const startReverseSequence = useCallback(() => {
    if (isAutoScrolling.current) return;
    isAutoScrolling.current = true;
    animateScroll(progressToScrollY(INTRO_GATE), REVERSE_SEQUENCE_DURATION_MS);
  }, [animateScroll, progressToScrollY]);

  useEffect(() => {
    if (!containerRef.current) return;

    let ticking = false;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const newProgress = getProgressFromDOM();
      const previousProgress = lastProgressRef.current;

      // Re-arm hard-stop only after a clear return into the intro (not during auto-scroll)
      if (!isAutoScrolling.current && newProgress < INTRO_REARM) {
        mainSequenceStarted.current = false;
      }

      // Reverse: crossing back below 0.8 → auto-play 0.8 → 0.1
      if (
        !isAutoScrolling.current &&
        previousProgress >= MAIN_SEQUENCE_END &&
        newProgress < MAIN_SEQUENCE_END
      ) {
        startReverseSequence();
        return;
      }

      // Hard stop: crossing 0.1 from below starts 0.1 → 0.8
      if (
        !mainSequenceStarted.current &&
        !isAutoScrolling.current &&
        previousProgress < INTRO_GATE &&
        newProgress >= INTRO_GATE
      ) {
        startMainSequence();
        return;
      }

      if (Math.abs(newProgress - previousProgress) > 0.0001) {
        lastProgressRef.current = newProgress;
        setScrollProgress(newProgress);
      }

      if (newProgress >= 0.84 && !completedRef.current) {
        completedRef.current = true;
        onAnimationComplete();
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (isAutoScrolling.current || mainSequenceStarted.current) return;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;

      const progress = getProgressFromDOM();

      // Dampen intro scroll so hard flicks still play 0–0.1, then hard-stop into main phase
      if (progress < INTRO_GATE && event.deltaY > 0) {
        event.preventDefault();

        const maxScroll = Math.max(
          1,
          containerRef.current.offsetHeight - window.innerHeight
        );
        const nextProgress = clamp01(
          progress + (event.deltaY * INTRO_SCROLL_DAMPING) / maxScroll
        );

        if (nextProgress >= INTRO_GATE) {
          startMainSequence();
        } else {
          window.scrollTo(0, progressToScrollY(nextProgress));
          lastProgressRef.current = nextProgress;
          setScrollProgress(nextProgress);
        }
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (isAutoScrolling.current || mainSequenceStarted.current) return;
      if (touchStartY.current == null || !containerRef.current) return;

      const currentY = event.touches[0]?.clientY;
      if (currentY == null) return;

      const deltaY = touchStartY.current - currentY;
      const progress = getProgressFromDOM();

      if (progress < INTRO_GATE && deltaY > 0) {
        event.preventDefault();
        const maxScroll = Math.max(
          1,
          containerRef.current.offsetHeight - window.innerHeight
        );
        const nextProgress = clamp01(
          progress + (deltaY * INTRO_SCROLL_DAMPING) / maxScroll
        );

        if (nextProgress >= INTRO_GATE) {
          startMainSequence();
        } else {
          window.scrollTo(0, progressToScrollY(nextProgress));
          lastProgressRef.current = nextProgress;
          setScrollProgress(nextProgress);
        }

        touchStartY.current = currentY;
      }
    };

    handleScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [
    getProgressFromDOM,
    onAnimationComplete,
    progressToScrollY,
    startMainSequence,
    startReverseSequence,
  ]);

  const badges = isMobile ? mobileBadges : desktopBadges;
  const base = isMobile ? MOBILE_BASE : DESKTOP_BASE;
  const visualProgress = scrollProgress;

  // Phase 1: badge pop-in
  const popOutProgress = phaseProgress(visualProgress, 0, 0.08);
  const popOutScale = easeOutBack(popOutProgress);
  const popOutOpacity = Math.min(1, popOutProgress * 1.25);

  // Phase 2: initial headline exit
  const headlineFade = easeOutCubic(phaseProgress(visualProgress, 0.08, 0.25));
  const initialTextOpacity = 1 - headlineFade;
  const headlineScale = 1 - headlineFade * 0.28;

  // Phase 3: converge toward center
  const convergenceProgress = easeInOutCubic(
    phaseProgress(visualProgress, 0, 0.4)
  );

  // Phase 4: badge label fade
  const badgeTextOpacity =
    visualProgress < 0.15
      ? 1
      : visualProgress < 0.28
        ? 1 - phaseProgress(visualProgress, 0.15, 0.28)
        : 0;

  // Phase 5–6: normalize then morph to circles
  const normalizeProgress = easeInOutCubic(
    phaseProgress(visualProgress, 0.15, 0.32)
  );
  const morphProgress = easeInOutCubic(phaseProgress(visualProgress, 0.32, 0.48));

  // Phase 7: merge into brand mark
  const mergeProgress = easeInOutCubic(phaseProgress(visualProgress, 0.48, 0.58));

  // Phase 8: final identity reveal
  const revealProgress = easeOutCubic(phaseProgress(visualProgress, 0.58, 0.82));
  const finalOpacity = revealProgress;
  const finalScale = 0.86 + revealProgress * 0.14;

  const naturalBadgeWidth = isMobile ? 72 : 110;
  const naturalBadgeHeight = isMobile ? 28 : 40;
  const circleSize = isMobile ? 28 : 40;
  const brandSize = isMobile ? 96 : 128;

  const getBadgeStyle = (badge: BadgePosition): CSSProperties => {
    const convergedX =
      badge.initialX + (base.centerX - badge.initialX) * convergenceProgress;
    const convergedY =
      badge.initialY + (base.centerY - badge.initialY) * convergenceProgress;

    let xPercent = (convergedX / base.width) * 100;
    let yPercent = (convergedY / base.height) * 100;

    // Finish meeting at exact center during morph/merge
    const toCenter = Math.max(morphProgress, mergeProgress);
    xPercent = xPercent + (50 - xPercent) * toCenter;
    yPercent = yPercent + (50 - yPercent) * toCenter;

    const width =
      naturalBadgeWidth -
      (naturalBadgeWidth - circleSize) * morphProgress -
      circleSize * mergeProgress;
    const height =
      naturalBadgeHeight +
      (circleSize - naturalBadgeHeight) * morphProgress -
      circleSize * mergeProgress;

    const borderRadius =
      morphProgress < 0.5
        ? 8 + morphProgress * 20
        : morphProgress < 1
          ? `${8 + morphProgress * circleSize}px`
          : '50%';

    return {
      left: `${xPercent}%`,
      top: `${yPercent}%`,
      width: `${Math.max(0, width)}px`,
      height: `${Math.max(0, height)}px`,
      borderRadius: morphProgress > 0.85 ? '50%' : borderRadius,
      opacity: popOutOpacity * (1 - mergeProgress),
      transform: `translate(-50%, -50%) scale(${
        visualProgress < 0.08 ? popOutScale : 1 - normalizeProgress * 0.02
      })`,
      padding: morphProgress > 0.25 ? '0px' : isMobile ? '4px 10px' : '8px 14px',
    };
  };

  // Ambient dots (light particle field, same idea as reference)
  const ambientDots = [
    { x: 12, y: 18, size: 10, opacity: 0.25 },
    { x: 22, y: 72, size: 8, opacity: 0.2 },
    { x: 78, y: 16, size: 12, opacity: 0.22 },
    { x: 86, y: 68, size: 9, opacity: 0.28 },
    { x: 8, y: 48, size: 7, opacity: 0.18 },
    { x: 92, y: 42, size: 11, opacity: 0.2 },
    { x: 34, y: 12, size: 8, opacity: 0.16 },
    { x: 66, y: 84, size: 10, opacity: 0.2 },
  ];

  const dotsConverge = easeInOutCubic(phaseProgress(visualProgress, 0.12, 0.42));
  const dotsOpacity =
    visualProgress < 0.45
      ? popOutOpacity
      : Math.max(0, 1 - phaseProgress(visualProgress, 0.45, 0.55));

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-white"
      style={{ height: '350vh' }}
    >
      <div className="sticky top-0 z-10 flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-white">
        <div className="relative h-full w-full">
          {/* Ambient particles */}
          {ambientDots.map((dot, index) => {
            const currentX = dot.x + (50 - dot.x) * dotsConverge;
            const currentY = dot.y + (50 - dot.y) * dotsConverge;
            const size = Math.max(0, dot.size * (1 - dotsConverge * 1.2));

            return (
              <div
                key={`dot-${index}`}
                className="pointer-events-none absolute rounded-sm bg-[#2159E8]"
                style={{
                  left: `${currentX}%`,
                  top: `${currentY}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: dot.opacity * dotsOpacity,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}

          {/* Phase: initial headline */}
          <div
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4"
            style={{
              opacity: initialTextOpacity,
              transform: `scale(${headlineScale})`,
            }}
          >
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
                Full-Stack Developer | AI SaaS Specialist
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">
                Building scalable SaaS platforms with React, Next.js, TypeScript,
                and Node.js
              </p>
            </div>
          </div>

          {/* Phase: tech badges */}
          <div className="pointer-events-none absolute inset-0 z-[5]">
            {badges.map((badge) => {
              const style = getBadgeStyle(badge);
              return (
                <div
                  key={badge.id}
                  style={style}
                  className="absolute inline-flex items-center justify-center overflow-hidden border border-gray-200 bg-white shadow-sm"
                >
                  {badgeTextOpacity > 0.02 && morphProgress < 0.35 && (
                    <span
                      className="whitespace-nowrap text-xs font-medium text-gray-700 md:text-sm"
                      style={{ opacity: badgeTextOpacity }}
                    >
                      {badge.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Phase: merged brand mark + final identity */}
          <div
            className="absolute inset-0 z-20 flex items-center justify-center px-4"
            style={{
              opacity: finalOpacity,
              transform: `scale(${finalScale})`,
            }}
          >
            <div className="text-center">
              <div
                className="mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-br from-[#2159E8] to-[#1a47c4] font-bold text-white shadow-lg"
                style={{
                  width: brandSize,
                  height: brandSize,
                  fontSize: isMobile ? 36 : 42,
                  boxShadow: '0 18px 40px rgba(33, 89, 232, 0.28)',
                }}
              >
                HM
              </div>
              <h1 className="mb-3 text-4xl font-bold text-gray-900 md:text-6xl">
                Hi, I&apos;m <span className="text-[#2159E8]">Hammad Mehmood</span>
              </h1>
              <p className="text-lg text-gray-600 md:text-xl">
                Let&apos;s build something amazing together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedHero;
