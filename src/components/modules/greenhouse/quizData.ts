export interface QuizQuestion {
  id: number;
  question: string;
  options: { text: string; correct: boolean }[];
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What would Earth's average temperature be without the natural greenhouse effect?",
    options: [
      { text: "About 15°C (59°F)", correct: false },
      { text: "About -18°C (0°F)", correct: true },
      { text: "About 30°C (86°F)", correct: false },
      { text: "About 0°C (32°F)", correct: false }
    ],
    explanation: "Without greenhouse gases trapping heat, Earth would be a frozen world at -18°C — that's 33°C colder than today!",
    difficulty: "easy"
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
    explanation: "CO₂ accounts for about 76% of human-caused greenhouse gas emissions, primarily from burning fossil fuels.",
    difficulty: "easy"
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
    explanation: "CO₂ has risen from 280 ppm to 421 ppm — a 50% increase and the highest level in 3 million years.",
    difficulty: "easy"
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
    explanation: "Electricity and heat production accounts for 25% of global emissions, mainly from burning coal and natural gas.",
    difficulty: "medium"
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
    explanation: "Scientists say we need to cut emissions by 45% by 2030 and reach net-zero by 2050 to stay within 1.5°C.",
    difficulty: "medium"
  },
  {
    id: 6,
    question: "How much more potent is methane than CO₂ over a 20-year period?",
    options: [
      { text: "10 times", correct: false },
      { text: "30 times", correct: false },
      { text: "80 times", correct: true },
      { text: "300 times", correct: false }
    ],
    explanation: "Methane is approximately 80 times more potent than CO₂ at trapping heat over a 20-year period, though it breaks down faster.",
    difficulty: "medium"
  },
  {
    id: 7,
    question: "What percentage of Earth's incoming solar radiation is reflected back to space?",
    options: [
      { text: "10%", correct: false },
      { text: "30%", correct: true },
      { text: "50%", correct: false },
      { text: "70%", correct: false }
    ],
    explanation: "About 30% of incoming solar radiation is reflected back to space by clouds, ice, snow, and other reflective surfaces — this is called Earth's albedo.",
    difficulty: "easy"
  },
  {
    id: 8,
    question: "Which of these is a climate tipping point that scientists are most concerned about?",
    options: [
      { text: "Increased bird migration", correct: false },
      { text: "Amazon rainforest dieback", correct: true },
      { text: "More frequent rainbows", correct: false },
      { text: "Shifting trade winds", correct: false }
    ],
    explanation: "The Amazon rainforest is approaching a tipping point (~17% already deforested) where it could transition from a carbon sink to a carbon source.",
    difficulty: "hard"
  },
  {
    id: 9,
    question: "How much has the cost of solar power dropped since 2010?",
    options: [
      { text: "About 30%", correct: false },
      { text: "About 55%", correct: false },
      { text: "About 89%", correct: true },
      { text: "About 95%", correct: false }
    ],
    explanation: "Solar power costs have plummeted by 89% since 2010, making it one of the cheapest sources of electricity in history.",
    difficulty: "medium"
  },
  {
    id: 10,
    question: "At current emission rates, approximately when could the 1.5°C carbon budget be exhausted?",
    options: [
      { text: "By 2025", correct: false },
      { text: "By 2030", correct: true },
      { text: "By 2050", correct: false },
      { text: "By 2100", correct: false }
    ],
    explanation: "At ~40 Gt CO₂/year and ~250 Gt remaining budget (67% chance), the 1.5°C carbon budget could be used up around 2030.",
    difficulty: "hard"
  },
  {
    id: 11,
    question: "What is the 'albedo effect'?",
    options: [
      { text: "The warming caused by greenhouse gases", correct: false },
      { text: "The reflection of solar radiation by Earth's surfaces", correct: true },
      { text: "The absorption of heat by oceans", correct: false },
      { text: "The release of methane from permafrost", correct: false }
    ],
    explanation: "Albedo refers to how much solar radiation is reflected by surfaces. Ice and snow have high albedo (reflect more), while dark surfaces like oceans have low albedo (absorb more).",
    difficulty: "medium"
  },
  {
    id: 12,
    question: "How many people could be displaced by climate change by 2050?",
    options: [
      { text: "50 million", correct: false },
      { text: "100 million", correct: false },
      { text: "216 million", correct: true },
      { text: "500 million", correct: false }
    ],
    explanation: "The World Bank projects 216 million climate migrants by 2050 due to sea level rise, water scarcity, crop failure, and extreme weather.",
    difficulty: "hard"
  },
  {
    id: 13,
    question: "Which natural ecosystem stores the most carbon per unit area?",
    options: [
      { text: "Tropical rainforests", correct: false },
      { text: "Mangrove forests", correct: true },
      { text: "Grasslands", correct: false },
      { text: "Boreal forests", correct: false }
    ],
    explanation: "Mangroves store 3-5 times more carbon per unit area than land forests, making them incredibly important carbon sinks to protect.",
    difficulty: "hard"
  },
  {
    id: 14,
    question: "What is Earth's current average surface temperature?",
    options: [
      { text: "About 10°C (50°F)", correct: false },
      { text: "About 15°C (59°F)", correct: true },
      { text: "About 20°C (68°F)", correct: false },
      { text: "About 25°C (77°F)", correct: false }
    ],
    explanation: "Earth's average surface temperature is about 15°C (59°F), maintained by the natural greenhouse effect. Without it, Earth would be -18°C.",
    difficulty: "easy"
  },
  {
    id: 15,
    question: "What percentage of excess heat has been absorbed by the oceans?",
    options: [
      { text: "50%", correct: false },
      { text: "70%", correct: false },
      { text: "90%", correct: true },
      { text: "30%", correct: false }
    ],
    explanation: "Oceans have absorbed about 90% of the excess heat from global warming, acting as a massive heat buffer — but this causes ocean warming and acidification.",
    difficulty: "medium"
  }
];
