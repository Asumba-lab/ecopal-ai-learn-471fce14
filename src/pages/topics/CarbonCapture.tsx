import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TreePine, Factory, Waves, Microscope, TrendingUp, Play } from "lucide-react";

const CarbonCapture = () => {
  const captureTypes = [
    {
      icon: <Factory className="w-8 h-8" />,
      title: "Direct Air Capture",
      scale: "Industrial",
      potential: "10 Gt CO2/year",
      description: "Advanced technology that pulls CO2 directly from ambient air",
      status: "Scaling Up"
    },
    {
      icon: <TreePine className="w-8 h-8" />,
      title: "Natural Carbon Sinks",
      scale: "Global",
      potential: "37 Gt CO2/year", 
      description: "Forests, soils, and wetlands that naturally store carbon",
      status: "Proven"
    },
    {
      icon: <Waves className="w-8 h-8" />,
      title: "Ocean Sequestration",
      scale: "Oceanic",
      potential: "2 Gt CO2/year",
      description: "Marine ecosystems and engineered ocean carbon removal",
      status: "Research"
    },
    {
      icon: <Microscope className="w-8 h-8" />,
      title: "Enhanced Weathering",
      scale: "Agricultural",
      potential: "5 Gt CO2/year",
      description: "Accelerating natural rock weathering to capture CO2",
      status: "Pilot Phase"
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
              <TreePine className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Carbon Capture & Sequestration</h1>
            <p className="text-xl text-white/90 mb-8">
              Explore cutting-edge technologies and natural solutions for removing CO2 from the atmosphere. 
              Learn how carbon capture is becoming a critical tool in fighting climate change.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="gamified" size="lg" className="bg-white text-primary hover:bg-white/90">
                <Play className="w-5 h-5 mr-2" />
                Interactive Demo
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Research Papers
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Carbon Capture Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Carbon Removal Methods</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {captureTypes.map((method, index) => (
                <Card key={index} className="hover:shadow-glow transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        {method.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{method.title}</CardTitle>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{method.scale}</Badge>
                          <Badge 
                            variant="outline"
                            className={
                              method.status === "Proven" ? "text-green-600 border-green-200" :
                              method.status === "Scaling Up" ? "text-blue-600 border-blue-200" :
                              method.status === "Pilot Phase" ? "text-orange-600 border-orange-200" :
                              "text-purple-600 border-purple-200"
                            }
                          >
                            {method.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{method.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-muted-foreground">Potential Capacity</div>
                        <div className="text-lg font-bold text-primary">{method.potential}</div>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={() => alert(`🔬 Deep dive into ${method.title} coming soon!`)}
                      >
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <TrendingUp className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Explore Technologies</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Dive deep into the science and engineering behind carbon capture technologies
              with our interactive simulations and case studies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => alert('🧪 Technology explorer launching soon! Experience our demo tools.')}
              >
                <Microscope className="w-5 h-5 mr-2" />
                Explore Technologies
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

export default CarbonCapture;