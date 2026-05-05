import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import Process from '../components/Process';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setFeaturedProducts(data.filter((p: Product) => p.isFeatured)));
  }, []);

  return (
    <div className="space-y-0">
      <Hero />
      <Benefits />
      
      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-coffee-light">Colección</span>
              <h2 className="text-4xl font-serif font-bold text-coffee-dark">Productos Destacados</h2>
            </div>
            <Link to="/catalogo" className="flex items-center text-sm font-bold text-coffee hover:text-coffee-dark transition-colors group">
              Ver catálogo completo
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Process />

      {/* Newsletter Signup is in Footer, but we can add a specialized section here if needed */}
      <section className="py-32 bg-coffee-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop" 
            alt="Fondo" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif text-crema leading-tight">
            ¿Listo para llevar tu café al siguiente nivel?
          </h2>
          <p className="text-crema/60 text-lg">
            Únete a nuestra comunidad y recibe tutoriales exclusivos sobre métodos de extracción.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
             <input
              type="email"
              placeholder="Tu mejor correo"
              className="bg-white/10 border border-white/20 px-6 py-4 rounded-md text-white focus:outline-none focus:bg-white/20 transition-all font-sans flex-grow"
            />
            <button className="bg-crema text-coffee-dark px-8 py-4 rounded-md font-bold tracking-widest uppercase hover:bg-white transition-all">
              Suscribirme
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
