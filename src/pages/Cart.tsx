import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'react-hot-toast';

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const finalTotal = totalPrice - (totalPrice * discount);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'CAFELOVER') {
      setDiscount(0.10);
      setCouponError('');
      toast.success('¡Cupón aplicado! 10% de descuento');
    } else {
      setDiscount(0);
      setCouponError('Código inválido');
      toast.error('Código inválido');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 px-4">
        <div className="w-24 h-24 bg-crema-dark/20 rounded-full flex items-center justify-center text-coffee-light">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-serif font-bold text-coffee-dark">Tu carrito está vacío</h2>
          <p className="text-zinc-500">Parece que aún no has añadido nada a tu selección.</p>
        </div>
        <Link
          to="/catalogo"
          className="bg-coffee text-white px-8 py-3 rounded-md font-bold tracking-widest uppercase hover:bg-coffee-dark transition-all"
        >
          Explorar Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-crema min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-coffee-dark mb-12">Tu Carrito ({totalItems})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 shadow-sm border border-coffee/5"
                >
                  <div className="w-24 h-24 bg-crema rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-grow space-y-1 text-center sm:text-left">
                    <h3 className="font-bold text-coffee-dark">{item.name}</h3>
                    <p className="text-sm text-coffee font-medium">{formatPrice(item.price)}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-coffee/10 rounded-lg p-1 bg-crema/20">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-white rounded-md transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white rounded-md transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-coffee/10 space-y-6 sticky top-24">
              <h3 className="text-xl font-serif font-bold text-coffee-dark border-b border-coffee/10 pb-4">Resumen</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-medium text-coffee-dark">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Envío</span>
                  <span className="text-green-600 font-bold">Gratis</span>
                </div>
                {discount > 0 && (
                   <div className="flex justify-between text-sm text-green-600 font-bold">
                    <span>Descuento (10%)</span>
                    <span>-{formatPrice(totalPrice * discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Impuestos</span>
                  <span className="font-medium text-coffee-dark italic">Incluidos</span>
                </div>
              </div>

              <div className="pt-6 border-t border-coffee/20 flex justify-between items-center">
                <span className="text-lg font-serif font-bold text-coffee-dark">Total</span>
                <span className="text-2xl font-serif font-bold text-coffee">{formatPrice(finalTotal)}</span>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-coffee text-white py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-coffee-dark transition-all flex items-center justify-center space-x-2 shadow-xl shadow-coffee/20"
              >
                <span>Ir a pagar</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <p className="text-[10px] text-zinc-400 text-center italic">
                Pagos seguros protegidos con encriptación SSL de 256 bits.
              </p>
            </div>

            <div className="bg-coffee-light/10 p-6 rounded-2xl border border-coffee-light/20 space-y-2">
              <p className="text-xs font-bold text-coffee uppercase tracking-widest">¿Tienes un cupón?</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Código"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="bg-white border border-coffee/10 px-4 py-2 rounded-md text-sm w-full focus:outline-none focus:ring-1 focus:ring-coffee font-sans uppercase"
                />
                <button 
                  onClick={applyCoupon}
                  className="bg-coffee text-white px-4 py-2 rounded-md text-xs font-bold uppercase hover:bg-coffee-dark transition-colors"
                >
                  Aplicar
                </button>
              </div>
              {couponError && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{couponError}</p>}
              <p className="text-[9px] text-coffee/40 font-bold">PRUEBA: CAFELOVER</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
