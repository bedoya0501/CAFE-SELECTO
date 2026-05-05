import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Coffee, Mail, Lock, User } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, isLogin ? 'Usuario Demo' : name);
      toast.success(isLogin ? '¡Bienvenido de nuevo!' : '¡Cuenta creada con éxito!');
      navigate('/perfil');
    } catch (error) {
      toast.error('Hubo un error al ingresar');
    }
  };

  return (
    <div className="min-h-screen bg-crema flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-coffee/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-coffee/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/40 backdrop-blur-xl border border-white p-8 md:p-12 rounded-[48px] shadow-2xl relative z-10"
      >
        <div className="text-center space-y-6 mb-12">
          <div className="w-16 h-16 bg-coffee rounded-full flex items-center justify-center mx-auto shadow-lg shadow-coffee/20">
            <Coffee className="text-white w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-serif font-bold text-coffee-dark uppercase tracking-tight">
              {isLogin ? 'Bienvenido' : 'Únete gratis'}
            </h1>
            <p className="text-coffee/60 text-xs font-bold uppercase tracking-widest">
              {isLogin ? 'Ingresa a tu cuenta premium' : 'Comienza tu viaje en el café'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
             <div className="space-y-2">
              <label className="text-[10px] font-bold text-coffee uppercase tracking-widest pl-4">Nombre Completo</label>
              <div className="relative">
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full bg-white border border-coffee/10 px-12 py-4 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-coffee/20 transition-all"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee/40" />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-coffee uppercase tracking-widest pl-4">Correo Electrónico</label>
            <div className="relative">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@ejemplo.com"
                className="w-full bg-white border border-coffee/10 px-12 py-4 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-coffee/20 transition-all"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee/40" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-coffee uppercase tracking-widest pl-4">Contraseña</label>
            <div className="relative">
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full bg-white border border-coffee/10 px-12 py-4 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-coffee/20 transition-all"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee/40" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-coffee text-white py-4 rounded-full font-bold tracking-widest uppercase hover:bg-coffee-dark transition-all shadow-xl shadow-coffee/20 active:scale-95"
          >
            {isLogin ? 'Ingresar' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="mt-8 text-center text-xs font-bold uppercase tracking-widest text-coffee/40">
          O continúa con
        </div>

        <div className="mt-6 flex gap-4">
          <button className="flex-1 bg-white border border-coffee/10 py-3 rounded-full flex items-center justify-center hover:bg-crema transition-colors">
            <span className="text-[10px] font-bold opacity-60">GOOGLE</span>
          </button>
          <button className="flex-1 bg-white border border-coffee/10 py-3 rounded-full flex items-center justify-center hover:bg-crema transition-colors">
            <span className="text-[10px] font-bold opacity-60">APPLE</span>
          </button>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-bold text-coffee hover:underline uppercase tracking-widest"
          >
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Ingresa'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
