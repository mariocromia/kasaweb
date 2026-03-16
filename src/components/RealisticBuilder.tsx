import { motion } from 'motion/react';
import { 
  Menu, 
  Search, 
  ShoppingBag, 
  PlayCircle,
  BarChart3,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  A block that drops in with a spring animation and a subtle glow   */
/* ------------------------------------------------------------------ */
interface AnimatedBlockProps {
  delay: number;
  className?: string;
  children: React.ReactNode;
}

function AnimatedBlock({ delay, className = "", children }: AnimatedBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        delay, 
        duration: 0.7, 
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className={`relative group overflow-hidden ${className}`}
    >
      {/* Glossy sheen effect that sweeps across when the element lands */}
      <motion.div
        initial={{ left: '-100%' }}
        animate={{ left: '200%' }}
        transition={{ delay: delay + 0.3, duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent skew-x-12 z-10 pointer-events-none"
      />
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main exported component: Realistic LP Builder                      */
/* ------------------------------------------------------------------ */
export default function RealisticBuilder() {
  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-1000">
      
      {/* ============ 3D Browser Mockup ============ */}
      <motion.div
        initial={{ rotateX: 15, rotateY: -10, scale: 0.9, opacity: 0 }}
        animate={{ rotateX: 0, rotateY: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[500px] aspect-[4/5] bg-white dark:bg-[#0a0a0a] rounded-2xl border border-gray-200/50 dark:border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col z-10"
      >
        {/* Continuous floating effect for the whole browser */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Browser Chrome (Header) */}
        <div className="h-10 border-b border-gray-100 dark:border-white/5 bg-gray-50/80 dark:bg-white-[0.02] flex items-center px-4 gap-3 shrink-0 backdrop-blur-md relative z-20">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm" />
          </div>
          <div className="flex-1 max-w-[200px] mx-auto h-5 bg-white dark:bg-white/5 rounded-md border border-gray-200/50 dark:border-white/5 flex items-center justify-center px-2">
            <span className="text-[7px] font-medium text-gray-400 dark:text-gray-500 flex items-center gap-1">
              <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
              kasaweb.com.br
            </span>
          </div>
        </div>

        {/* ============ Page Content Area ============ */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50/50 dark:bg-[#050505] p-4 space-y-4 isolate scrollbar-hide">
          
          {/* 1. Navigation / Header Base */}
          <AnimatedBlock delay={0.8} className="w-full h-10 bg-white dark:bg-white/5 border border-gray-200/50 dark:border-white/5 rounded-full flex items-center justify-between px-4 shadow-sm backdrop-blur-sm">
            {/* Logo placeholder */}
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-brand-500" />
              <div className="h-3 w-16 bg-gray-200 dark:bg-white/10 rounded-sm" />
            </div>
            {/* Nav Links */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="h-1.5 w-6 bg-gray-200 dark:bg-white/10 rounded-full" />
              <div className="h-1.5 w-8 bg-gray-200 dark:bg-white/10 rounded-full" />
              <div className="h-1.5 w-6 bg-gray-200 dark:bg-white/10 rounded-full" />
            </div>
            {/* Icons */}
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
              <Search size={12} strokeWidth={2.5} />
              <ShoppingBag size={12} strokeWidth={2.5} />
              <Menu size={14} className="sm:hidden" />
            </div>
          </AnimatedBlock>

          {/* 2. Hero Section */}
          <AnimatedBlock delay={1.4} className="w-full rounded-2xl bg-white dark:bg-white/5 border border-gray-200/50 dark:border-white/5 p-5 shadow-sm overflow-hidden flex flex-col items-center text-center gap-3">
             {/* Dynamic background blob */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
             
             {/* Badge */}
             <div className="px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                <div className="h-1.5 w-16 bg-brand-600/40 dark:bg-brand-400/50 rounded-full" />
             </div>

             {/* Headline */}
             <div className="space-y-1.5 w-full max-w-[90%]">
               <div className="h-4 sm:h-5 w-full bg-gray-800 dark:bg-white rounded-md mx-auto" />
               <div className="h-4 sm:h-5 w-4/5 bg-gray-800 dark:bg-white rounded-md mx-auto" />
             </div>
             
             {/* Subtitle */}
             <div className="h-2 w-3/4 bg-gray-400 dark:bg-gray-500 rounded-full mt-1" />
             <div className="h-2 w-2/3 bg-gray-400 dark:bg-gray-500 rounded-full" />

             {/* Buttons */}
             <div className="flex gap-2 mt-2 w-full justify-center">
               <div className="h-8 w-24 bg-brand-600 dark:bg-brand-500 rounded-lg shadow-md shadow-brand-500/20" />
               <div className="h-8 w-8 bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg flex items-center justify-center text-gray-500">
                 <PlayCircle size={14} />
               </div>
             </div>
          </AnimatedBlock>

          {/* 3. Features Grid */}
          <AnimatedBlock delay={2.0} className="w-full grid grid-cols-2 gap-3">
            {[
              { icon: BarChart3, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
              { icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
              { icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
              { icon: CheckCircle2, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white dark:bg-white/5 border border-gray-200/50 dark:border-white/5 rounded-xl p-3 flex flex-col gap-2 shadow-sm">
                 <div className={`w-8 h-8 rounded-lg ${feature.bg} flex items-center justify-center ${feature.color}`}>
                   <feature.icon size={16} strokeWidth={2.5} />
                 </div>
                 <div className="space-y-1.5">
                   <div className="h-2 w-3/4 bg-gray-700 dark:bg-white/80 rounded" />
                   <div className="h-1.5 w-full bg-gray-300 dark:bg-white/20 rounded" />
                   <div className="h-1.5 w-5/6 bg-gray-300 dark:bg-white/20 rounded" />
                 </div>
              </div>
            ))}
          </AnimatedBlock>

          {/* 4. Content Block (Image + Text) */}
          <AnimatedBlock delay={2.6} className="w-full bg-white dark:bg-white/5 border border-gray-200/50 dark:border-white/5 rounded-xl p-3 shadow-sm flex gap-3 items-center">
             <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-white/10 shrink-0 border border-gray-200 dark:border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent" />
             </div>
             <div className="flex-1 space-y-1.5">
               <div className="h-2.5 w-2/3 bg-gray-700 dark:bg-white/80 rounded" />
               <div className="h-1.5 w-full bg-gray-300 dark:bg-white/20 rounded" />
               <div className="h-1.5 w-full bg-gray-300 dark:bg-white/20 rounded" />
               <div className="h-1.5 w-4/5 bg-gray-300 dark:bg-white/20 rounded" />
               
               <div className="pt-1 flex items-center gap-1">
                 <div className="h-2 w-16 bg-brand-500/20 text-[5px] font-bold text-brand-600 rounded flex items-center px-1">
                   Saber mais
                 </div>
                 <ArrowRight size={8} className="text-brand-500" />
               </div>
             </div>
          </AnimatedBlock>

        </div>
      </motion.div>

      {/* ============ Decorative Floating Elements Output ============ */}
      {/* These emphasize the "construction/rendering" aspect outside the browser */}
      
      {/* Code Snippet Floating */}
      <motion.div
        initial={{ opacity: 0, x: -40, y: 30, rotate: -5 }}
        animate={{ opacity: [0, 1, 0.8], x: 0, y: [0, -10, 0] }}
        transition={{ delay: 1, duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[-5%] sm:left-[-10%] top-[20%] p-3 rounded-xl bg-gray-900/90 dark:bg-black/90 backdrop-blur-md border border-gray-700 dark:border-white/10 shadow-xl z-20 hidden md:block"
      >
        <div className="flex flex-col gap-1.5">
          <div className="flex gap-1 mb-1">
            <span className="text-[#f87171] text-[10px] font-mono">const</span>
            <span className="text-[#60a5fa] text-[10px] font-mono">Hero</span>
            <span className="text-white text-[10px] font-mono">=</span>
            <span className="text-[#a78bfa] text-[10px] font-mono">()</span>
            <span className="text-[#60a5fa] text-[10px] font-mono">={'>'}</span>
            <span className="text-white text-[10px] font-mono">{'{'}</span>
          </div>
          <div className="h-1 w-24 bg-[#4ade80]/40 rounded ml-2" />
          <div className="h-1 w-20 bg-[#facc15]/40 rounded ml-2" />
          <div className="h-1 w-28 bg-[#60a5fa]/40 rounded ml-2" />
          <span className="text-white text-[10px] font-mono mt-1">{'}'}</span>
        </div>
      </motion.div>

      {/* Analytics Card Floating */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: -30, rotate: 5 }}
        animate={{ opacity: [0, 1, 0.9], x: 0, y: [0, 10, 0] }}
        transition={{ delay: 2.2, duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-5%] sm:right-[-8%] bottom-[25%] p-3 rounded-xl bg-white/95 dark:bg-[#111]/95 backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-2xl z-20 hidden md:flex items-center gap-3"
      >
        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
           <BarChart3 size={16} strokeWidth={3} />
        </div>
        <div>
          <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Conversão</div>
          <div className="text-sm font-bold text-gray-900 dark:text-white">+ 148%</div>
        </div>
      </motion.div>

    </div>
  );
}
