import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  // Mock Products Data (as requested)
  const products = [
    {
      id: '1',
      name: 'Báscula de café "PrecisionBarista 2000"',
      slug: 'precision-barista-2000',
      description: 'Logra la extracción perfecta con nuestra báscula de alta precisión. Diseñada para baristas que buscan consistencia en cada taza.',
      price: 120000,
      category: 'básculas',
      images: ['https://images.unsplash.com/photo-1544787210-2211d64b565a?q=80&w=800&auto=format&fit=crop'],
      stock: 25,
      rating: 4.8,
      specs: {
        'Peso Máximo': '2kg',
        'Precisión': '0.1g',
        'Batería': 'Recargable USB-C',
        'Funciones': 'Temporizador, Tare, Auto-apagado'
      },
      features: ['Pantalla LED de alto contraste', 'Superficie resistente al calor', 'Diseño minimalista'],
      isFeatured: true,
      reviews: [
        { id: 'r1', userName: 'Carlos M.', rating: 5, comment: 'Increíble precisión, cambió mi rutina por completo.', date: '2024-03-10' },
        { id: 'r2', userName: 'Ana S.', rating: 4, comment: 'Muy buena, aunque el botón de táctil es un poco sensible.', date: '2024-03-15' }
      ]
    },
    {
      id: '2',
      name: 'Molinillo manual "GrindMaster Mini"',
      slug: 'grindmaster-mini',
      description: 'El compañero ideal para tus viajes. Compacto, duradero y con un ajuste de molienda que te sorprenderá.',
      price: 85000,
      category: 'molinillos',
      images: ['https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=800&auto=format&fit=crop'],
      stock: 15,
      rating: 4.6,
      specs: {
        'Muelas': 'Cónicas de acero inoxidable',
        'Ajuste': '20 clicks de precisión',
        'Peso': '450g',
        'Capacidad': '25g'
      },
      features: ['Cuerpo de aluminio aeroespacial', 'Mango ergonómico', 'Fácil de limpiar'],
      isFeatured: true,
      reviews: [
        { id: 'r3', userName: 'Roberto G.', rating: 5, comment: 'Excelente molienda para V60.', date: '2024-04-01' }
      ]
    },
    {
      id: '3',
      name: 'Kit de preparación "Pour-Over Starter"',
      slug: 'pourover-starter-kit',
      description: 'Todo lo que necesitas para empezar en el mundo del café filtrado. Calidad premium para el hogar.',
      price: 140000,
      category: 'kits',
      images: ['https://images.unsplash.com/photo-1544145945-f904253db0ad?q=80&w=800&auto=format&fit=crop'],
      stock: 10,
      rating: 4.9,
      specs: {
        'Dripper': 'Cerámica tipo V60 size 02',
        'Jarra': 'Vidrio borosilicato 600ml',
        'Filtros': 'Paquete de 40 unidades',
        'Extra': 'Cuchara medidora'
      },
      features: ['Kit completo', 'Fácil de usar', 'Ideal para regalo'],
      isFeatured: true,
      reviews: []
    },
    {
      id: '4',
      name: 'Tamper "ProTamp 58mm"',
      slug: 'protamp-58mm',
      description: 'Presión uniforme para un espresso perfecto. Ergonómico y pesado.',
      price: 65000,
      category: 'accesorios',
      images: ['https://images.unsplash.com/photo-1595928642581-f50f4f3453a5?q=80&w=800&auto=format&fit=crop'],
      stock: 30,
      rating: 4.7,
      specs: {
        'Diámetro': '58mm',
        'Material': 'Acero inoxidable 304',
        'Base': 'Plana',
        'Mango': 'Madera de nogal'
      },
      features: ['Peso equilibrado', 'Acabado premium', 'Larga durabilidad'],
      isFeatured: false,
      reviews: []
    },
    {
      id: '5',
      name: 'Termómetro digital "ThermoBrew"',
      slug: 'thermobrew-digital',
      description: 'Controla la temperatura de tu agua con precisión quirúrgica. Rápido y confiable.',
      price: 45000,
      category: 'accesorios',
      images: ['https://images.unsplash.com/photo-1512539077202-0949de3a649f?q=80&w=800&auto=format&fit=crop'],
      stock: 50,
      rating: 4.5,
      specs: {
        'Rango': '-10°C a 110°C',
        'Pantalla': 'LCD retroiluminada',
        'Sonda': 'Acero inoxidable plegable'
      },
      features: ['Lectura rápida en 3s', 'Resistente a salpicaduras', 'Clip para jarra incluido'],
      isFeatured: false,
      reviews: []
    }
  ];

  // API Routes
  app.get('/api/products', (req, res) => {
    const { category, search, minPrice, maxPrice, sort } = req.query;
    let filtered = [...products];

    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }

    if (search) {
      const q = (search as string).toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    if (minPrice) {
      filtered = filtered.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(maxPrice));
    }

    if (sort) {
      if (sort === 'price_asc') filtered.sort((a, b) => a.price - b.price);
      if (sort === 'price_desc') filtered.sort((a, b) => b.price - a.price);
      if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    }

    res.json(filtered);
  });

  app.get('/api/products/:slug', (req, res) => {
    const product = products.find(p => p.slug === req.params.slug);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  });

  app.post('/api/checkout', (req, res) => {
    const { items, address, paymentMethod } = req.body;
    // Simulate order processing
    const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    res.json({
      success: true,
      orderId,
      message: 'Pedido recibido con éxito',
      summary: { items, address, paymentMethod }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
