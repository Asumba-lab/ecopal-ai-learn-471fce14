import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import ecopalMascot from "@/assets/ecopal-mascot.jpg";

interface EcoPalBotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ecopal';
  timestamp: Date;
}

const sampleQuestions = [
  "What is renewable energy?",
  "How can I reduce my carbon footprint?",
  "What are the benefits of solar energy?",
  "How does climate change affect the environment?",
  "What are sustainable living practices?",
];

const ecopalResponses: Record<string, string> = {
  "what is renewable energy": "Renewable energy comes from natural sources that replenish themselves constantly, like sunlight, wind, rain, tides, waves, and geothermal heat. Unlike fossil fuels, renewables don't run out and produce little to no greenhouse gas emissions! 🌱⚡",
  "how can i reduce my carbon footprint": "Great question! You can reduce your carbon footprint by: using public transport or cycling, switching to LED bulbs, eating less meat, reducing waste, using renewable energy, and conserving water. Every small action counts! 🌍♻️",
  "what are the benefits of solar energy": "Solar energy is amazing! Benefits include: zero emissions during operation, reduced electricity bills, low maintenance costs, energy independence, and it's inexhaustible. Plus, solar panel costs have dropped by 80% in the last decade! ☀️💰",
  "how does climate change affect the environment": "Climate change causes rising sea levels, extreme weather events, melting ice caps, ecosystem disruption, and species extinction. But here's the good news - we can combat it through renewable energy, reforestation, and sustainable practices! 🌊🔥❄️",
  "what are sustainable living practices": "Sustainable living includes: reducing energy consumption, recycling and composting, buying local and organic foods, using eco-friendly products, conserving water, and supporting renewable energy. It's about meeting our needs without compromising future generations! 🌿🏠",
  "default": "That's a fantastic environmental question! While I'm still learning, I can help you explore topics like renewable energy, climate action, sustainable living, and green technology. Try asking me about solar energy, carbon footprints, or eco-friendly practices! 🌱🤖"
};

export const EcoPalBot = ({ isOpen, onClose }: EcoPalBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm EcoPal, your AI learning companion for all things green and sustainable! 🌱 Ask me anything about the environment, climate change, renewable energy, or eco-friendly solutions. I'm here to help you learn and make a positive impact!",
      sender: 'ecopal',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const getEcoPalResponse = (userInput: string): string => {
    const normalizedInput = userInput.toLowerCase().trim();
    
    // Check for exact matches first
    if (ecopalResponses[normalizedInput]) {
      return ecopalResponses[normalizedInput];
    }
    
    // Check for partial matches
    for (const [key, response] of Object.entries(ecopalResponses)) {
      if (key !== 'default' && normalizedInput.includes(key.split(' ')[0])) {
        return response;
      }
    }
    
    return ecopalResponses.default;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI thinking delay
    setTimeout(() => {
      const ecopalMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getEcoPalResponse(inputValue),
        sender: 'ecopal',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, ecopalMessage]);
    }, 1000);

    setInputValue("");
  };

  const handleQuestionClick = (question: string) => {
    setInputValue(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <img src={ecopalMascot} alt="EcoPal" className="w-12 h-12 rounded-full" />
            <div>
              <DialogTitle className="text-2xl text-primary">Meet EcoPal</DialogTitle>
              <p className="text-muted-foreground">Your AI-powered environmental learning companion</p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-1 gap-4 min-h-0">
          {/* Sample Questions Sidebar */}
          <div className="w-1/3 space-y-3">
            <h3 className="font-semibold text-primary">Try asking me:</h3>
            {sampleQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left h-auto p-3 justify-start"
                onClick={() => handleQuestionClick(question)}
              >
                {question}
              </Button>
            ))}
            <Card className="p-3 bg-gradient-success text-white">
              <p className="text-sm">
                💡 <strong>Tip:</strong> Ask me about solar panels, wind energy, recycling, or any green topic!
              </p>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 border rounded-lg p-4 mb-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'ecopal' && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                    <Card className={`max-w-[80%] ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <CardContent className="p-3">
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </CardContent>
                    </Card>
                    {message.sender === 'user' && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything about the environment..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} variant="hero">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};