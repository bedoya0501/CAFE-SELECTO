import { Truck, ShieldCheck, Headphones, RotateCcw } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Envío Nacional',
      desc: 'Llegamos a todo el país con rapidez y seguridad.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Garantía Total',
      desc: 'Productos 100% auténticos con respaldo de marca.'
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: 'Asesoría Experta',
      desc: 'Te ayudamos a elegir el equipo ideal para tu perfil.'
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: 'Devoluciones',
      desc: 'Cambios sin complicaciones durante los primeros 30 días.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {benefits.map((b, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-6 group">
              <div className="w-16 h-16 rounded-full bg-crema flex items-center justify-center text-coffee mb-2 transition-transform group-hover:scale-110 group-hover:bg-coffee group-hover:text-white duration-300">
                {b.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-coffee uppercase tracking-[0.2em]">{b.title}</h3>
                <p className="text-[10px] text-coffee/60 leading-relaxed uppercase tracking-wider">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
