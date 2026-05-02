/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  X, 
  Trash2, 
  Eye, 
  Cpu, 
  Sparkles, 
  RefreshCcw, 
  Clock, 
  ShieldCheck, 
  Zap
} from 'lucide-react';

// --- Components ---

const PillsBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-bg">
    {[
      { id: 1, className: "pill-1", style: { top: '15%', left: '-15%', width: '700px', height: '160px', '--rot': '-12deg' } },
      { id: 2, className: "pill-2", style: { top: '10%', right: '10%', width: '400px', height: '120px', '--rot': '25deg' } },
      { id: 3, className: "pill-3", style: { bottom: '5%', left: '0%', width: '600px', height: '140px', '--rot': '10deg' } },
      { id: 4, className: "pill-4", style: { bottom: '-5%', right: '-10%', width: '800px', height: '180px', '--rot': '-15deg' } },
    ].map((pill) => (
      <div
        key={pill.id}
        className={`bg-pill ${pill.className} absolute blur-[15px] opacity-60 rounded-full border border-white/3 animate-float-pill`}
        style={{
          ...pill.style as any,
          background: pill.id === 1 ? 'linear-gradient(90deg, rgba(30, 27, 75, 0.8), transparent)' :
                     pill.id === 2 ? 'linear-gradient(270deg, rgba(67, 40, 24, 0.6), transparent)' :
                     pill.id === 3 ? 'linear-gradient(90deg, rgba(46, 16, 101, 0.7), transparent)' :
                                   'linear-gradient(270deg, rgba(80, 7, 36, 0.6), transparent)',
          animationDuration: `${20 + pill.id * 3}s`,
          animationDelay: `-${pill.id * 5}s`
        }}
      />
    ))}
  </div>
);

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const unitPrice = 666;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const addToCart = () => {
    setCartQuantity(prev => prev + 1);
    setIsCartOpen(true);
  };

  const removeFromCart = () => {
    setCartQuantity(0);
  };

  const updateQuantity = (amount: number) => {
    setCartQuantity(prev => Math.max(0, prev + amount));
  };

  return (
    <div className="relative">
      <PillsBackground />
      
      {/* Custom Cursor */}
      <div 
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ transform: `translate(${cursorPos.x - 6}px, ${cursorPos.y - 6}px)`, transition: 'transform 0.05s ease-out' }}
      />

      {/* Navbar */}
      <nav className="fixed w-full z-50 glass-header">
        <div className="max-w-screen-2xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <div className="flex items-center gap-3">
              <img src="https://i.imgur.com/z2xSCTn.png" alt="Chronos Vision Logo" className="h-10 w-auto" />
            </div>
            <div className="hidden lg:flex space-x-10">
              <a href="#what-is" className="text-sm text-text-muted hover:text-text-main transition-colors font-medium">Qué es</a>
              <a href="#how-it-works" className="text-sm text-text-muted hover:text-text-main transition-colors font-medium">Cómo Funciona</a>
              <a href="#tech" className="text-sm text-text-muted hover:text-text-main transition-colors font-medium">Tecnología</a>
              <a href="#specs" className="text-sm text-text-muted hover:text-text-main transition-colors font-medium">Especificaciones</a>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors relative group"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                <span className="hidden sm:inline text-sm font-medium">Carrito</span>
                <AnimatePresence>
                  {cartQuantity > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-2 bg-indigo-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                    >
                      {cartQuantity}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <AnimatePresence>
                {isCartOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="absolute right-0 top-[calc(100%+1.5rem)] w-[320px] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] p-5 z-50"
                  >
                    <div className="flex justify-between items-center mb-5 pb-4 border-b border-white/10">
                      <h3 className="text-white font-medium tracking-wide">Tu Carrito</h3>
                      <button 
                        onClick={() => setIsCartOpen(false)}
                        className="text-white/40 hover:text-white transition p-1 rounded-full hover:bg-white/5"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-4 mb-6">
                      {cartQuantity > 0 ? (
                        <div className="flex gap-4 items-center group">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                            <img 
                              src="https://i.imgur.com/CTm5sIl.png" 
                              alt="Chronos One" 
                              className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-white text-sm font-medium">Chronos One</h4>
                                <p className="text-white/30 text-[10px] uppercase tracking-wider mt-1">Universal</p>
                              </div>
                              <button 
                                onClick={removeFromCart}
                                className="text-white/20 hover:text-red-400 transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="flex justify-between items-center mt-3">
                              <span className="text-white font-medium text-sm">${unitPrice}</span>
                              <div className="flex items-center gap-3 text-white/50 text-xs bg-white/5 border border-white/10 rounded-full px-2 py-0.5">
                                <button onClick={() => updateQuantity(-1)} className="hover:text-white px-2 py-1 transition-colors">-</button>
                                <span className="text-white font-medium min-w-[12px] text-center">{cartQuantity}</span>
                                <button onClick={() => updateQuantity(1)} className="hover:text-white px-2 py-1 transition-colors">+</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="py-8 text-center">
                          <p className="text-white/20 text-sm">El carrito está vacío</p>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <div className="flex justify-between items-center mb-5">
                        <span className="text-white/50 text-xs uppercase tracking-widest">Subtotal</span>
                        <span className="text-white font-bold">${(cartQuantity * unitPrice).toFixed(2)}</span>
                      </div>
                      <button 
                        disabled={cartQuantity === 0}
                        className="w-full bg-white text-black text-sm font-semibold py-3 rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Proceder al Pago
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-end justify-start pb-16 md:pb-20 px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.imgur.com/5k5Rux4.png" 
            alt="Fondo Hero" 
            className="w-full h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="z-10 w-full max-w-xl text-left relative">
          <Reveal delay={0.1}>
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight mb-4">
              <span className="text-white">ECHA UN VISTAZO</span><br />
              <span className="gradient-text">AL FUTURO</span>
            </h1>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-white/60 text-sm md:text-base max-w-lg font-light leading-relaxed mb-6">
              Mira las cosas hasta 10 segundos antes de que sucedan.<br />
              Con Chronos Vision anticipa lo que viene antes de que ocurra. Reacciona antes, decide mejor y hazlo con estilo.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="flex items-baseline gap-4 my-6">
              <span className="text-3xl font-light text-white tracking-tighter">${unitPrice}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold border-l border-white/10 pl-4">Talla Única Universal</span>
            </div>
          </Reveal>
          
          <Reveal delay={0.3}>
            <div className="flex flex-wrap justify-start items-center gap-4">
              <button 
                onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-transparent border border-white/15 rounded-full text-white/80 text-sm font-medium hover:bg-white/5 hover:border-white/30 transition-all"
              >
                Especificaciones
              </button>
              <button 
                onClick={addToCart}
                className="px-8 py-3 bg-white rounded-full text-black text-sm font-bold hover:bg-gray-200 hover:scale-[1.02] transition-all"
              >
                Comprar Ahora
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Qué es */}
      <section id="what-is" className="py-32 px-6 border-y border-white/5 bg-black/60 backdrop-blur-md">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-white text-balance">
                ¿Qué es <span className="font-serif italic text-indigo-300">Chronos Vision?</span>
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-indigo-400 to-pink-400 mb-8 rounded-full" />
              <p className="text-white/70 text-lg leading-relaxed font-light mb-6">
                Mucho más que un accesorio de lujo. Chronos Vision es el primer dispositivo óptico de uso civil con capacidades de percepción predictiva.
              </p>
              <p className="text-white/40 text-base leading-relaxed font-light">
                Diseñados meticulosamente con titanio aeroespacial y acetato de primera calidad, ocultan en su interior el procesador neural más avanzado jamás creado. Al usarlos, no solo ves el mundo con mayor claridad; experimentas un salto evolutivo.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="fashion-card rounded-[2rem] relative overflow-hidden h-full min-h-[400px]">
                <img src="https://i.imgur.com/AGi9jFG.png" alt="Lentes Chronos" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.4}>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="fashion-card rounded-[2rem] overflow-hidden aspect-[4/5] md:aspect-square relative group">
                <img 
                  src="https://i.imgur.com/wvsFMz9.png" 
                  alt="Modelo Femenina" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              </div>
              <div className="fashion-card rounded-[2rem] overflow-hidden aspect-[4/5] md:aspect-square relative group">
                <img 
                  src="https://i.imgur.com/OoGb7A7.png" 
                  alt="Modelo Masculino" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="mt-8 rounded-[2rem] overflow-hidden border border-white/10 aspect-video relative bg-black group">
              <video 
                src="https://i.imgur.com/YHiNgtW.mp4" 
                controls
                loop 
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cómo Funciona */}
      <section id="how-it-works" className="py-32 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-light mb-4 text-white">¿Cómo <span className="font-serif italic text-pink-200">funciona?</span></h2>
              <p className="text-white/40 font-light max-w-2xl mx-auto text-lg">La perfecta sincronía entre hardware avanzado y algoritmos de IA predictiva.</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                icon: Eye, 
                title: "Captura del entorno", 
                desc: "Los lentes integran sensores de movimiento, profundidad y seguimiento ocular que registran en tiempo real el entorno.",
                color: "text-indigo-300"
              },
              { 
                icon: Cpu, 
                title: "Procesamiento predictivo", 
                desc: "El sistema Chrono-Preview Engine™ analiza patrones de movimiento mediante algoritmos de IA.",
                color: "text-pink-300"
              },
              { 
                icon: Sparkles, 
                title: "Anticipación visual", 
                desc: "La información se traduce en señales visuales sutiles permitiendo anticipar acciones hasta 5 segundos antes.",
                color: "text-purple-300"
              },
              { 
                icon: RefreshCcw, 
                title: "Adaptación continua", 
                desc: "El sistema aprende del comportamiento del usuario y ajusta dinámicamente la precisión de las predicciones.",
                color: "text-blue-300"
              }
            ].map((step, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="fashion-card p-10 rounded-[2rem] h-full">
                  <div className={`w-12 h-12 bg-white/5 ${step.color} rounded-full flex items-center justify-center mb-6 border border-white/5`}>
                    <step.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed font-light">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Secret Tech Section */}
      <section id="tech" className="py-32 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-3xl font-light text-white mb-6">La innovación, <span className="font-serif italic text-pink-200">invisible.</span></h2>
              <p className="text-white/40 max-w-2xl mx-auto font-light">Nadie sabrá que llevas la tecnología más potente del mundo en tu rostro.</p>
            </Reveal>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Batería Oculta", desc: "Celdas de estado sólido integradas en la montura." },
              { icon: Cpu, title: "Chip Aether-9", desc: "Microprocesador neural que analiza tu entorno en nanosegundos." },
              { icon: Clock, title: "Chrono-Preview™", desc: "Software predictivo avanzado de procesamiento cuántico." }
            ].map((tech, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="fashion-card p-10 rounded-[2rem] text-center h-full">
                  <div className="w-12 h-12 bg-white/5 text-indigo-300 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
                    <tech.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-white">{tech.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-light">{tech.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Especificaciones */}
      <section id="specs" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Especificaciones <span className="font-serif italic text-indigo-300">– Chronos Vision</span></h2>
            </Reveal>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Reveal>
              <div className="fashion-card p-10 rounded-[2rem] h-full">
                <h3 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-400" />
                  Hardware y Ergonomía
                </h3>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-indigo-400 font-semibold text-[10px] uppercase tracking-widest mb-2">DISEÑO</h4>
                    <p className="text-white/60 text-sm leading-relaxed font-light">Frente en acetato negro mate y estructura de titanio pulido. Diseño ultra ligero balanceado.</p>
                  </div>
                  <div>
                    <h4 className="text-indigo-400 font-semibold text-[10px] uppercase tracking-widest mb-2">ÓPTICA</h4>
                    <p className="text-white/60 text-sm leading-relaxed font-light">Lentes de alta transparencia con filtro de luz azul adaptativo y protección UV400.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="fashion-card p-10 rounded-[2rem] h-full">
                <h3 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-pink-300" />
                  Sistema Integrado
                </h3>
                <div className="space-y-6">
                  {[
                    { title: "Aether-9 Processor", desc: "Cálculo de probabilidades en microsegundos." },
                    { title: "Preview Engine", desc: "Anticipación probabilística de eventos." },
                    { title: "Smart Interface", desc: "Proyección discreta sin interferir la visión." }
                  ].map((s, i) => (
                    <div key={i}>
                      <h4 className="text-white text-sm font-medium mb-1">{s.title}</h4>
                      <p className="text-white/40 text-[13px] leading-relaxed font-light">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">El futuro, <span className="font-serif italic text-pink-200">comprobado.</span></h2>
            </Reveal>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Reveal>
              <div className="fashion-card p-10 rounded-[2rem]">
                <p className="text-white/60 font-light leading-relaxed mb-8">"La capacidad de ver 10 segundos hacia el futuro redefine nuestra percepción de la realidad. Es una ventaja táctica invisible."</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-white/10 flex items-center justify-center text-indigo-300 font-bold text-xs">M</div>
                  <div>
                    <p className="text-sm font-semibold text-white">MIT Tech Review</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="fashion-card p-10 rounded-[2rem]">
                <p className="text-white/60 font-light leading-relaxed mb-8">"Anticipar eventos cotidianos se vuelve natural. Lograr integrar un procesador predictivo en este diseño es un hito absoluto."</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 border border-white/10 flex items-center justify-center text-pink-300 font-bold text-xs">W</div>
                  <div>
                    <p className="text-sm font-semibold text-white">Wired Future</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-black/40">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-sm">
              <img src="https://i.imgur.com/z2xSCTn.png" alt="Chronos Vision Logo" className="h-12 w-auto mb-6" />
              <p className="text-white/40 font-light text-sm leading-relaxed">Un armazón de diseño definitivo impulsado por la tecnología del mañana.</p>
            </div>
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-6">El Producto</p>
                <ul className="space-y-3">
                  <li><a href="#how-it-works" className="text-sm text-white/50 hover:text-white transition">Cómo Funciona</a></li>
                  <li><a href="#specs" className="text-sm text-white/50 hover:text-white transition">Especificaciones</a></li>
                  <li><a href="#tech" className="text-sm text-white/50 hover:text-white transition">Tecnología</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-6">Compañía</p>
                <ul className="space-y-3">
                  <li><a href="#" className="text-sm text-white/50 hover:text-white transition">Acerca de</a></li>
                  <li><a href="#" className="text-sm text-white/50 hover:text-white transition">Prensa</a></li>
                  <li><a href="#" className="text-sm text-white/50 hover:text-white transition">Soporte</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/20 uppercase tracking-[0.15em] font-medium">
            <span>© 2026 Chronos Vision. All Rights Reserved.</span>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition">Privacidad</a>
              <a href="#" className="hover:text-white transition">Términos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
