// Simple analytics utility for tracking user interactions
export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    // In a real app, this would send to analytics service
    console.log('📊 Analytics Event:', event, properties);
  },

  trackButtonClick: (buttonName: string, location: string) => {
    analytics.track('button_clicked', {
      button_name: buttonName,
      location: location,
      timestamp: Date.now()
    });
  },

  trackGameStart: (gameType: string, userLevel: string) => {
    analytics.track('game_started', {
      game_type: gameType,
      user_level: userLevel,
      timestamp: Date.now()
    });
  },

  trackLearningProgress: (progress: number, section: string) => {
    analytics.track('learning_progress', {
      progress_percentage: progress,
      section: section,
      timestamp: Date.now()
    });
  }
};