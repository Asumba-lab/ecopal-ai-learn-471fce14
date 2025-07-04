import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Leaf, Home, Car, Utensils, ShoppingBag, Calculator } from "lucide-react";
import { useState } from "react";

const SustainableLiving = () => {
  const [carbonCalculatorOpen, setCarbonCalculatorOpen] = useState(false);

  const lifestyleAreas = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Sustainable Home",
      impact: "30-40%",
      description: "Energy efficiency, water conservation, and eco-friendly materials",
      actions: [
        "LED lighting and smart thermostats",
        "Solar panels and energy-efficient appliances", 
        "Rainwater harvesting systems",
        "Sustainable building materials"
      ]
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Green Transportation",
      impact: "20-30%", 
      description: "Reduce emissions through sustainable mobility choices",
      actions: [
        "Electric or hybrid vehicles",
        "Public transportation and cycling",
        "Carpooling and ride-sharing",
        "Remote work and trip optimization"
      ]
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Sustainable Food",
      impact: "15-25%",
      description: "Make eco-conscious food choices that reduce environmental impact",
      actions: [
        "Plant-based and local foods",
        "Reduced food waste",
        "Organic and seasonal eating",
        "Home gardening and composting"
      ]
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "Conscious Consumption",
      impact: "10-20%",
      description: "Buy less, choose better, and support sustainable brands",
      actions: [
        "Quality over quantity purchases",
        "Second-hand and refurbished items",
        "Minimal packaging choices",
        "Support eco-certified brands"
      ]
    }
  ];

  const challenges = [
    {
      title: "30-Day Energy Challenge",
      difficulty: "Beginner",
      description: "Reduce your home energy consumption by 20%",
      duration: "30 days",
      participants: "2,847"
    },
    {
      title: "Zero Waste Week",
      difficulty: "Intermediate",
      description: "Minimize waste production for one week",
      duration: "7 days", 
      participants: "1,523"
    },
    {
      title: "Plant-Based Month",
      difficulty: "Intermediate",
      description: "Adopt plant-based meals for environmental impact",
      duration: "30 days",
      participants: "3,291"
    },
    {
      title: "Car-Free Week",
      difficulty: "Advanced",
      description: "Use only sustainable transportation methods",
      duration: "7 days",
      participants: "892"
    }
  ];

  const tools = [
    {
      name: "Carbon Footprint Calculator",
      description: "Calculate your personal environmental impact",
      icon: <Calculator className="w-6 h-6" />,
      category: "Assessment"
    },
    {
      name: "Home Energy Audit",
      description: "Identify energy-saving opportunities in your home",
      icon: <Home className="w-6 h-6" />,
      category: "Energy"
    },
    {
      name: "Sustainable Meal Planner",
      description: "Plan eco-friendly meals and reduce food waste",
      icon: <Utensils className="w-6 h-6" />,
      category: "Food"
    },
    {
      name: "Eco Shopping Guide",
      description: "Find sustainable alternatives for everyday products",
      icon: <ShoppingBag className="w-6 h-6" />,
      category: "Shopping"
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
              <Leaf className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Sustainable Living Guide</h1>
            <p className="text-xl text-white/90 mb-8">
              Transform your daily habits with practical strategies for reducing your environmental footprint. 
              Start with small changes that make a big difference for our planet.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="gamified" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => setCarbonCalculatorOpen(true)}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Your Impact
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Start Challenge
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Impact Areas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Key Impact Areas</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {lifestyleAreas.map((area, index) => (
                <Card key={index} className="hover:shadow-glow transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        {area.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{area.title}</CardTitle>
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          {area.impact} potential reduction
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{area.description}</p>
                    <div className="space-y-2">
                      <div className="text-sm font-semibold">Key Actions:</div>
                      {area.actions.map((action, actionIndex) => (
                        <div key={actionIndex} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-1">•</span>
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => alert(`🌱 ${area.title} action plan coming soon! Start with our current challenges.`)}
                    >
                      Create Action Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Challenges */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Take a Challenge</h2>
              <p className="text-xl text-muted-foreground">
                Join our community challenges and track your progress toward sustainable living
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {challenges.map((challenge, index) => (
                <Card key={index} className="hover:shadow-glow transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">{challenge.difficulty}</Badge>
                          <span className="text-sm text-muted-foreground">{challenge.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Participants</div>
                        <div className="font-bold text-primary">{challenge.participants}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{challenge.description}</p>
                    <Button 
                      variant="hero" 
                      className="w-full"
                      onClick={() => alert(`🎯 ${challenge.title} registration opening soon! Join the community.`)}
                    >
                      Join Challenge
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Tools & Resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tools.map((tool, index) => (
                <Card key={index} className="hover:shadow-glow transition-shadow group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                        {tool.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {tool.name}
                        </CardTitle>
                        <Badge variant="secondary">{tool.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{tool.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Progress Tracking */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Track Your Impact</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Monitor your sustainable living journey and see the real environmental impact 
              of your daily choices with our comprehensive tracking tools.
            </p>
            
            <Card className="mb-8 text-left">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Your Sustainability Score</h3>
                  <span className="text-2xl font-bold text-primary">0/100</span>
                </div>
                <Progress value={0} className="h-3 mb-4" />
                <p className="text-sm text-muted-foreground">
                  Complete challenges and track daily actions to improve your score
                </p>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => alert('📊 Personal dashboard launching soon! Start tracking with our challenges.')}
              >
                View Dashboard
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

export default SustainableLiving;