import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { OnboardingModal } from "@/components/OnboardingModal";
import { DashboardLayout } from "@/components/DashboardLayout";

interface UserData {
  age: string;
  location: string;
  interests: string[];
  experience: string;
}

const Index = () => {
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleStartLearning = () => {
    setIsOnboarding(true);
  };

  const handleOnboardingComplete = (data: UserData) => {
    setUserData(data);
    setIsOnboarding(false);
    setShowDashboard(true);
  };

  if (showDashboard && userData) {
    return <DashboardLayout userData={userData} />;
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      
      <OnboardingModal 
        isOpen={isOnboarding}
        onComplete={handleOnboardingComplete}
      />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Change the World?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of learners already making a difference through personalized sustainability education.
          </p>
          <button 
            onClick={handleStartLearning}
            className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-bold hover:bg-white/90 transform hover:scale-105 transition-all duration-300 shadow-glow"
          >
            🚀 Start Your Journey Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;
