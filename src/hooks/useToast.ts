import { toast } from "@/hooks/use-toast";

export const useEcoToast = () => {
  const showSuccess = (message: string) => {
    toast({
      title: "🌟 Success!",
      description: message,
      duration: 3000,
    });
  };

  const showError = (message: string) => {
    toast({
      title: "⚠️ Oops!",
      description: message,
      variant: "destructive",
      duration: 4000,
    });
  };

  const showInfo = (message: string) => {
    toast({
      title: "💡 Info",
      description: message,
      duration: 3000,
    });
  };

  const showAchievement = (achievement: string, points: number) => {
    toast({
      title: "🏆 Achievement Unlocked!",
      description: `${achievement} (+${points} points)`,
      duration: 5000,
    });
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showAchievement
  };
};