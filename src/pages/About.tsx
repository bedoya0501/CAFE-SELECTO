import { motion } from 'motion/react';
import { Coffee, Heart, Globe, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-crema min-h-screen">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-coffee-dark text-crema">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop" 
            alt="Fondo" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-coffee-light">Nuestra Esencia</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">Pasión por el <br /> <span className="italic">Detalle</span></h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-crema">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-serif font-bold text-coffee-dark">De la finca a tu hogar</h2>
            <p className="text-zinc-600 leading-relaxed text-lg">
              Café Selecto nació de una obsesión: encontrar el equipo perfecto que hiciera justicia al trabajo de los caficultores. Creemos que cada grano de especialidad merece ser extraído con la precisión que solo las mejores herramientas pueden ofrecer.
            </p>
            <p className="text-zinc-600 leading-relaxed text-lg">
              No somos solo una tienda, somos una comunidad de entusiastas dedicados a democratizar el acceso a equipos de nivel profesional para el hogar.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="space-y-2">
                <span className="text-3xl font-serif font-bold text-coffee">2018</span>
                <p className="text-xs text-zinc-400 uppercase font-bold tracking-widest">Año de fundación</p>
              </div>
              <div className="space-y-2">
                <span className="text-3xl font-serif font-bold text-coffee">+50k</span>
                <p className="text-xs text-zinc-400 uppercase font-bold tracking-widest">Clientes felices</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl skew-y-1">
              <img 
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop" 
                alt="Proceso de café" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl space-y-2 max-w-[200px]">
              <Coffee className="text-coffee w-8 h-8" />
              <p className="font-bold text-coffee-dark text-sm leading-tight">Curaduría 100% Barista</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-serif font-bold text-coffee-dark">Lo que nos mueve</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Heart />, title: 'Amor al Origen', desc: 'Respetamos el ciclo del café y a sus productores.' },
              { icon: <Users />, title: 'Comunidad', desc: 'Compartimos conocimiento para que todos logren su mejor taza.' },
              { icon: <Globe />, title: 'Sostenibilidad', desc: 'Empaques y procesos con mínimo impacto ambiental.' }
            ].map((v, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-16 h-16 bg-crema text-coffee rounded-full flex items-center justify-center mx-auto transition-transform hover:scale-110">
                  {v.icon}
                </div>
                <h4 className="text-xl font-bold text-coffee-dark">{v.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
