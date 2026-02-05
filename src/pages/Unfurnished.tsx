import { Link } from 'react-router-dom';
import { ArrowLeft, Bed, Bath, Square, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const apartments = [
  {
    id: 1,
    name: 'F2 Neuf Ouakam',
    location: 'Ouakam, Dakar',
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80',
    price: 200000,
    bedrooms: 2,
    bathrooms: 1,
    area: 50,
  },
  {
    id: 2,
    name: 'F3 Spacieux Fann',
    location: 'Fann, Dakar',
    image: 'https://images.unsplash.com/photo-1560185008-b4d32f54f4b8?w=600&q=80',
    price: 280000,
    bedrooms: 3,
    bathrooms: 1,
    area: 75,
  },
  {
    id: 3,
    name: 'Grand F4 Sacré-Cœur',
    location: 'Sacré-Cœur, Dakar',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    price: 400000,
    bedrooms: 4,
    bathrooms: 2,
    area: 110,
  },
  {
    id: 4,
    name: 'Studio Économique',
    location: 'Médina, Dakar',
    image: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=600&q=80',
    price: 120000,
    bedrooms: 1,
    bathrooms: 1,
    area: 25,
  },
  {
    id: 5,
    name: 'F3 Rénové Liberté',
    location: 'Liberté 6, Dakar',
    image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600&q=80',
    price: 320000,
    bedrooms: 3,
    bathrooms: 2,
    area: 85,
  },
  {
    id: 6,
    name: 'F2 Moderne HLM',
    location: 'HLM, Dakar',
    image: 'https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?w=600&q=80',
    price: 180000,
    bedrooms: 2,
    bathrooms: 1,
    area: 45,
  },
];

const Unfurnished = () => {
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
            Appartements Non Meublés
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Des espaces vierges à personnaliser selon vos goûts. Parfaits pour une installation durable avec votre propre mobilier.
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
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    Non Meublé
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

export default Unfurnished;
