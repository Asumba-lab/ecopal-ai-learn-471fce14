import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Bot, User, Lightbulb, MessageCircle, RotateCcw, Leaf, Zap, Droplets, TreePine, Recycle, Wind, Sun, Car } from "lucide-react";
import ecopalMascot from "@/assets/ecopal-mascot.jpg";

interface EcoPalBotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ecopal';
  timestamp: Date;
  isTyping?: boolean;
}

const questionCategories = [
  {
    icon: Sun,
    title: "Energy",
    questions: [
      "What is renewable energy?",
      "How does solar energy work?",
      "Explain wind power technology",
      "What is green hydrogen?",
      "How do microgrids work?"
    ]
  },
  {
    icon: Leaf,
    title: "Climate",
    questions: [
      "What causes climate change?",
      "How does the greenhouse effect work?",
      "What is ocean acidification?",
      "Explain tipping points in climate",
      "What is net zero?"
    ]
  },
  {
    icon: Recycle,
    title: "Sustainability",
    questions: [
      "What is circular economy?",
      "How can I reduce my carbon footprint?",
      "What is sustainable fashion?",
      "Explain zero waste living",
      "What is sustainable packaging?"
    ]
  },
  {
    icon: TreePine,
    title: "Nature",
    questions: [
      "Why are forests important?",
      "What is biodiversity loss?",
      "How do coral reefs work?",
      "What is rewilding?",
      "Explain ecosystem services"
    ]
  }
];

