import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ecopalMascot from "@/assets/ecopal-mascot.jpg";

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (userData: UserData) => void;
}

interface UserData {
  age: string;
  location: string;
  interests: string[];
  experience: string;
}

const ageGroups = [
  { value: "13-17", label: "13-17 years", icon: "🎓" },
  { value: "18-25", label: "18-25 years", icon: "🎯" },
  { value: "26-35", label: "26-35 years", icon: "💼" },
  { value: "35+", label: "35+ years", icon: "🌟" }
];

const locations = [
  { value: "urban", label: "Urban City", icon: "🏙️" },
  { value: "suburban", label: "Suburban Area", icon: "🏘️" },
  { value: "rural", label: "Rural/Countryside", icon: "🌾" },
  { value: "coastal", label: "Coastal Region", icon: "🏖️" }
];

const interests = [
  { value: "renewable-energy", label: "Renewable Energy", icon: "⚡" },
  { value: "sustainable-living", label: "Sustainable Living", icon: "🌱" },
  { value: "climate-action", label: "Climate Action", icon: "🌍" },
  { value: "green-tech", label: "Green Technology", icon: "💚" },
  { value: "eco-business", label: "Eco Business", icon: "💼" },
  { value: "conservation", label: "Conservation", icon: "🦋" }
];

const experienceLevels = [
  { value: "beginner", label: "Complete Beginner", description: "New to sustainability", icon: "🌱" },
  { value: "intermediate", label: "Some Knowledge", description: "Basic understanding", icon: "🌿" },
  { value: "advanced", label: "Experienced", description: "Good foundation", icon: "🌳" },
  { value: "expert", label: "Expert Level", description: "Deep knowledge", icon: "🌲" }
];

export const OnboardingModal = ({ isOpen, onComplete }: OnboardingModalProps) => {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    age: "",
    location: "",
    interests: [],
    experience: ""
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(userData);
    }
  };

  const handleInterestToggle = (interest: string) => {
    setUserData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const steps = [
    {
      title: "What's your age group?",
      subtitle: "This helps us customize content difficulty",
      content: (
        <div className="grid grid-cols-2 gap-4">
          {ageGroups.map(age => (
            <Button
              key={age.value}
              variant={userData.age === age.value ? "hero" : "gamified"}
              className="h-20 flex-col gap-2"
              onClick={() => setUserData(prev => ({ ...prev, age: age.value }))}
            >
              <span className="text-2xl">{age.icon}</span>
              <span className="text-sm">{age.label}</span>
            </Button>
          ))}
        </div>
      )
    },
    {
      title: "Where do you live?",
      subtitle: "We'll recommend location-specific sustainability tips",
      content: (
        <div className="grid grid-cols-2 gap-4">
          {locations.map(loc => (
            <Button
              key={loc.value}
              variant={userData.location === loc.value ? "hero" : "gamified"}
              className="h-20 flex-col gap-2"
              onClick={() => setUserData(prev => ({ ...prev, location: loc.value }))}
            >
              <span className="text-2xl">{loc.icon}</span>
              <span className="text-sm">{loc.label}</span>
            </Button>
          ))}
        </div>
      )
    },
    {
      title: "What interests you most?",
      subtitle: "Select all that apply - we'll personalize your learning path",
      content: (
        <div className="grid grid-cols-2 gap-3">
          {interests.map(interest => (
            <Button
              key={interest.value}
              variant={userData.interests.includes(interest.value) ? "hero" : "gamified"}
              className="h-16 flex-col gap-1 text-xs"
              onClick={() => handleInterestToggle(interest.value)}
            >
              <span className="text-xl">{interest.icon}</span>
              <span>{interest.label}</span>
            </Button>
          ))}
        </div>
      )
    },
    {
      title: "What's your sustainability experience?",
      subtitle: "We'll match content to your knowledge level",
      content: (
        <div className="space-y-3">
          {experienceLevels.map(level => (
            <Button
              key={level.value}
              variant={userData.experience === level.value ? "hero" : "gamified"}
              className="w-full h-16 justify-start px-6"
              onClick={() => setUserData(prev => ({ ...prev, experience: level.value }))}
            >
              <span className="text-2xl mr-4">{level.icon}</span>
              <div className="text-left">
                <div className="font-semibold">{level.label}</div>
                <div className="text-xs text-muted-foreground">{level.description}</div>
              </div>
            </Button>
          ))}
        </div>
      )
    }
  ];

  const canProceed = () => {
    switch (step) {
      case 0: return userData.age !== "";
      case 1: return userData.location !== "";
      case 2: return userData.interests.length > 0;
      case 3: return userData.experience !== "";
      default: return false;
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <img src={ecopalMascot} alt="EcoPal" className="w-12 h-12 rounded-full" />
            <div>
              <DialogTitle className="text-2xl">Welcome to EcoPal!</DialogTitle>
              <p className="text-muted-foreground">Let's personalize your learning journey</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full flex-1 transition-all duration-300 ${
                  i <= step ? 'bg-gradient-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{steps[step].title}</CardTitle>
              <p className="text-muted-foreground">{steps[step].subtitle}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {steps[step].content}
              
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                >
                  Back
                </Button>
                <Button
                  variant="hero"
                  onClick={handleNext}
                  disabled={!canProceed()}
                >
                  {step === 3 ? "Start Learning! 🚀" : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};