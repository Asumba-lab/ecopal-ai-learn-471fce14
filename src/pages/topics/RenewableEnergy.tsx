import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Zap, Sun, Wind, Battery, Calculator, Play } from "lucide-react";

const RenewableEnergy = () => {
  const energySources = [
    { 
      icon: <Sun className="w-8 h-8" />, 
      name: "Solar Power", 
      capacity: "1,177 GW", 
      growth: "+22%",
      description: "Global installed capacity"
    },
    { 
      icon: <Wind className="w-8 h-8" />, 
      name: "Wind Power", 
      capacity: "899 GW", 
      growth: "+13%",
      description: "Worldwide wind capacity"
    },
    { 
      icon: <Zap className="w-8 h-8" />, 
      name: "Hydroelectric", 
      capacity: "1,360 GW", 
      growth: "+2%",
      description: "Total hydro installations"
    },
    { 
      icon: <Battery className="w-8 h-8" />, 
      name: "Energy Storage", 
      capacity: "27 GW", 
      growth: "+130%",
      description: "Battery storage deployed"
    }
  ];

  const practicalProjects = [
    {
      title: "Design a Solar Home System",
      difficulty: "Beginner",
      duration: "30 min",
      description: "Calculate energy needs and design a residential solar installation",
      tools: ["Solar Calculator", "Cost Estimator", "ROI Analysis"]
    },
    {
      title: "Wind Farm Site Assessment",
      difficulty: "Intermediate", 
      duration: "45 min",
      description: "Evaluate wind resources and environmental factors for wind farm development",
      tools: ["Wind Mapping", "Environmental Impact", "Grid Connection"]
    },
    {
      title: "Microgrid Design Challenge",
      difficulty: "Advanced",
      duration: "60 min", 
      description: "Create a resilient microgrid combining multiple renewable sources",
      tools: ["Load Balancing", "Storage Optimization", "Smart Controls"]
    }
  ];

  const technologies = [
    {
      name: "Photovoltaic Cells",
      efficiency: "22-26%",
      trend: "Improving",
      description: "Converting sunlight directly to electricity"
    },
    {
      name: "Wind Turbines",
      efficiency: "35-45%", 
      trend: "Stable",
      description: "Harnessing kinetic energy from wind"
    },
    {
      name: "Lithium-Ion Batteries",
      efficiency: "85-95%",
      trend: "Costs Declining",
      description: "Energy storage for grid stability"
    },
    {
      name: "Green Hydrogen",
      efficiency: "70-80%",
      trend: "Emerging",
      description: "Renewable energy storage via electrolysis"
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
              <Zap className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Renewable Energy Systems</h1>
            <p className="text-xl text-white/90 mb-8">
              Master sustainable energy technologies that power our clean future. Learn solar, wind, 
              hydro, and energy storage systems through hands-on projects and real-world applications.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="gamified" size="lg" className="bg-white text-primary hover:bg-white/90">
                <Calculator className="w-5 h-5 mr-2" />
                Energy Calculator
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Play className="w-5 h-5 mr-2" />
                Watch Demos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Energy Source Statistics */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Global Renewable Capacity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {energySources.map((source, index) => (
              <Card key={index} className="text-center hover:shadow-glow transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center text-primary mb-4">
                    {source.icon}
                  </div>
                  <div className="text-2xl font-bold mb-1">{source.capacity}</div>
                  <div className="font-semibold mb-2">{source.name}</div>
                  <Badge variant="outline" className="mb-2">
                    {source.growth} YoY Growth
                  </Badge>
                  <div className="text-sm text-muted-foreground">{source.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Deep Dive */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Technology Breakdown</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {technologies.map((tech, index) => (
                <Card key={index} className="hover:shadow-glow transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{tech.name}</CardTitle>
                        <Badge 
                          variant="outline" 
                          className={
                            tech.trend === "Improving" ? "text-green-600 border-green-200" :
                            tech.trend === "Costs Declining" ? "text-blue-600 border-blue-200" :
                            tech.trend === "Emerging" ? "text-purple-600 border-purple-200" :
                            "text-gray-600 border-gray-200"
                          }
                        >
                          {tech.trend}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{tech.efficiency}</div>
                        <div className="text-sm text-muted-foreground">Efficiency</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{tech.description}</p>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => alert(`🔬 Deep dive into ${tech.name} technology coming soon!`)}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hands-on Projects */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Hands-On Projects</h2>
              <p className="text-xl text-muted-foreground">
                Apply your knowledge with real-world renewable energy system design challenges
              </p>
            </div>

            <div className="space-y-6">
              {practicalProjects.map((project, index) => (
                <Card key={index} className="hover:shadow-glow transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant="outline">{project.difficulty}</Badge>
                          <span className="text-sm text-muted-foreground">{project.duration}</span>
                        </div>
                      </div>
                      <Button 
                        variant="hero"
                        onClick={() => alert(`🛠️ ${project.title} project launching soon! Try our current challenges.`)}
                      >
                        Start Project
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div>
                      <div className="text-sm font-semibold mb-2">Tools & Resources:</div>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool, toolIndex) => (
                          <Badge key={toolIndex} variant="secondary" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulator */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Battery className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Energy System Simulator</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Use our interactive simulator to experiment with different renewable energy configurations
              and see real-time performance data and cost projections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => alert('⚡ Energy simulator launching soon! Experience our demo tools.')}
              >
                <Zap className="w-5 h-5 mr-2" />
                Launch Simulator
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

export default RenewableEnergy;