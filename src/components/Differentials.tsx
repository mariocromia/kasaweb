import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

export default function Differentials() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const differentials = [
    {
      title: 'Consultoria Estratégica de Negócios',
      description: 'Nós estudamos o exato gargalo da sua empresa e desenhamos a solução digital para resolvê-lo. O pensamento estratégico e o trabalho duro ficam nas nossas costas.',
    },
    {
      title: 'Engenharia Sob Medida para Escalar',
      description: 'Esqueça templates genéricos e "soluções de prateleira". Construímos a sua plataforma do zero, projetada milimetricamente para ditar o comportamento do seu cliente ideal.',
    },
    {
      title: 'Foco Obsessivo em ROI (Retorno sobre Investimento)',
      description: 'Não fazemos "arte virtual". Cada pixel e linha de código tem um único objetivo prático: sugar a atenção do visitante e forçá-lo a tomar uma ação de compra ou pedido de orçamento.',
    },
    {
      title: 'Design de Alta Autoridade',
      description: 'Interfaces magnéticas e imersivas que destroem o ceticismo do seu cliente em 3 segundos, posicionando sua marca como a escolha mais cara, confiável e lógica do mercado.',
    },
    {
      title: 'Navegação de Fricção Zero',
      description: 'Criamos caminhos tão óbvios e fluidos que o seu cliente chega ao momento do pagamento de forma automática, sem atrito e sem precisar pensar.',
    },
    {
      title: 'Paz de Espírito Absoluta',
      description: 'Chega de programadores que somem ou falam em "tecniquês" indecifrável. Você terá atualizações constantes, comunicação transparente e a certeza de que seu projeto está sob controle.',
    },
    {
      title: 'Tecnologia à Prova de Gargalos',
      description: 'A sua empresa vai crescer, e a sua estrutura digital não vai travar. Entregamos um código limpo e de alta performance, pronto para suportar picos de tráfego e segurar a atenção do consumidor mais impaciente.',
    },
  ];

  return (
    <section id="diferenciais" className="py-24 bg-white dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
              Muito Além do Código: <span className="text-gradient">Nós Construímos a Sua Máquina de Lucro Previsível</span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-400 leading-relaxed">
              Enquanto agências comuns entregam sites que funcionam como "panfletos mortos", nós entregamos ecossistemas de vendas agressivos. Nosso único foco é automatizar a sua operação, destruir a sua concorrência visualmente e multiplicar o faturamento do seu negócio 24 horas por dia.
            </p>
          </motion.div>

          <div className="relative">
            {/* Animated vertical line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-[15px] top-4 bottom-4 w-px bg-gradient-to-b from-brand-500/50 via-accent-500/50 to-transparent hidden md:block"
            />

            <div className="flex flex-col gap-6">
              {differentials.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col glass-card p-5 md:p-6 rounded-2xl relative z-10 cursor-pointer outline-none focus-within:ring-2 focus-within:ring-brand-500/50 transition-all duration-300"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  onMouseEnter={() => setOpenIndex(index)}
                  onFocus={() => setOpenIndex(index)}
                  whileHover={{ scale: 1.01 }}
                  tabIndex={0}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${openIndex === index ? 'bg-brand-500 text-white' : 'bg-brand-500/10 text-brand-500'}`}>
                      {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                    <span className={`text-lg font-bold transition-colors duration-300 ${openIndex === index ? 'text-brand-600 dark:text-brand-400' : 'text-gray-900 dark:text-white'} leading-tight`}>
                      {item.title}
                    </span>
                  </div>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm md:text-base text-gray-700 dark:text-gray-400 leading-relaxed pl-12">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
