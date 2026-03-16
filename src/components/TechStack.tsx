import { motion } from 'motion/react';

const technologies = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend & API' },
  { name: 'TypeScript', category: 'Linguagem' },
  { name: 'Tailwind CSS', category: 'Estilização' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Figma', category: 'UI/UX Design' },
  { name: 'PostgreSQL', category: 'Banco de Dados' },
  { name: 'AWS', category: 'Infraestrutura' },
];

export default function TechStack() {
  return (
    <section className="py-24 bg-white dark:bg-[#050505] relative overflow-hidden border-t border-gray-100 dark:border-white/5 transition-colors duration-300">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-900/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
          >
            Tecnologia de ponta para resultados reais
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            Utilizamos as mesmas tecnologias adotadas pelas maiores empresas do mundo para garantir que seu projeto seja rápido, seguro e escalável.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="px-6 py-4 rounded-2xl glass-card flex flex-col items-center gap-1 cursor-default"
            >
              <span className="text-gray-900 dark:text-white font-semibold">{tech.name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{tech.category}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
