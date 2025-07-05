import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Bot, User, Lightbulb, MessageCircle } from "lucide-react";
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
  "Explain wind energy and its advantages",
  "What is carbon capture technology?",
  "How do electric vehicles help the environment?",
  "What are microgrids and smart energy systems?",
  "Tell me about sustainable agriculture",
];

const ecopalResponses: Record<string, string> = {
  "what is renewable energy": "Renewable energy comes from natural sources that replenish themselves constantly, like sunlight, wind, rain, tides, waves, and geothermal heat. Unlike fossil fuels, renewables don't run out and produce little to no greenhouse gas emissions! 🌱⚡",
  "how can i reduce my carbon footprint": "Great question! You can reduce your carbon footprint by: using public transport or cycling, switching to LED bulbs, eating less meat, reducing waste, using renewable energy, and conserving water. Every small action counts! 🌍♻️",
  "what are the benefits of solar energy": "Solar energy is amazing! Benefits include: zero emissions during operation, reduced electricity bills, low maintenance costs, energy independence, and it's inexhaustible. Plus, solar panel costs have dropped by 80% in the last decade! ☀️💰",
  "how does climate change affect the environment": "Climate change causes rising sea levels, extreme weather events, melting ice caps, ecosystem disruption, and species extinction. But here's the good news - we can combat it through renewable energy, reforestation, and sustainable practices! 🌊🔥❄️",
  "what are sustainable living practices": "Sustainable living includes: reducing energy consumption, recycling and composting, buying local and organic foods, using eco-friendly products, conserving water, and supporting renewable energy. It's about meeting our needs without compromising future generations! 🌿🏠",
  "explain wind energy": "Wind energy harnesses the kinetic energy of moving air using wind turbines. It's one of the fastest-growing renewable energy sources! Benefits include: no fuel costs, minimal water usage, land can still be used for farming, and modern turbines are 85% recyclable. 💨🌪️",
  "what is carbon capture technology": "Carbon capture and storage (CCS) technology captures CO2 emissions from industrial processes and power plants, then stores it underground or uses it for other purposes. It's crucial for achieving net-zero emissions and can reduce emissions by up to 90%! 🏭💨",
  "how do electric vehicles help": "Electric vehicles (EVs) produce zero direct emissions and are 3-4x more energy efficient than gas cars. They reduce air pollution, lower maintenance costs, and as the grid gets cleaner, EVs become even more environmentally friendly! 🚗⚡",
  "what are microgrids": "Microgrids are small-scale, localized energy systems that can operate independently or connect to the main grid. They integrate renewable energy sources, energy storage, and smart controls to provide reliable, clean power to communities! 🔌🏘️",
  "sustainable agriculture": "Sustainable agriculture focuses on producing food while protecting the environment through practices like crop rotation, organic farming, precision agriculture, and reducing pesticide use. It maintains soil health, conserves water, and supports biodiversity! 🌾🚜",
  "geothermal energy": "Geothermal energy harnesses heat from the Earth's core for electricity and heating. It's available 24/7, has a tiny land footprint, and produces virtually no emissions. Iceland gets 25% of its electricity from geothermal! 🌋♨️",
  "ocean energy": "Ocean energy includes wave, tidal, and thermal energy conversion. The ocean contains enough energy to power the world several times over! Tidal energy is highly predictable, and wave energy has enormous potential. 🌊⚡",
  "green hydrogen": "Green hydrogen is produced using renewable energy to split water into hydrogen and oxygen. It can store renewable energy, fuel vehicles, heat homes, and power industry without emissions. It's the key to decarbonizing hard-to-electrify sectors! 💧⚡",
  "circular economy": "A circular economy eliminates waste by designing products to be reused, repaired, and recycled. Instead of 'take-make-dispose,' it follows 'reduce-reuse-recycle.' This approach can reduce resource consumption by 80% and create millions of jobs! ♻️🔄",
  "smart cities": "Smart cities use IoT sensors, data analytics, and renewable energy to optimize resource use, reduce emissions, and improve quality of life. Features include smart grids, efficient transportation, green buildings, and waste management systems! 🏙️📱",
  "default": "That's a fantastic environmental question! As an AI learning companion, I'm designed to help with topics like renewable energy, climate action, sustainable living, green technology, carbon capture, electric vehicles, and much more. This is an open-source project - the community can help expand my knowledge! 🌱🤖"
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
    
    // Enhanced keyword matching for better responses
    const keywords = [
      { keys: ['wind', 'turbine'], response: 'explain wind energy' },
      { keys: ['carbon', 'capture', 'ccs'], response: 'what is carbon capture technology' },
      { keys: ['electric', 'vehicle', 'ev', 'car'], response: 'how do electric vehicles help' },
      { keys: ['microgrid', 'smart', 'grid'], response: 'what are microgrids' },
      { keys: ['agriculture', 'farming', 'food'], response: 'sustainable agriculture' },
      { keys: ['geothermal', 'ground', 'heat'], response: 'geothermal energy' },
      { keys: ['ocean', 'wave', 'tidal', 'marine'], response: 'ocean energy' },
      { keys: ['hydrogen', 'h2', 'fuel', 'cell'], response: 'green hydrogen' },
      { keys: ['circular', 'economy', 'waste', 'recycle'], response: 'circular economy' },
      { keys: ['smart', 'city', 'cities', 'urban'], response: 'smart cities' },
      { keys: ['renewable'], response: 'what is renewable energy' },
      { keys: ['solar'], response: 'what are the benefits of solar energy' },
      { keys: ['climate'], response: 'how does climate change affect the environment' },
      { keys: ['sustainable'], response: 'what are sustainable living practices' },
      { keys: ['footprint'], response: 'how can i reduce my carbon footprint' }
    ];
    
    for (const { keys, response } of keywords) {
      if (keys.some(key => normalizedInput.includes(key))) {
        return ecopalResponses[response] || ecopalResponses.default;
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
      <DialogContent className="w-[95vw] max-w-6xl h-[90vh] max-h-[800px] flex flex-col p-4 sm:p-6">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <img src={ecopalMascot} alt="EcoPal" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
            <div>
              <DialogTitle className="text-lg sm:text-2xl text-primary">Meet EcoPal</DialogTitle>
              <p className="text-sm sm:text-base text-muted-foreground">Your AI-powered environmental learning companion</p>
            </div>
          </div>
        </DialogHeader>

        {/* Unified Tabbed Layout for All Devices */}
        <div className="flex-1 min-h-0 flex flex-col">
            <Tabs defaultValue="chat" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-2 mb-6 h-12">
                <TabsTrigger value="chat" className="flex items-center gap-2 text-base">
                  <MessageCircle className="w-5 h-5" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="questions" className="flex items-center gap-2 text-base">
                  <Lightbulb className="w-5 h-5" />
                  Questions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="flex-1 flex flex-col mt-0">
                <ScrollArea className="flex-1 border rounded-lg p-4 lg:p-6 mb-4">
                  <div className="space-y-4 lg:space-y-6">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 lg:gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.sender === 'ecopal' && (
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                              <Bot className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                            </div>
                          </div>
                        )}
                        <Card className={`max-w-[85%] lg:max-w-[80%] ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          <CardContent className="p-3 lg:p-4">
                            <p className="text-sm lg:text-base leading-relaxed">{message.content}</p>
                            <p className="text-xs lg:text-sm opacity-70 mt-2">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </CardContent>
                        </Card>
                        {message.sender === 'user' && (
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-primary flex items-center justify-center">
                              <User className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="flex gap-3">
                  <Input
                    placeholder="Ask me anything about the environment..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 text-base h-12"
                  />
                  <Button onClick={handleSendMessage} variant="hero" className="px-4 h-12">
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="questions" className="flex-1 mt-0">
                <ScrollArea className="h-full">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-primary flex items-center gap-2 mb-4 text-lg">
                      <Lightbulb className="w-5 h-5" />
                      Try asking me:
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {sampleQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full text-left h-auto p-4 justify-start text-sm lg:text-base hover:bg-primary/10 min-h-[60px]"
                          onClick={() => {
                            handleQuestionClick(question);
                            // Switch to chat tab after selecting question
                            const chatTab = document.querySelector('[value="chat"]') as HTMLButtonElement;
                            chatTab?.click();
                          }}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-6">
                      <Card className="p-4 bg-gradient-success text-white">
                        <p className="text-sm lg:text-base">
                          💡 <strong>Open Source:</strong> EcoPal grows with community contributions!
                        </p>
                      </Card>
                      <Card className="p-4 bg-gradient-primary text-white">
                        <p className="text-sm lg:text-base">
                          🌍 <strong>Demo Mode:</strong> Real-time AI environmental responses!
                        </p>
                      </Card>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};