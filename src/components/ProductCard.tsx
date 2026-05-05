import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Plus } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { motion } from 'motion/react';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} añadido al carrito`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group bg-crema/50 backdrop-blur-sm rounded-[32px] overflow-hidden border border-white/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <Link to={`/producto/${product.slug}`} className="block relative aspect-square overflow-hidden bg-white/80 p-4">
        <div className="w-full h-full rounded-2xl overflow-hidden relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-2 left-2 bg-coffee text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
            TOP
          </div>
          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md flex items-center space-x-1 shadow-sm">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="text-[10px] font-bold text-coffee-dark">{product.rating}</span>
          </div>
        </div>
      </Link>

      <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-xs font-bold text-coffee uppercase tracking-wider">
              {product.category}
            </h3>
            <span className="text-sm font-bold text-coffee-dark">
              {formatPrice(product.price)}
            </span>
          </div>
          <Link to={`/producto/${product.slug}`}>
            <h3 className="text-[10px] text-coffee/60 line-clamp-1 group-hover:text-coffee transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
