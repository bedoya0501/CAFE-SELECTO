import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { formatPrice } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Star, Check, ChevronLeft, Minus, Plus, Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'motion/react';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('desc');
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="h-screen flex items-center justify-center font-serif text-2xl text-coffee">Cargando...</div>;
  if (!product) return <div className="h-screen flex items-center justify-center">Producto no encontrado</div>;

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${product.name} añadido al carrito`);
  };

  return (
    <div className="bg-crema min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Breadcrumbs */}
        <Link to="/catalogo" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-coffee mb-8 group">
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square bg-white rounded-3xl overflow-hidden border border-coffee/10 shadow-lg"
            >
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-coffee cursor-pointer transition-all">
                  <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-coffee-light">{product.category}</span>
                <button className="text-zinc-400 hover:text-coffee">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-coffee-dark leading-tight">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-4 h-4 ${s <= Math.floor(product.rating) ? 'text-amber-500 fill-amber-500' : 'text-zinc-300'}`} />
                  ))}
                  <span className="text-sm font-bold ml-2 text-coffee-dark">{product.rating}</span>
                </div>
                <span className="text-zinc-300">|</span>
                <span className="text-sm text-zinc-500">{product.reviews.length} Reseñas</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-3xl font-serif font-bold text-coffee">{formatPrice(product.price)}</span>
              <p className="text-xs text-zinc-400">Impuestos incluidos. Envío calculado al finalizar la compra.</p>
            </div>

            <p className="text-zinc-600 leading-relaxed text-lg">
              {product.description}
            </p>

            <div className="space-y-4 pt-6 border-t border-coffee/10">
              <div className="flex items-center space-x-6">
                <div className="flex items-center border border-coffee/20 rounded-lg p-1 bg-white">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2 hover:bg-crema rounded-md transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-2 hover:bg-crema rounded-md transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-grow bg-coffee text-white px-8 py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-coffee-dark transition-all flex items-center justify-center space-x-3 shadow-xl shadow-coffee/20"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Añadir al carrito</span>
                </button>
              </div>
              <button
                className="w-full border-2 border-coffee text-coffee px-8 py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-coffee/5 transition-all"
              >
                Comprar ahora
              </button>
            </div>

            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-2 text-sm text-green-600 font-medium">
                <Check className="w-4 h-4" />
                <span>Disponible para envío inmediato</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-20">
          <div className="flex border-b border-coffee/10">
            {[
              { id: 'desc', label: 'Descripción' },
              { id: 'specs', label: 'Especificaciones' },
              { id: 'reviews', label: 'Reseñas' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === tab.id ? 'text-coffee' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-1 bg-coffee" />
                )}
              </button>
            ))}
          </div>

          <div className="py-12 px-2 max-w-4xl">
            {activeTab === 'desc' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-2xl font-serif font-bold text-coffee-dark">Sobre este producto</h3>
                <p className="text-zinc-600 leading-relaxed">{product.description}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {product.features.map((f, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-coffee mt-2" />
                      <span className="text-zinc-600 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="animate-in fade-in duration-500">
                <div className="bg-white rounded-2xl overflow-hidden border border-coffee/10">
                  {Object.entries(product.specs).map(([key, val], i) => (
                    <div key={i} className={`flex justify-between p-4 px-8 text-sm ${i % 2 === 0 ? 'bg-zinc-50' : ''}`}>
                      <span className="font-bold text-coffee-dark">{key}</span>
                      <span className="text-zinc-600">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                {product.reviews.length > 0 ? (
                  product.reviews.map(review => (
                    <div key={review.id} className="space-y-4 border-b border-coffee/10 pb-8 last:border-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-coffee-light/20 flex items-center justify-center font-bold text-coffee">
                            {review.userName[0]}
                          </div>
                          <div>
                            <h4 className="font-bold text-coffee-dark text-sm">{review.userName}</h4>
                            <span className="text-xs text-zinc-400">{review.date}</span>
                          </div>
                        </div>
                        <div className="flex">
                           {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`w-3 h-3 ${s <= review.rating ? 'text-amber-500 fill-amber-500' : 'text-zinc-300'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-zinc-600 text-sm italic">"{review.comment}"</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-coffee/20">
                    <p className="text-zinc-400">Aún no hay reseñas para este producto.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
