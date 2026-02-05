import { Shield, Clock, CreditCard, Headphones, Award, MapPin } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Sécurité Garantie',
    description: 'Tous nos véhicules sont assurés et nos appartements situés dans des quartiers sécurisés.',
  },
  {
    icon: Clock,
    title: 'Disponibilité 24/7',
    description: 'Service client disponible à tout moment pour répondre à vos besoins urgents.',
  },
  {
    icon: CreditCard,
    title: 'Paiement Flexible',
    description: 'Wave, Orange Money, carte bancaire — payez comme vous le souhaitez.',
  },
  {
    icon: Headphones,
    title: 'Support Dédié',
    description: 'Une équipe professionnelle vous accompagne avant, pendant et après votre location.',
  },
  {
    icon: Award,
    title: 'Qualité Premium',
    description: 'Sélection rigoureuse de nos biens pour vous garantir le meilleur confort.',
  },
  {
    icon: MapPin,
    title: 'Couverture Nationale',
    description: 'Présent à Dakar et dans les principales villes du Sénégal.',
  },
];

const WhyUsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Pourquoi Nous Choisir</span>
          <h2 className="section-title mt-2 mb-4">
            L'excellence à votre service
          </h2>
          <p className="section-subtitle mx-auto">
            Nous nous engageons à vous offrir une expérience de location exceptionnelle, 
            avec transparence et professionnalisme.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <feature.icon className="text-accent" size={24} />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
