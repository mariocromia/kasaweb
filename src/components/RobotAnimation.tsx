import { motion } from 'motion/react';

/* ------------------------------------------------------------------ */
/*  Inline SVG Robot — a cute, detailed construction robot             */
/* ------------------------------------------------------------------ */
function RobotSVG({ flip = false, color = '#6366f1' }: { flip?: boolean; color?: string }) {
  return (
    <svg
      viewBox="0 0 120 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
    >
      {/* Antenna */}
      <circle cx="60" cy="8" r="6" fill={color} opacity="0.9" />
      <rect x="58" y="14" width="4" height="16" rx="2" fill={color} opacity="0.7" />

      {/* Head */}
      <rect x="30" y="28" width="60" height="40" rx="12" fill={color} />
      <rect x="34" y="32" width="52" height="32" rx="8" fill="#0f172a" opacity="0.85" />

      {/* Eyes */}
      <motion.circle
        cx="47" cy="48" r="7"
        fill="#22d3ee"
        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="73" cy="48" r="7"
        fill="#22d3ee"
        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
      {/* Eye glint */}
      <circle cx="44" cy="45" r="2" fill="white" opacity="0.7" />
      <circle cx="70" cy="45" r="2" fill="white" opacity="0.7" />

      {/* Mouth / Display */}
      <rect x="44" y="56" width="32" height="4" rx="2" fill="#22d3ee" opacity="0.5" />

      {/* Body */}
      <rect x="35" y="72" width="50" height="40" rx="8" fill={color} />
      <rect x="42" y="78" width="36" height="14" rx="4" fill="#0f172a" opacity="0.4" />
      {/* Body lights */}
      <motion.circle
        cx="50" cy="85" r="3"
        fill="#4ade80"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle
        cx="60" cy="85" r="3"
        fill="#facc15"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
      <motion.circle
        cx="70" cy="85" r="3"
        fill="#f87171"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
      />

      {/* Arms */}
      <motion.rect
        x="14" y="76" width="20" height="8" rx="4" fill={color} opacity="0.9"
        animate={{ rotate: [0, -15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '34px 80px' }}
      />
      <motion.rect
        x="86" y="76" width="20" height="8" rx="4" fill={color} opacity="0.9"
        animate={{ rotate: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        style={{ transformOrigin: '86px 80px' }}
      />

      {/* Legs / Treads */}
      <rect x="38" y="114" width="16" height="18" rx="4" fill={color} opacity="0.8" />
      <rect x="66" y="114" width="16" height="18" rx="4" fill={color} opacity="0.8" />
      <rect x="36" y="128" width="20" height="6" rx="3" fill={color} opacity="0.6" />
      <rect x="64" y="128" width="20" height="6" rx="3" fill={color} opacity="0.6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  A single "block" that flies in and locks into place                */
/* ------------------------------------------------------------------ */
interface BlockProps {
  delay: number;
  className: string;
  children?: React.ReactNode;
}

function FlyingBlock({ delay, className, children }: BlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -80, x: 60, scale: 0.5, rotate: 12 }}
      animate={{ opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }}
      transition={{
        delay,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Spark particle burst (appears when a block lands)                  */
/* ------------------------------------------------------------------ */
function Sparks({ delay }: { delay: number }) {
  return (
    <>
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-accent-400"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: [0, Math.cos(angle) * 35],
              y: [0, Math.sin(angle) * 35],
            }}
            transition={{ delay: delay + 0.8, duration: 0.5, ease: 'easeOut' }}
          />
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main exported component                                            */
/* ------------------------------------------------------------------ */
export default function RobotAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* ============ Central "Browser Window" being built ============ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative w-[85%] max-w-md aspect-[4/5] rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col z-10"
      >
        {/* Browser Chrome */}
        <div className="h-9 border-b border-gray-100 dark:border-white/10 bg-gray-50/80 dark:bg-white/5 flex items-center px-3 gap-2 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.5, duration: 1 }}
            className="ml-3 h-4 bg-gray-200/60 dark:bg-white/5 rounded overflow-hidden"
          >
            <div className="px-2 flex items-center h-full">
              <span className="text-[5px] font-bold text-gray-400 dark:text-white/20 uppercase tracking-wider whitespace-nowrap">kasaweb.com.br</span>
            </div>
          </motion.div>
        </div>

        {/* Page being assembled block-by-block */}
        <div className="flex-1 p-3 space-y-2 overflow-hidden relative">
          {/* Block 1: Hero Banner */}
          <FlyingBlock delay={0.6} className="relative">
            <div className="h-16 rounded-lg bg-gradient-to-r from-brand-500/20 to-accent-500/20 dark:from-brand-500/30 dark:to-accent-500/30 border border-brand-500/10 flex items-center px-3 gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-500/40" />
              <div className="space-y-1 flex-1">
                <div className="h-2.5 w-3/4 bg-gray-800/20 dark:bg-white/20 rounded-full" />
                <div className="h-2 w-1/2 bg-gray-800/10 dark:bg-white/10 rounded-full" />
              </div>
            </div>
            <Sparks delay={0.6} />
          </FlyingBlock>

          {/* Block 2: Two columns */}
          <FlyingBlock delay={1.2} className="relative grid grid-cols-2 gap-2">
            <div className="h-20 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 p-2 space-y-1.5">
              <div className="h-2 w-full bg-gray-300/50 dark:bg-white/10 rounded-full" />
              <div className="h-2 w-2/3 bg-gray-300/50 dark:bg-white/10 rounded-full" />
              <div className="h-6 w-14 mt-1 rounded bg-brand-500/30 dark:bg-brand-500/40" />
            </div>
            <div className="h-20 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 p-2 space-y-1.5">
              <div className="h-2 w-full bg-gray-300/50 dark:bg-white/10 rounded-full" />
              <div className="h-2 w-3/4 bg-gray-300/50 dark:bg-white/10 rounded-full" />
              <div className="h-6 w-14 mt-1 rounded bg-accent-500/30 dark:bg-accent-500/40" />
            </div>
            <Sparks delay={1.2} />
          </FlyingBlock>

          {/* Block 3: Three cards row */}
          <FlyingBlock delay={1.8} className="relative grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-14 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 p-2 flex flex-col items-center justify-center gap-1">
                <div className="w-4 h-4 rounded-full bg-brand-500/20 dark:bg-brand-500/30" />
                <div className="h-1.5 w-8 bg-gray-300/60 dark:bg-white/10 rounded-full" />
              </div>
            ))}
            <Sparks delay={1.8} />
          </FlyingBlock>

          {/* Block 4: Content section */}
          <FlyingBlock delay={2.4} className="relative">
            <div className="h-12 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 p-2 space-y-1.5">
              <div className="h-2 w-full bg-gray-300/50 dark:bg-white/10 rounded-full" />
              <div className="h-2 w-5/6 bg-gray-300/50 dark:bg-white/10 rounded-full" />
              <div className="h-2 w-1/2 bg-gray-300/50 dark:bg-white/10 rounded-full" />
            </div>
            <Sparks delay={2.4} />
          </FlyingBlock>

          {/* Block 5: CTA / Footer */}
          <FlyingBlock delay={3.0} className="relative flex justify-center gap-2 pt-1">
            <div className="h-7 w-20 rounded-md bg-brand-500/40 dark:bg-brand-500/50" />
            <div className="h-7 w-20 rounded-md bg-gray-200/60 dark:bg-white/10 border border-gray-300/30 dark:border-white/5" />
            <Sparks delay={3.0} />
          </FlyingBlock>

          {/* Assembly progress bar */}
          <motion.div
            className="absolute bottom-2 left-3 right-3 h-1 bg-gray-200/50 dark:bg-white/5 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.6, duration: 3, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* ============ Robot 1: Top-Right Builder ============ */}
      <motion.div
        className="absolute -top-2 -right-2 md:top-2 md:right-0 w-16 h-20 md:w-20 md:h-24 z-20"
        initial={{ opacity: 0, x: 80, y: -60 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.3, duration: 1, type: 'spring' }}
      >
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <RobotSVG color="#6366f1" />
        </motion.div>
      </motion.div>

      {/* ============ Robot 2: Bottom-Left Lifter ============ */}
      <motion.div
        className="absolute -bottom-2 -left-2 md:bottom-4 md:left-0 w-14 h-18 md:w-18 md:h-22 z-20"
        initial={{ opacity: 0, x: -80, y: 60 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.6, duration: 1, type: 'spring' }}
      >
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <RobotSVG flip color="#8b5cf6" />
        </motion.div>
      </motion.div>

      {/* ============ Robot 3: Mid-Left Small Helper ============ */}
      <motion.div
        className="absolute top-1/2 -left-6 md:-left-10 -translate-y-1/2 w-10 h-12 md:w-14 md:h-16 z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8, type: 'spring' }}
      >
        <motion.div
          animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <RobotSVG color="#a78bfa" />
        </motion.div>
      </motion.div>

      {/* ============ Floating energy particles ============ */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-brand-400/60"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -20 - Math.random() * 30, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1 + Math.random(), 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* ============ Connecting energy beams ============ */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-15 overflow-visible">
        <motion.line
          x1="80%" y1="10%" x2="55%" y2="30%"
          stroke="url(#beam1)" strokeWidth="1.5"
          strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
        <motion.line
          x1="15%" y1="85%" x2="40%" y2="65%"
          stroke="url(#beam2)" strokeWidth="1.5"
          strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 0.6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
        />
        <motion.line
          x1="5%" y1="50%" x2="30%" y2="50%"
          stroke="url(#beam3)" strokeWidth="1.5"
          strokeDasharray="3 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 2 }}
        />
        <defs>
          <linearGradient id="beam1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="beam2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <linearGradient id="beam3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>

      {/* ============ "Building…" status badge ============ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 0.6 }}
        className="absolute -bottom-8 md:-bottom-12 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="px-5 py-2 rounded-full bg-white/90 dark:bg-[#0a0a0a]/90 border border-gray-200/50 dark:border-white/10 shadow-xl backdrop-blur-md flex items-center gap-2"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full"
          />
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 tracking-wide">Construindo seu site...</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
