import { motion } from 'motion/react';
import { Target, TrendingUp, ShieldCheck, Zap, MonitorSmartphone, HeadphonesIcon } from 'lucide-react';

export default function ValueProposition() {
  const benefits = [
    {
      icon: <MonitorSmartphone className="w-6 h-6 text-brand-400" />,
      title: 'Você no Bolso do Seu Cliente',
      description: 'Mais de 70% das decisões de compra acontecem no celular. Entregamos uma experiência imersiva e sem falhas, fazendo o seu cliente comprar ou pedir orçamento de onde estiver.',
    },
    {
      icon: <Target className="w-6 h-6 text-accent-400" />,
      title: 'Máquina de Captura de Leads',
      description: 'Não fazemos "arte virtual". Nossas estruturas são validadas cientificamente para guiar a mente do visitante e forçá-lo a tomar a ação que o seu negócio precisa.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-400" />,
      title: 'O Piloto Automático da Sua Empresa',
      description: 'Soluções sob medida que eliminam o seu trabalho manual, reduzem erros operacionais e fazem a sua empresa rodar e escalar sem depender exclusivamente de você.',
    },
    {
      icon: <Zap className="w-6 h-6 text-accent-400" />,
      title: 'Velocidade Brutal que Retém Vendas',
      description: 'Cada segundo de lentidão em um site destrói o seu lucro. Construímos códigos otimizados para um carregamento instantâneo, segurando a atenção do consumidor mais impaciente.',
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-brand-400" />,
      title: 'Navegação de Fricção Zero',
      description: 'Criamos caminhos óbvios. O design é pensado para reduzir o atrito mental do usuário, conduzindo-o até a compra final com o mínimo de esforço possível.',
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6 text-accent-400" />,
      title: 'O Trabalho Duro e Chato Fica Com a Gente',
      description: 'Você foca na gestão e no lucro da sua empresa, e nós garantimos que a sua estrutura digital evolua sem travamentos. A manutenção e a dor de cabeça técnica ficam 100% nas nossas costas.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="py-24 bg-white dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
          >
            O Seu Site Atual é um <span className="text-gradient">"Funcionário Preguiçoso"</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-700 dark:text-gray-400"
          >
            A sua presença digital não pode ser apenas um cartão de visitas ignorado. Nós desenvolvemos máquinas de vendas 24 horas. Unimos design de elite e engenharia de conversão para transformar visitantes perdidos em clientes pagantes todos os dias.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-8 rounded-2xl glass-card relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm dark:shadow-none">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
              <p className="text-gray-700 dark:text-gray-400 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
