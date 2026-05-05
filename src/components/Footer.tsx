import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-coffee-dark text-crema h-12 flex items-center justify-between px-12 text-[10px] uppercase tracking-[0.2em]">
      <div className="flex gap-6">
        <span>© 2024 Café Selecto</span>
        <span className="opacity-50 hidden sm:block">Bogotá, CO</span>
      </div>
      <div className="flex gap-6">
        <Link to="/nosotros" className="hover:opacity-100 opacity-60 transition-opacity">Nosotros</Link>
        <Link to="/contacto" className="hover:opacity-100 opacity-60 transition-opacity">Contacto</Link>
        <a href="#" className="hover:opacity-100 opacity-60 transition-opacity hidden sm:block">Privacidad</a>
      </div>
    </footer>
  );
}
