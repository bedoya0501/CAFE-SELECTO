import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, Coffee, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Catálogo', path: '/catalogo' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-md border-b border-coffee/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-coffee rounded-full flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent -rotate-45"></div>
            </div>
            <span className="text-xl font-bold tracking-tight uppercase text-coffee-dark">
              Café <span className="font-light opacity-60">Selecto</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-xs font-medium uppercase tracking-widest text-coffee-dark hover:opacity-60 transition-opacity"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-5">
            <div className="hidden sm:block relative">
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="bg-white/40 border border-coffee/20 rounded-full py-1.5 px-4 text-xs w-48 focus:outline-none focus:ring-1 focus:ring-coffee"
              />
              <Search className="absolute right-3 top-1.5 w-4 h-4 text-coffee/40" />
            </div>
            <Link to="/carrito" className="p-2 text-coffee-dark hover:opacity-60 transition-opacity relative">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-coffee text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {user ? (
               <div className="hidden md:flex items-center space-x-4">
                  <Link to="/perfil" className="w-8 h-8 rounded-full bg-coffee text-white flex items-center justify-center text-xs font-bold font-serif hover:scale-105 transition-transform">
                    {user.name[0]}
                  </Link>
                  <button onClick={logout} className="text-coffee-dark/40 hover:text-red-500 transition-colors">
                    <LogOut className="w-4 h-4" />
                  </button>
               </div>
            ) : (
              <Link to="/login" className="hidden md:block text-xs font-bold uppercase tracking-widest text-coffee hover:text-coffee-dark transition-colors">
                Ingresar
              </Link>
            )}
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-coffee-dark"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-crema/95 backdrop-blur-xl border-t border-coffee/10 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-bold uppercase tracking-[0.2em] text-coffee-dark hover:text-coffee"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-coffee/10">
                {user ? (
                  <div className="flex items-center justify-between">
                    <Link
                      to="/perfil"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 text-coffee-dark"
                    >
                      <div className="w-10 h-10 rounded-full bg-coffee text-white flex items-center justify-center font-bold font-serif">
                        {user.name[0]}
                      </div>
                      <div className="space-y-1">
                        <span className="block text-sm font-bold">{user.name}</span>
                        <span className="block text-[10px] uppercase font-bold tracking-widest opacity-40">Ver Perfil</span>
                      </div>
                    </Link>
                    <button onClick={logout} className="p-3 text-red-500"><LogOut className="w-5 h-5" /></button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full bg-coffee text-white text-center py-4 rounded-full text-xs font-bold uppercase tracking-widest"
                  >
                    Ingresar
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
