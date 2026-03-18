import { motion } from 'motion/react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';

export default function CTA() {
  const { openModal } = useContactModal();

  return (
    <section id="contato" className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="p-12 md:p-16 rounded-[2.5rem] glass-card relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-accent-500/10 opacity-50" />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              A Escolha é Sua: Continuar Perdendo Vendas ou Ligar a Sua Máquina de Lucro?
            </h2>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
              Você tem dois caminhos agora. O primeiro é ignorar esta página e continuar vendo a sua concorrência roubar os seus melhores clientes todos os dias porque a sua estrutura digital é fraca. O segundo é agir com inteligência. Toque no botão abaixo para agendar um Raio-X Estratégico Gratuito do seu negócio. Um de nossos especialistas vai mapear os gargalos da sua empresa e mostrar exatamente o que precisamos construir para escalar as suas vendas. Sem compromisso e com risco zero.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
              <button
                onClick={openModal}
                data-track="11. Quero agendar meu raio-x estratégico grátis"
                className="group relative px-8 py-5 bg-white text-black rounded-xl font-bold text-base md:text-lg overflow-hidden flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                <span className="relative z-10 flex flex-col leading-tight">
                  <span className="whitespace-nowrap">QUERO AGENDAR MEU RAIO-X</span>
                  <span>ESTRATÉGICO GRÁTIS</span>
                </span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <a
                href="https://wa.me/5521960154135"
                target="_blank"
                rel="noreferrer"
                data-track="12. Destravar minha empresa no WhatsApp"
                className="px-8 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold text-base md:text-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 backdrop-blur-md"
              >
                <MessageCircle className="w-5 h-5 text-accent-400 flex-shrink-0" />
                <span className="flex flex-col leading-tight text-left">
                  <span className="whitespace-nowrap">DESTRAVAR MINHA</span>
                  <span className="whitespace-nowrap">EMPRESA NO WHATSAPP</span>
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
