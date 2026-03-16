import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Arthur Pedro',
    role: 'CEO, Netsacolas Embalagens',
    content: 'A KasaWeb transformou completamente nossa presença online. O novo sistema web não apenas melhorou nossa eficiência interna, mas também impressionou nossos clientes. Profissionalismo do início ao fim.',
    rating: 5,
    initials: 'AP',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Iris Silva',
    role: 'CEO, Prapassar',
    content: 'O nível de detalhe e o cuidado com a experiência do usuário são excepcionais. Nossa taxa de conversão aumentou 40% no primeiro mês após o lançamento do Prapassar Flashcards novo app educativo. Recomendo de olhos fechados!',
    rating: 5,
    initials: 'IS',
    color: 'from-brand-500 to-accent-500'
  },
  {
    name: 'Paulo Junior',
    role: 'CEO, SindGestor',
    content: 'Precisávamos de uma plataforma robusta e segura para gerenciar nossos condomínios. KasaWeb entendeu perfeitamente nossa necessidade e entregou um produto muito superior ao que imaginávamos.',
    rating: 5,
    initials: 'PJ',
    color: 'from-emerald-500 to-teal-500'
  }
];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/5 dark:bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium text-sm mb-6"
          >
            <Star size={16} className="fill-current" />
            Depoimentos
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            O que dizem nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-500">parceiros</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            Histórias reais de empresas que transformaram seus negócios com nossas soluções digitais.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="glass-card p-8 rounded-3xl relative group flex flex-col h-full"
            >
              <Quote className="absolute top-8 right-8 w-10 h-10 text-gray-200 dark:text-white/5 rotate-180 transition-transform group-hover:scale-110 group-hover:-rotate-12 duration-300" />

              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-8 relative z-10 leading-relaxed flex-grow">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
