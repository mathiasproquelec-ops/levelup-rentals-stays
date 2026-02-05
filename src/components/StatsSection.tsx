import { Users, Car, Building2, Star } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '2,500+',
    label: 'Clients Satisfaits',
  },
  {
    icon: Car,
    value: '150+',
    label: 'Véhicules Disponibles',
  },
  {
    icon: Building2,
    value: '80+',
    label: 'Appartements',
  },
  {
    icon: Star,
    value: '4.9',
    label: 'Note Moyenne',
  },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="text-accent" size={28} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/70 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
