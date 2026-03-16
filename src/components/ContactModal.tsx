import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';

export default function ContactModal() {
  const { isOpen, closeModal } = useContactModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate an API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Close modal after success message
      setTimeout(() => {
        setIsSuccess(false);
        closeModal();
      }, 2500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-lg p-4 md:p-6"
          >
            <div className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden bg-white/95 dark:bg-[#0a0a0a]/95 shadow-2xl">
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors bg-gray-100 dark:bg-white/10 p-2 rounded-full"
              >
                <X size={20} />
              </button>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
                    <Send size={36} className="ml-1" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Mensagem enviada!</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Recebemos sua solicitação e retornaremos o mais breve possível.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 pr-8">
                    Solicitar Orçamento
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Preencha os dados abaixo e nossa equipe entrará em contato para entender seu projeto.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nome completo</label>
                      <input
                        required
                        type="text"
                        id="name"
                        className="w-full px-4 py-3.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-brand-500 outline-none transition-all dark:text-white"
                        placeholder="Como devemos te chamar?"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">E-mail</label>
                        <input
                          required
                          type="email"
                          id="email"
                          className="w-full px-4 py-3.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-brand-500 outline-none transition-all dark:text-white"
                          placeholder="seu@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">WhatsApp</label>
                        <input
                          required
                          type="tel"
                          id="phone"
                          className="w-full px-4 py-3.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-brand-500 outline-none transition-all dark:text-white"
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Sobre o projeto</label>
                      <textarea
                        required
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-brand-500 outline-none transition-all resize-none dark:text-white"
                        placeholder="Conte-nos um pouco sobre a sua necessidade ou ideia..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar solicitação'}
                      {!isSubmitting && <Send size={20} />}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
