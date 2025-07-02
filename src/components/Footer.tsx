import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ecopalMascot from "@/assets/ecopal-mascot.jpg";

export const Footer = () => {
  const socialLinks = [
    { name: "Twitter", icon: "🐦", url: "https://twitter.com" },
    { name: "LinkedIn", icon: "💼", url: "https://linkedin.com" },
    { name: "Discord", icon: "💬", url: "https://discord.com" },
    { name: "YouTube", icon: "📺", url: "https://youtube.com" }
  ];

  const quickLinks = [
    { name: "About Us", action: () => window.open('https://docs.lovable.dev', '_blank') },
    { name: "Privacy Policy", action: () => alert('Privacy policy coming soon!') },
    { name: "Terms of Service", action: () => alert('Terms of service coming soon!') },
    { name: "Support", action: () => alert('Support team ready to help! 🌟') }
  ];

  return (
    <footer className="bg-muted/30 py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={ecopalMascot} 
                alt="EcoPal" 
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-2xl font-bold text-primary">EcoPal</h3>
                <p className="text-sm text-muted-foreground">AI-Powered Green Learning</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-md">
              Master sustainability through AI-powered microlearning and gamified challenges. 
              Join thousands building a greener future together.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-2 mt-6">
              {socialLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(link.url, '_blank')}
                  className="hover:scale-110 transition-transform"
                >
                  {link.icon}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="sm"
                  className="justify-start p-0 h-auto font-normal text-muted-foreground hover:text-primary"
                  onClick={link.action}
                >
                  {link.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest eco-learning tips and challenges
            </p>
            <div className="space-y-2">
              <Button 
                variant="hero" 
                size="sm" 
                className="w-full"
                onClick={() => alert('🌟 Newsletter signup coming soon! Get ready for amazing eco-tips!')}
              >
                Subscribe 📧
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 mt-8 text-center">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 EcoPal. Building a sustainable future with AI. Made with 💚
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>🌱 Carbon Neutral Hosting</span>
              <span>♻️ Sustainable Code</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};