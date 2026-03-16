import { motion } from 'motion/react';

export default function PremiumAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-2000">
      {/* 3D Container */}
      <motion.div
        initial={{ rotateY: -20, rotateX: 20 }}
        animate={{ 
          rotateY: [-20, -10, -20],
          rotateX: [20, 30, 20]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative w-full aspect-square max-w-lg flex items-center justify-center transform-style-3d"
      >
        {/* Central Core Glow */}
        <div className="absolute inset-0 bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-[120px] animate-pulse" />
        
        {/* Isometric UI Layers */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, z: i * -150 }}
            animate={{ 
              opacity: 1, 
              z: i * -100 + Math.sin(i) * 20,
              y: [0, -10, 0]
            }}
            transition={{ 
              delay: i * 0.4, 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute w-[80%] aspect-video bg-white/5 dark:bg-white/2 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl flex flex-col p-6 overflow-hidden"
            style={{ 
              transform: `translateZ(${i * -100}px)`,
              boxShadow: '0 0 40px rgba(99, 102, 241, 0.1)'
            }}
          >
            {/* Glossy Reflection Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
            
            {/* UI Content Fake */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${i === 0 ? 'from-brand-400 to-brand-600' : (i === 1 ? 'from-accent-400 to-accent-600' : 'from-indigo-400 to-purple-600')} shadow-lg`} />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-white/20 rounded-full" />
                  <div className="h-2 w-20 bg-white/10 rounded-full" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-white/5 rounded-2xl border border-white/10" />
                <div className="h-24 bg-white/5 rounded-2xl border border-white/10" />
              </div>
              <div className="h-12 w-full bg-white/5 rounded-xl border border-white/10" />
            </div>

            {/* Scanning Glow Line */}
            <motion.div 
              animate={{ top: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 1 }}
              className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-brand-500/20 dark:via-brand-500/40 to-transparent skew-y-12 pointer-events-none"
            />
          </motion.div>
        ))}

        {/* Pulse Connections (SVGs) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-20">
          <defs>
            <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
              <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {[...Array(6)].map((_, i) => (
            <motion.path
              key={i}
              d={`M ${20 + i * 10} ${10 + i * 15} Q ${50} ${50} ${80 - i * 5} ${90 - i * 10}`}
              stroke="url(#beamGrad)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="10 20"
              animate={{ strokeDashoffset: [0, -60] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
              style={{ opacity: 0.4 }}
            />
          ))}
        </svg>

        {/* Floating Geometric Orbs */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: [0.3, 0.7, 0.3],
              x: [Math.cos(i) * 200, Math.cos(i + 1) * 250, Math.cos(i) * 200],
              y: [Math.sin(i) * 200, Math.sin(i + 1) * 150, Math.sin(i) * 200],
              z: [i * 50, (i + 1) * 100, i * 50]
            }}
            transition={{ 
              duration: 8 + i * 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <div className={`w-8 h-8 rounded-full blur-md bg-gradient-to-r ${i % 2 === 0 ? 'from-brand-500 to-blue-400' : 'from-accent-500 to-cyan-300'}`} />
            <div className="absolute inset-0 w-8 h-8 rounded-full border border-white/40 animate-ping opacity-20" />
          </motion.div>
        ))}

        {/* Data Rain Particles */}
        <div className="absolute inset-0 pointer-events-none z-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1px] h-10 bg-gradient-to-b from-transparent via-brand-400 dark:via-brand-500 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, 500],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Background Glows for context */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none z-[-1]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-accent-500/5 rounded-full blur-[150px] mix-blend-screen" />
      </div>
    </div>
  );
}
