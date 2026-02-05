import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    id: 'cars',
    title: 'Location de Voitures',
    description: 'Des véhicules fiables et bien entretenus pour tous vos déplacements professionnels ou personnels.',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
    features: ['Véhicules récents', 'Assurance incluse', 'Kilométrage illimité', 'Livraison possible'],
    href: '/cars',
    price: 'À partir de 25 000 FCFA/jour',
  },
  {
    id: 'furnished',
    title: 'Appartements Meublés',
    description: 'Des logements entièrement équipés pour un confort immédiat, idéaux pour les séjours courts ou moyens.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    features: ['Entièrement équipé', 'Wifi inclus', 'Ménage régulier', 'Quartiers sécurisés'],
    href: '/furnished',
    price: 'À partir de 350 000 FCFA/mois',
  },
  {
    id: 'unfurnished',
    title: 'Appartements Non Meublés',
    description: 'Des espaces vierges à personnaliser selon vos goûts, parfaits pour une installation durable.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    features: ['Grands espaces', 'Charges modérées', 'Contrats flexibles', 'Emplacements stratégiques'],
    href: '/unfurnished',
    price: 'À partir de 200 000 FCFA/mois',
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Nos Services</span>
          <h2 className="section-title mt-2 mb-4">
            Solutions de location complètes
          </h2>
          <p className="section-subtitle mx-auto">
            Découvrez notre gamme de services adaptés à tous vos besoins de mobilité et d'hébergement au Sénégal.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`flex flex-col ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } gap-8 lg:gap-16 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium">
                      {service.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 text-lg">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="grid grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-foreground">
                      <CheckCircle className="text-accent flex-shrink-0" size={18} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="btn-accent" size="lg" asChild>
                  <Link to={service.href}>
                    Découvrir
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
