import { Link } from 'react-router-dom';
import { ArrowRight, Car, Building2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen hero-gradient flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-blue-400 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Disponible 24h/24 au Sénégal
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-up stagger-1">
            Location de Véhicules &{' '}
            <span className="gradient-text">Appartements</span>
            <br />
            de Qualité Premium
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 animate-fade-up stagger-2">
            LEVELING Services Group vous accompagne dans tous vos besoins de location. 
            Voitures de luxe, appartements meublés ou non meublés — réservez en quelques clics.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up stagger-3">
            <Button size="lg" className="btn-accent text-lg px-8 h-14" asChild>
              <Link to="/cars">
                Explorer nos véhicules
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 h-14 bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
              <Link to="/furnished">
                Voir les appartements
              </Link>
            </Button>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-up stagger-4">
            <Link to="/cars" className="glass-card rounded-2xl p-6 text-left hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                <Car className="text-accent" size={28} />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Location de Voitures</h3>
              <p className="text-muted-foreground text-sm">
                Large gamme de véhicules pour tous vos déplacements
              </p>
            </Link>

            <Link to="/furnished" className="glass-card rounded-2xl p-6 text-left hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                <Building2 className="text-accent" size={28} />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Appartements Meublés</h3>
              <p className="text-muted-foreground text-sm">
                Logements équipés, prêts à vivre dès votre arrivée
              </p>
            </Link>

            <Link to="/unfurnished" className="glass-card rounded-2xl p-6 text-left hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                <Home className="text-accent" size={28} />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Appartements Non Meublés</h3>
              <p className="text-muted-foreground text-sm">
                Espaces personnalisables selon vos préférences
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
