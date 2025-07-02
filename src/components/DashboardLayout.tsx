import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { GameSimulation } from "./GameSimulation";
import ecopalMascot from "@/assets/ecopal-mascot.jpg";

interface DashboardLayoutProps {
  userData: {
    age: string;
    location: string;
    interests: string[];
    experience: string;
  };
}

export const DashboardLayout = ({ userData }: DashboardLayoutProps) => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [userStats, setUserStats] = useState({
    streak: 7,
    totalPoints: 2850,
    level: 12,
    badges: 8,
    carbonSaved: 245,
    treesPlanted: 15
  });

  const dailyChallenges = [
    {
      id: "solar-village",
      title: "Build Solar School",
      description: "Design an energy-efficient educational facility",
      difficulty: "Medium",
      points: 150,
      timeEstimate: "8 mins",
      icon: "🏫",
      progress: 0
    },
    {
      id: "carbon-tracker", 
      title: "Carbon Footprint Day",
      description: "Track and optimize your daily carbon impact",
      difficulty: "Easy",
      points: 100,
      timeEstimate: "5 mins", 
      icon: "📊",
      progress: 0
    },
    {
      id: "green-budget",
      title: "Sustainable Budget",
      description: "Plan a family's eco-friendly monthly spending",
      difficulty: "Hard",
      points: 200,
      timeEstimate: "12 mins",
      icon: "💰",
      progress: 0
    }
  ];

  const achievements = [
    { icon: "🌱", name: "Eco Beginner", description: "Completed first challenge" },
    { icon: "⚡", name: "Energy Saver", description: "Saved 100 kWh" },
    { icon: "🔥", name: "7-Day Streak", description: "Learning streak active" },
    { icon: "🌍", name: "Global Impact", description: "Reduced 200kg CO₂" }
  ];

  const getPersonalizedRecommendation = () => {
    const recommendations = {
      "renewable-energy": "Perfect! Today's Solar School challenge matches your interest in renewable energy.",
      "sustainable-living": "Try our Carbon Tracker to see how small changes make big impacts!",
      "climate-action": "The Green Budget challenge shows real climate solutions in action.",
      "green-tech": "Explore how technology powers sustainable communities in Build Solar School.",
      "eco-business": "Learn sustainable business principles with our Green Budget simulation.",
      "conservation": "Discover conservation techniques in our daily Carbon Tracker."
    };

    const userInterest = userData.interests[0] || "sustainable-living";
    return recommendations[userInterest as keyof typeof recommendations] || 
           "Great to have you back! Let's continue your sustainability journey.";
  };

  if (currentGame) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => setCurrentGame(null)}
            className="mb-4"
          >
            ← Back to Dashboard
          </Button>
        </div>
        <GameSimulation type={currentGame as any} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-4">
            <img 
              src={ecopalMascot} 
              alt="EcoPal" 
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full animate-float"
            />
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Welcome back, Eco Champion! 🌟</h1>
              <p className="text-sm sm:text-base text-muted-foreground">{getPersonalizedRecommendation()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <Card className="p-2 sm:p-4 bg-gradient-success text-white">
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold">{userStats.streak}</div>
                <div className="text-xs">Day Streak 🔥</div>
              </div>
            </Card>
            <Card className="p-2 sm:p-4 bg-gradient-primary text-white">
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold">{userStats.totalPoints}</div>
                <div className="text-xs">Total Points ⭐</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl mb-2">🏆</div>
            <div className="text-xl font-bold text-gold">Level {userStats.level}</div>
            <div className="text-sm text-muted-foreground">Sustainability Expert</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-2xl mb-2">🎖️</div>
            <div className="text-xl font-bold">{userStats.badges}</div>
            <div className="text-sm text-muted-foreground">Badges Earned</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-2xl mb-2">🌱</div>
            <div className="text-xl font-bold text-success">{userStats.carbonSaved} kg</div>
            <div className="text-sm text-muted-foreground">CO₂ Reduced</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-2xl mb-2">🌳</div>
            <div className="text-xl font-bold text-success">{userStats.treesPlanted}</div>
            <div className="text-sm text-muted-foreground">Trees Planted</div>
          </Card>
        </div>

        {/* Daily Challenges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎯 Today's Challenges
              <span className="text-sm font-normal text-muted-foreground">
                Personalized for {userData.experience} level
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {dailyChallenges.map((challenge) => (
                <Card key={challenge.id} className="group hover:shadow-glow transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2 group-hover:animate-bounce">{challenge.icon}</div>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {challenge.difficulty}
                      </span>
                      <span className="text-muted-foreground">{challenge.timeEstimate}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-primary">+{challenge.points} points</span>
                      <Button 
                        variant="hero" 
                        size="sm"
                        onClick={() => setCurrentGame(challenge.id)}
                      >
                        {challenge.progress > 0 ? "Continue" : "Start"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card id="achievements-section">
          <CardHeader>
            <CardTitle>🏆 Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="p-4 text-center hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <div className="font-semibold text-sm">{achievement.name}</div>
                  <div className="text-xs text-muted-foreground">{achievement.description}</div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center bg-gradient-card hover:shadow-glow transition-all">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-bold mb-2">Learning Path</h3>
            <p className="text-sm text-muted-foreground mb-4">Continue your personalized curriculum</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                // Scroll to achievements section
                const achievementsSection = document.querySelector('#achievements-section');
                achievementsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Progress
            </Button>
          </Card>
          
          <Card className="p-6 text-center bg-gradient-card hover:shadow-glow transition-all">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="font-bold mb-2">Community</h3>
            <p className="text-sm text-muted-foreground mb-4">Join challenges with friends</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                // Simulate community feature
                alert('🌟 Community feature coming soon! Join our leaderboards and compete with eco-champions worldwide!');
              }}
            >
              Join Community
            </Button>
          </Card>
          
          <Card className="p-6 text-center bg-gradient-card hover:shadow-glow transition-all">
            <div className="text-3xl mb-3">🛍️</div>
            <h3 className="font-bold mb-2">Eco Shop</h3>
            <p className="text-sm text-muted-foreground mb-4">Discover sustainable products</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                // Open eco-shop in new tab
                window.open('https://www.ecosia.org/shop', '_blank');
              }}
            >
              Explore Shop
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};