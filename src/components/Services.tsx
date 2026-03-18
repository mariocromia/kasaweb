import { motion } from 'motion/react';
import { Globe, MousePointerClick, Database, Wrench } from 'lucide-react';
import MobileExpandableText from './MobileExpandableText';

export default function Services() {
  const services = [
    {
      icon: <Globe className="w-8 h-8 text-brand-400" />,
      title: 'Websites de Alta Autoridade',
      description: '(O Seu Melhor Vendedor) Muito mais que um site "bonito". Criamos uma vitrine de credibilidade projetada cientificamente para posicionar sua marca no topo, destruir o ceticismo do visitante e transmitir confiança absoluta antes mesmo do primeiro contato.',
      initialOffset: { x: -50, y: 50, rotate: -5 },
    },
    {
      icon: <MousePointerClick className="w-8 h-8 text-accent-400" />,
      title: 'Landing Pages Letais',
      description: '(Máquinas de Conversão) Estruturas enxutas e agressivas desenhadas com um único objetivo: sugar a atenção do visitante e forçá-lo a tomar uma ação. Transforme cada centavo investido em anúncios em leads ultraqualificados e clientes pagantes.',
      initialOffset: { x: 50, y: 50, rotate: 5 },
    },
    {
      icon: <Database className="w-8 h-8 text-brand-400" />,
      title: 'Sistemas Sob Medida',
      description: '(A Cura para a Desorganização) Liberte-se dos processos manuais e planilhas confusas. Desenvolvemos plataformas exclusivas que automatizam o trabalho chato, reduzem erros da sua equipe e fazem a sua operação rodar mais rápido, com menos custo.',
      initialOffset: { x: -50, y: -50, rotate: 5 },
    },
    {
      icon: <Wrench className="w-8 h-8 text-accent-400" />,
      title: 'Suporte VIP e Evolução',
      description: '(O Fim da Dor de Cabeça Técnica) O trabalho sujo e os códigos difíceis ficam 100% com a nossa equipe. Blindamos sua estrutura contra falhas, aplicamos melhorias contínuas e garantimos que sua máquina nunca pare de rodar. O seu único foco será gerenciar o seu lucro.',
      initialOffset: { x: 50, y: -50, rotate: -5 },
    },
  ];

  return (
    <section id="servicos" className="py-24 bg-slate-100 dark:bg-[#050505] relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-900/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
          >
            O Arsenal Completo Para Escalar o Seu Negócio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-700 dark:text-gray-400"
          >
            Esqueça as "soluções de prateleira". Nós construímos o ecossistema digital exato que a sua empresa precisa para atrair, vender e operar no piloto automático.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: service.initialOffset.x,
                y: service.initialOffset.y,
                rotateZ: service.initialOffset.rotate,
                scale: 0.8
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                rotateZ: 0,
                scale: 1
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 1,
                delay: index * 0.1,
                type: "spring",
                stiffness: 50,
                damping: 15
              }}
              className="group relative p-10 rounded-3xl glass-card overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm dark:shadow-lg dark:shadow-black/20">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-500 group-hover:to-accent-500 dark:group-hover:from-brand-300 dark:group-hover:to-accent-300 transition-colors duration-300">
                  {service.title}
                </h3>
                <MobileExpandableText 
                  text={service.description} 
                  className="text-lg text-gray-700 dark:text-gray-400 leading-relaxed" 
                  lines={4} 
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl group-hover:bg-brand-500/20 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
