import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ChevronRight, ChevronLeft, Lightbulb, Info } from "lucide-react";
import { LessonData } from "./lessonData";

interface LessonViewProps {
  lessons: LessonData[];
  currentLesson: number;
  completedLessons: number[];
  onNext: () => void;
  onPrev: () => void;
  onSelectLesson: (index: number) => void;
}

export const LessonView = ({
  lessons,
  currentLesson,
  completedLessons,
  onNext,
  onPrev,
  onSelectLesson,
}: LessonViewProps) => {
  const lesson = lessons[currentLesson];
  const LessonIcon = lesson.icon;

  return (
    <div className="space-y-6">
      {/* Lesson Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {lessons.map((l, index) => {
          const Icon = l.icon;
          const isCompleted = completedLessons.includes(index);
          const isCurrent = index === currentLesson;

          return (
            <Button
              key={l.id}
              variant={isCurrent ? "default" : isCompleted ? "outline" : "outline"}
              size="sm"
              className={`flex-shrink-0 ${isCompleted && !isCurrent ? "border-green-500 text-green-700" : ""}`}
              onClick={() => onSelectLesson(index)}
            >
              <Icon className="w-4 h-4 mr-1" />
              {index + 1}
              {isCompleted && <CheckCircle2 className="w-3 h-3 ml-1 text-green-600" />}
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
              <Badge variant="secondary" className="mb-1">
                Lesson {currentLesson + 1} of {lessons.length}
              </Badge>
              <CardTitle>{lesson.title}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Lesson Text */}
          <div className="prose prose-sm max-w-none">
            {lesson.content.split("\n\n").map((paragraph, idx) => (
              <div key={idx} className="mb-4">
                {paragraph.startsWith("**") && paragraph.endsWith("**") ? (
                  <h3 className="font-bold text-lg text-primary mb-2">
                    {paragraph.replace(/\*\*/g, "")}
                  </h3>
                ) : paragraph.includes("|") ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <tbody>
                        {paragraph.split("\n").map((row, rowIdx) => {
                          if (row.includes("---")) return null;
                          const cells = row.split("|").filter((c) => c.trim());
                          return (
                            <tr key={rowIdx} className={rowIdx === 0 ? "bg-muted font-semibold" : ""}>
                              {cells.map((cell, cellIdx) => (
                                <td key={cellIdx} className="border border-border px-3 py-2">
                                  {cell.trim()}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    {paragraph.split("**").map((part, partIdx) =>
                      partIdx % 2 === 0 ? (
                        part
                      ) : (
                        <strong key={partIdx} className="text-foreground">
                          {part}
                        </strong>
                      )
                    )}
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

          {/* Did You Know */}
          {lesson.didYouKnow && (
            <Card className="mt-4 bg-accent/30 border-accent">
              <CardContent className="p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-accent-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold mb-1">Did You Know?</p>
                  <p className="text-sm text-muted-foreground">{lesson.didYouKnow}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <Button variant="outline" onClick={onPrev} disabled={currentLesson === 0}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              {completedLessons.length} of {lessons.length} completed
            </span>

            <Button variant="hero" onClick={onNext}>
              {currentLesson === lessons.length - 1 ? (
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
};
