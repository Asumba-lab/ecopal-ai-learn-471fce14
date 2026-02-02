import { useState, useEffect, useCallback } from 'react';

export interface UserLearningProfile {
  // Interests tracked from conversations
  interests: Record<string, number>; // topic -> engagement count
  // Topics the user has asked about
  topicsExplored: string[];
  // User's experience level (from onboarding or inferred)
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  // Session stats
  totalSessions: number;
  totalQuestions: number;
  lastVisit: string;
  // Favorite topics (most asked)
  favoriteTopics: string[];
  // Learning streak
  learningStreak: number;
  lastActiveDate: string;
}

const DEFAULT_PROFILE: UserLearningProfile = {
  interests: {},
  topicsExplored: [],
  experienceLevel: 'beginner',
  totalSessions: 0,
  totalQuestions: 0,
  lastVisit: new Date().toISOString(),
  favoriteTopics: [],
  learningStreak: 0,
  lastActiveDate: new Date().toDateString(),
};

const STORAGE_KEY = 'ecopal-user-profile';

// Topic categories for interest tracking
const topicCategories: Record<string, string[]> = {
  'renewable-energy': ['solar', 'wind', 'hydro', 'geothermal', 'nuclear', 'hydrogen', 'renewable', 'energy', 'power', 'electricity'],
  'climate-science': ['climate', 'greenhouse', 'carbon', 'warming', 'temperature', 'emissions', 'co2', 'methane', 'atmosphere'],
  'sustainable-living': ['sustainable', 'zero waste', 'recycle', 'reduce', 'reuse', 'footprint', 'lifestyle', 'consumption'],
  'nature-biodiversity': ['biodiversity', 'species', 'ecosystem', 'forest', 'ocean', 'wildlife', 'nature', 'animal', 'plant', 'coral'],
  'water-conservation': ['water', 'ocean', 'sea', 'river', 'lake', 'rain', 'drought', 'freshwater', 'wetland'],
  'transportation': ['electric', 'ev', 'car', 'transport', 'aviation', 'flight', 'bike', 'cycling', 'public transit'],
  'food-agriculture': ['food', 'farm', 'agriculture', 'meat', 'vegan', 'plant-based', 'organic', 'regenerative'],
  'policy-economics': ['policy', 'paris agreement', 'carbon tax', 'net zero', 'legislation', 'economy', 'green deal'],
};

