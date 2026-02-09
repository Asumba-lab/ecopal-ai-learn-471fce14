import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Thermometer, Globe, TrendingUp, AlertTriangle, BookOpen, Play, CheckCircle2 } from "lucide-react";
import { GreenhouseEffectModule } from "@/components/modules/GreenhouseEffectModule";

const ClimateChange = () => {
  const [greenhouseModuleOpen, setGreenhouseModuleOpen] = useState(false);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const handleModuleComplete = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const keyStats = [
    { label: "Global Temperature Rise", value: "+1.1°C", description: "Since pre-industrial times" },
    { label: "CO2 Concentration", value: "421 ppm", description: "Highest in 3 million years" },
    { label: "Sea Level Rise", value: "3.4 mm/year", description: "Current rate of increase" },
    { label: "Arctic Ice Loss", value: "13%/decade", description: "Rate of decline" }
  ];

  const learningModules = [
    {
      title: "The Greenhouse Effect",
      duration: "15 min",
      difficulty: "Beginner",
      description: "Understand how greenhouse gases trap heat in Earth's atmosphere",
      completed: false
    },
    {
      title: "Carbon Cycle Dynamics", 
      duration: "20 min",
      difficulty: "Intermediate",
      description: "Explore how carbon moves through Earth's systems",
      completed: false
    },
    {
      title: "Climate Feedback Loops",
      duration: "25 min", 
      difficulty: "Advanced",
      description: "Learn about reinforcing and balancing climate mechanisms",
      completed: false
    },
    {
      title: "Tipping Points",
      duration: "18 min",
      difficulty: "Intermediate", 
      description: "Discover critical thresholds in the climate system",
      completed: false
    }
  ];

  const resources = [
    { type: "Interactive", title: "CO2 Concentration Timeline", description: "Explore 800,000 years of atmospheric CO2" },
    { type: "Simulation", title: "Climate Model Sandbox", description: "Experiment with different emission scenarios" },
    { type: "Video", title: "IPCC Report Summary", description: "Key findings from the latest climate science" },
    { type: "Data", title: "Global Temperature Anomalies", description: "Interactive temperature data visualization" }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-blue-100 text-blue-800"; 
      case "Advanced": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation showBackButton={true} onBackToLanding={() => window.location.href = '/learning'} />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Globe className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Climate Change Fundamentals</h1>
            <p className="text-xl text-white/90 mb-8">
              Master the science behind global warming, understand greenhouse gas dynamics, 
              and explore the impacts on Earth's climate systems.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="gamified" size="lg" className="bg-white text-primary hover:bg-white/90">
                <Play className="w-5 h-5 mr-2" />
                Start Interactive Course
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Download Resources
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Current Climate Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-glow transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Modules */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Learning Modules</h2>
              <p className="text-xl text-muted-foreground">
                Progress through structured lessons to build comprehensive understanding
              </p>
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>{completedModules.length}/4 modules completed</span>
                </div>
                <Progress value={(completedModules.length / 4) * 100} className="h-3" />
              </div>
            </div>

            <div className="space-y-6">
              {learningModules.map((module, index) => {
                const isCompleted = completedModules.includes(module.title);
                const isGreenhouseModule = module.title === "The Greenhouse Effect";
                
                return (
                  <Card key={index} className={`hover:shadow-glow transition-all duration-300 group ${isCompleted ? 'border-green-500 bg-green-50/50' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isCompleted ? 'bg-green-100' : 'bg-primary/10 group-hover:bg-primary/20'}`}>
                            {isCompleted ? (
                              <CheckCircle2 className="w-6 h-6 text-green-600" />
                            ) : (
                              <BookOpen className="w-6 h-6 text-primary" />
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-xl flex items-center gap-2">
                              {module.title}
                              {isCompleted && <Badge className="text-xs bg-green-100 text-green-800">Completed</Badge>}
                            </CardTitle>
                            <div className="flex items-center gap-3 mt-1">
                              <Badge className={getDifficultyColor(module.difficulty)}>
                                {module.difficulty}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{module.duration}</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant={isCompleted ? "outline" : "hero"}
                          onClick={() => {
                            if (isGreenhouseModule) {
                              setGreenhouseModuleOpen(true);
                            } else {
                              alert(`🚀 ${module.title} interactive module coming soon! Try "The Greenhouse Effect" module now.`);
                            }
                          }}
                        >
                          {isCompleted ? "Review Module" : "Start Module"}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{module.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Resources */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Interactive Resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <Card key={index} className="hover:shadow-glow transition-shadow group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge variant="outline" className="mb-2">{resource.type}</Badge>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {resource.title}
                        </CardTitle>
                      </div>
                      <Play className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{resource.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Thermometer className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Test Your Knowledge</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Take our interactive assessment to evaluate your understanding of climate science
              and earn your Climate Change Fundamentals certificate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => alert('🎯 Climate assessment coming soon! Practice with our current challenges.')}
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                Take Assessment
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

      {/* Greenhouse Effect Module Dialog */}
      <GreenhouseEffectModule
        open={greenhouseModuleOpen}
        onOpenChange={setGreenhouseModuleOpen}
        onComplete={() => handleModuleComplete("The Greenhouse Effect")}
      />
    </div>
  );
};

export default ClimateChange;