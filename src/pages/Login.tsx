import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic with Supabase
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">L</span>
            </div>
            <div>
              <span className="font-bold text-foreground">LEVELING</span>
              <span className="text-muted-foreground text-sm block -mt-1">Services Group</span>
            </div>
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2">Connexion</h1>
          <p className="text-muted-foreground mb-8">
            Accédez à votre espace personnel pour gérer vos réservations.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <Link to="/forgot-password" className="text-sm text-accent hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="btn-accent w-full h-12 text-base">
              Se connecter
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </form>

          <p className="text-center text-muted-foreground mt-6">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-accent font-medium hover:underline">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Image */}
      <div className="hidden lg:block w-1/2 hero-gradient relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Bienvenue
          </h2>
          <p className="text-white/70 text-lg max-w-md">
            Gérez vos réservations de voitures et d'appartements en toute simplicité depuis votre espace personnel.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
