import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, ChevronRight, Award, BookOpen, Globe } from "lucide-react";
import { QuizQuestion } from "./quizData";

interface QuizViewProps {
  questions: QuizQuestion[];
  onComplete: (passed: boolean) => void;
  onClose: () => void;
}

export const QuizView = ({ questions, onComplete, onClose }: QuizViewProps) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (questions[currentQuestion].options[index].correct) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      const lastCorrect = questions[currentQuestion].options[selectedAnswer!]?.correct ? 1 : 0;
      const finalCorrect = correctAnswers + (currentQuestion === questions.length - 1 ? 0 : lastCorrect);
      const score = Math.round((finalCorrect / questions.length) * 100);
      onComplete(score >= 80);
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
          <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{questions.length}</div>
              <div className="text-muted-foreground">Questions</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">80%</div>
              <div className="text-muted-foreground">To Pass</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">Mixed</div>
              <div className="text-muted-foreground">Difficulty</div>
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
    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    const passed = finalScore >= 80;

    return (
      <Card className="text-center">
        <CardHeader className={`${passed ? "bg-gradient-success" : "bg-gradient-primary"} text-white rounded-t-lg`}>
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
          <div className="text-5xl font-bold mb-4 text-primary">{finalScore}%</div>
          <p className="text-muted-foreground mb-2">
            You got {correctAnswers} out of {questions.length} correct.
          </p>
          <p className="text-muted-foreground mb-6">
            {passed
              ? "You've mastered the Greenhouse Effect! You're now certified in Climate Change Fundamentals."
              : "Review the lessons and try again — you can do it!"}
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={resetQuiz}>
              {passed ? "Retake Quiz" : "Try Again"}
            </Button>
            {passed && (
              <Button variant="hero" onClick={onClose}>
                Continue Learning
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Badge>Question {currentQuestion + 1} of {questions.length}</Badge>
            <Badge variant="outline" className="capitalize">{question.difficulty}</Badge>
          </div>
          <span className="text-sm text-muted-foreground">
            Score: {correctAnswers}/{currentQuestion + (showResult ? 1 : 0)}
          </span>
        </div>
        <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
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
                  {showResult && option.correct && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                  {showResult && selectedAnswer === idx && !option.correct && <XCircle className="w-5 h-5 text-red-600" />}
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
              {currentQuestion === questions.length - 1 ? "See Results" : "Next Question"}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
