import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { CheckCircle2, ChevronRight, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phone: '',
    paymentMethod: 'card'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProcessOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, address: formData, paymentMethod: formData.paymentMethod })
      });
      const data = await res.json();
      if (data.success) {
        setOrderComplete(data.orderId);
        clearCart();
        toast.success('¡Pedido realizado con éxito!');
      }
    } catch (error) {
      toast.error('Hubo un error al procesar tu pedido');
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-crema px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center space-y-8 border border-coffee/10"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-serif font-bold text-coffee-dark">¡Gracias por tu compra!</h1>
            <p className="text-zinc-500">Tu pedido <span className="font-bold text-coffee">#{orderComplete}</span> está siendo procesado.</p>
          </div>
          <p className="text-sm text-zinc-400">Te enviamos los detalles a {formData.email}</p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-coffee text-white py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-coffee-dark transition-all"
          >
            Volver al inicio
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-crema min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-3xl font-serif font-bold text-coffee-dark">Checkout</h1>
              <div className="flex items-center space-x-2 text-sm">
                <span className={step >= 1 ? "text-coffee font-bold" : "text-zinc-400"}>Información</span>
                <ChevronRight className="w-4 h-4 text-zinc-300" />
                <span className={step >= 2 ? "text-coffee font-bold" : "text-zinc-400"}>Pago</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <section className="space-y-4">
                    <h3 className="font-bold text-coffee-dark flex items-center space-x-2">
                      <Truck className="w-5 h-5" />
                      <span>Envío y Contacto</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="col-span-full bg-white border border-coffee/10 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-coffee/20"
                      />
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Nombres"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="bg-white border border-coffee/10 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-coffee/20"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Apellidos"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="bg-white border border-coffee/10 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-coffee/20"
                      />
                      <input
                        type="text"
                        name="address"
                        placeholder="Dirección Completa"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="col-span-full bg-white border border-coffee/10 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-coffee/20"
                      />
                      <input
                        type="text"
                        name="city"
                        placeholder="Ciudad"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="bg-white border border-coffee/10 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-coffee/20"
                      />
                      <input
                        type="text"
                        name="phone"
                        placeholder="Celular"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-white border border-coffee/10 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-coffee/20"
                      />
                    </div>
                  </section>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-coffee text-white py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-coffee-dark transition-all"
                  >
                    Continuar al pago
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <section className="space-y-4">
                    <h3 className="font-bold text-coffee-dark flex items-center space-x-2">
                      <CreditCard className="w-5 h-5" />
                      <span>Método de Pago</span>
                    </h3>
                    <div className="space-y-3">
                      {['card', 'pse', 'placeholder'].map((m) => (
                        <label
                          key={m}
                          className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${formData.paymentMethod === m ? 'border-coffee bg-coffee/5' : 'border-coffee/10 bg-white hover:border-coffee/30'}`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === m ? 'border-coffee' : 'border-zinc-300'}`}>
                              {formData.paymentMethod === m && <div className="w-2 h-2 bg-coffee rounded-full" />}
                            </div>
                            <span className="font-bold text-sm capitalize">{m === 'card' ? 'Tarjeta de Crédito/Débito' : m === 'pse' ? 'PSE / Transferencia' : 'Pago contra entrega'}</span>
                          </div>
                          {m === 'card' && <div className="flex space-x-1 opacity-50"><CreditCard size={16} /></div>}
                        </label>
                      ))}
                    </div>
                  </section>

                  {formData.paymentMethod === 'card' && (
                    <div className="bg-white p-6 rounded-2xl border border-coffee/10 space-y-4 shadow-sm">
                       <input
                        type="text"
                        placeholder="Número de tarjeta"
                        className="w-full bg-crema/20 border border-coffee/10 px-4 py-3 rounded-xl focus:outline-none"
                      />
                      <div className="grid grid-cols-2 gap-4">
                         <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full bg-crema/20 border border-coffee/10 px-4 py-3 rounded-xl focus:outline-none"
                        />
                         <input
                          type="text"
                          placeholder="CVC"
                          className="w-full bg-crema/20 border border-coffee/10 px-4 py-3 rounded-xl focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-4 rounded-xl font-bold tracking-widest uppercase border border-coffee/20 text-coffee hover:bg-coffee/5 transition-all"
                    >
                      Atrás
                    </button>
                    <button
                      onClick={handleProcessOrder}
                      disabled={loading}
                      className="flex-grow bg-coffee text-white py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-coffee-dark transition-all disabled:opacity-50"
                    >
                      {loading ? 'Procesando...' : `Pagar ${formatPrice(totalPrice)}`}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 h-fit space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-coffee/10 space-y-6">
              <h3 className="text-xl font-serif font-bold text-coffee-dark pb-4 border-b border-coffee/10">Tu Pedido</h3>
              
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-crema rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-sm font-bold text-coffee-dark truncate">{item.name}</h4>
                      <p className="text-xs text-zinc-400">Cant: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-coffee">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-coffee/10 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-bold text-coffee-dark">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Envío</span>
                  <span className="text-green-600 font-bold">Gratis</span>
                </div>
              </div>

              <div className="pt-6 border-t border-coffee/20 flex justify-between items-center">
                <span className="text-xl font-serif font-bold text-coffee-dark">Total</span>
                <span className="text-3xl font-serif font-bold text-coffee">{formatPrice(totalPrice)}</span>
              </div>

              <div className="p-4 bg-crema rounded-xl flex items-center space-x-3 text-[10px] text-coffee leading-tight font-medium">
                <ShieldCheck className="w-8 h-8 flex-shrink-0" />
                <p>Tu pago está encriptado y cumple con los estándares PCI-DSS. No almacenamos tus datos bancarios.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