export const useEcoPalMemory = () => {
  const [profile, setProfile] = useState<UserLearningProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_PROFILE, ...parsed };
      }
    } catch (e) {
      console.error('Failed to load EcoPal profile:', e);
    }
    return DEFAULT_PROFILE;
  });

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  // Update session on mount
  useEffect(() => {
    const today = new Date().toDateString();
    const lastActive = profile.lastActiveDate;
    
    setProfile(prev => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const wasYesterday = lastActive === yesterday.toDateString();
      const isToday = lastActive === today;
      
      return {
        ...prev,
        totalSessions: prev.totalSessions + 1,
        lastVisit: new Date().toISOString(),
        lastActiveDate: today,
        learningStreak: isToday 
          ? prev.learningStreak 
          : wasYesterday 
            ? prev.learningStreak + 1 
            : 1,
      };
    });
  }, []);

  // Track a user question and extract interests
  const trackQuestion = useCallback((question: string) => {
    const lowerQuestion = question.toLowerCase();
    const detectedCategories: string[] = [];

    // Find which categories this question relates to
    for (const [category, keywords] of Object.entries(topicCategories)) {
      if (keywords.some(keyword => lowerQuestion.includes(keyword))) {
        detectedCategories.push(category);
      }
    }

    setProfile(prev => {
      const newInterests = { ...prev.interests };
      const newTopicsExplored = [...prev.topicsExplored];

      detectedCategories.forEach(cat => {
        newInterests[cat] = (newInterests[cat] || 0) + 1;
        if (!newTopicsExplored.includes(cat)) {
          newTopicsExplored.push(cat);
        }
      });

      // Calculate favorite topics (top 3)
      const sortedInterests = Object.entries(newInterests)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([topic]) => topic);

      // Infer experience level based on questions asked
      const totalQuestions = prev.totalQuestions + 1;
      let experienceLevel = prev.experienceLevel;
      if (totalQuestions >= 50) experienceLevel = 'expert';
      else if (totalQuestions >= 25) experienceLevel = 'advanced';
      else if (totalQuestions >= 10) experienceLevel = 'intermediate';

      return {
        ...prev,
        interests: newInterests,
        topicsExplored: newTopicsExplored,
        totalQuestions: totalQuestions,
        favoriteTopics: sortedInterests,
        experienceLevel,
      };
    });
  }, []);

  // Get personalized greeting based on profile
  const getPersonalizedGreeting = useCallback((): string => {
    const { totalSessions, favoriteTopics, learningStreak, totalQuestions, experienceLevel } = profile;

    if (totalSessions <= 1) {
      return "Hello! 🌱 I'm EcoPal, your AI environmental companion! I'll remember what topics interest you and personalize our conversations. Ask me anything about climate, energy, or sustainability! 🌍";
    }

    const greetings: string[] = [];
    
    // Streak acknowledgment
    if (learningStreak >= 7) {
      greetings.push(`Amazing! 🔥 You're on a ${learningStreak}-day learning streak!`);
    } else if (learningStreak >= 3) {
      greetings.push(`Great to see you back! 🌟 ${learningStreak} days in a row!`);
    } else {
      greetings.push("Welcome back! 🌱");
    }

    // Personalized based on interests
    if (favoriteTopics.length > 0) {
      const topicNames: Record<string, string> = {
        'renewable-energy': 'renewable energy',
        'climate-science': 'climate science',
        'sustainable-living': 'sustainable living',
        'nature-biodiversity': 'nature & biodiversity',
        'water-conservation': 'water conservation',
        'transportation': 'green transportation',
        'food-agriculture': 'sustainable food',
        'policy-economics': 'climate policy',
      };
      const topTopicName = topicNames[favoriteTopics[0]] || favoriteTopics[0];
      greetings.push(`I remember you're really interested in ${topTopicName}! 💚`);
    }

    // Experience acknowledgment
    if (experienceLevel === 'expert') {
      greetings.push("As an expert learner, I'll provide you with deeper insights. 🎓");
    } else if (experienceLevel === 'advanced') {
      greetings.push("You've explored so much! Ready to dive deeper? 🌊");
    } else if (totalQuestions >= 5) {
      greetings.push(`You've asked ${totalQuestions} questions so far—keep exploring! 🚀`);
    }

    greetings.push("What would you like to learn today? 🌍");

    return greetings.join(" ");
  }, [profile]);

  // Get topic recommendations based on interests
  const getRecommendedTopics = useCallback((): string[] => {
    const explored = new Set(profile.topicsExplored);
    const allTopics = Object.keys(topicCategories);
    
    // Recommend unexplored topics first, then less-explored ones
    const unexplored = allTopics.filter(t => !explored.has(t));
    const lessExplored = allTopics
      .filter(t => explored.has(t))
      .sort((a, b) => (profile.interests[a] || 0) - (profile.interests[b] || 0));

    return [...unexplored.slice(0, 2), ...lessExplored.slice(0, 2)];
  }, [profile]);

  // Get personalized response prefix based on user's interests and history
  const getPersonalizedContext = useCallback((): string => {
    const { favoriteTopics, experienceLevel } = profile;
    
    if (favoriteTopics.length === 0) return '';

    const contexts: string[] = [];
    
    // Add relevant connections based on user's interests
    if (favoriteTopics.includes('renewable-energy') && favoriteTopics.includes('transportation')) {
      contexts.push("Since you're interested in both energy and transport, you might find the EV-grid connection fascinating!");
    }
    
    if (favoriteTopics.includes('climate-science') && favoriteTopics.includes('nature-biodiversity')) {
      contexts.push("Your interest in climate and biodiversity connects to nature-based solutions!");
    }

    // Adjust complexity based on experience
    if (experienceLevel === 'expert' || experienceLevel === 'advanced') {
      contexts.push("I'll include more technical details for you.");
    }

    return contexts.join(" ");
  }, [profile]);

  // Reset profile (for testing or user request)
  const resetProfile = useCallback(() => {
    setProfile(DEFAULT_PROFILE);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    profile,
    trackQuestion,
    getPersonalizedGreeting,
    getRecommendedTopics,
    getPersonalizedContext,
    resetProfile,
  };
};
