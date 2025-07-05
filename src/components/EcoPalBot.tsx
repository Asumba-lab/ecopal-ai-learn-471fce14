import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Bot, User, Lightbulb, MessageCircle, RotateCcw } from "lucide-react";
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
  isTyping?: boolean;
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

// Comprehensive Environmental Knowledge Base
const comprehensiveKnowledge: Record<string, string[]> = {
  "renewable energy": [
    "Renewable energy sources are naturally replenishing and include solar, wind, hydroelectric, geothermal, and biomass. They're crucial for combating climate change because they produce little to no greenhouse gas emissions.",
    "The renewable energy sector has seen remarkable growth - solar costs have dropped 89% since 2010, and wind costs by 70%. This makes renewables the cheapest source of power in most parts of the world.",
    "Key benefits include energy security, job creation (the sector employs 13.7 million people worldwide), reduced air pollution, and stable long-term energy costs.",
    "Challenges include intermittency (solved by energy storage and smart grids), initial capital costs, and the need for supportive policies and infrastructure."
  ],
  "climate change": [
    "Climate change refers to long-term shifts in global temperatures and weather patterns, primarily caused by human activities since the 1800s, particularly burning fossil fuels.",
    "The greenhouse effect traps heat in Earth's atmosphere. CO2 levels have increased 47% since 1850, leading to a 1.1°C global temperature rise.",
    "Impacts include rising sea levels (3.3mm/year), extreme weather events, ecosystem disruption, species migration, and threats to food security.",
    "Solutions involve transitioning to renewable energy, improving energy efficiency, protecting forests, sustainable agriculture, and international cooperation like the Paris Agreement."
  ],
  "carbon footprint": [
    "Your carbon footprint is the total greenhouse gas emissions caused by your activities, measured in CO2 equivalent. The average American produces 16 tons CO2/year.",
    "Transportation accounts for 29% of US emissions. Walking, cycling, public transport, or electric vehicles can significantly reduce this.",
    "Home energy use: Switch to LED bulbs (75% less energy), improve insulation, use programmable thermostats, and consider renewable energy.",
    "Diet matters: Beef production generates 60kg CO2/kg, while plants produce <1kg CO2/kg. Reducing meat consumption can cut emissions by 73%.",
    "Other actions: Buy local, reduce waste, choose durable products, support renewable energy, and advocate for climate policies."
  ]
};

const getAdvancedResponse = (userInput: string, conversationHistory: Message[]): string => {
  const normalizedInput = userInput.toLowerCase().trim();
  
  // Context-aware responses considering conversation history
  const recentTopics = conversationHistory
    .slice(-4)
    .filter(msg => msg.sender === 'user')
    .map(msg => msg.content.toLowerCase())
    .join(' ');

  // Enhanced knowledge matching
  for (const [topic, responses] of Object.entries(comprehensiveKnowledge)) {
    if (normalizedInput.includes(topic) || normalizedInput.includes(topic.replace(' ', ''))) {
      // Select response based on conversation depth
      const responseIndex = Math.min(
        conversationHistory.filter(msg => 
          msg.content.toLowerCase().includes(topic)
        ).length,
        responses.length - 1
      );
      return responses[responseIndex];
    }
  }

  // Keyword-based enhanced responses
  const keywordResponses: Record<string, string> = {
    "solar": "Solar energy harnesses sunlight through photovoltaic cells or thermal collectors. Modern solar panels are 20-22% efficient and last 25-30 years. With net metering, excess energy can be sold back to the grid. Solar installations have grown 20% annually, making it the fastest-growing energy source globally. ☀️",
    
    "wind": "Wind energy captures kinetic energy through turbines. Modern turbines are 180m tall with 80m blades, generating 2-3MW each. Wind farms can be onshore or offshore (which is 40% more efficient). Denmark generates 50% of its electricity from wind, proving its viability at scale. 💨",
    
    "electric vehicle": "EVs are 3-4x more energy efficient than gas cars, with 85% efficiency vs 20% for internal combustion engines. They produce zero direct emissions and become cleaner as the grid shifts to renewables. Battery costs have dropped 90% since 2010, making EVs cost-competitive. Norway leads with 80% EV market share. 🚗⚡",
    
    "carbon capture": "Carbon capture, utilization, and storage (CCUS) can capture 85-95% of CO2 emissions from industrial sources. Methods include post-combustion, pre-combustion, and direct air capture. While promising, current costs are $100-600/ton CO2. Scale-up and innovation are needed to reach $100/ton for widespread deployment. 🏭",
    
    "sustainable agriculture": "Sustainable farming uses practices like crop rotation, cover crops, integrated pest management, and precision agriculture. It can increase yields while reducing water usage by 30%, fertilizer use by 20%, and maintaining soil health. Regenerative agriculture can even sequester carbon, making farms carbon-negative. 🌾",
    
    "recycling": "Recycling conserves resources and reduces landfill waste. Aluminum cans save 95% energy vs new production, paper saves 60%, and plastic saves 88%. However, only 9% of plastic ever produced has been recycled. Focus on reducing consumption first, then reusing, then recycling. ♻️",
    
    "green hydrogen": "Green hydrogen is produced using renewable electricity to split water (electrolysis). It can decarbonize steel production, shipping, aviation, and serve as long-term energy storage. Current costs are $3-6/kg, but could reach $1-2/kg by 2030 with scale-up. Japan and EU are leading investments. 💧⚡"
  };

  for (const [keyword, response] of Object.entries(keywordResponses)) {
    if (normalizedInput.includes(keyword)) {
      return response;
    }
  }

  // Contextual follow-up responses
  if (recentTopics.includes('renewable') && normalizedInput.includes('how')) {
    return "To transition to renewables: 1) Install solar panels or choose green energy plans, 2) Support policies like renewable portfolio standards, 3) Invest in renewable energy companies, 4) Advocate for grid modernization and energy storage, 5) Reduce overall energy consumption. Every action accelerates the clean energy transition! 🌱⚡";
  }

  if (conversationHistory.length > 3) {
    return `Great follow-up question! Building on our conversation, environmental solutions work best when combined. For example, renewable energy + electric vehicles + sustainable agriculture create synergistic effects. What specific aspect would you like to explore deeper? I'm here to provide detailed, science-based information! 🌍✨`;
  }

  return "That's an excellent environmental question! I specialize in climate science, renewable energy, sustainable living, green technologies, and ecosystem conservation. I can provide detailed, up-to-date information on any environmental topic. What would you like to explore? 🌱🤖";
};

