import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Qual é o prazo médio para entrega de um site?',
    answer: 'O prazo varia de acordo com a complexidade do projeto. Uma Landing Page pode levar de 7 a 15 dias, enquanto um site institucional completo ou sistema web pode levar de 30 a 60 dias. Definimos um cronograma claro logo na primeira reunião.',
  },
  {
    question: 'Meu site vai funcionar bem no celular?',
    answer: 'Com certeza! Todos os nossos projetos são desenvolvidos com a abordagem "Mobile First" (foco no celular), garantindo que a experiência, o design e a velocidade sejam perfeitos em qualquer tamanho de tela.',
  },
  {
    question: 'Vocês oferecem hospedagem e domínio?',
    answer: 'Sim, entregamos a solução completa. Seu projeto será alocado em nossa VPS de alta performance, um servidor privado e exclusivo que garante velocidade e segurança superiores às hospedagens comuns. Quanto ao domínio (o endereço .com.br), auxiliamos você em todo o processo de registro e compra para que a marca fique em seu nome, cuidando de toda a configuração técnica para que tudo funcione perfeitamente.',
  },
  {
    question: 'Como funciona a manutenção após a entrega?',
    answer: 'Oferecemos planos de manutenção mensal para garantir que seu site continue seguro, atualizado e com backup em dia. Caso prefira não ter um plano, você terá total autonomia para gerenciar o conteúdo através de um painel administrativo.',
  },
  {
    question: 'Quais são as formas de pagamento?',
    answer: 'Trabalhamos com parcelamento via PIX, boleto ou cartão de crédito, geralmente atrelado às entregas do projeto (ex: entrada + parcelas durante o desenvolvimento + parcela final na entrega).',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-slate-100 dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
          >
            Perguntas Frequentes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            Tire suas dúvidas sobre o nosso processo de trabalho e entregas.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl glass-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-lg font-medium text-gray-900 dark:text-white pr-8">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
