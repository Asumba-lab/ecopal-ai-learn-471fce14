import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Leaf, Zap, Recycle, Globe, TreePine, Droplets } from "lucide-react";

const environmentalTopics = [
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Climate Change Fundamentals",
    description: "Understand the science behind global warming, greenhouse gases, and their impact on our planet's climate systems.",
    content: [
      "The greenhouse effect and how human activities amplify it",
      "Key greenhouse gases: CO2, methane, nitrous oxide",
      "Global temperature trends and climate tipping points",
      "Impact on weather patterns, sea levels, and ecosystems"
    ]
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Renewable Energy Solutions",
    description: "Explore sustainable energy sources that can power our future without harming the environment.",
    content: [
      "Solar power: photovoltaic and thermal systems",
      "Wind energy: onshore and offshore turbines",
      "Hydroelectric power and micro-hydro systems",
      "Geothermal, biomass, and emerging technologies"
    ]
  },
  {
    icon: <TreePine className="w-8 h-8" />,
    title: "Carbon Capture & Sequestration",
    description: "Learn about technologies and natural methods to remove CO2 from the atmosphere.",
    content: [
      "Direct air capture technologies",
      "Carbon storage in forests and soils",
      "Ocean-based carbon sequestration",
      "Industrial carbon capture and utilization"
    ]
  },
  {
    icon: <Recycle className="w-8 h-8" />,
    title: "Circular Economy",
    description: "Discover how we can eliminate waste through innovative recycling and reuse strategies.",
    content: [
      "Design for disassembly and recyclability",
      "Industrial symbiosis and waste-to-energy",
      "Plastic alternatives and biodegradable materials",
      "Sharing economy and product-as-a-service models"
    ]
  },
  {
    icon: <Droplets className="w-8 h-8" />,
    title: "Water Conservation",
    description: "Understand sustainable water management and conservation techniques for our precious resource.",
    content: [
      "Rainwater harvesting and greywater systems",
      "Smart irrigation and precision agriculture",
      "Water treatment and purification technologies",
      "Protecting watersheds and aquatic ecosystems"
    ]
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Sustainable Living",
    description: "Practical strategies for reducing your environmental footprint in daily life.",
    content: [
      "Energy-efficient home design and retrofits",
      "Sustainable transportation options",
      "Zero-waste lifestyle and composting",
      "Sustainable food choices and local sourcing"
    ]
  }
];

const Learning = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation showBackButton={true} onBackToLanding={() => window.location.href = '/'} />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Environmental Learning Hub
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Dive deep into environmental science, climate solutions, and sustainable technologies. 
            Build your knowledge with comprehensive, science-based content.
          </p>
        </div>
      </section>

      {/* Topics Accordion */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Accordion type="single" collapsible className="space-y-4">
            {environmentalTopics.map((topic, index) => (
              <AccordionItem key={index} value={`topic-${index}`} className="border rounded-lg shadow-sm hover:shadow-glow transition-all duration-300">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4 text-left">
                    <div className="text-primary flex-shrink-0">
                      {topic.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{topic.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{topic.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-4 text-primary">Key Learning Areas:</h4>
                    <ul className="space-y-3">
                      {topic.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <span className="text-primary mt-1 flex-shrink-0">🌟</span>
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-3">
                        Ready to dive deeper into this topic?
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          const topicRoutes = {
                            0: '/topics/climate-change',
                            1: '/topics/renewable-energy', 
                            2: '/topics/carbon-capture',
                            3: '/topics/circular-economy',
                            4: '/topics/water-conservation',
                            5: '/topics/sustainable-living'
                          };
                          window.location.href = topicRoutes[index as keyof typeof topicRoutes];
                        }}
                      >
                        View Detailed Course →
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Apply Your Knowledge?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take what you've learned and put it into practice with our interactive challenges and simulations.
          </p>
          <Button 
            variant="hero" 
            size="xl"
            onClick={() => window.location.href = '/'}
          >
            🎮 Start Interactive Challenges
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Learning;