// Comprehensive Environmental Knowledge Base - Vastly Expanded
const comprehensiveKnowledge: Record<string, string[]> = {
  // RENEWABLE ENERGY
  "renewable energy": [
    "Renewable energy comes from naturally replenishing sources: solar, wind, hydro, geothermal, and biomass. Unlike fossil fuels, they produce minimal greenhouse gases and never run out. 🌱",
    "Solar costs dropped 89% since 2010, wind by 70%. Renewables are now the cheapest power source in most regions, generating 30% of global electricity. ⚡",
    "The sector employs 13.7 million people worldwide and growing. Key benefits: energy independence, stable costs, cleaner air, and climate protection. 🌍",
    "Challenges include intermittency (solved by batteries + smart grids), grid integration, and upfront costs. But storage costs fell 90% in a decade! 🔋"
  ],
  "solar energy": [
    "Solar panels use photovoltaic cells to convert sunlight directly into electricity. Modern panels achieve 20-22% efficiency and last 25-30 years with minimal maintenance. ☀️",
    "Types include rooftop residential (5-10kW), commercial (100kW-1MW), and utility-scale farms (100MW+). Solar thermal uses mirrors to concentrate heat for steam turbines. 🏭",
    "Net metering lets you sell excess energy back to the grid. With battery storage, you can achieve energy independence and even power through blackouts. 🔋",
    "Solar works everywhere—Germany, not known for sunshine, gets 10% of its electricity from solar. Costs: $2.50-3.50/watt installed, payback in 6-10 years. 💰"
  ],
  "wind energy": [
    "Wind turbines convert kinetic energy from moving air into electricity. Modern turbines stand 180m tall with 80m blades, generating 2-8MW each. 💨",
    "Onshore wind is mature and cheap ($30-40/MWh). Offshore wind is 40% more efficient due to stronger, consistent ocean winds, though costlier. 🌊",
    "Denmark leads with 50% wind electricity, followed by Ireland (33%) and Germany. Wind employs 1.3 million people globally. 👷",
    "Wildlife concerns are addressed through careful siting, radar systems to stop turbines during bird migrations, and painted blades (70% fewer bird deaths). 🦅"
  ],
  "hydroelectric": [
    "Hydropower is the largest renewable source (16% of global electricity), using flowing water through turbines. It's highly efficient at 90%+. 💧",
    "Types: reservoir dams (store water), run-of-river (minimal storage), pumped storage (batteries using water). Norway gets 95% power from hydro! 🇳🇴",
    "New tech includes small modular hydro, in-pipe turbines (water mains), and tidal/wave energy that's emerging for coastal areas. 🌊",
    "Environmental trade-offs exist—dams affect fish migration and ecosystems—but fish ladders, environmental flows, and careful planning minimize impact. 🐟"
  ],
  "geothermal": [
    "Geothermal taps Earth's internal heat from volcanic activity, hot springs, or deep drilling. It provides reliable 24/7 baseload power. 🌋",
    "Iceland gets 70% of energy from geothermal! Other leaders: Kenya (47%), El Salvador, New Zealand. Global capacity: 16GW and growing. 🇮🇸",
    "Enhanced Geothermal Systems (EGS) can work anywhere by fracturing hot dry rock. This could unlock 100x more potential than today. 🔥",
    "Uses beyond electricity: district heating, greenhouses, aquaculture, food drying. Reykjavik heats 95% of buildings geothermally. 🏠"
  ],
  "green hydrogen": [
    "Green hydrogen is made by splitting water using renewable electricity (electrolysis). It produces zero emissions and stores energy long-term. ⚡💧",
    "Applications: steel production (replacing coal), shipping, aviation, seasonal energy storage, fertilizer production. Hard-to-decarbonize sectors. 🚢✈️",
    "Current cost: $4-6/kg, projected to hit $1-2/kg by 2030 with scale. The EU plans 40GW electrolyzer capacity by 2030. 📉",
    "Blue hydrogen (from natural gas with carbon capture) is a bridge technology, but green hydrogen is the long-term goal for true net-zero. 🎯"
  ],
  
  // CLIMATE SCIENCE
  "climate change": [
    "Climate change refers to long-term shifts in temperatures and weather patterns, primarily caused by human activities since the Industrial Revolution. 🌡️",
    "Key driver: burning fossil fuels releases CO2. Levels rose from 280ppm (pre-industrial) to 420ppm today—highest in 800,000 years. 📈",
    "Effects: 1.1°C warming already, sea levels up 20cm, more extreme weather, ecosystem shifts, glacier loss, ocean acidification. 🌊🔥",
    "Solutions: net-zero by 2050, renewable energy transition, electrify transport, protect forests, sustainable agriculture, green buildings. 🌱"
  ],
  "greenhouse effect": [
    "The greenhouse effect is natural and essential—without it Earth would be -18°C! Gases trap heat from the sun, keeping us warm. ☀️",
    "Problem: human activities have enhanced it dramatically. CO2 from fossil fuels, methane from agriculture, nitrous oxide from fertilizers. 📊",
    "CO2 stays in atmosphere 300-1000 years, methane 12 years (but 80x more potent short-term), nitrous oxide 114 years. Each matters. ⏰",
    "Water vapor is the most abundant greenhouse gas but responds to temperature—it's a feedback, not a driver. Clouds are complex and both warm and cool. ☁️"
  ],
  "carbon footprint": [
    "Your carbon footprint is total greenhouse gases from your activities, measured in CO2 equivalent. Average American: 16 tons/year; global average: 4 tons. 👣",
    "Breakdown: transportation (29%), home energy (21%), food (16%), goods (15%), services (19%). Biggest wins come from the biggest categories. 📊",
    "Top actions: fly less (1 flight = 1-3 tons CO2), drive electric or car-free, home efficiency, plant-rich diet, renewable energy. ✈️🚗🏠🥗",
    "Collective action matters more than individual: support climate policies, choose sustainable companies, vote for climate leaders, spread awareness. 🌍"
  ],
  "net zero": [
    "Net zero means balancing CO2 emissions with CO2 removal—not necessarily zero emissions, but what's emitted equals what's captured. ⚖️",
    "Over 90 countries have net-zero targets, covering 80% of global emissions. Most target 2050, China 2060, India 2070. 🌐",
    "Achieved through: massive renewable expansion, electrification, efficiency, behavior change, plus removal via forests and carbon capture. 🌲🔧",
    "Science says we need global net-zero by 2050 to limit warming to 1.5°C. Each 0.1°C matters for extreme weather and sea level. 📉"
  ],
  "ocean acidification": [
    "Oceans absorb 30% of human CO2 emissions, making them more acidic. pH dropped from 8.2 to 8.1—sounds small but 30% more acidic! 🌊",
    "Effects: shellfish struggle to build shells, coral bleaching accelerates, food chains disrupted. Called 'climate change's evil twin.' 🐚",
    "Arctic waters are most vulnerable—cold water absorbs more CO2. Pteropods (sea butterflies), vital food source, are already dissolving. ❄️",
    "Solutions: cut CO2 emissions (the only real fix), protect marine ecosystems, research-resistant species, reduce other ocean stressors. 🔬"
  ],
  "tipping points": [
    "Tipping points are thresholds where small changes trigger large, irreversible shifts in climate systems—like dominos falling. ⚠️",
    "Major concerns: Amazon rainforest dieback, Greenland/Antarctic ice sheet collapse, permafrost methane release, Atlantic current shutdown. 🌍",
    "Some may already be crossed: Arctic summer ice, parts of West Antarctic ice sheet. Each 0.1°C of warming increases risks. 📊",
    "Beyond 1.5°C, cascading tipping points become more likely, potentially adding 0.5°C+ of additional warming. Urgency is critical. ⏰"
  ],
  
  // SUSTAINABLE LIVING
  "sustainable living": [
    "Sustainable living means meeting present needs without compromising future generations. It spans energy, food, transport, consumption, and community. 🌱",
    "Key principles: reduce consumption, choose quality over quantity, embrace sharing economy, eat plant-rich, avoid single-use, repair don't replace. ♻️",
    "Home actions: LED lighting (75% less energy), smart thermostats (10% savings), water-efficient fixtures, proper insulation, renewable energy. 🏠",
    "Every action counts, but systemic change matters most. Support policies, vote, choose sustainable businesses, and inspire others. 🗳️"
  ],
  "zero waste": [
    "Zero waste aims to redesign systems so all products are reused—nothing goes to landfill or incineration. It's circular, not linear. ♻️",
    "The 5 R's: Refuse (say no to unnecessary stuff), Reduce, Reuse, Recycle, Rot (compost). Order matters—prevention beats recycling! 🚫",
    "Practical steps: bring reusables, buy package-free, compost food scraps, repair items, choose durable goods, declutter mindfully. 🛒",
    "Cities like San Francisco achieve 80% diversion from landfill. Kamikatsu, Japan aims for 100% zero waste. It's achievable at scale! 🏙️"
  ],
  "circular economy": [
    "Circular economy eliminates waste by designing products for reuse, repair, and recycling—keeping materials in use as long as possible. 🔄",
    "Contrast with linear 'take-make-dispose' model. Circular saves resources, cuts emissions, creates jobs, reduces pollution. Win-win-win! 💪",
    "Examples: phone trade-in programs, clothing rental, refurbished electronics, industrial symbiosis (one company's waste = another's input). 📱👗",
    "EU leads with Circular Economy Action Plan. Companies like Patagonia, Interface, Philips prove it's profitable. Expected to add $4.5 trillion to economy by 2030. 💰"
  ],
  "sustainable fashion": [
    "Fashion produces 10% of global carbon emissions—more than aviation and shipping combined! It's the second largest polluter after oil. 👗",
    "Problems: fast fashion, synthetic fibers (microplastics), toxic dyes, water use (2,700 liters for one cotton shirt), textile waste. 🚰",
    "Solutions: buy less and better, choose natural/organic fibers, support ethical brands, secondhand shopping, clothing swaps, repair. 🧵",
    "Look for certifications: GOTS (organic), OEKO-TEX (safe chemicals), Fair Trade, B Corp. Rent for special occasions! 🏷️"
  ],
  
  // TRANSPORTATION
  "electric vehicle": [
    "EVs are 3-4x more efficient than gas cars: 85% of battery energy reaches wheels vs 20% for internal combustion. Zero tailpipe emissions. 🚗⚡",
    "Total lifecycle emissions 50-70% lower than gas cars, improving as grids get cleaner. Manufacturing emissions paid back in 1-2 years of driving. 📊",
    "Costs dropping fast: battery costs fell 90% since 2010. Many EVs now cheaper to own than gas cars when including fuel and maintenance. 💰",
    "Norway leads with 80% EV market share. Global EV sales hit 14 million in 2023—10x growth in 5 years. Charging infrastructure expanding rapidly. 🔌"
  ],
  "sustainable transport": [
    "Transport produces 16% of global emissions. Solutions: public transit, cycling, walking, EVs, car-sharing, working from home. 🚌🚴",
    "Best cities for sustainable transport: Amsterdam, Copenhagen, Tokyo. Dense, mixed-use development + transit = less driving. 🏙️",
    "Aviation is hardest to decarbonize. Solutions: fly less, sustainable aviation fuel, electric/hydrogen short-haul, high-speed rail alternative. ✈️🚄",
    "Shipping going green: wind-assisted ships, ammonia/hydrogen fuel, slow steaming, port electrification. Maersk ordered carbon-neutral ships. 🚢"
  ],
  
  // NATURE & BIODIVERSITY
  "biodiversity": [
    "Biodiversity is the variety of life on Earth—species, genetic diversity, ecosystems. It's declining faster than any time in human history. 🌿",
    "1 million species face extinction. We've lost 69% of wildlife populations since 1970. This is the sixth mass extinction, driven by humans. 📉",
    "Causes: habitat loss (agriculture, urbanization), overexploitation, pollution, invasive species, climate change. All interconnected. ⚠️",
    "Why it matters: ecosystems provide food, clean water, medicine, pollination, climate regulation. Economy depends on nature—$44 trillion. 💚"
  ],
  "deforestation": [
    "We lose 10 million hectares of forest annually—primarily tropical. That's 27 soccer fields per minute. 78% is for agriculture. 🌳❌",
    "Amazon rainforest approaching tipping point—at 20-25% deforestation (now ~17%), it could collapse into savanna, releasing massive CO2. 🌿",
    "Solutions: sustainable agriculture, forest certification (FSC), halting illegal logging, indigenous land rights, consumer choices. 🛒",
    "Good news: some forests recovering. Costa Rica doubled forest cover since 1980s. EU banning deforestation-linked imports. Progress is possible! 🌱"
  ],
  "coral reefs": [
    "Coral reefs cover 0.1% of ocean floor but support 25% of marine species. They protect coastlines, support fisheries, drive tourism—$375 billion value. 🐠",
    "Bleaching occurs when warm water stresses coral, expelling algae partners. Mass bleaching events now 5x more frequent than in 1980s. 🌡️",
    "At 1.5°C warming, 70-90% of coral reefs could die. At 2°C, 99% loss. We're currently heading for 2.5-3°C. Time is critical. ⏰",
    "Hope: heat-resistant coral breeding, marine protected areas, reducing local stressors (pollution, overfishing), cutting emissions fastest. 🔬"
  ],
  "rewilding": [
    "Rewilding restores ecosystems by reintroducing species, removing barriers, and letting nature self-regulate. It's conservation going wild! 🦬",
    "Examples: wolves in Yellowstone (restored rivers!), European bison in Poland, beavers in UK (natural flood management). Remarkable cascades. 🐺",
    "Benefits: carbon sequestration, flood prevention, water purification, habitat creation, tourism economy, human wellbeing. Nature heals. 🌊",
    "Rewilding Europe aims for 1 million hectares. 30x30 global target: protect 30% of land and ocean by 2030. Ambitious but achievable! 🌍"
  ],
  
  // WATER
  "water conservation": [
    "Freshwater is just 2.5% of Earth's water, and 69% of that is locked in ice. Climate change is intensifying droughts and floods. 💧",
    "Agriculture uses 70% of freshwater withdrawals. Industry 20%, households 10%. Efficiency in all sectors is crucial. 🌾",
    "Home savings: fix leaks (10% of homes waste 90+ gallons/day), low-flow fixtures (30% savings), shorter showers, efficient appliances. 🚿",
    "Innovative solutions: drip irrigation, rainwater harvesting, greywater recycling, desalination (energy-intensive but improving). 🔧"
  ],
  "ocean pollution": [
    "8 million tons of plastic enter oceans annually. By 2050, oceans could have more plastic than fish by weight. 🌊🐟",
    "Microplastics now found everywhere—deepest ocean trenches, Arctic ice, our blood. Health impacts still being understood. 🔬",
    "Other pollution: agricultural runoff (dead zones), industrial chemicals, oil spills, noise (affects whales), light (affects turtles). ⚠️",
    "Solutions: plastic reduction at source, better waste management, beach cleanups, microplastic filters, international ocean treaties. 🚫"
  ],
  
  // FOOD & AGRICULTURE
  "sustainable agriculture": [
    "Food systems produce 26% of global emissions—not just farming but transport, processing, packaging, waste. 🌾",
    "Sustainable practices: crop rotation, cover crops, reduced tillage, integrated pest management, precision agriculture. Healthier soil = better yields. 🚜",
    "Regenerative agriculture goes further—building soil carbon, enhancing biodiversity, improving water retention. Farms can become carbon sinks! 🌱",
    "Organic reduces pesticides and often has lower emissions, but yields can be lower. Agroecology combines best practices. Balance is key. 🧪"
  ],
  "plant based diet": [
    "Food's carbon footprint: beef (60kg CO2/kg), lamb (24kg), cheese (21kg), pork (7kg), chicken (6kg), vegetables (<1kg). Diet matters! 🥩🥗",
    "Shifting to plant-rich diet can cut food emissions 70%+ and reduce land use (animal agriculture uses 77% of farmland for 18% of calories). 🌿",
    "You don't have to go fully vegan—even reducing meat by 50% has major impact. Flexitarian is the fastest-growing diet choice. 🍽️",
    "Environmental benefits: less deforestation, reduced water use (beef needs 15,000 liters/kg vs vegetables 300 liters/kg), less pollution. 💧"
  ],
  "food waste": [
    "1/3 of all food produced is wasted—1.3 billion tons/year. If food waste were a country, it'd be the third-largest emitter after China and US. 🗑️",
    "Waste happens at every stage: farms (ugly produce), transport, retail (overstocking), homes (over-buying, confusion over dates). 📦",
    "Solutions: meal planning, proper storage, understanding 'best by' vs 'use by', composting, ugly produce programs, food rescue apps. 📱",
    "Composting turns food scraps into soil amendment, diverting from landfill where it produces methane. Home or municipal composting both help! 🌱"
  ],
  
  // TECHNOLOGY & INNOVATION
  "carbon capture": [
    "Carbon capture, utilization, and storage (CCUS) can capture 85-95% of CO2 from industrial sources like cement and steel plants. 🏭",
    "Types: post-combustion (from flue gas), pre-combustion (before burning), oxy-fuel (pure oxygen burning). Each suits different applications. 🔧",
    "Direct Air Capture (DAC) pulls CO2 directly from atmosphere—vital for reaching net-zero and addressing historical emissions. Climeworks, Carbon Engineering leading. 💨",
    "Current cost: $100-600/ton for DAC. Target: $100/ton for widespread deployment. Scale-up and innovation needed. Not a substitute for cutting emissions! 📉"
  ],
  "smart grid": [
    "Smart grids use digital technology to manage electricity supply and demand in real-time, integrating renewables and EVs smoothly. ⚡🖥️",
    "Features: two-way communication, automated switching, demand response, predictive maintenance, real-time pricing. More efficient and resilient. 📊",
    "Enables: rooftop solar integration, EV charging optimization, battery storage coordination, faster outage response. Essential for 100% renewables. 🔋",
    "Microgrids can operate independently during disasters. Community microgrids provide local resilience and energy democracy. 🏘️"
  ],
  "battery storage": [
    "Battery storage solves renewable intermittency—storing excess solar/wind for when sun isn't shining or wind isn't blowing. 🔋☀️💨",
    "Lithium-ion dominates but alternatives emerging: sodium-ion (cheaper, no lithium), flow batteries (long duration), solid-state (safer, denser). 🔬",
    "Costs fell 90% in 10 years. Grid-scale projects: Tesla's Australian Hornsdale (100MW) saved $150M in 2 years. Economics now favorable. 💰",
    "Home batteries like Tesla Powerwall (13.5kWh) enable self-consumption and backup. Vehicle-to-grid (V2G) turns EVs into mobile storage. 🚗🏠"
  ],
  
  // RECYCLING & WASTE
  "recycling": [
    "Recycling conserves resources: aluminum saves 95% energy, paper 60%, plastic 88%. But only 9% of plastic ever made has been recycled. ♻️",
    "Challenges: contamination, mixed materials, low oil prices (virgin plastic cheap), limited markets. Wishcycling causes problems! 🚫",
    "What works: metal and paper recycling are mature. Glass infinitely recyclable. Plastic complicated—focus on #1 (PET) and #2 (HDPE). 📦",
    "Better than recycling: refuse, reduce, reuse. Design products for recyclability. Extended Producer Responsibility makes companies responsible. 🔄"
  ],
  "plastic pollution": [
    "We produce 400 million tons of plastic yearly—40% is single-use. Only 9% recycled, 12% incinerated, 79% accumulates in landfills/nature. 🛢️",
    "Microplastics (<5mm) now everywhere: ocean depths, mountain peaks, Arctic ice, rain, human blood. Average person consumes a credit card of plastic weekly. 😰",
    "Problem plastics: bags, bottles, straws, food packaging, single-use cutlery. But also: synthetic clothing (microfiber shedding), tires, cigarette filters. 🚬",
    "Solutions: bans on single-use plastics, refill systems, alternative materials, better recycling, plastic credits, UN global plastics treaty. 🌍"
  ],
  "composting": [
    "Composting transforms organic waste into nutrient-rich soil amendment, diverting from landfill where it produces methane (28x more potent than CO2). 🌱",
    "Methods: backyard bin, tumbler (faster), vermicomposting (worms), Bokashi (fermentation), municipal collection. Match method to your situation. 🏠",
    "What to compost: fruit/veg scraps, coffee grounds, eggshells, yard waste, cardboard. Not: meat, dairy, oils, diseased plants. Balance greens and browns. ☕🥚",
    "Benefits: reduces waste 30%, creates free fertilizer, improves soil structure, increases water retention, sequesters carbon. Gardens thrive! 🌻"
  ],
  
  // POLICY & ACTION
  "paris agreement": [
    "The Paris Agreement (2015) unites 196 nations to limit warming to 'well below 2°C, pursuing 1.5°C.' Countries set their own targets (NDCs). 🌍",
    "Current pledges put us on track for 2.5-3°C warming. Gap between pledges and action is even larger. Ambition must increase. 📊",
    "Key mechanisms: 5-year stocktakes, climate finance ($100B/year goal), technology transfer, loss and damage fund (agreed 2022). 💰",
    "Success depends on implementation. Some countries ahead of targets, others lagging. US rejoined in 2021. Business and cities often lead. 🏙️"
  ],
  "environmental policy": [
    "Effective climate policies: carbon pricing (tax or cap-and-trade), renewable mandates, efficiency standards, fossil fuel subsidy reform. ⚖️",
    "Carbon pricing works: EU ETS covers 40% of emissions, prices now €80-100/ton driving clean investment. But coverage and price levels vary globally. 💶",
    "Green investment: IRA in US ($369B clean energy), EU Green Deal, China's 5-year plans. Government spending is catalyzing private capital. 📈",
    "Local action matters: cities control 70% of emissions through buildings, transport, waste. C40 cities leading on climate action. 🏢"
  ],
  "climate activism": [
    "Climate movements have grown massively: Fridays for Future (millions of students), Extinction Rebellion, 350.org, indigenous-led movements. ✊",
    "Tactics range from marches to lawsuits to direct action. Climate litigation has won major victories against governments and companies. ⚖️",
    "Individual action matters but systemic change is essential. Vote, divest, engage employers, support advocacy organizations. 🗳️",
    "Youth voices are powerful—Greta Thunberg sparked global movement. Intergenerational justice: those who'll live with consequences demand action. 🌱"
  ]
};

