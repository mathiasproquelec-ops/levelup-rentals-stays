import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden hero-gradient p-8 md:p-16">
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-blue-400 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Prêt à commencer votre expérience ?
            </h2>
            <p className="text-white/70 text-lg md:text-xl mb-8">
              Créez votre compte gratuitement et accédez à notre catalogue complet de véhicules et d'appartements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="btn-accent text-lg px-8 h-14" asChild>
                <Link to="/register">
                  Créer un compte gratuit
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 h-14 bg-white/10 border-white/20 text-white hover:bg-white/20"
                asChild
              >
                <Link to="/login">
                  J'ai déjà un compte
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
