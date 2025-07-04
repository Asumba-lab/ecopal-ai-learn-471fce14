import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, Award, BookOpen } from "lucide-react";

const curriculumModules = [
  {
    id: 1,
    title: "Foundations of Sustainability",
    level: "Beginner",
    duration: "2 weeks",
    lessons: 8,
    description: "Build a solid understanding of environmental science and sustainability principles.",
    topics: [
      "Introduction to Environmental Science",
      "The Carbon Cycle and Climate Systems", 
      "Biodiversity and Ecosystem Services",
      "Human Impact Assessment"
    ],
    skills: ["Environmental Awareness", "System Thinking", "Impact Assessment"]
  },
  {
    id: 2,
    title: "Renewable Energy Systems",
    level: "Intermediate", 
    duration: "3 weeks",
    lessons: 12,
    description: "Master the technologies powering our clean energy future.",
    topics: [
      "Solar Energy Technologies",
      "Wind Power Systems",
      "Energy Storage Solutions",
      "Grid Integration and Smart Systems"
    ],
    skills: ["Energy Analysis", "Technology Evaluation", "Project Planning"]
  },
  {
    id: 3,
    title: "Circular Economy Design",
    level: "Intermediate",
    duration: "3 weeks", 
    lessons: 10,
    description: "Learn to design waste-free systems and sustainable business models.",
    topics: [
      "Life Cycle Assessment",
      "Design for Circularity",
      "Waste-to-Resource Strategies",
      "Business Model Innovation"
    ],
    skills: ["Systems Design", "LCA Methodology", "Innovation Thinking"]
  },
  {
    id: 4,
    title: "Climate Action & Policy",
    level: "Advanced",
    duration: "4 weeks",
    lessons: 15,
    description: "Understand climate science and develop effective action strategies.",
    topics: [
      "Climate Science Deep Dive",
      "Policy Analysis and Development",
      "International Climate Agreements", 
      "Community Engagement Strategies"
    ],
    skills: ["Policy Analysis", "Stakeholder Engagement", "Strategic Planning"]
  },
  {
    id: 5,
    title: "Sustainable Urban Planning",
    level: "Advanced",
    duration: "4 weeks",
    lessons: 14,
    description: "Design cities that work in harmony with natural systems.",
    topics: [
      "Green Infrastructure Design",
      "Sustainable Transportation Systems",
      "Urban Biodiversity Conservation",
      "Smart City Technologies"
    ],
    skills: ["Urban Design", "Infrastructure Planning", "Technology Integration"]
  },
  {
    id: 6,
    title: "Environmental Leadership",
    level: "Expert",
    duration: "5 weeks",
    lessons: 18,
    description: "Develop the skills to lead environmental change in organizations and communities.",
    topics: [
      "Change Management for Sustainability",
      "Stakeholder Communication",
      "Project Management for Impact",
      "Measuring and Reporting Progress"
    ],
    skills: ["Leadership", "Communication", "Project Management", "Impact Measurement"]
  }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "Beginner": return "bg-green-100 text-green-800";
    case "Intermediate": return "bg-blue-100 text-blue-800";
    case "Advanced": return "bg-purple-100 text-purple-800";
    case "Expert": return "bg-orange-100 text-orange-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const Curriculum = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation showBackButton={true} onBackToLanding={() => window.location.href = '/'} />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Comprehensive Learning Curriculum
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            A structured learning path from environmental fundamentals to advanced sustainability leadership. 
            Build expertise through hands-on projects and real-world applications.
          </p>
          <div className="flex justify-center gap-8 text-white/90">
            <div className="text-center">
              <div className="text-3xl font-bold">6</div>
              <div className="text-sm">Learning Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">67</div>
              <div className="text-sm">Interactive Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">20+</div>
              <div className="text-sm">Weeks of Content</div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Your Learning Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Progress through carefully designed modules that build on each other, 
              taking you from beginner to expert in environmental sustainability.
            </p>
          </div>

          <div className="space-y-8">
            {curriculumModules.map((module, index) => (
              <Card key={module.id} className="hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <Badge className={getLevelColor(module.level)}>
                          {module.level}
                        </Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {module.duration}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <BookOpen className="w-4 h-4" />
                          {module.lessons} lessons
                        </div>
                      </div>
                      <CardTitle className="text-2xl mb-2">
                        Module {module.id}: {module.title}
                      </CardTitle>
                      <p className="text-muted-foreground">{module.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-muted-foreground">
                        {String(module.id).padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Learning Topics</h4>
                      <ul className="space-y-2">
                        {module.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-start gap-2 text-sm">
                            <span className="text-primary mt-1">•</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Skills You'll Gain</h4>
                      <div className="flex flex-wrap gap-2">
                        {module.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>0%</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button 
                      variant="hero" 
                      className="flex-1"
                      onClick={() => alert(`🚀 Module ${module.id} will be available in the interactive learning platform! Start with our demo challenges.`)}
                    >
                      Start Module
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => alert(`📋 Detailed syllabus for ${module.title} coming soon!`)}
                    >
                      View Syllabus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
                <p className="text-muted-foreground">
                  Learn from leading environmental scientists and sustainability practitioners.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Industry Recognition</h3>
                <p className="text-muted-foreground">
                  Earn certificates recognized by leading environmental organizations.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Hands-On Projects</h3>
                <p className="text-muted-foreground">
                  Apply your learning through real-world sustainability projects.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners building expertise in environmental sustainability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => window.location.href = '/'}
            >
              🚀 Start Learning Now
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              onClick={() => alert('🎯 Free trial starting soon! Begin with our demo challenges.')}
            >
              Try Free Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Curriculum;