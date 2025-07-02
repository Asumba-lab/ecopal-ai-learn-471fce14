import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEcoToast } from "@/hooks/useToast";
import { analytics } from "@/utils/analytics";

interface GameSimulationProps {
  type: "solar-village" | "carbon-tracker" | "green-budget";
}

export const GameSimulation = ({ type }: GameSimulationProps) => {
  const { showSuccess, showAchievement } = useEcoToast();
  const [gameState, setGameState] = useState({
    energy: 50,
    happiness: 70,
    budget: 1000,
    carbonFootprint: 100,
    progress: 0,
    score: 0
  });

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const solarVillageItems = [
    { id: "solar-panels", name: "Solar Panels", cost: 200, energy: +30, icon: "☀️" },
    { id: "wind-turbine", name: "Wind Turbine", cost: 150, energy: +20, icon: "🌪️" },
    { id: "green-roof", name: "Green Rooftop", cost: 100, happiness: +15, icon: "🌱" },
    { id: "rain-collector", name: "Rain Collector", cost: 80, happiness: +10, icon: "🌧️" },
    { id: "led-lights", name: "LED Street Lights", cost: 60, energy: +10, icon: "💡" },
    { id: "bike-station", name: "Bike Station", cost: 120, happiness: +20, icon: "🚲" }
  ];

  const carbonTrackerActivities = [
    { id: "walk", name: "Walk to Work", carbon: -5, icon: "🚶" },
    { id: "bike", name: "Bike to Work", carbon: -3, icon: "🚲" },
    { id: "public-transport", name: "Public Transport", carbon: -2, icon: "🚌" },
    { id: "electric-car", name: "Electric Car", carbon: -1, icon: "🔋" },
    { id: "car", name: "Drive Car", carbon: +3, icon: "🚗" },
    { id: "plane", name: "Short Flight", carbon: +10, icon: "✈️" }
  ];

  const handleItemSelect = (item: any) => {
    analytics.trackButtonClick(item.name, `game_${type}`);
    
    if (type === "solar-village") {
      if (gameState.budget >= item.cost && !selectedItems.includes(item.id)) {
        const newState = {
          ...gameState,
          budget: gameState.budget - item.cost,
          energy: gameState.energy + (item.energy || 0),
          happiness: gameState.happiness + (item.happiness || 0),
          progress: Math.min(100, gameState.progress + 15),
          score: gameState.score + 10
        };
        
        setGameState(newState);
        setSelectedItems(prev => [...prev, item.id]);
        showSuccess(`Added ${item.name} to your village! +10 points`);
        
        // Check for achievements
        if (newState.progress >= 50 && gameState.progress < 50) {
          showAchievement("Village Builder", 50);
        }
      }
    } else if (type === "carbon-tracker") {
      const newScore = gameState.score + (item.carbon < 0 ? 5 : -2);
      setGameState(prev => ({
        ...prev,
        carbonFootprint: Math.max(0, prev.carbonFootprint + item.carbon),
        progress: Math.min(100, prev.progress + 10),
        score: newScore
      }));
      
      if (item.carbon < 0) {
        showSuccess(`Great choice! Reduced carbon footprint by ${Math.abs(item.carbon)}kg CO₂`);
      }
    }
  };

  const getGameContent = () => {
    switch (type) {
      case "solar-village":
        return {
          title: "🏘️ Build Your Solar Village",
          description: "Create a sustainable community by adding eco-friendly infrastructure",
          items: solarVillageItems,
          stats: [
            { label: "Energy", value: gameState.energy, max: 100, color: "text-yellow-600" },
            { label: "Happiness", value: gameState.happiness, max: 100, color: "text-green-600" },
            { label: "Budget", value: gameState.budget, max: 1000, color: "text-blue-600" }
          ]
        };
      
      case "carbon-tracker":
        return {
          title: "📊 Daily Carbon Tracker",
          description: "Make choices throughout your day and see their impact",
          items: carbonTrackerActivities,
          stats: [
            { label: "Carbon Footprint", value: gameState.carbonFootprint, max: 150, color: "text-red-600" },
            { label: "Eco Score", value: Math.max(0, gameState.score), max: 100, color: "text-green-600" }
          ]
        };
      
      default:
        return {
          title: "🎮 Game Loading...",
          description: "Preparing your sustainability challenge",
          items: [],
          stats: []
        };
    }
  };

  const content = getGameContent();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center bg-gradient-primary text-white rounded-t-lg">
        <CardTitle className="text-2xl">{content.title}</CardTitle>
        <p className="text-white/90">{content.description}</p>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{gameState.progress}%</span>
          </div>
          <Progress value={gameState.progress} className="h-3" />
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {content.stats.map((stat, index) => (
            <Card key={index} className="p-4 bg-muted/50">
              <div className="text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}{stat.max && `/${stat.max}`}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                {stat.max && (
                  <Progress 
                    value={(stat.value / stat.max) * 100} 
                    className="mt-2 h-2" 
                  />
                )}
              </div>
            </Card>
          ))}
          
          <Card className="p-4 bg-gradient-success text-white">
            <div className="text-center">
              <div className="text-2xl font-bold">{gameState.score}</div>
              <div className="text-sm">Score</div>
            </div>
          </Card>
        </div>

        {/* Game Items */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center">
            {type === "solar-village" ? "Available Infrastructure" : "Daily Activities"}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {content.items.map((item, index) => {
              const isSelected = selectedItems.includes(item.id);
              const canAfford = type === "solar-village" ? gameState.budget >= item.cost : true;
              
              return (
                <Button
                  key={index}
                  variant={isSelected ? "success" : canAfford ? "gamified" : "outline"}
                  className="h-24 flex-col gap-2 text-xs"
                  onClick={() => handleItemSelect(item)}
                  disabled={isSelected || !canAfford}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                  {type === "solar-village" && (
                    <span className="text-xs text-muted-foreground">
                      ${item.cost}
                    </span>
                  )}
                  {type === "carbon-tracker" && (
                    <span className={`text-xs font-bold ${
                      item.carbon < 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.carbon > 0 ? '+' : ''}{item.carbon} CO₂
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => {
              setGameState({
                energy: 50,
                happiness: 70,
                budget: 1000,
                carbonFootprint: 100,
                progress: 0,
                score: 0
              });
              setSelectedItems([]);
            }}
          >
            🔄 Reset Game
          </Button>
          
          {gameState.progress >= 80 && (
            <Button 
              variant="success" 
              className="animate-pulse-glow"
              onClick={() => {
                showAchievement("Challenge Completed!", 100);
                analytics.track('challenge_completed', { type, score: gameState.score });
              }}
            >
              🏆 Complete Challenge
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};