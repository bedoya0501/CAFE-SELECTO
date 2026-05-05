import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden bg-gradient-to-br from-white to-crema p-12">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:col-span-6 space-y-8"
        >
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-[0.2em] text-coffee uppercase block">Colección 2024</span>
            <h1 className="text-6xl md:text-7xl font-sans font-black text-coffee-dark leading-[0.95] tracking-tighter">
              Accesorios para <br />
              <span className="text-coffee/70">café de especialidad</span>
            </h1>
          </div>
          
          <p className="text-lg text-coffee/80 max-w-md leading-relaxed font-medium">
            Eleva tu ritual diario con herramientas de precisión diseñadas por y para baristas profesionales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to="/catalogo"
              className="bg-coffee text-white px-8 py-4 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-coffee-dark transition-all flex items-center justify-center group shadow-lg shadow-coffee/20"
            >
              Ver Catálogo
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/nosotros"
              className="bg-white/80 border border-coffee/20 text-coffee-dark px-8 py-4 rounded-full font-bold text-xs tracking-widest uppercase backdrop-blur-sm hover:bg-white transition-all text-center"
            >
              Nuestra Historia
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="md:col-span-6 relative aspect-square hidden md:block"
        >
          <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-[48px] border border-white/50 rotate-3 shadow-xl"></div>
          <div className="absolute inset-0 bg-coffee/5 rounded-[48px] -rotate-3 overflow-hidden shadow-sm">
             <img 
              src="https://images.unsplash.com/photo-1511232783436-311566e1e774?q=80&w=1000&auto=format&fit=crop" 
              alt="Café de especialidad" 
              className="w-full h-full object-cover opacity-90 transition-transform duration-1000 hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
