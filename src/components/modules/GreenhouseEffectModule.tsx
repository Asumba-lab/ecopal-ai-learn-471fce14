import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sun, 
  ArrowDown, 
  ArrowUp, 
  ThermometerSun, 
  Factory, 
  Car, 
  Leaf,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Award,
  BookOpen,
  Lightbulb,
  Globe
} from "lucide-react";
import { useEcoToast } from "@/hooks/useToast";

interface GreenhouseEffectModuleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

const lessonContent = [
  {
    id: 1,
    title: "What is the Greenhouse Effect?",
    icon: Sun,
    content: `The greenhouse effect is a natural process that warms Earth's surface. When the Sun's energy reaches Earth's atmosphere, some of it is reflected back to space and the rest is absorbed and re-radiated by greenhouse gases.

**How it works:**
1. **Solar radiation** enters Earth's atmosphere
2. About **30%** is reflected back to space by clouds, ice, and other reflective surfaces
3. The remaining **70%** is absorbed by the land, oceans, and atmosphere
4. Earth radiates this energy back as **infrared radiation (heat)**
5. **Greenhouse gases** trap some of this heat, keeping Earth warm enough to support life

Without the natural greenhouse effect, Earth's average temperature would be about **-18°C (0°F)** instead of the current **15°C (59°F)**.`,
    keyFacts: [
      "The greenhouse effect is essential for life on Earth",
      "It's named after how greenhouse buildings trap heat",
      "The effect has kept Earth habitable for billions of years"
    ]
  },
  {
    id: 2,
    title: "Greenhouse Gases Explained",
    icon: Factory,
    content: `Greenhouse gases are molecules in Earth's atmosphere that trap heat. The main greenhouse gases are:

**Carbon Dioxide (CO₂) - 76% of emissions**
- Released by burning fossil fuels, deforestation
- Stays in atmosphere for 300-1000 years
- Current level: ~420 ppm (highest in 3 million years)

**Methane (CH₄) - 16% of emissions**
- 80x more potent than CO₂ over 20 years
- Sources: livestock, landfills, natural gas leaks
- Stays in atmosphere for ~12 years

**Nitrous Oxide (N₂O) - 6% of emissions**
- 300x more warming potential than CO₂
- Sources: agriculture, industrial processes
- Stays in atmosphere for ~114 years

**Fluorinated Gases - 2% of emissions**
- Synthetic gases used in refrigeration
- Can be thousands of times more potent than CO₂
- Can last thousands of years in atmosphere`,
    keyFacts: [
      "CO₂ levels are 50% higher than pre-industrial times",
      "Methane is responsible for 30% of global warming since pre-industrial times",
      "Water vapor is actually the most abundant greenhouse gas"
    ]
  },
  {
    id: 3,
    title: "Natural vs Enhanced Greenhouse Effect",
    icon: ThermometerSun,
    content: `**Natural Greenhouse Effect**
The natural greenhouse effect is what makes Earth habitable. For millions of years, greenhouse gas concentrations remained relatively stable, maintaining comfortable temperatures.

**Enhanced Greenhouse Effect (Climate Change)**
Since the Industrial Revolution (~1750), human activities have dramatically increased greenhouse gas concentrations:

| Gas | Pre-industrial | Current | Increase |
|-----|---------------|---------|----------|
| CO₂ | 280 ppm | 420 ppm | +50% |
| CH₄ | 700 ppb | 1,900 ppb | +170% |
| N₂O | 270 ppb | 335 ppb | +24% |

**The Result:**
- Average global temperature has risen **1.1°C** since 1850
- Rate of warming is **unprecedented** in at least 2,000 years
- Oceans have absorbed **90%** of the excess heat
- Sea levels have risen **20cm** since 1900`,
    keyFacts: [
      "Human activities release ~40 billion tons of CO₂ annually",
      "The last time CO₂ was this high, sea levels were 15-25 meters higher",
      "We're warming 10x faster than any ice-age recovery"
    ]
  },
  {
    id: 4,
    title: "Sources of Greenhouse Gas Emissions",
    icon: Car,
    content: `Understanding where emissions come from helps us identify solutions:

**By Sector (Global):**
🔌 **Electricity & Heat: 25%**
- Burning coal, natural gas, oil for power
- Largest single source of emissions

🏭 **Industry: 21%**
- Manufacturing, construction, mining
- Cement production alone = 8% of global CO₂

🚗 **Transportation: 16%**
- Cars, trucks, ships, planes
- Fastest growing emissions sector

🏠 **Buildings: 18%**
- Heating, cooling, lighting
- Cooking and appliances

🌾 **Agriculture & Land Use: 20%**
- Livestock, rice cultivation, fertilizers
- Deforestation releases stored carbon

**By Country (Top 5 Emitters):**
1. China - 27%
2. United States - 11%
3. European Union - 6.4%
4. India - 6.6%
5. Russia - 4.7%`,
    keyFacts: [
      "The richest 10% of people cause 50% of emissions",
      "Food systems account for 26% of global emissions",
      "Aviation is only 2.5% but growing rapidly"
    ]
  },
  {
    id: 5,
    title: "Solutions & Taking Action",
    icon: Leaf,
    content: `We have the tools to address climate change. Here's what works:

**Energy Transition**
☀️ Solar power costs have dropped 89% since 2010
💨 Wind power is now cheapest electricity in most regions
⚡ Electric vehicles are reaching price parity with gas cars

**Natural Solutions**
🌳 Forests absorb 2.6 billion tons of CO₂ yearly
🌊 Mangroves store 3-5x more carbon than land forests
🌱 Regenerative agriculture can sequester carbon in soil

**Policy & Innovation**
📊 Carbon pricing in 45+ countries
🔋 Battery storage growing 30% annually
🏗️ Green building standards reducing emissions

**Individual Actions That Matter:**
1. **Diet** - Plant-rich diet can cut food emissions 50%
2. **Transport** - One transatlantic flight = 1.6 tons CO₂
3. **Energy** - Switch to renewable electricity provider
4. **Voice** - Voting and advocacy multiply impact

**The Path Forward:**
To limit warming to 1.5°C, we need to:
- Cut emissions **45%** by 2030
- Reach **net-zero** by 2050
- Remove **billions of tons** of CO₂ from atmosphere`,
    keyFacts: [
      "Renewable energy now provides 30% of global electricity",
      "1 million species face extinction due to climate change",
      "Climate solutions could create 65 million new jobs by 2030"
    ]
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What would Earth's average temperature be without the natural greenhouse effect?",
    options: [
      { text: "About 15°C (59°F)", correct: false },
      { text: "About -18°C (0°F)", correct: true },
      { text: "About 30°C (86°F)", correct: false },
      { text: "About 0°C (32°F)", correct: false }
    ],
    explanation: "Without greenhouse gases trapping heat, Earth would be a frozen world at -18°C, too cold for most life!"
  },
  {
    id: 2,
    question: "Which greenhouse gas is responsible for the largest share of human-caused emissions?",
    options: [
      { text: "Methane (CH₄)", correct: false },
      { text: "Nitrous Oxide (N₂O)", correct: false },
      { text: "Carbon Dioxide (CO₂)", correct: true },
      { text: "Water Vapor (H₂O)", correct: false }
    ],
    explanation: "CO₂ accounts for about 76% of human-caused greenhouse gas emissions, primarily from burning fossil fuels."
  },
  {
    id: 3,
    question: "How much have CO₂ levels increased since pre-industrial times?",
    options: [
      { text: "About 10%", correct: false },
      { text: "About 25%", correct: false },
      { text: "About 50%", correct: true },
      { text: "About 100%", correct: false }
    ],
    explanation: "CO₂ has risen from 280 ppm to 420 ppm—a 50% increase and the highest level in 3 million years."
  },
  {
    id: 4,
    question: "Which sector produces the most greenhouse gas emissions globally?",
    options: [
      { text: "Transportation", correct: false },
      { text: "Electricity & Heat Production", correct: true },
      { text: "Agriculture", correct: false },
      { text: "Buildings", correct: false }
    ],
    explanation: "Electricity and heat production accounts for 25% of global emissions, mainly from burning coal and natural gas."
  },
  {
    id: 5,
    question: "By how much do emissions need to fall by 2030 to limit warming to 1.5°C?",
    options: [
      { text: "10%", correct: false },
      { text: "25%", correct: false },
      { text: "45%", correct: true },
      { text: "70%", correct: false }
    ],
    explanation: "Scientists say we need to cut emissions by 45% by 2030 and reach net-zero by 2050 to stay within 1.5°C."
  }
];