// Additional quick responses for common queries
const quickResponses: Record<string, string> = {
  "hello": "Hello! 👋 I'm EcoPal, your AI environmental companion. I can help you learn about climate change, renewable energy, sustainable living, biodiversity, and much more. What would you like to explore?",
  "hi": "Hi there! 🌱 Welcome! I'm here to answer all your environmental questions. Ask me about anything from solar energy to zero waste living!",
  "hey": "Hey! 🌍 Great to meet you! I'm EcoPal—ask me anything about the environment, sustainability, or green technology!",
  "thanks": "You're welcome! 💚 Every bit of environmental knowledge helps. Feel free to ask more questions anytime!",
  "thank you": "Happy to help! 🌱 Remember, even small actions make a difference when millions of people take them together. Anything else you'd like to know?",
  "help": "I can help you learn about: 🌞 Renewable energy, 🌡️ Climate science, ♻️ Sustainable living, 🌳 Nature & biodiversity, 🚗 Green transport, 🍽️ Sustainable food, and much more! Just ask away!",
  "what can you do": "I'm EcoPal, your environmental AI! I can explain: ⚡ How renewable energy works, 🌍 Climate change science, 🌱 Tips for sustainable living, 🦋 Biodiversity importance, 🚗 Electric vehicles, ♻️ Recycling & waste reduction, and answer almost any eco question!",
};

