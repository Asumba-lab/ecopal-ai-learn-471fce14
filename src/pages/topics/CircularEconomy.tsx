import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Recycle, RotateCcw, Package, Lightbulb, TrendingUp, Play } from "lucide-react";

const CircularEconomy = () => {
  const principles = [
    {
      icon: <RotateCcw className="w-8 h-8" />,
      title: "Design for Circularity",
      description: "Create products that can be easily repaired, upgraded, and recycled",
      examples: ["Modular smartphones", "Repairable appliances", "Biodegradable packaging"]
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: "Close Material Loops",
      description: "Ensure materials continuously cycle through the economy",
      examples: ["Industrial symbiosis", "Chemical recycling", "Urban mining"]
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Sharing & Service Models",
      description: "Maximize product utilization through sharing and service-based business models",
      examples: ["Product-as-a-Service", "Sharing platforms", "Lease models"]
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation & Technology",
      description: "Leverage technology to enable circular economy solutions",
      examples: ["AI for waste sorting", "Blockchain traceability", "3D printing"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation showBackButton={true} onBackToLanding={() => window.location.href = '/learning'} />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Recycle className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Circular Economy Design</h1>
            <p className="text-xl text-white/90 mb-8">
              Learn to design waste-free systems and sustainable business models that keep resources
              in use for as long as possible, then recover and regenerate materials at end of use.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="gamified" size="lg" className="bg-white text-primary hover:bg-white/90">
                <Play className="w-5 h-5 mr-2" />
                Design Challenge
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Core Principles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {principles.map((principle, index) => (
                <Card key={index} className="hover:shadow-glow transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        {principle.icon}
                      </div>
                      <CardTitle className="text-xl">{principle.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{principle.description}</p>
                    <div>
                      <div className="text-sm font-semibold mb-2">Examples:</div>
                      {principle.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="flex items-start gap-2 text-sm mb-1">
                          <span className="text-primary mt-1">•</span>
                          <span>{example}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => alert(`♻️ ${principle.title} workshop coming soon!`)}
                    >
                      Explore Principle
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Design Workshop */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <TrendingUp className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Design Workshop</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Apply circular economy principles to real-world design challenges and
              create innovative solutions for sustainable business models.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => alert('🎨 Design workshop launching soon! Join our community challenges.')}
              >
                <Lightbulb className="w-5 h-5 mr-2" />
                Start Workshop
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => window.location.href = '/learning'}
              >
                Back to Learning Hub
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CircularEconomy;