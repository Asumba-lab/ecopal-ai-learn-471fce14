import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: "🧠",
    title: "AI-Powered Learning",
    description: "Your personal AI coach adapts lessons to your pace, interests, and learning style.",
    highlight: "Smart Personalization"
  },
  {
    icon: "🎮", 
    title: "Gamified Challenges",
    description: "Build eco-villages, manage carbon budgets, and complete daily sustainability missions.",
    highlight: "50+ Interactive Games"
  },
  {
    icon: "⚡",
    title: "Microlearning Sessions", 
    description: "Learn in just 5 minutes per day with bite-sized, actionable content that sticks.",
    highlight: "5 Min Daily"
  },
  {
    icon: "🏆",
    title: "Community Competitions",
    description: "Team up with friends or compete globally in sustainability challenges and leaderboards.",
    highlight: "Global Leaderboards"
  },
  {
    icon: "📱",
    title: "Real-World Impact",
    description: "Track your actual carbon footprint and get connected to real eco-products and services.",
    highlight: "Track Real Impact"
  },
  {
    icon: "🎓",
    title: "Earn Certifications",
    description: "Get recognized for your learning with badges, certificates, and skill achievements.",
    highlight: "Verified Certificates"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            ✨ Core Features
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Learning That Actually
            <span className="text-primary"> Changes Behavior</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            EcoPal combines the latest in AI technology with proven gamification techniques 
            to make sustainability education engaging, effective, and fun.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:scale-105 hover:shadow-glow transition-all duration-300 border-primary/10 hover:border-primary/30"
            >
              <CardHeader className="text-center">
                <div className="text-5xl mb-4 group-hover:animate-bounce">{feature.icon}</div>
                <div className="inline-block bg-gradient-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold mb-3">
                  {feature.highlight}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="max-w-4xl mx-auto bg-gradient-hero text-white border-0">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h3>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of learners already making a difference through EcoPal's innovative approach to sustainability education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gamified" size="xl" className="bg-white text-primary hover:bg-white/90">
                  🚀 Start Free Trial
                </Button>
                <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-primary">
                  📚 Explore Curriculum
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};