export const GreenhouseEffectModule = ({ open, onOpenChange, onComplete }: GreenhouseEffectModuleProps) => {
  const { showSuccess, showAchievement } = useEcoToast();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("learn");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const progress = (completedLessons.length / lessonContent.length) * 100;
  const lesson = lessonContent[currentLesson];
  const LessonIcon = lesson.icon;

  const handleNextLesson = () => {
    if (!completedLessons.includes(currentLesson)) {
      setCompletedLessons([...completedLessons, currentLesson]);
      showSuccess(`Lesson ${currentLesson + 1} completed! 🎉`);
    }
    if (currentLesson < lessonContent.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const handlePrevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (quizQuestions[currentQuestion].options[index].correct) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      const score = Math.round(((correctAnswers + (quizQuestions[currentQuestion].options[selectedAnswer!]?.correct ? 1 : 0)) / quizQuestions.length) * 100);
      if (score >= 80) {
        showAchievement("Greenhouse Expert", score);
        onComplete?.();
      }
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectAnswers(0);
    setQuizComplete(false);
  };

  const renderLearnContent = () => (
    <div className="space-y-6">
      {/* Lesson Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {lessonContent.map((l, index) => {
          const Icon = l.icon;
          const isCompleted = completedLessons.includes(index);
          const isCurrent = index === currentLesson;
          
          return (
            <Button
              key={l.id}
              variant={isCurrent ? "default" : isCompleted ? "success" : "outline"}
              size="sm"
              className="flex-shrink-0"
              onClick={() => setCurrentLesson(index)}
            >
              <Icon className="w-4 h-4 mr-1" />
              {index + 1}
              {isCompleted && <CheckCircle2 className="w-3 h-3 ml-1" />}
            </Button>
          );
        })}
      </div>

      {/* Current Lesson */}
      <Card>
        <CardHeader className="bg-gradient-primary text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <LessonIcon className="w-6 h-6" />
            </div>
            <div>
              <Badge variant="secondary" className="mb-1">Lesson {currentLesson + 1} of {lessonContent.length}</Badge>
              <CardTitle>{lesson.title}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Lesson Text with Markdown-like formatting */}
          <div className="prose prose-sm max-w-none">
            {lesson.content.split('\n\n').map((paragraph, idx) => (
              <div key={idx} className="mb-4">
                {paragraph.startsWith('**') && paragraph.endsWith('**') ? (
                  <h3 className="font-bold text-lg text-primary mb-2">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                ) : paragraph.includes('|') ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      {paragraph.split('\n').map((row, rowIdx) => {
                        if (row.includes('---')) return null;
                        const cells = row.split('|').filter(c => c.trim());
                        return (
                          <tr key={rowIdx} className={rowIdx === 0 ? 'bg-muted font-semibold' : ''}>
                            {cells.map((cell, cellIdx) => (
                              <td key={cellIdx} className="border border-border px-3 py-2">
                                {cell.trim()}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </table>
                  </div>
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    {paragraph.split('**').map((part, partIdx) => (
                      partIdx % 2 === 0 ? part : <strong key={partIdx} className="text-foreground">{part}</strong>
                    ))}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Key Facts */}
          <Card className="mt-6 bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                Key Facts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lesson.keyFacts.map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handlePrevLesson}
              disabled={currentLesson === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            
            <span className="text-sm text-muted-foreground">
              {completedLessons.length} of {lessonContent.length} lessons completed
            </span>
            
            <Button
              variant="hero"
              onClick={handleNextLesson}
            >
              {currentLesson === lessonContent.length - 1 ? (
                <>
                  Complete
                  <CheckCircle2 className="w-4 h-4 ml-1" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderQuizContent = () => {
    if (!quizStarted) {
      return (
        <Card className="text-center">
          <CardHeader className="bg-gradient-success text-white rounded-t-lg">
            <Award className="w-16 h-16 mx-auto mb-4" />
            <CardTitle className="text-2xl">Test Your Knowledge</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-muted-foreground mb-6">
              Ready to test what you've learned about the Greenhouse Effect? 
              Complete this quiz to earn your certificate!
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{quizQuestions.length}</div>
                <div className="text-muted-foreground">Questions</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">80%</div>
                <div className="text-muted-foreground">To Pass</div>
              </div>
            </div>
            <Button variant="hero" size="lg" onClick={() => setQuizStarted(true)}>
              <BookOpen className="w-5 h-5 mr-2" />
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      );
    }

    if (quizComplete) {
      const finalScore = Math.round((correctAnswers / quizQuestions.length) * 100);
      const passed = finalScore >= 80;
      
      return (
        <Card className="text-center">
          <CardHeader className={`${passed ? 'bg-gradient-success' : 'bg-gradient-primary'} text-white rounded-t-lg`}>
            {passed ? (
              <Award className="w-20 h-20 mx-auto mb-4" />
            ) : (
              <Globe className="w-20 h-20 mx-auto mb-4" />
            )}
            <CardTitle className="text-2xl">
              {passed ? "🎉 Congratulations!" : "Keep Learning!"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-5xl font-bold mb-4 text-primary">
              {finalScore}%
            </div>
            <p className="text-muted-foreground mb-6">
              {passed 
                ? "You've mastered the Greenhouse Effect! You're now certified in Climate Change Fundamentals."
                : `You got ${correctAnswers} out of ${quizQuestions.length} correct. Review the lessons and try again!`
              }
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={resetQuiz}>
                {passed ? "Retake Quiz" : "Try Again"}
              </Button>
              {passed && (
                <Button variant="success" onClick={() => onOpenChange(false)}>
                  Continue Learning
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      );
    }

    const question = quizQuestions[currentQuestion];
    
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <Badge>Question {currentQuestion + 1} of {quizQuestions.length}</Badge>
            <span className="text-sm text-muted-foreground">
              Score: {correctAnswers}/{currentQuestion + (showResult ? 1 : 0)}
            </span>
          </div>
          <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2" />
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-6">{question.question}</h3>
          
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              let buttonClass = "w-full justify-start text-left h-auto py-4 px-4";
              
              if (showResult) {
                if (option.correct) {
                  buttonClass += " bg-green-100 border-green-500 text-green-800";
                } else if (selectedAnswer === idx && !option.correct) {
                  buttonClass += " bg-red-100 border-red-500 text-red-800";
                }
              }
              
              return (
                <Button
                  key={idx}
                  variant="outline"
                  className={buttonClass}
                  onClick={() => handleAnswerSelect(idx)}
                  disabled={showResult}
                >
                  <span className="flex items-center gap-3 w-full">
                    <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{option.text}</span>
                    {showResult && option.correct && (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                    {showResult && selectedAnswer === idx && !option.correct && (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </span>
                </Button>
              );
            })}
          </div>

          {showResult && (
            <Card className="mt-6 bg-muted/50">
              <CardContent className="p-4">
                <p className="text-sm">
                  <strong>Explanation:</strong> {question.explanation}
                </p>
              </CardContent>
            </Card>
          )}

          {showResult && (
            <div className="mt-6 flex justify-end">
              <Button variant="hero" onClick={handleNextQuestion}>
                {currentQuestion === quizQuestions.length - 1 ? "See Results" : "Next Question"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Sun className="w-6 h-6 text-primary" />
              The Greenhouse Effect
            </DialogTitle>
            <Badge variant="outline">~15 min</Badge>
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Module Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="learn" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Learn
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Quiz
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="learn" className="mt-4">
            {renderLearnContent()}
          </TabsContent>
          
          <TabsContent value="quiz" className="mt-4">
            {renderQuizContent()}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
