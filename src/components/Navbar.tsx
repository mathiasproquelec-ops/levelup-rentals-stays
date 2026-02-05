import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Car, Building2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Voitures', href: '/cars', icon: Car },
    { name: 'Appartements Meublés', href: '/furnished', icon: Building2 },
    { name: 'Appartements Non Meublés', href: '/unfurnished', icon: Home },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">L</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-foreground">LEVELING</span>
              <span className="text-muted-foreground text-sm block -mt-1">Services Group</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className="nav-link">
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Connexion</Link>
            </Button>
            <Button className="btn-accent" asChild>
              <Link to="/register">Créer un compte</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-card border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center gap-3 py-2 nav-link"
                onClick={() => setIsOpen(false)}
              >
                {link.icon && <link.icon size={20} />}
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border flex flex-col gap-2">
              <Button variant="outline" asChild className="w-full">
                <Link to="/login">Connexion</Link>
              </Button>
              <Button className="btn-accent w-full" asChild>
                <Link to="/register">Créer un compte</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
