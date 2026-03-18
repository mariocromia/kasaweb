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
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
          style={{ 
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)'
          }}
        >
          <img 
            src="/hero01.JPG" 
            alt="Background" 
            className="w-full h-full object-cover object-center opacity-50 dark:opacity-35"
          />
        </motion.div>
        
        {/* Dark radial overlay specifically behind text to increase contrast */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[30rem] bg-slate-100/40 dark:bg-black/60 rounded-full blur-[90px] pointer-events-none" />

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent-500/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center justify-center text-center min-h-[60vh]">
        {/* Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 md:gap-8 items-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/70 dark:bg-black/60 border border-gray-200 dark:border-white/10 w-fit backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-gray-800 dark:text-gray-200 text-center">Desenvolvimento de Alta Performance</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="max-w-[90vw] md:max-w-none text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] md:leading-[1.1] text-gray-900 dark:text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col items-center">
            {/* Mobile Title (3 lines) */}
            <span className="md:hidden flex flex-col items-center w-full gap-1">
              <span className="text-center w-full">Domine o Seu Mercado</span>
              <span className="text-center w-full">com um Posicionamento</span>
              <span className="text-center w-full">Digital de <span className="text-gradient">Elite</span></span>
            </span>
            
            {/* Desktop Title (2 lines) */}
            <span className="hidden md:flex flex-col items-center w-full">
              <span className="whitespace-nowrap text-center w-full">Domine o Seu Mercado com um</span>
              <span className="text-center w-full mt-1">Posicionamento Digital de <span className="text-gradient">Elite</span></span>
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-gray-800 dark:text-gray-300 leading-relaxed max-w-[90vw] md:max-w-2xl drop-shadow-md font-medium px-4 text-center">
            Pare de perder vendas. Aplicamos a ciência da conversão para transformar sua presença digital em uma máquina de lucro 24h.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 w-[90vw] sm:w-auto justify-center">
            <button onClick={openModal} className="w-full sm:w-auto group relative px-6 py-3.5 md:px-8 md:py-4 bg-brand-600 dark:bg-white text-white dark:text-black rounded-xl font-semibold text-base md:text-lg overflow-hidden flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-brand-500/20">
              <span className="relative z-10">Solicitar orçamento</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-600 dark:from-gray-200 dark:to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <a href="https://wa.me/5521960154135" target="_blank" rel="noreferrer" data-track="3. Falar no WhatsApp" className="w-full sm:w-auto px-6 py-3.5 md:px-8 md:py-4 bg-white/90 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white rounded-xl font-semibold text-base md:text-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 backdrop-blur-md shadow-sm">
              Falar no WhatsApp
            </a>
          </motion.div>

          <motion.p variants={itemVariants} className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mt-4 md:mt-4 max-w-[85vw] text-center">
            Projetos sob medida, design premium, experiência fluida e foco em resultado.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
