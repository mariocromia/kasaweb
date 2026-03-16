import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';

const projects = [
  {
    title: 'Prapassar',
    description: 'Plataforma digital voltada para estudantes e concurseiros, com foco em organização, praticidade, experiência do usuário e performance no aprendizado.',
    buttonText: 'Acessar projeto',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    image: '/prapassar.JPG',
    url: 'https://prapassar.app'
  },
  {
    title: 'Flashcards Prapassar',
    description: 'Aplicativo complementar de flashcards integrado ao ecossistema Prapassar, focado em revisão ativa e memorização espaçada para maximizar a retenção de conteúdo.',
    buttonText: 'Acessar projeto',
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/30',
    image: '/prapassar_flash.JPG',
    url: 'https://flash.prapassar.app'
  },
  {
    title: 'SindGestor',
    description: 'Sistema web voltado para gestão e organização de rotinas, tarefas, informações e processos administrativos, focado em automação e controle.',
    buttonText: 'Acessar projeto',
    color: 'from-indigo-500/20 to-purple-500/20',
    borderColor: 'border-indigo-500/30',
    image: '/sindgestor.JPG',
    url: 'https://sindgestor.aprendendoaqui.com'
  },
  {
    title: 'NetSacolas',
    description: 'E-commerce especializado em embalagens personalizadas, unindo design premium, facilidade de compra e uma vitrine digital de alta autoridade.',
    buttonText: 'Acessar projeto',
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/30',
    image: '/netsacolas.JPG',
    url: 'https://nextsacolas.com'
  },
  {
    title: 'Projeto personalizado',
    description: 'Sua empresa também pode ter um website, landing page ou sistema web desenvolvido sob medida por nossa engenharia de elite.',
    buttonText: 'Solicitar orçamento',
    color: 'from-brand-500/20 to-accent-500/20',
    borderColor: 'border-brand-500/30',
    image: '/personalizado.JPG'
  },
];

const Card = ({ project, index, progress, range, targetScale }: any) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  const isLast = index === projects.length - 1;
  const { openModal } = useContactModal();

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${index * 25}px)` }}
        className={`relative flex flex-col md:flex-row w-full max-w-5xl h-auto md:h-[500px] p-0 md:p-12 rounded-3xl glass-card dark:${project.borderColor} group origin-top overflow-hidden`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-5 dark:opacity-10 rounded-3xl pointer-events-none`} />

        <div className="relative z-10 flex flex-col md:flex-row gap-0 md:gap-8 items-center justify-between w-full h-full">
          <div className="flex-1 flex flex-col justify-center p-8 md:p-0">
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">{project.title}</h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6 md:mb-10 max-w-xl">
              {project.description}
            </p>
            <div className="mt-4 md:mt-0">
              {isLast ? (
                <button
                  onClick={openModal}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all w-fit bg-brand-600 dark:bg-white text-white dark:text-black hover:scale-105 active:scale-95"
                >
                  {project.buttonText}
                  <ArrowUpRight size={20} />
                </button>
              ) : (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all w-fit bg-white dark:bg-white/5 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 shadow-sm dark:shadow-none"
                >
                  {project.buttonText}
                  <ArrowUpRight size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Decorative Mockup Area */}
          <div className="flex flex-1 w-full md:w-1/2 h-auto md:h-full relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 items-center justify-center">
            {project.image ? (
              <div className="relative w-full h-full flex items-center justify-center p-0 md:p-4">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  style={{ scale: imageScale }}
                  className="w-full h-auto md:h-full object-cover md:object-contain shadow-[0_10px_30px_rgba(0,0,0,0.1)] md:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border-t md:border border-gray-200 dark:border-white/10"
                />
              </div>
            ) : (
              <>
                <motion.div style={{ scale: imageScale }} className="absolute inset-0 bg-gradient-to-br from-gray-100 dark:from-white/5 to-transparent" />
                <div className="w-3/4 h-3/4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-md p-4 flex flex-col gap-4 shadow-xl dark:shadow-2xl">
                  <div className="flex items-center gap-2 border-b border-gray-100 dark:border-white/10 pb-4">
                    <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-white/20" />
                    <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-white/20" />
                    <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-white/20" />
                  </div>
                  <div className="flex-1 rounded-lg bg-gray-100 dark:bg-white/5" />
                </div>
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section id="projetos" className="bg-slate-100 dark:bg-[#050505] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
          >
            O Fim dos "Sites Panfletos": Casos Reais de Sucesso
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            Enquanto o mercado entrega códigos sem estratégia, nós entregamos previsibilidade. Navegue pelas plataformas e landing pages de alta conversão que projetamos para blindar o crescimento destas empresas.
          </motion.p>
        </div>
      </div>

      <div ref={containerRef} className="relative pb-[10vh]">
        {projects.map((project, i) => {
          const targetScale = 1 - ((projects.length - i) * 0.05);
          return (
            <Card
              key={i}
              i={i}
              project={project}
              index={i}
              progress={scrollYProgress}
              range={[i * .25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
