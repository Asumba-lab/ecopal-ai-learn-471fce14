import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EcoPalBot } from "@/components/EcoPalBot";
import heroImage from "@/assets/hero-image.jpg";
import ecopalMascot from "@/assets/ecopal-mascot.jpg";

export const HeroSection = () => {
  const [isBotOpen, setIsBotOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Floating Elements - Hidden on mobile for better UX */}
      <div className="hidden md:block absolute top-20 left-10 animate-float">
        <Card className="p-4 bg-white/90 backdrop-blur-sm">
          <div className="text-success font-bold">🌱 50 Trees Planted</div>
        </Card>
      </div>
      
      <div className="hidden md:block absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <Card className="p-3 bg-white/90 backdrop-blur-sm">
          <div className="text-gold font-bold">⚡ 1000 kWh Saved</div>
        </Card>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 mb-6 rounded-full px-6 py-3">
              <img 
                src={ecopalMascot} 
                alt="EcoPal Mascot" 
                className="w-10 h-10 rounded-full"
              />
              <span className="text-white font-medium">Meet EcoPal, your AI learning companion!</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Learn Green,
              <br />
              <span className="text-primary-glow">Play Smart</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0">
              Master sustainability through AI-powered microlearning and gamified challenges. 
              Build eco-villages, track your carbon footprint, and compete with friends to save the planet!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="xl" 
                className="animate-pulse-glow"
                onClick={() => {
                  const ctaSection = document.querySelector('#cta-section');
                  ctaSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                🚀 Start Learning Now
              </Button>
              <Button 
                variant="gamified" 
                size="xl"
                onClick={() => setIsBotOpen(true)}
              >
                🎮 Play Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-12 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-white/70">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-white/70">Challenges</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-white/70">Success Rate</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Feature Preview */}
          <div className="flex-1 max-w-lg">
            <Card className="overflow-hidden shadow-glow">
              <CardContent className="p-0">
                <div className="bg-gradient-primary p-6 text-white text-center">
                  <h3 className="text-xl font-bold mb-2">Today's Challenge</h3>
                  <p className="text-white/90">Build Your Solar School</p>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Progress</span>
                    <span className="text-success">75%</span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-gradient-success h-3 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl mb-1">☀️</div>
                      <div className="text-xs">Solar Panels</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl mb-1">🌳</div>
                      <div className="text-xs">Green Space</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl mb-1">💡</div>
                      <div className="text-xs">Smart Lights</div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="success" 
                    className="w-full"
                    onClick={() => {
                      const ctaSection = document.querySelector('#cta-section');
                      ctaSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Continue Challenge
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <EcoPalBot 
        isOpen={isBotOpen}
        onClose={() => setIsBotOpen(false)}
      />
    </div>
  );
};