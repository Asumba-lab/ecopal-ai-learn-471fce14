import { 
  Sun, Factory, ThermometerSun, Car, Leaf, Waves, Mountain, Flame, Globe, Zap,
  type LucideIcon 
} from "lucide-react";

export interface LessonData {
  id: number;
  title: string;
  icon: LucideIcon;
  content: string;
  keyFacts: string[];
  didYouKnow?: string;
}

export const lessonContent: LessonData[] = [
  {
    id: 1,
    title: "What is the Greenhouse Effect?",
    icon: Sun,
    content: `The greenhouse effect is a natural process that warms Earth's surface. When the Sun's energy reaches Earth's atmosphere, some of it is reflected back to space and the rest is absorbed and re-radiated by greenhouse gases.

**How it works:**
1. **Solar radiation** enters Earth's atmosphere as visible light and ultraviolet rays
2. About **30%** is reflected back to space by clouds, ice, and other reflective surfaces (this is called Earth's albedo)
3. The remaining **70%** is absorbed by the land, oceans, and atmosphere
4. Earth radiates this energy back as **infrared radiation (heat)**
5. **Greenhouse gases** trap some of this heat, keeping Earth warm enough to support life
6. The trapped heat **re-radiates** in all directions, warming the lower atmosphere and surface

Without the natural greenhouse effect, Earth's average temperature would be about **-18°C (0°F)** instead of the current **15°C (59°F)**. That's a difference of 33°C!

**The Glass Greenhouse Analogy:**
Just like a glass greenhouse lets sunlight in but traps warmth inside, our atmosphere allows solar radiation through but prevents heat from escaping freely. The glass panels act like greenhouse gases — transparent to incoming light but opaque to outgoing heat.`,
    keyFacts: [
      "The greenhouse effect is essential for life on Earth",
      "It's named after how greenhouse buildings trap heat",
      "The effect has kept Earth habitable for billions of years",
      "Venus has a runaway greenhouse effect — its surface is 462°C!"
    ],
    didYouKnow: "Mars has a very thin atmosphere with little greenhouse effect, making its average temperature -65°C. Earth sits in a 'Goldilocks zone' partly thanks to its greenhouse gases."
  },
  {
    id: 2,
    title: "Greenhouse Gases Explained",
    icon: Factory,
    content: `Greenhouse gases are molecules in Earth's atmosphere that trap heat. The main greenhouse gases are:

**Carbon Dioxide (CO₂) - 76% of emissions**
- Released by burning fossil fuels, deforestation, and cement production
- Stays in atmosphere for 300-1,000 years
- Current level: ~421 ppm (highest in 3 million years)
- Responsible for most human-caused warming

**Methane (CH₄) - 16% of emissions**
- 80x more potent than CO₂ over 20 years
- Sources: livestock digestion, landfills, rice paddies, natural gas leaks
- Stays in atmosphere for ~12 years
- Concentrations have more than doubled since pre-industrial times

**Nitrous Oxide (N₂O) - 6% of emissions**
- 300x more warming potential than CO₂
- Sources: agriculture (fertilizers), industrial processes, combustion
- Stays in atmosphere for ~114 years
- Also depletes the ozone layer

**Fluorinated Gases (F-gases) - 2% of emissions**
- Synthetic gases used in refrigeration, air conditioning, electronics
- Can be thousands of times more potent than CO₂
- Some last tens of thousands of years in atmosphere
- Small amounts but extreme warming impact

**Water Vapor (H₂O) - Natural amplifier**
- Most abundant greenhouse gas by volume
- Acts as a feedback: warming → more evaporation → more water vapor → more warming
- Humans don't directly emit significant water vapor, but we trigger the feedback loop`,
    keyFacts: [
      "CO₂ levels are 50% higher than pre-industrial times",
      "Methane is responsible for 30% of global warming since pre-industrial times",
      "Water vapor is actually the most abundant greenhouse gas but acts as a feedback",
      "One molecule of SF₆ (a fluorinated gas) traps as much heat as 23,500 molecules of CO₂"
    ],
    didYouKnow: "A single cow produces about 100 kg of methane per year. With 1 billion cattle worldwide, livestock alone contribute significantly to global methane emissions."
  },
  {
    id: 3,
    title: "Natural vs Enhanced Greenhouse Effect",
    icon: ThermometerSun,
    content: `**Natural Greenhouse Effect**
The natural greenhouse effect is what makes Earth habitable. For millions of years, greenhouse gas concentrations remained relatively stable through natural carbon cycles, maintaining comfortable temperatures for life.

**Enhanced Greenhouse Effect (Climate Change)**
Since the Industrial Revolution (~1750), human activities have dramatically increased greenhouse gas concentrations:

| Gas | Pre-industrial | Current | Increase |
|-----|---------------|---------|----------|
| CO₂ | 280 ppm | 421 ppm | +50% |
| CH₄ | 700 ppb | 1,900 ppb | +170% |
| N₂O | 270 ppb | 335 ppb | +24% |

**The Result:**
- Average global temperature has risen **1.1°C** since 1850
- Rate of warming is **unprecedented** in at least 2,000 years
- Oceans have absorbed **90%** of the excess heat
- Sea levels have risen **20cm** since 1900
- Arctic sea ice has declined **40%** since 1979

**The Hockey Stick Graph:**
When scientists plot temperature over the past 2,000 years, temperatures were relatively flat until around 1900, then shoot upward dramatically — looking like a hockey stick. This clearly shows the human influence.

**Speed of Change:**
Natural climate shifts (like ice ages) happen over thousands of years. Current warming is happening over decades — roughly 10 times faster than any natural warming period in Earth's history.`,
    keyFacts: [
      "Human activities release ~40 billion tons of CO₂ annually",
      "The last time CO₂ was this high, sea levels were 15-25 meters higher",
      "We're warming 10x faster than any ice-age recovery",
      "The 10 warmest years on record have all occurred since 2010"
    ],
    didYouKnow: "Ice cores from Antarctica allow scientists to measure CO₂ levels going back 800,000 years. Current levels are far beyond anything in that entire record."
  },
  {
    id: 4,
    title: "Sources of Greenhouse Gas Emissions",
    icon: Car,
    content: `Understanding where emissions come from helps us identify solutions:

**By Sector (Global):**
🔌 **Electricity & Heat: 25%**
- Burning coal, natural gas, oil for power generation
- Largest single source of emissions
- Coal alone accounts for 40% of energy-related CO₂

🏭 **Industry: 21%**
- Manufacturing, construction, mining
- Cement production alone = 8% of global CO₂
- Steel production = 7% of global emissions
- Chemical manufacturing adds significant N₂O

🚗 **Transportation: 16%**
- Cars and trucks: 11.9% of total
- Aviation: 2.5% (but growing fast)
- Shipping: 1.7%
- Rail: 0.4%

🏠 **Buildings: 18%**
- Heating and cooling (40% of building energy)
- Lighting and appliances
- Hot water and cooking
- Embodied carbon in construction materials

🌾 **Agriculture & Land Use: 20%**
- Livestock methane: 5.8%
- Rice cultivation: 1.5%
- Fertilizer use: 1.3%
- Deforestation: 6-11%
- Soil degradation releases stored carbon

**By Country (Top 5 Emitters):**
1. 🇨🇳 China - 27% (but also largest renewable investor)
2. 🇺🇸 United States - 11% (highest per-capita among major economies)
3. 🇮🇳 India - 6.6% (but very low per-capita)
4. 🇪🇺 European Union - 6.4% (declining steadily)
5. 🇷🇺 Russia - 4.7% (heavily fossil-fuel dependent)

**Per-Capita Perspective:**
When we look at emissions per person, the picture changes dramatically. An average American emits ~15 tons CO₂/year, while an average Indian emits ~2 tons. The global average is ~4.7 tons.`,
    keyFacts: [
      "The richest 10% of people cause 50% of emissions",
      "Food systems account for 26% of global emissions",
      "Aviation is only 2.5% but growing rapidly",
      "Just 100 companies are responsible for 71% of industrial emissions"
    ],
    didYouKnow: "If the global food system were a country, it would be the world's third-largest emitter after China and the United States."
  },
  {
    id: 5,
    title: "Climate Impacts Around the World",
    icon: Waves,
    content: `Climate change affects every region, but impacts vary dramatically:

**Rising Sea Levels**
- Current rise: 3.4 mm/year (accelerating)
- By 2100: projected 0.3-1.0 meters rise
- 900 million people live in low-lying coastal zones
- Small island nations face existential threats
- Major cities at risk: Miami, Shanghai, Mumbai, Jakarta

**Extreme Weather Events**
🌀 **Hurricanes & Cyclones:** Intensifying — Category 4-5 storms have increased 25-30%
🔥 **Wildfires:** Fire season is 78 days longer globally than in 1970s
🌊 **Flooding:** Extreme rainfall events have increased 30% since 1950
☀️ **Heat waves:** 5x more likely now than in 1900

**Ecosystem Disruption**
- **Coral Reefs:** 50% lost since 1950; could reach 90% loss at 1.5°C warming
- **Arctic:** Permafrost thawing releases stored methane and CO₂
- **Forests:** Amazon approaching tipping point — could become savanna
- **Oceans:** 30% more acidic since pre-industrial times, threatening marine life

**Human Impact**
- **Food security:** Crop yields declining in many regions
- **Water scarcity:** Glaciers (freshwater source for 2 billion people) are melting
- **Health:** Heat-related deaths increasing; tropical diseases spreading to new areas
- **Migration:** 216 million climate migrants projected by 2050
- **Conflict:** Resource scarcity increases risk of instability`,
    keyFacts: [
      "Climate disasters have increased 5-fold in the last 50 years",
      "3.3-3.6 billion people live in highly vulnerable contexts",
      "The Great Barrier Reef has experienced 6 mass bleaching events since 1998",
      "By 2050, over 1 billion people could face water scarcity"
    ],
    didYouKnow: "The 2023 Canadian wildfires burned over 18 million hectares — an area larger than Greece — and sent smoke across the Atlantic to Europe."
  },
  {
    id: 6,
    title: "Climate Tipping Points",
    icon: Mountain,
    content: `Tipping points are critical thresholds where small changes trigger large, often irreversible shifts in Earth's climate system.

**What Are Tipping Points?**
Think of a ball balanced on a hill. A small push (gradual warming) can send it rolling down the other side — once it starts, you can't easily stop it. Climate tipping points work the same way.

**Major Tipping Points Scientists Monitor:**

🧊 **Greenland Ice Sheet Collapse** (threshold: ~1.5°C)
- Contains enough ice to raise sea levels by 7.2 meters
- Already losing 270 billion tons of ice per year
- Could take centuries but may become irreversible soon

🧊 **West Antarctic Ice Sheet** (threshold: ~1.5-2°C)
- Could raise sea levels by 3.3 meters
- Marine ice sheet instability already observed
- "Point of no return" may have already been crossed

🌳 **Amazon Rainforest Dieback** (threshold: 20-25% deforestation)
- Currently at ~17% deforested
- Could transition from carbon sink to carbon source
- Would release 50+ years of stored carbon

❄️ **Arctic Permafrost Thaw** (threshold: ~1.5°C)
- Stores 1,500 billion tons of carbon (twice atmosphere's CO₂)
- Thawing accelerates — creating a feedback loop
- Releases both CO₂ and methane

🌊 **Atlantic Ocean Circulation (AMOC)** (threshold: uncertain)
- Gulf Stream system that warms Europe
- Has weakened 15% since mid-20th century
- Collapse would drastically cool Europe, shift monsoons

**The Domino Effect:**
Tipping points can trigger each other. Ice sheet collapse → sea level rise → coastal flooding. Amazon dieback → less rainfall → more forest loss. This "tipping cascade" is what scientists fear most.`,
    keyFacts: [
      "Scientists have identified at least 16 major climate tipping points",
      "At 1.5°C warming, we risk triggering 4 tipping points",
      "At 2°C warming, we risk triggering 6+ tipping points",
      "Some tipping points may take centuries to fully unfold but become irreversible much sooner"
    ],
    didYouKnow: "The Atlantic Ocean circulation (AMOC) shut down about 12,000 years ago during the last ice age, plunging Europe into extreme cold within just a few decades. Scientists worry it could happen again."
  },
  {
    id: 7,
    title: "The Carbon Budget",
    icon: Flame,
    content: `The carbon budget is the total amount of CO₂ we can still emit while keeping warming below a specific target.

**What Is a Carbon Budget?**
Think of it like a bank account of pollution. We have a limited amount of CO₂ we can "spend" before crossing dangerous warming thresholds. Once it's used up, any additional emissions push us past the limit.

**The Numbers (as of 2024):**

| Target | Remaining Budget | Years Left (at current rate) |
|--------|-----------------|------------------------------|
| 1.5°C (67% chance) | ~250 Gt CO₂ | ~6 years |
| 1.5°C (50% chance) | ~400 Gt CO₂ | ~10 years |
| 2.0°C (67% chance) | ~1,150 Gt CO₂ | ~28 years |

Current annual emissions: ~40 Gt CO₂/year

**Historical Emissions:**
Since 1850, humanity has emitted approximately **2,500 Gt of CO₂**:
- Developed nations used most of the historical budget
- The US alone has emitted ~25% of all historical CO₂
- Europe has emitted ~22%
- This raises important questions about climate justice

**Carbon Budget Fairness:**
- If we divide the remaining 1.5°C budget equally among 8 billion people, each person gets ~30 tons
- An average American currently emits 15 tons/year — using their share in 2 years
- An average person in sub-Saharan Africa emits ~0.5 tons/year

**What This Means:**
- Every ton of CO₂ matters
- Delays make the transition harder and more expensive
- Early action preserves more options
- We need both rapid cuts AND carbon removal`,
    keyFacts: [
      "At current rates, the 1.5°C carbon budget could be exhausted by 2030",
      "Every 0.1°C of warming matters — impacts scale non-linearly",
      "Delaying action by even 5 years dramatically reduces our chances of staying below 1.5°C",
      "Historical emitters have a moral responsibility — this is called 'climate debt'"
    ],
    didYouKnow: "If we started reducing emissions in 2000, we would have needed only 3% annual cuts to stay under 1.5°C. Starting now requires 10%+ annual cuts — the delay has made the task much harder."
  },
  {
    id: 8,
    title: "Solutions & Taking Action",
    icon: Leaf,
    content: `We have the tools to address climate change. Here's what works:

**Energy Transition**
☀️ Solar power costs have dropped **89%** since 2010
💨 Wind power is now cheapest electricity in most regions
⚡ Electric vehicles are reaching price parity with gas cars
🔋 Battery costs have fallen **97%** since 1991
🏗️ Green hydrogen emerging for heavy industry

**Natural Solutions**
🌳 Forests absorb 2.6 billion tons of CO₂ yearly
🌊 Mangroves store 3-5x more carbon than land forests
🌱 Regenerative agriculture can sequester carbon in soil
🪸 Seagrass meadows capture carbon 35x faster than rainforests
🌍 Restoring degraded land could absorb 5 Gt CO₂/year

**Technology & Innovation**
🔬 Direct air capture (DAC) technology advancing rapidly
📊 Carbon pricing active in 45+ countries
🏘️ Net-zero buildings becoming standard in new construction
🍖 Alternative proteins reducing livestock emissions
♻️ Circular economy reducing waste and virgin material use

**Individual Actions That Matter:**
1. **Diet** — Plant-rich diet can cut food emissions 50-70%
2. **Transport** — One transatlantic flight = 1.6 tons CO₂; choose trains when possible
3. **Energy** — Switch to renewable electricity provider
4. **Consumption** — Buy less, choose durable goods, repair and reuse
5. **Finance** — Move money to sustainable banks and investments
6. **Voice** — Voting, advocacy, and community action multiply your impact 10-100x

**The Path Forward:**
To limit warming to 1.5°C, we need to:
- Cut emissions **45%** by 2030 (from 2010 levels)
- Reach **net-zero** by 2050
- Remove **billions of tons** of CO₂ from atmosphere
- Invest **$4 trillion/year** in clean energy by 2030
- Phase out coal by 2040, oil and gas by 2050`,
    keyFacts: [
      "Renewable energy now provides 30% of global electricity",
      "Climate solutions could create 65 million new jobs by 2030",
      "Every $1 invested in climate adaptation saves $4-10 in damages",
      "The clean energy transition is the largest economic opportunity in history"
    ],
    didYouKnow: "In 2023, for the first time, global investment in clean energy exceeded $1.8 trillion — surpassing fossil fuel investment. The transition is accelerating faster than most predictions."
  }
];
