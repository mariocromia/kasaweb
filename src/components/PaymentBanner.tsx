import { motion } from 'motion/react';
import { CreditCard, ShieldCheck, Zap } from 'lucide-react';

export default function PaymentBanner() {
  return (
    <section className="py-12 bg-white dark:bg-[#0a0a0a] relative overflow-hidden border-y border-gray-200 dark:border-white/5 transition-colors duration-300">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="p-8 md:p-10 rounded-3xl glass-card bg-gradient-to-r from-brand-50/50 via-accent-50/30 to-transparent dark:from-brand-900/20 dark:via-accent-900/10 dark:to-transparent flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 shrink-0">
              <CreditCard size={32} />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Parcele em até <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-600 dark:from-brand-400 dark:to-accent-400">10x sem juros</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Facilitamos o investimento no seu projeto digital. Aceitamos todos os cartões de crédito.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-md shadow-sm dark:shadow-none">
              <ShieldCheck className="text-brand-600 dark:text-brand-400" size={20} />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Pagamento Seguro</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-md shadow-sm dark:shadow-none">
              <Zap className="text-accent-600 dark:text-accent-400" size={20} />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Início Imediato</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
