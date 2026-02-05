import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Fuel, Settings2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const cars = [
  {
    id: 1,
    name: 'Toyota Corolla',
    category: 'Berline',
    image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=600&q=80',
    price: 25000,
    seats: 5,
    fuel: 'Essence',
    transmission: 'Automatique',
  },
  {
    id: 2,
    name: 'Toyota Land Cruiser',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600&q=80',
    price: 75000,
    seats: 7,
    fuel: 'Diesel',
    transmission: 'Automatique',
  },
  {
    id: 3,
    name: 'Mercedes Classe E',
    category: 'Luxe',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80',
    price: 100000,
    seats: 5,
    fuel: 'Essence',
    transmission: 'Automatique',
  },
  {
    id: 4,
    name: 'Hyundai Tucson',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80',
    price: 45000,
    seats: 5,
    fuel: 'Essence',
    transmission: 'Automatique',
  },
  {
    id: 5,
    name: 'Ford Transit',
    category: 'Utilitaire',
    image: 'https://images.unsplash.com/photo-1570733577524-3a047079e80d?w=600&q=80',
    price: 55000,
    seats: 9,
    fuel: 'Diesel',
    transmission: 'Manuelle',
  },
  {
    id: 6,
    name: 'BMW Série 5',
    category: 'Luxe',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80',
    price: 120000,
    seats: 5,
    fuel: 'Essence',
    transmission: 'Automatique',
  },
];

const Cars = () => {
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
            Location de Voitures
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Découvrez notre flotte de véhicules fiables et bien entretenus pour tous vos déplacements au Sénégal.
          </p>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div key={car.id} className="service-card">
                <div className="relative aspect-[4/3]">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                    {car.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-2">{car.name}</h3>
                  
                  <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                    <span className="flex items-center gap-1">
                      <Users size={16} />
                      {car.seats} places
                    </span>
                    <span className="flex items-center gap-1">
                      <Fuel size={16} />
                      {car.fuel}
                    </span>
                    <span className="flex items-center gap-1">
                      <Settings2 size={16} />
                      {car.transmission}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-foreground">{car.price.toLocaleString()}</span>
                      <span className="text-muted-foreground text-sm"> FCFA/jour</span>
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

export default Cars;
