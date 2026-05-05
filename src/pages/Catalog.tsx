import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { SlidersHorizontal, ChevronDown, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['básculas', 'molinillos', 'accesorios', 'kits'];
  const sorts = [
    { label: 'Popularidad', value: 'rating' },
    { label: 'Precio: Bajo a Alto', value: 'price_asc' },
    { label: 'Precio: Alto a Bajo', value: 'price_desc' },
  ];

  useEffect(() => {
    setLoading(true);
    const query = searchParams.toString();
    fetch(`/api/products?${query}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, [searchParams]);

  const updateFilter = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const activeCategory = searchParams.get('category');
  const activeSort = searchParams.get('sort') || 'rating';

  return (
    <div className="bg-crema min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-coffee/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl font-serif font-bold text-coffee-dark uppercase tracking-tight">Catálogo</h1>
          <p className="text-zinc-500 max-w-xl mx-auto">
            Herramientas seleccionadas para el entusiasta del café. Calidad que se nota en cada taza.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white border border-coffee/10 px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filtros</span>
            </button>
            <div className="hidden sm:flex items-center space-x-2">
              <button
                onClick={() => updateFilter('category', null)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${!activeCategory ? 'bg-coffee text-white shadow-md' : 'bg-white border border-coffee/10 text-zinc-600 hover:bg-zinc-50'}`}
              >
                Todos
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => updateFilter('category', cat)}
                  className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${activeCategory === cat ? 'bg-coffee text-white shadow-md' : 'bg-white border border-coffee/10 text-zinc-600 hover:bg-zinc-50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest hidden md:block">Ordenar por</span>
            <select
              value={activeSort}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="bg-white border border-coffee/10 px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-1 focus:ring-coffee/50"
            >
              {sorts.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-6 rounded-xl border border-coffee/10 shadow-lg mb-8 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-[0.1em] text-coffee-dark">Categoría</h4>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => updateFilter('category', null)} className="text-xs border px-3 py-1.5 rounded-full hover:bg-crema">Todos</button>
                  {categories.map(cat => (
                    <button key={cat} onClick={() => updateFilter('category', cat)} className="text-xs border px-3 py-1.5 rounded-full hover:bg-crema capitalize">{cat}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-[0.1em] text-coffee-dark">Búsqueda</h4>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="¿Qué buscas?"
                    className="w-full pl-4 pr-10 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-coffee"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') updateFilter('search', (e.target as HTMLInputElement).value);
                    }}
                  />
                  <Search className="absolute right-3 top-2.5 w-4 h-4 text-zinc-400" />
                </div>
              </div>
              <div className="flex items-end justify-end">
                <button
                  onClick={() => setShowFilters(false)}
                  className="bg-zinc-100 text-zinc-600 px-4 py-2 rounded-md text-sm font-bold flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Cerrar</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white h-96 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-y-4">
            <p className="text-zinc-500 font-medium">No encontramos productos con esos filtros.</p>
            <button onClick={() => setSearchParams({})} className="text-coffee font-bold underline">Limpiar filtros</button>
          </div>
        )}
      </div>
    </div>
  );
}
