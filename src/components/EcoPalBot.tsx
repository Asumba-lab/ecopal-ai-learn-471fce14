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
      <DialogContent className="w-[95vw] max-w-5xl h-[85vh] max-h-[700px] flex flex-col p-0 gap-0">
        {/* Header */}
        <DialogHeader className="px-4 sm:px-6 py-4 border-b bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <img src={ecopalMascot} alt="EcoPal" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary/20" />
            <div>
              <DialogTitle className="text-lg sm:text-xl text-primary font-semibold">Meet EcoPal</DialogTitle>
              <p className="text-sm text-muted-foreground">Your AI environmental companion</p>
            </div>
          </div>
        </DialogHeader>

        {/* Main Content */}
        <div className="flex-1 min-h-0 flex flex-col">
          <Tabs defaultValue="chat" className="flex-1 flex flex-col">
            {/* Tab Navigation */}
            <div className="px-4 sm:px-6 pt-4 pb-2 border-b bg-background/95">
              <TabsList className="grid w-full grid-cols-2 h-11 bg-muted/50">
                <TabsTrigger value="chat" className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-background">
                  <MessageCircle className="w-4 h-4" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="questions" className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-background">
                  <Lightbulb className="w-4 h-4" />
                  Questions
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Chat Tab */}
            <TabsContent value="chat" className="flex-1 flex flex-col mt-0 px-4 sm:px-6 pb-4">
              {/* Chat Header */}
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{messages.length - 1} messages</span>
                </div>
                <Button
                  onClick={clearConversation}
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs hover:bg-destructive/10 hover:text-destructive"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  Clear
                </Button>
              </div>
              
              {/* Messages Container */}
              <div className="flex-1 min-h-0 flex flex-col">
                <ScrollArea ref={scrollAreaRef} className="flex-1 rounded-lg border bg-card/30 backdrop-blur-sm">
                  <div className="p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} ${message.isTyping ? 'animate-pulse' : ''}`}
                      >
                        {message.sender === 'ecopal' && (
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center shadow-sm">
                              <Bot className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                        
                        <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-first' : ''}`}>
                          <Card className={`${
                            message.sender === 'user' 
                              ? 'bg-primary text-primary-foreground shadow-md' 
                              : message.isTyping 
                                ? 'bg-muted/60 shadow-sm' 
                                : 'bg-background shadow-sm border-muted'
                          }`}>
                            <CardContent className="p-3">
                              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                {message.content}
                              </p>
                              {!message.isTyping && (
                                <p className="text-xs opacity-60 mt-2 text-right">
                                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        </div>

                        {message.sender === 'user' && (
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-secondary to-secondary/80 flex items-center justify-center shadow-sm">
                              <User className="w-4 h-4 text-secondary-foreground" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input Area - Fixed at Bottom */}
                <div className="pt-4 space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask me anything about the environment..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 h-11 bg-background/50 backdrop-blur-sm border-muted focus:border-primary"
                      disabled={isTyping}
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      size="sm"
                      className="h-11 px-4 bg-primary hover:bg-primary/90 shadow-md"
                      disabled={isTyping || !inputValue.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  {isTyping && (
                    <p className="text-xs text-muted-foreground text-center animate-pulse">
                      EcoPal is thinking...
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Questions Tab */}
            <TabsContent value="questions" className="flex-1 mt-0 px-4 sm:px-6 pb-4">
              <div className="h-full flex flex-col">
                <div className="py-3">
                  <h3 className="font-semibold text-primary flex items-center gap-2 text-base">
                    <Lightbulb className="w-4 h-4" />
                    Try asking me:
                  </h3>
                </div>
                
                <ScrollArea className="flex-1">
                  <div className="space-y-3 pr-2">
                    <div className="grid gap-2">
                      {sampleQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full text-left h-auto p-3 justify-start text-sm hover:bg-primary/5 hover:border-primary/20 min-h-[50px] transition-colors"
                          onClick={() => {
                            handleQuestionClick(question);
                            const chatTab = document.querySelector('[value="chat"]') as HTMLButtonElement;
                            chatTab?.click();
                          }}
                        >
                          <span className="text-left break-words">{question}</span>
                        </Button>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-4 border-t">
                      <Card className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md">
                        <p className="text-sm">
                          💡 <strong>Open Source:</strong> EcoPal grows with community contributions!
                        </p>
                      </Card>
                      <Card className="p-3 bg-gradient-to-r from-primary to-primary/80 text-white shadow-md">
                        <p className="text-sm">
                          🌍 <strong>Demo Mode:</strong> Real-time AI environmental responses!
                        </p>
                      </Card>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};