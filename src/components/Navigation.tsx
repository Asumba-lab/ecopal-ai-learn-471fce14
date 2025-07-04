import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ecopalMascot from "@/assets/ecopal-mascot.jpg";

interface NavigationProps {
  onBackToLanding?: () => void;
  showBackButton?: boolean;
}

export const Navigation = ({ onBackToLanding, showBackButton = false }: NavigationProps) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={ecopalMascot} 
              alt="EcoPal" 
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold text-primary">EcoPal</h2>
              <p className="text-xs text-muted-foreground">AI Green Learning</p>
            </div>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => scrollToSection('#features-section')}
            >
              Features
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => scrollToSection('#cta-section')}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = '/learning'}
            >
              Learn More
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {showBackButton && onBackToLanding && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onBackToLanding}
              >
                ← Home
              </Button>
            )}
            <Button 
              variant="hero" 
              size="sm"
              onClick={() => scrollToSection('#cta-section')}
            >
              Start Learning
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};