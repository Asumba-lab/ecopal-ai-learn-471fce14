import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Droplets, Sprout, Filter, CloudRain, TrendingUp, Play } from "lucide-react";

const WaterConservation = () => {
  const conservationMethods = [
    {
      icon: <CloudRain className="w-8 h-8" />,
      title: "Rainwater Harvesting",
      savings: "30-50%",
      description: "Collect and store rainwater for later use in irrigation and non-potable applications",
      applications: ["Roof collection systems", "Storm water management", "Agricultural irrigation"]
    },
    {
      icon: <Filter className="w-8 h-8" />,
      title: "Greywater Systems",
      savings: "20-30%",
      description: "Reuse water from sinks, showers, and washing machines for irrigation",
      applications: ["Bathroom reuse", "Laundry water recycling", "Garden irrigation"]
    },
    {
      icon: <Sprout className="w-8 h-8" />,
      title: "Smart Irrigation",
      savings: "40-60%",
      description: "Precision watering based on soil moisture, weather, and plant needs",
      applications: ["Drip irrigation", "Smart controllers", "Soil sensors"]
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Water-Efficient Fixtures",
      savings: "15-25%",
      description: "Low-flow fixtures and appliances that reduce water consumption",
      applications: ["Low-flow toilets", "Efficient showerheads", "Water-saving appliances"]
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
              <Droplets className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Water Conservation</h1>
            <p className="text-xl text-white/90 mb-8">
              Master sustainable water management techniques for our most precious resource. 
              Learn conservation strategies, treatment technologies, and ecosystem protection methods.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="gamified" size="lg" className="bg-white text-primary hover:bg-white/90">
                <Play className="w-5 h-5 mr-2" />
                Water Calculator
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Conservation Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Conservation Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Conservation Methods</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {conservationMethods.map((method, index) => (
                <Card key={index} className="hover:shadow-glow transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        {method.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{method.title}</CardTitle>
                        <Badge variant="outline" className="text-blue-600 border-blue-200">
                          {method.savings} water savings
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{method.description}</p>
                    <div>
                      <div className="text-sm font-semibold mb-2">Applications:</div>
                      {method.applications.map((app, appIndex) => (
                        <div key={appIndex} className="flex items-start gap-2 text-sm mb-1">
                          <span className="text-primary mt-1">•</span>
                          <span>{app}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => alert(`💧 ${method.title} implementation guide coming soon!`)}
                    >
                      Implementation Guide
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Water Audit Tool */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <TrendingUp className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Water Audit Tool</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Analyze your water usage patterns and discover personalized conservation 
              opportunities with our comprehensive water audit tool.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => alert('🔍 Water audit tool launching soon! Start with conservation tips.')}
              >
                <Filter className="w-5 h-5 mr-2" />
                Start Audit
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

export default WaterConservation;