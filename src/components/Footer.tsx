import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#050505] border-t border-gray-200 dark:border-white/5 py-12 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          <div className="md:col-span-2">
            <a href="#" className="tracking-tighter flex items-center gap-3 mb-6">
              <img src="/KasaWeb.png" alt="Logo" className="h-9 w-auto brightness-0 opacity-80 dark:opacity-100 dark:invert" />
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-none uppercase text-gray-800 dark:text-white">Digital Solutions</span>
                <span className="text-[8px] font-bold tracking-[0.2em] text-gray-500 dark:text-white/70 mt-1 uppercase">Tecnologia & Design</span>
              </div>
            </a>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed">
              Pare de perder vendas. Aplicamos a ciência da conversão para transformar sua presença digital em uma máquina de lucro 24h.
            </p>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-6">Links Rápidos</h4>
            <ul className="space-y-4">
              <li><a href="#servicos" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#diferenciais" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-white transition-colors">Diferenciais</a></li>
              <li><a href="#projetos" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-white transition-colors">Projetos</a></li>
              <li><a href="#processo" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-white transition-colors">Processo</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-6">Contato</h4>
            <ul className="space-y-4">
              <li><a href="mailto:contato@kasaweb.com" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-white transition-colors">contato@kasaweb.com</a></li>
              <li><a href="https://wa.me/5521960154135" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-white transition-colors">+55 (21) 96015-4135</a></li>
              <li className="flex gap-4 pt-2">
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-white transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-white transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-white transition-colors"><Github size={20} /></a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; 2023 KasaWeb. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
