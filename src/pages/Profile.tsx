import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  MapPin, 
  CreditCard, 
  LogOut, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  RefreshCcw,
  ShoppingBag
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Order, Product } from '../types';

export default function Profile() {
  const { user, logout } = useAuth();
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');

  if (!user) return null;

  const pendingOrders = user.orders.filter(o => o.status === 'pending' || o.status === 'shipped');
  const completedOrders = user.orders.filter(o => o.status === 'delivered');

  const handleReorder = (order: Order) => {
    order.items.forEach(item => {
      // Create a partial product object for the cart
      const productMock: Product = {
        id: item.productId,
        name: item.name,
        slug: '', // ideally we'd have the slug
        price: item.price,
        images: [item.image],
        description: '',
        category: '',
        stock: 100,
        rating: 5,
        reviews: [],
        specs: {},
        features: []
      };
      addItem(productMock, item.quantity);
    });
    toast.success('¡Artículos añadidos de nuevo al carrito!');
  };

  return (
    <div className="bg-crema min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[40px] border border-white shadow-xl space-y-6">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-coffee text-white rounded-full flex items-center justify-center mx-auto text-3xl font-serif font-bold shadow-lg shadow-coffee/20">
                  {user.name[0]}
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-serif font-bold text-coffee-dark truncate">{user.name}</h2>
                  <p className="text-xs font-bold text-coffee/60 uppercase tracking-widest">{user.email}</p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-coffee/10 space-y-2">
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white transition-colors group">
                  <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-coffee-dark">
                    <User className="w-4 h-4" />
                    <span>Datos Personales</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white transition-colors group text-red-500" onClick={logout}>
                  <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest">
                    <LogOut className="w-4 h-4" />
                    <span>Cerrar Sesión</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-coffee-dark p-8 rounded-[40px] text-crema space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Beneficio Prime</span>
              <h3 className="text-lg font-serif font-bold leading-tight">Envío Gratis Ilimitado</h3>
              <p className="text-xs opacity-60 leading-relaxed uppercase tracking-wider">Como miembro premium, todos tus envíos son gratuitos y prioritarios.</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-coffee/10 pb-8">
              <div className="space-y-2">
                <h1 className="text-4xl font-serif font-bold text-coffee-dark uppercase tracking-tight">Mis Pedidos</h1>
                <p className="text-xs font-bold text-coffee-light uppercase tracking-[0.2em]">Sigue el rastro de tu café</p>
              </div>
              
              <div className="flex bg-white/40 p-1 rounded-full border border-white">
                <button 
                  onClick={() => setActiveTab('pending')}
                  className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'pending' ? 'bg-coffee text-white shadow-lg' : 'text-coffee-dark hover:bg-white/60'}`}
                >
                  Pendientes ({pendingOrders.length})
                </button>
                <button 
                  onClick={() => setActiveTab('completed')}
                  className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'completed' ? 'bg-coffee text-white shadow-lg' : 'text-coffee-dark hover:bg-white/60'}`}
                >
                  Completados ({completedOrders.length})
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {(activeTab === 'pending' ? pendingOrders : completedOrders).length > 0 ? (
                  (activeTab === 'pending' ? pendingOrders : completedOrders).map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white/60 backdrop-blur-md rounded-[40px] border border-white p-8 shadow-sm hover:shadow-xl transition-all space-y-8"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-coffee-dark tracking-tighter">Pedido #{order.id}</span>
                            <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${order.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                              {order.status === 'delivered' ? 'Entregado' : 'En camino'}
                            </span>
                          </div>
                          <div className="flex items-center text-[10px] text-coffee/40 font-bold uppercase tracking-widest gap-4">
                            <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {order.date}</span>
                            <span className="flex items-center"><CreditCard className="w-3 h-3 mr-1" /> {formatPrice(order.total)}</span>
                          </div>
                        </div>
                        
                        {order.status === 'delivered' ? (
                          <button 
                             onClick={() => handleReorder(order)}
                             className="bg-coffee text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-coffee-dark transition-all shadow-lg shadow-coffee/20"
                          >
                            <RefreshCcw className="w-3 h-3" />
                            Repetir Pedido
                          </button>
                        ) : (
                          <button className="bg-crema text-coffee-dark px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest border border-coffee/20">
                            Rastrear Guía
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 border-t border-coffee/5">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-[10px] font-black text-coffee-dark truncate uppercase tracking-wider">{item.name}</h4>
                              <p className="text-[9px] text-coffee/60 uppercase font-bold tracking-widest">Cant: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-32 bg-white/40 rounded-[60px] border border-dashed border-coffee/10 space-y-6">
                    <div className="w-20 h-20 bg-crema rounded-full flex items-center justify-center mx-auto text-coffee-light/40">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <div className="space-y-1">
                       <h3 className="text-xl font-serif font-bold text-coffee-dark">No hay pedidos {activeTab === 'pending' ? 'pendientes' : 'completados'}</h3>
                       <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-coffee/40">¿Buscas algo nuevo?</p>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Minimal User icon for navigation
function User(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