const getAdvancedResponse = (userInput: string, conversationHistory: Message[]): string => {
  const normalizedInput = userInput.toLowerCase().trim();
  
  // Check quick responses first
  for (const [key, response] of Object.entries(quickResponses)) {
    if (normalizedInput === key || normalizedInput.includes(key)) {
      return response;
    }
  }

  // Context-aware responses considering conversation history
  const recentTopics = conversationHistory
    .slice(-4)
    .filter(msg => msg.sender === 'user')
    .map(msg => msg.content.toLowerCase())
    .join(' ');

  // Enhanced knowledge matching - check all topics
  for (const [topic, responses] of Object.entries(comprehensiveKnowledge)) {
    const topicWords = topic.split(' ');
    const matchesTopic = topicWords.every(word => normalizedInput.includes(word)) ||
                         normalizedInput.includes(topic.replace(' ', '')) ||
                         normalizedInput.includes(topic);
    
    if (matchesTopic) {
      // Select response based on conversation depth
      const previousMentions = conversationHistory.filter(msg => 
        topicWords.some(word => msg.content.toLowerCase().includes(word))
      ).length;
      const responseIndex = Math.min(previousMentions, responses.length - 1);
      return responses[responseIndex];
    }
  }

  // Partial keyword matching for broader coverage
  const keywordMatches: Record<string, string[]> = {
    "pollut": ["pollution", "ocean pollution", "plastic pollution"],
    "forest": ["deforestation", "rewilding"],
    "water": ["water conservation", "ocean pollution"],
    "plastic": ["plastic pollution", "recycling"],
    "recycle": ["recycling", "circular economy"],
    "electric car": ["electric vehicle"],
    "ev": ["electric vehicle"],
    "tree": ["deforestation", "rewilding"],
    "meat": ["plant based diet"],
    "vegan": ["plant based diet"],
    "vegetarian": ["plant based diet"],
    "diet": ["plant based diet", "food waste"],
    "food": ["sustainable agriculture", "plant based diet", "food waste"],
    "farming": ["sustainable agriculture"],
    "sun": ["solar energy"],
    "panel": ["solar energy"],
    "turbine": ["wind energy"],
    "battery": ["battery storage", "electric vehicle"],
    "ocean": ["ocean acidification", "ocean pollution", "coral reefs"],
    "sea": ["ocean acidification", "coral reefs"],
    "fish": ["coral reefs", "biodiversity"],
    "animal": ["biodiversity", "rewilding"],
    "species": ["biodiversity"],
    "extinct": ["biodiversity"],
    "compost": ["composting", "food waste"],
    "waste": ["zero waste", "food waste", "recycling"],
    "trash": ["zero waste", "recycling", "plastic pollution"],
    "garbage": ["zero waste", "recycling"],
    "clothes": ["sustainable fashion"],
    "fashion": ["sustainable fashion"],
    "co2": ["carbon footprint", "climate change", "carbon capture"],
    "emission": ["carbon footprint", "climate change", "net zero"],
    "temperature": ["climate change", "greenhouse effect"],
    "warming": ["climate change", "greenhouse effect"],
    "gas": ["greenhouse effect", "green hydrogen"],
    "policy": ["environmental policy", "paris agreement"],
    "government": ["environmental policy", "paris agreement"],
    "law": ["environmental policy"],
    "activist": ["climate activism"],
    "protest": ["climate activism"],
    "greta": ["climate activism"]
  };

  for (const [keyword, topics] of Object.entries(keywordMatches)) {
    if (normalizedInput.includes(keyword)) {
      const matchedTopic = topics[0];
      const responses = comprehensiveKnowledge[matchedTopic];
      if (responses) {
        return responses[0];
      }
    }
  }

  // Contextual follow-up responses
  if (recentTopics && conversationHistory.length > 3) {
    return `Great question! Building on what we've discussed, I can see you're interested in environmental topics. 🌍 Each solution works best when combined—renewable energy powers EVs, sustainable agriculture protects biodiversity, circular economy reduces waste. What specific area would you like to explore deeper? 🌱`;
  }

  // Default response with guidance
  const topics = Object.keys(comprehensiveKnowledge).slice(0, 8).join(", ");
  return `That's a great question! I have extensive knowledge on environmental topics including: ${topics}, and many more. 🌍 Could you be more specific about what aspect interests you? For example, ask about \"how does solar energy work?\" or \"what is climate change?\" I'm here to help you learn! 🌱`;
};

