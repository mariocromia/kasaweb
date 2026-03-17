import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';

export default function Hero() {
  const { openModal } = useContactModal();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-slate-100 dark:bg-[#050505] transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent-500/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
        {/* Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 md:gap-8 max-w-3xl items-center text-center lg:items-start lg:text-left"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 w-fit backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Desenvolvimento de Alta Performance</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-gray-900 dark:text-white">
            Domine o Seu <span className="whitespace-nowrap">Mercado com um</span> Posicionamento Digital de <span className="text-gradient">Elite</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-700 dark:text-gray-400 leading-relaxed max-w-xl">
            Pare de perder vendas. Aplicamos a ciência da conversão para transformar sua presença digital em uma máquina de lucro 24h.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <button onClick={openModal} className="group relative px-8 py-4 bg-brand-600 dark:bg-white text-white dark:text-black rounded-xl font-semibold text-lg overflow-hidden flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-brand-500/20">
              <span className="relative z-10">Solicitar orçamento</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-600 dark:from-gray-200 dark:to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <a href="https://wa.me/5521960154135" target="_blank" rel="noreferrer" className="px-8 py-4 bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 backdrop-blur-md">
              Falar no WhatsApp
            </a>
          </motion.div>

          <motion.p variants={itemVariants} className="text-sm text-gray-500 font-medium">
            Projetos sob medida, design premium, experiência fluida e foco em resultado.
          </motion.p>
        </motion.div>

        {/* Visual Composition: Hero Image with Effects */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } }}
          className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center mt-8 lg:mt-0 perspective-[1000px]"
        >
          {/* Animated Glow Behind Image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-600/30 to-accent-500/30 rounded-3xl blur-3xl animate-pulse" />
          
          {/* Image Container with Mask and Tilt */}
          <motion.div 
            className="relative w-full max-w-lg lg:max-w-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm"
            style={{ 
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)'
            }}
            whileHover={{ scale: 1.02, rotateY: -2, rotateX: 2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <img 
              src="/hero01.JPG" 
              alt="Resultados de Alta Performance" 
              className="w-full h-auto object-cover relative z-10"
            />

            {/* Animated Arrow Overlay (Positioned over the cell phone graph) */}
            {/* The exact top/left values may need adjustment based on the image content */}
            <div className="absolute top-[66%] left-[19%] z-20 flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <span className="absolute w-12 h-12 bg-accent-400 rounded-full animate-ping opacity-50 mix-blend-screen" />
              <motion.div
                animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="text-accent-400 drop-shadow-[0_0_15px_rgba(16,185,129,1)] relative z-10"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
              </motion.div>
            </div>
            
            {/* Additional floating particle effect near the graph */}
            <motion.div
               animate={{ y: [0, -25], opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
               transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: 'easeOut' }}
               className="absolute top-[72%] left-[15%] w-2 h-2 rounded-full bg-accent-300 shadow-[0_0_10px_rgba(16,185,129,0.8)] z-20 pointer-events-none"
            />
            <motion.div
               animate={{ y: [0, -35], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
               transition={{ duration: 2.5, repeat: Infinity, delay: 1.2, ease: 'easeOut' }}
               className="absolute top-[75%] left-[22%] w-1.5 h-1.5 rounded-full bg-accent-200 shadow-[0_0_8px_rgba(16,185,129,0.8)] z-20 pointer-events-none"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
