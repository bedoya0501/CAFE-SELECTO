import { motion } from 'motion/react';

export default function Process() {
  const steps = [
    { number: '01', title: 'Selección', desc: 'Curamos personalmente cada producto bajo estándares internacionales.' },
    { number: '02', title: 'Pruebas', desc: 'Sometemos los equipos a pruebas de estrés y precisión en barra.' },
    { number: '03', title: 'Calidad', desc: 'Verificamos que cada unidad esté en perfectas condiciones.' },
    { number: '04', title: 'Envío', desc: 'Empaquetamos con materiales sostenibles y llegamos a tu puerta.' }
  ];

  return (
    <section className="py-24 bg-crema">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-coffee-light">¿Por qué nosotros?</span>
          <h2 className="text-4xl font-serif font-bold text-coffee-dark">Nuestro Compromiso</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white/40 backdrop-blur-sm p-8 rounded-[32px] border border-white shadow-sm relative group transition-all"
            >
              <span className="text-6xl font-sans font-black text-white/40 group-hover:text-coffee/5 transition-colors absolute top-4 right-6 select-none">
                {step.number}
              </span>
              <div className="relative z-10 space-y-4">
                <h3 className="text-sm font-bold text-coffee uppercase tracking-[0.2em]">{step.title}</h3>
                <p className="text-[10px] text-coffee/60 leading-relaxed uppercase tracking-widest">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