export const EcoPalBot = ({ isOpen, onClose }: EcoPalBotProps) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('ecopal-conversation');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      } catch (e) {
        console.error('Failed to load conversation history');
      }
    }
    
    return [
      {
        id: '1',
        content: "Hello! 🌱 I'm EcoPal, your AI environmental companion with extensive knowledge on climate science, renewable energy, sustainable living, biodiversity, and much more! Ask me anything—I'm here to help you understand our planet better! 🌍",
        sender: 'ecopal',
        timestamp: new Date()
      }
    ];
  });
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('ecopal-conversation', JSON.stringify(messages));
  }, [messages]);

  const clearConversation = () => {
    const initialMessage = {
      id: '1',
      content: "Hello! 🌱 I'm EcoPal, your AI environmental companion with extensive knowledge on climate science, renewable energy, sustainable living, biodiversity, and much more! Ask me anything—I'm here to help you understand our planet better! 🌍",
      sender: 'ecopal' as const,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
    localStorage.removeItem('ecopal-conversation');
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    const typingMessage: Message = {
      id: `typing-${Date.now()}`,
      content: "EcoPal is thinking...",
      sender: 'ecopal',
      timestamp: new Date(),
      isTyping: true
    };
    
    setTimeout(() => {
      setMessages(prev => [...prev, typingMessage]);
    }, 300);

    setTimeout(() => {
      const response = getAdvancedResponse(inputValue, messages);
      const ecopalMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'ecopal',
        timestamp: new Date()
      };
      
      setMessages(prev => prev.filter(msg => !msg.isTyping).concat(ecopalMessage));
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleQuestionClick = (question: string) => {
    setInputValue(question);
    // Auto-switch to chat tab
    const chatTab = document.querySelector('[value="chat"]') as HTMLButtonElement;
    chatTab?.click();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] sm:w-[90vw] max-w-3xl h-[85vh] sm:h-[80vh] max-h-[700px] flex flex-col p-0 gap-0 overflow-hidden rounded-2xl border-2 border-primary/20 shadow-2xl">
        {/* Header - Compact and responsive */}
        <DialogHeader className="px-3 sm:px-5 py-3 sm:py-4 border-b bg-gradient-to-r from-primary/10 via-green-500/10 to-emerald-500/10 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <img 
                src={ecopalMascot} 
                alt="EcoPal" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary/30 shadow-lg object-cover" 
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-base sm:text-lg text-primary font-bold flex items-center gap-2">
                EcoPal
                <span className="text-xs sm:text-sm font-normal text-muted-foreground hidden xs:inline">• AI Environmental Expert</span>
              </DialogTitle>
              <p className="text-xs text-muted-foreground truncate">Ask me anything about the environment! 🌍</p>
            </div>
          </div>
        </DialogHeader>

        {/* Main Content - Fully responsive */}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <Tabs defaultValue="chat" className="flex-1 flex flex-col min-h-0">
            {/* Tab Navigation - Compact */}
            <div className="px-3 sm:px-5 pt-2 sm:pt-3 pb-2 border-b bg-background/95 flex-shrink-0">
              <TabsList className="grid w-full grid-cols-2 h-9 sm:h-10 bg-muted/50 rounded-xl">
                <TabsTrigger value="chat" className="flex items-center gap-1.5 text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all">
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Chat</span>
                </TabsTrigger>
                <TabsTrigger value="questions" className="flex items-center gap-1.5 text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all">
                  <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Topics</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Chat Tab */}
            <TabsContent value="chat" className="flex-1 flex flex-col mt-0 px-3 sm:px-5 pb-3 sm:pb-4 min-h-0 overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center justify-between py-1.5 sm:py-2 flex-shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MessageCircle className="w-3 h-3" />
                  <span>{messages.length - 1} messages</span>
                </div>
                <Button
                  onClick={clearConversation}
                  variant="ghost"
                  size="sm"
                  className="h-6 sm:h-7 px-2 text-xs hover:bg-destructive/10 hover:text-destructive rounded-lg"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Clear
                </Button>
              </div>
              
              {/* Messages Container */}
              <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
                <ScrollArea ref={scrollAreaRef} className="flex-1 rounded-xl border bg-gradient-to-b from-card/50 to-card/30 backdrop-blur-sm overflow-hidden">
                  <div className="p-2 sm:p-3 space-y-2 sm:space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-1.5 sm:gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} ${message.isTyping ? 'animate-pulse' : ''}`}
                      >
                        {message.sender === 'ecopal' && (
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-primary to-green-600 flex items-center justify-center shadow-md">
                              <Bot className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                            </div>
                          </div>
                        )}
                        
                        <div className={`max-w-[85%] sm:max-w-[80%] ${message.sender === 'user' ? 'order-first' : ''}`}>
                          <Card className={`${
                            message.sender === 'user' 
                              ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-lg' 
                              : message.isTyping 
                                ? 'bg-muted/60 shadow-sm' 
                                : 'bg-background shadow-md border-muted/50'
                          } rounded-xl sm:rounded-2xl`}>
                            <CardContent className="p-2 sm:p-3">
                              <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
                                {message.content}
                              </p>
                              {!message.isTyping && (
                                <p className="text-[10px] sm:text-xs opacity-50 mt-1 sm:mt-1.5 text-right">
                                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        </div>

                        {message.sender === 'user' && (
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-md">
                              <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-secondary-foreground" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="pt-2 sm:pt-3 flex-shrink-0">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask about climate, energy, sustainability..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 h-9 sm:h-10 bg-background/80 backdrop-blur-sm border-muted focus:border-primary text-xs sm:text-sm rounded-xl"
                      disabled={isTyping}
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      size="sm"
                      className="h-9 sm:h-10 w-9 sm:w-10 bg-gradient-to-br from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 shadow-lg rounded-xl p-0"
                      disabled={isTyping || !inputValue.trim()}
                    >
                      <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                  {isTyping && (
                    <div className="flex items-center justify-center gap-1 mt-1.5">
                      <div className="flex gap-0.5">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-xs text-muted-foreground ml-1">EcoPal is typing...</span>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Questions Tab - Categorized */}
            <TabsContent value="questions" className="flex-1 mt-0 px-3 sm:px-5 pb-3 sm:pb-4 min-h-0 overflow-hidden">
              <div className="h-full flex flex-col min-h-0 overflow-hidden">
                <div className="py-1.5 sm:py-2 flex-shrink-0">
                  <h3 className="font-semibold text-primary flex items-center gap-2 text-xs sm:text-sm">
                    <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Explore Topics
                  </h3>
                </div>
                
                <ScrollArea className="flex-1 min-h-0 overflow-hidden">
                  <div className="space-y-2 sm:space-y-3 pr-2">
                    {/* Category Grid */}
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                      {questionCategories.map((category, idx) => {
                        const Icon = category.icon;
                        const isActive = activeCategory === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => setActiveCategory(isActive ? null : idx)}
                            className={`p-2 sm:p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                              isActive 
                                ? 'border-primary bg-primary/10 shadow-md' 
                                : 'border-muted hover:border-primary/30 hover:bg-muted/50'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <div className={`p-1 sm:p-1.5 rounded-lg ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                              </div>
                              <span className="font-medium text-xs sm:text-sm">{category.title}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Questions for selected category */}
                    {activeCategory !== null && (
                      <div className="space-y-1.5 pt-2 border-t animate-in slide-in-from-top-2 duration-200">
                        {questionCategories[activeCategory].questions.map((question, qIdx) => (
                          <Button
                            key={qIdx}
                            variant="outline"
                            className="w-full text-left h-auto p-2 sm:p-2.5 justify-start text-xs hover:bg-primary/5 hover:border-primary/30 rounded-xl transition-colors"
                            onClick={() => handleQuestionClick(question)}
                          >
                            <span className="text-left break-words line-clamp-2">{question}</span>
                          </Button>
                        ))}
                      </div>
                    )}

                    {/* Info cards */}
                    <div className="grid grid-cols-1 gap-1.5 sm:gap-2 pt-2 sm:pt-3">
                      <Card className="p-2 sm:p-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg rounded-xl border-0">
                        <div className="flex items-center gap-2">
                          <Leaf className="w-4 h-4 flex-shrink-0" />
                          <p className="text-xs">
                            <strong>50+ Topics</strong> — Climate, energy, nature & more!
                          </p>
                        </div>
                      </Card>
                      <Card className="p-2 sm:p-2.5 bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg rounded-xl border-0">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 flex-shrink-0" />
                          <p className="text-xs">
                            <strong>Smart AI</strong> — Context-aware responses!
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
