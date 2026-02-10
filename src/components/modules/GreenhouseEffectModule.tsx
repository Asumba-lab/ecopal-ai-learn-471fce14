import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sun, Award, BookOpen } from "lucide-react";
import { useEcoToast } from "@/hooks/useToast";
import { lessonContent } from "./greenhouse/lessonData";
import { quizQuestions } from "./greenhouse/quizData";
import { LessonView } from "./greenhouse/LessonView";
import { QuizView } from "./greenhouse/QuizView";

interface GreenhouseEffectModuleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

export const GreenhouseEffectModule = ({ open, onOpenChange, onComplete }: GreenhouseEffectModuleProps) => {
  const { showSuccess, showAchievement } = useEcoToast();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("learn");

  // Randomly select 10 questions from the pool for each quiz attempt
  const selectedQuestions = useMemo(() => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, [activeTab === "quiz"]);

  const progress = (completedLessons.length / lessonContent.length) * 100;

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

  const handleQuizComplete = (passed: boolean) => {
    if (passed) {
      showAchievement("Greenhouse Expert", 100);
      onComplete?.();
    }
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
            <div className="flex items-center gap-2">
              <Badge variant="outline">{lessonContent.length} lessons</Badge>
              <Badge variant="outline">~25 min</Badge>
            </div>
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
              Learn ({completedLessons.length}/{lessonContent.length})
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Quiz (10 questions)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learn" className="mt-4">
            <LessonView
              lessons={lessonContent}
              currentLesson={currentLesson}
              completedLessons={completedLessons}
              onNext={handleNextLesson}
              onPrev={handlePrevLesson}
              onSelectLesson={setCurrentLesson}
            />
          </TabsContent>

          <TabsContent value="quiz" className="mt-4">
            <QuizView
              questions={selectedQuestions}
              onComplete={handleQuizComplete}
              onClose={() => onOpenChange(false)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