export const EcoPalBot = ({ isOpen, onClose }: EcoPalBotProps) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load conversation history from localStorage
    const savedMessages = localStorage.getItem('ecopal-conversation');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      } catch (e) {
        console.error('Failed to load conversation history');
      }
    }
    
    return [
      {
        id: '1',
        content: "Hi there! I'm EcoPal, your comprehensive AI environmental companion! 🌱 I can provide detailed, science-based information on climate change, renewable energy, sustainable living, green technologies, and ecosystem conservation. Ask me anything - I learn from our conversation and can reference our previous discussions!",
        sender: 'ecopal',
        timestamp: new Date()
      }
    ];
  });
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Save conversation to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('ecopal-conversation', JSON.stringify(messages));
  }, [messages]);

  const clearConversation = () => {
    const initialMessage = {
      id: '1',
      content: "Hi there! I'm EcoPal, your comprehensive AI environmental companion! 🌱 I can provide detailed, science-based information on climate change, renewable energy, sustainable living, green technologies, and ecosystem conservation. Ask me anything - I learn from our conversation and can reference our previous discussions!",
      sender: 'ecopal' as const,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
    localStorage.removeItem('ecopal-conversation');
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: `typing-${Date.now()}`,
      content: "EcoPal is thinking...",
      sender: 'ecopal',
      timestamp: new Date(),
      isTyping: true
    };
    
    setTimeout(() => {
      setMessages(prev => [...prev, typingMessage]);
    }, 300);

    // Generate AI response with conversation context
    setTimeout(() => {
      const response = getAdvancedResponse(inputValue, messages);
      const ecopalMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'ecopal',
        timestamp: new Date()
      };
      
      // Remove typing indicator and add real response
      setMessages(prev => prev.filter(msg => !msg.isTyping).concat(ecopalMessage));
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Realistic typing delay
  };

  const handleQuestionClick = (question: string) => {
    setInputValue(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
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
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageCircle className="w-4 h-4" />
                    <span>{messages.length - 1} messages</span>
                  </div>
                  <Button
                    onClick={clearConversation}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Clear Chat
                  </Button>
                </div>
                
                <ScrollArea ref={scrollAreaRef} className="flex-1 border rounded-lg p-4 lg:p-6 mb-4">
                  <div className="space-y-4 lg:space-y-6">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 lg:gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} ${message.isTyping ? 'animate-pulse' : ''}`}
                      >
                        {message.sender === 'ecopal' && (
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                              <Bot className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                            </div>
                          </div>
                        )}
                        <Card className={`max-w-[85%] lg:max-w-[80%] ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : message.isTyping 
                              ? 'bg-muted/60' 
                              : 'bg-muted'
                        }`}>
                          <CardContent className="p-3 lg:p-4">
                            <p className="text-sm lg:text-base leading-relaxed whitespace-pre-wrap">
                              {message.content}
                            </p>
                            {!message.isTyping && (
                              <p className="text-xs lg:text-sm opacity-70 mt-2">
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                            )}
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
                    disabled={isTyping}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    variant="hero" 
                    className="px-4 h-12"
                    disabled={isTyping || !inputValue.trim()}
                  >
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