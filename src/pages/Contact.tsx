import React from 'react';
import { Mail, Phone, MapPin, Instagram, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'react-hot-toast';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Mensaje enviado correctamente. ¡Pronto nos contactaremos!');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="bg-crema min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-coffee-light">Contacto</span>
              <h1 className="text-5xl font-serif font-bold text-coffee-dark uppercase tracking-tight">Hablemos de <br /> café</h1>
              <p className="text-zinc-500 max-w-md text-lg">
                ¿Dudas sobre un producto o necesitas ayuda con tu preparación? Estamos aquí para asesorarte.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-coffee shadow-sm group-hover:bg-coffee group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-coffee-dark">Correo Electrónico</h4>
                  <p className="text-zinc-500 text-sm">hola@cafeselecto.co</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-coffee shadow-sm group-hover:bg-coffee group-hover:text-white transition-all">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-coffee-dark">WhatsApp</h4>
                  <p className="text-zinc-500 text-sm">+57 321 000 0000</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-coffee shadow-sm group-hover:bg-coffee group-hover:text-white transition-all">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-coffee-dark">Showroom</h4>
                  <p className="text-zinc-500 text-sm">Bogotá, Colombia - Calle 85 #11-32</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-coffee/10 flex space-x-6">
              <a href="#" className="p-3 bg-white rounded-full text-coffee hover:bg-coffee hover:text-white transition-all shadow-sm">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-3 bg-white rounded-full text-coffee hover:bg-coffee hover:text-white transition-all shadow-sm font-bold text-xs flex items-center justify-center">
                FB
              </a>
            </div>
          </div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-coffee/5"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">Nombre Completo</label>
                <input
                  required
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  className="w-full bg-crema/20 border border-coffee/10 px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-coffee/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">Email</label>
                <input
                  required
                  type="email"
                  placeholder="juan@ejemplo.com"
                  className="w-full bg-crema/20 border border-coffee/10 px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-coffee/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">Asunto</label>
                <select className="w-full bg-crema/20 border border-coffee/10 px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-coffee/20 transition-all">
                  <option>Consulta de producto</option>
                  <option>Estado de pedido</option>
                  <option>Ventas al por mayor</option>
                  <option>Otro</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">Mensaje</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Cuéntanos más..."
                  className="w-full bg-crema/20 border border-coffee/10 px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-coffee/20 transition-all resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-coffee text-white py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-coffee-dark transition-all shadow-xl shadow-coffee/20 active:scale-95"
              >
                Enviar Mensaje
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
