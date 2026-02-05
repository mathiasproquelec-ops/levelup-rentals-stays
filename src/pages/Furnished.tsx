import { Link } from 'react-router-dom';
import { ArrowLeft, Bed, Bath, Square, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const apartments = [
  {
    id: 1,
    name: 'Studio Moderne Almadies',
    location: 'Almadies, Dakar',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
    price: 350000,
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
  },
  {
    id: 2,
    name: 'Appartement Vue Mer',
    location: 'Ngor, Dakar',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
    price: 600000,
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
  },
  {
    id: 3,
    name: 'Penthouse Luxe',
    location: 'Plateau, Dakar',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    price: 1200000,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
  },
  {
    id: 4,
    name: 'F2 Confortable',
    location: 'Mermoz, Dakar',
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&q=80',
    price: 450000,
    bedrooms: 2,
    bathrooms: 1,
    area: 55,
  },
  {
    id: 5,
    name: 'Appartement Familial',
    location: 'Point E, Dakar',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80',
    price: 750000,
    bedrooms: 3,
    bathrooms: 2,
    area: 90,
  },
  {
    id: 6,
    name: 'Studio Cosy Centre-Ville',
    location: 'Centre-Ville, Dakar',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80',
    price: 300000,
    bedrooms: 1,
    bathrooms: 1,
    area: 30,
  },
];

const Furnished = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-28 pb-16 hero-gradient">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={18} />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Appartements Meublés
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Des logements entièrement équipés, prêts à vivre. Wifi, cuisine équipée, linge de maison — tout est inclus.
          </p>
        </div>
      </section>

      {/* Apartments Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartments.map((apt) => (
              <div key={apt.id} className="service-card">
                <div className="relative aspect-[4/3]">
                  <img
                    src={apt.image}
                    alt={apt.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                    Meublé
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-1">{apt.name}</h3>
                  <p className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                    <MapPin size={14} />
                    {apt.location}
                  </p>
                  
                  <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                    <span className="flex items-center gap-1">
                      <Bed size={16} />
                      {apt.bedrooms} ch.
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath size={16} />
                      {apt.bathrooms} sdb
                    </span>
                    <span className="flex items-center gap-1">
                      <Square size={16} />
                      {apt.area} m²
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-foreground">{apt.price.toLocaleString()}</span>
                      <span className="text-muted-foreground text-sm"> FCFA/mois</span>
                    </div>
                    <Button className="btn-accent" size="sm" asChild>
                      <Link to="/login">
                        Réserver
                        <ArrowRight className="ml-1" size={16} />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Furnished;
