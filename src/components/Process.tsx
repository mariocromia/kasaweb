import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import MobileExpandableText from './MobileExpandableText';

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Raio-X de Lucratividade',
      description: '(O Diagnóstico) Nós não fazemos apenas reuniões, nós mapeamos a sua operação para encontrar o exato gargalo por onde o seu dinheiro está escorrendo hoje. Entendemos a sua dor, o seu mercado e traçamos a meta de conversão.',
    },
    {
      number: '02',
      title: 'Estratégia de Guerra',
      description: '(O Planejamento) Esqueça o "achismo". Desenhamos a arquitetura do seu novo ecossistema baseados estritamente em dados e ciência de vendas, criando o caminho mais curto e rápido entre o clique do visitante e o dinheiro na sua conta.',
    },
    {
      number: '03',
      title: 'Autoridade Visual',
      description: '(O Design) Não fazemos apenas "telas bonitinhas". Projetamos um Design Magnético que destrói o ceticismo do seu cliente em apenas 3 segundos, guiando-o sem atrito e com máxima clareza até o botão de compra.',
    },
    {
      number: '04',
      title: 'Construção da Máquina',
      description: '(O Desenvolvimento) Nossos engenheiros escrevem códigos limpos e blindados para um carregamento brutalmente rápido. Sua plataforma vai rodar no piloto automático em qualquer celular ou computador, sem travamentos que espantam os clientes mais impacientes.',
    },
    {
      number: '05',
      title: 'Lançamento e Paz de Espírito',
      description: '(A Evolução) A sua máquina vai para o ar, mas nós não sumimos. Assumimos o suporte técnico VIP e a blindagem contra falhas para que o seu único trabalho seja focar na gestão e no crescimento das suas vendas.',
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="processo" className="py-24 bg-white dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
          >
            A Engenharia Por Trás da Sua Nova Máquina de Vendas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            Um processo de 5 etapas testado no campo de batalha. Nós fazemos o trabalho duro, eliminamos as dores de cabeça técnicas e entregamos a sua empresa pronta para lucrar.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Animated Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-white/10 -translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 top-0 w-px bg-gradient-to-b from-brand-500 to-accent-500 -translate-x-1/2 origin-top"
          />

          <div className="flex flex-col gap-12 md:gap-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative flex items-center md:justify-between ${isEven ? 'md:flex-row-reverse' : ''}`}>

                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-white dark:bg-[#0a0a0a] border-2 border-gray-300 dark:border-white/20 -translate-x-1/2 z-10 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="w-2 h-2 rounded-full bg-accent-400"
                    />
                  </div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`ml-16 md:ml-0 md:w-[45%] ${isEven ? 'md:text-left' : 'md:text-right'}`}
                  >
                    <div className="p-8 rounded-2xl glass-card relative group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="text-5xl font-display font-bold text-gray-100 dark:text-white/10 absolute top-4 right-4 group-hover:text-gray-200 dark:group-hover:text-white/20 transition-colors">
                        {step.number}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 relative z-10">{step.title}</h3>
                      <MobileExpandableText 
                        text={step.description} 
                        className="text-gray-600 dark:text-gray-400 leading-relaxed relative z-10" 
                        lines={4} 
                      />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
