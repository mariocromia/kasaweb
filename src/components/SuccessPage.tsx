import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowLeft, Send } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl text-center"
      >
        <div className="glass-card rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden bg-white/95 dark:bg-[#0a0a0a]/95 shadow-2xl border border-gray-200/50 dark:border-white/10">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative z-10"
          >
            <div className="w-24 h-24 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/10 border border-green-200/50 dark:border-green-500/30">
              <CheckCircle2 size={48} />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Solicitação <span className="text-brand-600 dark:text-brand-400">Enviada!</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-md mx-auto">
              Recebemos seus dados com sucesso. Nossa equipe entrará em contato em breve para discutir seu projeto.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => window.location.href = '/'}
                className="group flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-semibold transition-all hover:scale-105 active:scale-95"
              >
                <ArrowLeft size={20} />
                Voltar ao Início
              </button>
              
              <a 
                href="https://wa.me/5511999999999" // TODO: Update with actual number if provided
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-semibold transition-all hover:scale-105 active:scale-95"
              >
                Atendimento Imediato
                <Send size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-sm text-gray-500 dark:text-gray-500 font-medium"
        >
          © {new Date().getFullYear()} KasaWeb Digital Solutions · CNPJ: 14.502.812/0001-20
        </motion.p>
      </motion.div>
    </div>
  );
}
