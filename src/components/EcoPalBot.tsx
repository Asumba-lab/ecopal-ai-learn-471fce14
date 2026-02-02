import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Bot, User, Lightbulb, MessageCircle, RotateCcw, Leaf, Zap, Droplets, TreePine, Recycle, Wind, Sun, Car, Sparkles, Compass, TrendingUp, Trophy, Target, Star, Flame, Award, BookOpen, CheckCircle2, Circle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import ecopalMascot from "@/assets/ecopal-mascot.jpg";
import { useEcoPalMemory } from "@/hooks/useEcoPalMemory";

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

// Comprehensive Environmental Knowledge Base - Multi-Source Expert Knowledge
// Sources: IPCC Reports, NASA Climate, NOAA, EPA, UN Environment, Nature Journal, Science Daily, 
// World Resources Institute, Carbon Brief, Our World in Data, National Geographic, WWF, IUCN
const comprehensiveKnowledge: Record<string, string[]> = {
  // ========================
  // RENEWABLE ENERGY (Sources: IRENA, IEA, NREL, MIT Energy Initiative)
  // ========================
  "renewable energy": [
    "Renewable energy comes from naturally replenishing sources: solar, wind, hydro, geothermal, and biomass. Unlike fossil fuels, they produce minimal greenhouse gases and never run out. (Source: U.S. Energy Information Administration) 🌱",
    "Solar costs dropped 89% since 2010, wind by 70%. Renewables are now the cheapest power source in most regions, generating 30% of global electricity in 2023. (Source: IRENA Renewable Power Generation Costs 2023) ⚡",
    "The clean energy sector employs 14.7 million people worldwide (2023), expected to reach 42 million by 2050. Key benefits: energy independence, stable costs, cleaner air, and climate protection. (Source: IEA World Energy Outlook) 🌍",
    "Challenges include intermittency (solved by batteries + smart grids), grid integration, and upfront costs. But battery storage costs fell 90% in a decade! Global renewable capacity additions reached 507 GW in 2023. (Source: Bloomberg NEF) 🔋"
  ],
  "solar energy": [
    "Solar panels use photovoltaic cells to convert sunlight directly into electricity through the photoelectric effect. Modern monocrystalline panels achieve 20-23% efficiency and last 25-30 years with minimal maintenance. (Source: NREL Solar Efficiency Chart 2024) ☀️",
    "Types include rooftop residential (5-10kW), commercial (100kW-1MW), and utility-scale farms (100MW+). Concentrated Solar Power (CSP) uses mirrors to focus sunlight for thermal energy storage. (Source: DOE Solar Energy Technologies Office) 🏭",
    "Net metering lets you sell excess energy back to the grid. With battery storage, you can achieve energy independence. Solar + storage systems can provide 24/7 clean power. (Source: Solar Energy Industries Association) 🔋",
    "Solar works globally—Germany, with limited sunshine, gets 12% of electricity from solar. Global solar capacity reached 1,419 GW in 2023. Costs: $0.03-0.05/kWh for utility-scale—cheaper than coal! (Source: IEA Renewables 2024) 💰"
  ],
  "wind energy": [
    "Wind turbines convert kinetic energy from moving air into electricity through electromagnetic induction. Modern onshore turbines stand 120-180m tall with 50-80m blades, generating 3-6MW each. (Source: WindEurope) 💨",
    "Offshore wind is 40% more efficient due to stronger, consistent ocean winds. The world's largest offshore turbine (Vestas V236) generates 15MW—enough for 20,000 homes! (Source: Global Wind Energy Council 2024) 🌊",
    "Denmark leads with 55% wind electricity (2023), followed by Ireland (36%), UK (29%), and Germany. Wind employs 1.4 million people globally. Global capacity: 1,021 GW. (Source: IRENA Statistics 2024) 👷",
    "Wildlife concerns are addressed through careful siting, radar systems to stop turbines during bird migrations, and painted blades (70-80% fewer bird deaths). Properly sited wind farms have minimal ecological impact. (Source: Journal of Applied Ecology) 🦅"
  ],
  "hydroelectric": [
    "Hydropower is the largest renewable source (15% of global electricity, 1,392 GW capacity), using flowing water through turbines. It's highly efficient at 90%+ conversion rate. (Source: International Hydropower Association 2024) 💧",
    "Types: conventional dams (store water), run-of-river (minimal storage), pumped hydro storage (world's largest battery, 94% of global storage). Norway gets 95% of power from hydro! (Source: IEA Hydropower) 🇳🇴",
    "New technologies: small modular hydro (<10MW), in-pipe turbines (water mains generate power), marine energy (tidal, wave, OTEC) is emerging for coastal areas. (Source: NREL Marine Energy) 🌊",
    "Environmental considerations—dams affect fish migration and river ecosystems—but modern solutions include fish ladders, environmental flows, and run-of-river designs that minimize impact. (Source: The Nature Conservancy) 🐟"
  ],
  "geothermal": [
    "Geothermal taps Earth's internal heat (temperatures reach 6,000°C at the core) from volcanic activity, hot springs, or deep drilling. Provides reliable 24/7 baseload power with 90%+ capacity factor. (Source: Geothermal Energy Association) 🌋",
    "Iceland gets 66% of primary energy from geothermal! Other leaders: Kenya (47% electricity), Philippines (27%), El Salvador (26%). Global capacity: 16.1 GW, potential: 200+ GW. (Source: ThinkGeoEnergy 2024) 🇮🇸",
    "Enhanced Geothermal Systems (EGS) can work anywhere by fracturing hot dry rock 3-10km deep. This could unlock 100x more potential than conventional geothermal—enough to power entire countries. (Source: DOE FORGE Project) 🔥",
    "Beyond electricity: district heating, greenhouses, aquaculture, food drying, lithium extraction. Reykjavik heats 95% of buildings geothermally. Geothermal heat pumps work everywhere for building heating/cooling. (Source: EGEC) 🏠"
  ],
  "green hydrogen": [
    "Green hydrogen is produced by splitting water molecules (H₂O → H₂ + O₂) using renewable electricity through electrolysis. It produces zero emissions and can store energy for months. (Source: IRENA Green Hydrogen Report) ⚡💧",
    "Applications for hard-to-decarbonize sectors: steel production (replacing coking coal), shipping (ammonia fuel), aviation (synthetic fuels), long-duration energy storage, and fertilizer production. (Source: IEA Hydrogen) 🚢✈️",
    "Current cost: $3-6/kg, projected to hit $1-2/kg by 2030 with scale. The EU plans 40GW electrolyzer capacity by 2030. US Inflation Reduction Act offers $3/kg tax credit for green H2. (Source: Hydrogen Council) 📉",
    "Blue hydrogen (from natural gas with 90% carbon capture) serves as a bridge. Green hydrogen is the end goal for true net-zero. Global electrolyzer capacity: 1.4 GW (2023), projected 175 GW by 2030. (Source: BloombergNEF) 🎯"
  ],
  "nuclear energy": [
    "Nuclear power provides 10% of global electricity from 440 reactors in 32 countries. It's the second-largest source of low-carbon electricity after hydro. France gets 70% of power from nuclear. (Source: World Nuclear Association 2024) ⚛️",
    "Modern reactors have excellent safety records—fewer deaths per TWh than any other energy source including solar and wind. New Gen III+ and Gen IV designs are even safer with passive safety systems. (Source: Our World in Data Energy Safety) 🛡️",
    "Small Modular Reactors (SMRs) are emerging: 300MW units, factory-built, lower upfront costs, flexible deployment. 80+ designs under development globally. First commercial SMRs operational by 2028. (Source: IAEA SMR Booklet) 🏭",
    "Nuclear fusion (ITER project) could provide unlimited clean energy by 2050s. Recent breakthroughs: NIF achieved fusion ignition (2022), private companies racing to commercialize. (Source: ITER Organization, DOE Fusion) ☀️"
  ],
  
  // ========================
  // CLIMATE SCIENCE (Sources: IPCC AR6, NASA GISS, NOAA, Met Office, Carbon Brief)
  // ========================
  "climate change": [
    "Climate change refers to long-term shifts in global temperatures and weather patterns. Since 1880, Earth has warmed 1.2°C (2.2°F), with most warming since 1975. The last decade was the warmest on record. (Source: NASA GISS 2024) 🌡️",
    "Human activities cause 100% of observed warming. Burning fossil fuels released 37.4 billion tons of CO2 in 2023. CO2 levels: 280ppm (pre-industrial) → 424ppm today—highest in 4 million years. (Source: NOAA Global Monitoring Lab) 📈",
    "Observed effects: sea levels up 21cm since 1880, Arctic sea ice down 13%/decade, glaciers retreating globally, extreme weather 5x more frequent, ecosystem shifts, earlier springs. (Source: IPCC AR6 WG1 2021) 🌊🔥",
    "Solutions from IPCC: achieve net-zero by 2050, triple renewable capacity by 2030, phase out unabated fossil fuels, protect forests, electrify transport, shift to sustainable food systems. Cost: 1-2% of global GDP. (Source: IPCC AR6 WG3 2022) 🌱"
  ],
  "greenhouse effect": [
    "The greenhouse effect is essential for life—without it, Earth would be -18°C (-0.4°F)! Gases like CO2, methane, and water vapor trap infrared radiation from the sun, keeping the planet warm. (Source: NASA Climate) ☀️",
    "Human activities have enhanced this effect by 50% since pre-industrial times. Current radiative forcing: +2.72 W/m² (2019). CO2 contributes 66%, methane 16%, nitrous oxide 7%, halocarbons 11%. (Source: IPCC AR6 WG1) 📊",
    "CO2 stays in atmosphere 300-1000 years, methane 12 years (but 80x more potent short-term), nitrous oxide 109 years (273x more potent). Each gas requires different solutions. (Source: IPCC AR6, EPA) ⏰",
    "Water vapor is the most abundant greenhouse gas but acts as a feedback—as temperatures rise, more evaporation, more warming. Clouds have both warming and cooling effects, a key area of climate research. (Source: NASA CERES) ☁️"
  ],
  "carbon footprint": [
    "Your carbon footprint is total greenhouse gases from your activities, measured in CO2 equivalent (CO2e). Average American: 14.7 tons/year; EU: 6.8 tons; global average: 4.7 tons; sustainable target: 2 tons. (Source: Global Carbon Project 2024) 👣",
    "Breakdown varies by lifestyle. Typical American: transportation (29%), housing (25%), food (14%), goods (12%), services (20%). Biggest wins come from the biggest categories—focus there first. (Source: CoolClimate Network, UC Berkeley) 📊",
    "Top individual actions (tons CO2e/year saved): live car-free (2.4), avoid one transatlantic flight (1.6), buy renewable electricity (1.5), plant-rich diet (0.8), upgrade to EV (0.5). (Source: Environmental Research Letters, Wynes & Nicholas 2017) ✈️🚗🏠🥗",
    "But individual action alone isn't enough—we need systemic change. Support climate policies, divest from fossil fuels, choose sustainable companies, vote for climate leaders, use your voice. Collective action multiplies impact. (Source: Nature Climate Change) 🌍"
  ],
  "net zero": [
    "Net zero means balancing CO2 emissions with CO2 removal—not necessarily zero emissions, but emissions equal removals. Global emissions must fall 45% by 2030 and reach net-zero by 2050 for 1.5°C. (Source: IPCC SR15) ⚖️",
    "151 countries have net-zero targets covering 92% of global GDP. Targets: EU (2050), US (2050), UK (2050), Japan (2050), China (2060), India (2070). Only 41 countries are 'almost sufficient' on track. (Source: Net Zero Tracker, Climate Action Tracker 2024) 🌐",
    "Achieving net-zero requires: 90% emissions cuts through efficiency, renewables, electrification, plus 10% removal via forests, soil carbon, direct air capture, enhanced weathering. (Source: IEA Net Zero Roadmap 2023) 🌲🔧",
    "Science is clear: every 0.1°C of additional warming increases risks. At 1.5°C: 70-90% coral reef loss. At 2°C: 99% loss. Hundreds of millions more exposed to extreme heat. The math demands urgency. (Source: IPCC AR6 WG2) 📉"
  ],
  "ocean acidification": [
    "Oceans have absorbed 30% of human CO2 emissions (560 billion tons since 1800), making them 30% more acidic. pH dropped from 8.2 to 8.1—sounds small but it's logarithmic, a huge chemical change. (Source: NOAA PMEL) 🌊",
    "Effects: shellfish struggle to build calcium carbonate shells, coral bleaching accelerates, pteropods (sea butterflies) are dissolving, fish behavior affected. Called 'climate change's equally evil twin.' (Source: IPCC Ocean Report 2019) 🐚",
    "Arctic and Southern Oceans are most vulnerable—cold water absorbs more CO2 and is already approaching undersaturation for aragonite (key shell mineral). Some areas may become corrosive within decades. (Source: Nature Climate Change) ❄️",
    "Solutions: cut CO2 emissions (the only permanent fix), protect and restore marine ecosystems (seagrass, kelp sequester carbon), reduce other ocean stressors (pollution, overfishing). (Source: IPCC, IUCN Ocean Deox) 🔬"
  ],
  "tipping points": [
    "Climate tipping points are thresholds where small changes trigger large, often irreversible shifts in Earth systems. Research identifies 16 major tipping elements, 5 already at risk with current 1.2°C warming. (Source: Science, Armstrong McKay et al. 2022) ⚠️",
    "At risk now: Greenland ice sheet (sea level +7m), West Antarctic ice sheet (+5m), Amazon rainforest dieback, low-latitude coral reef die-off, permafrost collapse. Each has multi-century timescales but may be triggered soon. (Source: Nature 2022) 🌍",
    "Beyond 1.5°C: additional risks include boreal permafrost collapse, Labrador-Irminger Sea circulation shift, Amazon southern dieback. Beyond 2°C: East Antarctic ice sheet, Arctic winter sea ice loss. (Source: IPCC AR6) 📊",
    "Tipping cascades: one tipping point can trigger others—like dominos. Greenland melt could slow Atlantic circulation, changing rainfall patterns globally. This interconnection is why limiting warming matters. (Source: PNAS) ⏰"
  ],
  "sea level rise": [
    "Global sea levels rose 21-24cm since 1880, with rate accelerating: 1.4mm/year (1901-1990) → 3.7mm/year (2006-2018). Currently rising ~4.4mm/year. Thermal expansion + ice melt both contribute. (Source: NASA Sea Level Portal) 🌊",
    "Projections by 2100: 0.3-0.6m (low emissions) to 0.6-1.1m (high emissions). Some studies suggest up to 2m possible if ice sheet instabilities trigger. Sea level will continue rising for centuries even if emissions stop. (Source: IPCC AR6) 📈",
    "Impacts: 1 billion people live in low-elevation coastal zones. Cities at risk: Miami, Shanghai, Mumbai, Bangkok, New York. Many Pacific island nations face existential threat. (Source: Climate Central) 🏙️",
    "Adaptation: sea walls, managed retreat, nature-based solutions (mangroves, marshes), improved drainage, building codes. The Netherlands shows adaptation is possible but expensive—they spend €1.3B/year. (Source: Delta Programme) 🌴"
  ],
  "extreme weather": [
    "Climate change is making extreme weather more frequent and intense. Heat waves: 5x more common. Heavy rainfall events: up 30%. Wildfire conditions: 2x worse. Hurricane intensity: increasing. (Source: Carbon Brief Attribution Database) 🔥🌀",
    "Attribution science now links specific events to climate change. 2023 examples: European heatwave 'virtually impossible' without climate change, Canadian wildfires 2x more likely, Libyan floods far more intense. (Source: World Weather Attribution) 📊",
    "Costs mounting: 2023 saw 28 billion-dollar disasters in US alone ($92.9B total). Global weather disasters cost $280+ billion annually, up 250% from 1980s average. (Source: NOAA NCEI, Munich Re) 💰",
    "Adaptation crucial: early warning systems, resilient infrastructure, nature-based solutions, updated building codes, climate-smart agriculture, emergency preparedness. Prevention is always cheaper than response. (Source: UNDRR) 🛡️"
  ],
  
  // ========================
  // SUSTAINABLE LIVING (Sources: EPA, UN Environment, Project Drawdown, Ellen MacArthur Foundation)
  // ========================
  "sustainable living": [
    "Sustainable living means meeting present needs without compromising future generations' ability to meet theirs. It spans energy, food, transport, consumption, waste, and community. (Source: UN Brundtland Commission) 🌱",
    "Key principles from circular economy: refuse unnecessary consumption, reduce what you need, reuse through sharing/renting, repair before replacing, recycle as last resort. Quality over quantity always. (Source: Ellen MacArthur Foundation) ♻️",
    "Home actions: LED lighting (75% energy savings), smart thermostats (10-15% savings), water-efficient fixtures (30% savings), proper insulation (25% energy cut), renewable energy (100% clean). (Source: ENERGY STAR, DOE) 🏠",
    "Systemic change matters most: support climate policies, vote for environmental leaders, choose sustainable companies, divest from fossil fuels, engage your workplace. Individual + collective action together. (Source: Nature Climate Change) 🗳️"
  ],
  "zero waste": [
    "Zero waste philosophy aims to redesign products and systems so nothing goes to landfill or incineration—everything is reused, composted, or truly recycled. It's circular, not linear. (Source: Zero Waste International Alliance) ♻️",
    "The 5 R's in order: Refuse (say no to unnecessary stuff), Reduce, Reuse, Recycle, Rot (compost). Order matters—prevention beats recycling by 10x in environmental impact. (Source: Zero Waste Europe) 🚫",
    "Practical steps: reusable bags/bottles/containers, package-free shopping, composting (30% of waste is food), repair cafes, buy secondhand, choose durable goods, digital over physical. (Source: EPA Waste Reduction) 🛒",
    "Cities achieving high diversion: San Francisco 80%, Seoul 70%, Ljubljana 65%. Kamikatsu, Japan aims for 100%. Companies like Subaru have zero-landfill factories. It's achievable at scale! (Source: C40 Cities) 🏙️"
  ],
  "circular economy": [
    "Circular economy eliminates waste by designing products for durability, reuse, remanufacturing, and recycling—keeping materials at highest value as long as possible. (Source: Ellen MacArthur Foundation) 🔄",
    "Three principles: design out waste and pollution, keep products and materials in use, regenerate natural systems. Contrasts with linear 'take-make-dispose' that generates 2 billion tons of waste annually. (Source: World Bank What a Waste 2.0) 💪",
    "Business models: product-as-service (Philips lighting), take-back programs (Apple Trade-In), remanufacturing (Caterpillar—saves 80% energy), sharing platforms (car sharing). Profitable and sustainable. (Source: Accenture) 📱",
    "Economic opportunity: circular economy could generate $4.5 trillion in economic benefits by 2030, create 700,000 jobs in EU alone, reduce virgin material use by 32%. (Source: Accenture, EU Circular Economy Package) 💰"
  ],
  "sustainable fashion": [
    "Fashion produces 8-10% of global carbon emissions—more than aviation and shipping combined! The industry also uses 215 trillion liters of water annually and creates 92 million tons of textile waste. (Source: UN Environment, Ellen MacArthur Foundation) 👗",
    "Problems: fast fashion encourages 80 billion new garments/year (400% more than 20 years ago), synthetic fibers release 500,000 tons of microplastics annually, toxic dyes pollute waterways in production countries. (Source: Quantis, Nature Reviews) 🚰",
    "Solutions: buy less but better quality, choose natural/organic fibers (organic cotton, linen, hemp), secondhand shopping (market growing 25%/year), clothing rental, repair and mend, responsible disposal. (Source: ThredUp Resale Report 2024) 🧵",
    "Look for certifications: GOTS (organic textiles), OEKO-TEX (safe chemicals), Fair Trade (worker rights), B Corp (overall sustainability), Cradle to Cradle (circular design). Transparency tools: Fashion Revolution, Good On You. (Source: Textile Exchange) 🏷️"
  ],
  
  // ========================
  // TRANSPORTATION (Sources: IEA Transport, ICCT, Transport & Environment)
  // ========================
  "electric vehicle": [
    "EVs are 3-4x more energy efficient than gasoline cars: 85-90% of battery energy reaches wheels vs 20-30% for internal combustion engines. Zero tailpipe emissions improve urban air quality. (Source: DOE Alternative Fuels Data Center) 🚗⚡",
    "Total lifecycle emissions 50-80% lower than gasoline cars depending on grid mix, improving as grids get cleaner. Battery manufacturing emissions 'paid back' in 6-18 months of driving. (Source: ICCT 2021 Lifecycle Analysis) 📊",
    "Costs falling rapidly: battery pack costs dropped from $1,183/kWh (2010) to $139/kWh (2023). Many EVs now cheaper to own than equivalent gas cars when including fuel and maintenance. (Source: BloombergNEF) 💰",
    "Global momentum: EV sales hit 14 million in 2023 (18% of new car sales), up from 3 million in 2020. Norway leads at 82% market share. China sold 8 million. Charging infrastructure growing rapidly. (Source: IEA Global EV Outlook 2024) 🔌"
  ],
  "sustainable transport": [
    "Transport produces 16% of global emissions (8.4 Gt CO2). Road vehicles are 75% of transport emissions. Decarbonizing requires electrification, modal shift, efficiency, and reduced travel demand. (Source: IEA Transport Sector) 🚌🚴",
    "Best strategies: public transit (1/6 emissions of driving), cycling (zero emissions + health benefits), walking, EVs, car-sharing (reduces car ownership 40%), remote work (cut commuting). (Source: ITDP, European Environment Agency) 🏙️",
    "Aviation (2.5% of global CO2) is harder to decarbonize. Solutions: fly less, sustainable aviation fuel (SAF), electric short-haul (emerging), hydrogen, high-speed rail alternatives. SAF can reduce emissions 80%. (Source: ICAO, ATAG) ✈️🚄",
    "Shipping (2.9% of global CO2) going green: wind-assisted ships, ammonia/hydrogen/methanol fuel, slow steaming (cuts emissions 30%), port electrification. IMO targets 50% reduction by 2050. First zero-emission vessels sailing. (Source: IMO, ICCT) 🚢"
  ],
  "aviation emissions": [
    "Aviation produces 2.5% of global CO2 but 3.5% of total warming impact (including contrails, NOx, water vapor). Fastest-growing emissions source pre-COVID, now rebounding. 1,034 million tons CO2 in 2022. (Source: Our World in Data, IATA) ✈️",
    "One long-haul flight can emit more than an average person in many countries emits in a year. London-New York roundtrip: ~1.8 tons CO2 per passenger. Frequent flyers (1% of population) cause 50% of emissions. (Source: ICCT, Transport & Environment) 🌍",
    "Solutions: fly less (most effective), choose direct flights (takeoff/landing is 25% of emissions), fly economy (more passengers per flight), sustainable aviation fuel (80% reduction potential), carbon offsetting (last resort). (Source: ICAO CORSIA) 🌱",
    "Future tech: electric aircraft (viable for <500km by 2030s), hydrogen (long-haul by 2040s), SAF scaling up (currently 0.1% of jet fuel, target 10% by 2030). Policy needed: kerosene taxes, flight caps, rail investment. (Source: ATAG, E4tech) ⚡"
  ],
  
  // ========================
  // NATURE & BIODIVERSITY (Sources: IPBES, WWF, IUCN Red List, UN Environment)
  // ========================
  "biodiversity": [
    "Biodiversity encompasses all life on Earth: an estimated 8.7 million species, vast genetic diversity within species, and countless ecosystems. It's the foundation of all ecosystem services humans depend on. (Source: IPBES Global Assessment 2019) 🌿",
    "Crisis scale: 1 million species threatened with extinction. Wildlife populations declined 69% since 1970 (Living Planet Index). Extinction rate 100-1000x above background rate. We're in the 6th mass extinction. (Source: WWF Living Planet Report 2022) 📉",
    "Drivers (in order of impact): land/sea use change (habitat loss), direct exploitation (hunting, fishing), climate change, pollution, invasive species. All accelerating. 75% of land and 66% of ocean significantly altered. (Source: IPBES 2019) ⚠️",
    "Why it matters: nature provides services worth $125-140 trillion/year—1.5x global GDP. This includes pollination (75% of crops), water purification, carbon storage, medicines (50% of drugs nature-derived), flood protection. (Source: Costanza et al., IPBES) 💚"
  ],
  "deforestation": [
    "We lose 10 million hectares of forest annually—size of South Korea every year. 420 million hectares lost since 1990. Primary (old-growth) forest loss is 4 million ha/year. (Source: FAO Global Forest Assessment 2020) 🌳❌",
    "Causes: agriculture expansion (80%—beef, soy, palm oil, cocoa, coffee), logging (legal and illegal), mining, infrastructure. Amazon, Congo Basin, and Southeast Asia are hotspots. (Source: WRI Global Forest Watch) 🌿",
    "Amazon rainforest at risk: 17% already deforested, approaching 20-25% tipping point where it could collapse into savanna. Would release 140 billion tons CO2 and disrupt rainfall across South America. (Source: Nature, Lovejoy & Nobre) 🌿",
    "Solutions: sustainable supply chains (zero-deforestation commitments), forest certification (FSC), indigenous land rights (indigenous areas have 36% less deforestation), payment for ecosystem services. EU deforestation regulation (2023) bans products linked to deforestation. (Source: Global Canopy, EU Regulation) 🛒"
  ],
  "coral reefs": [
    "Coral reefs cover just 0.1% of ocean floor but support 25% of all marine species—the 'rainforests of the sea.' They protect 150,000+ km of coastline and provide food for 500+ million people. Value: $9.9 trillion/year. (Source: NOAA, UNEP Coral Reef Economics) 🐠",
    "Bleaching occurs when stressed coral expel their symbiotic algae (zooxanthellae). Cause: ocean warming, even 1-2°C above normal for weeks. Mass bleaching events now 5x more frequent than 1980s. 2024 saw worst global bleaching on record. (Source: NOAA Coral Reef Watch) 🌡️",
    "Outlook: at 1.5°C warming, 70-90% of reefs will die. At 2°C warming, 99% loss. Great Barrier Reef has lost 50% of coral since 1995. Some resilient corals are being identified and propagated. (Source: IPCC SR15, AIMS) ⏰",
    "Action needed: limit warming to 1.5°C (primary solution), marine protected areas (currently 8% of ocean), reduce local stressors (pollution, overfishing, runoff), coral restoration (assisted evolution, coral gardening). (Source: IUCN, Coral Triangle Initiative) 🔬"
  ],
  "rewilding": [
    "Rewilding restores ecosystems by reintroducing native species, removing barriers, and allowing natural processes to resume. It's proactive conservation—not just protecting what remains but rebuilding what was lost. (Source: Rewilding Europe) 🦬",
    "Famous examples: wolves in Yellowstone restored riverbanks through trophic cascades; European bison in Poland's Białowieża Forest; beavers in UK creating natural flood management; condors in California; lynx in Switzerland. (Source: Monbiot 'Feral', various rewilding organizations) 🐺",
    "Benefits multiply: carbon sequestration (rewilded areas store 40% more carbon), flood prevention, water purification, erosion control, pollinator habitat, tourism economy, human wellbeing and connection to nature. (Source: IUCN Nature-based Solutions) 🌊",
    "Scale of ambition: Rewilding Europe targeting 1 million hectares. UN Decade on Ecosystem Restoration (2021-2030). 30x30 goal: protect 30% of land and ocean by 2030 (Kunming-Montreal Framework). €20 billion EU restoration law. (Source: UN, CBD, EU) 🌍"
  ],
  "pollinators": [
    "Pollinators (bees, butterflies, hummingbirds, bats, moths) enable reproduction of 75% of flowering plants and 35% of food crops. Their services worth $235-577 billion annually. (Source: IPBES Pollinator Assessment 2016) 🐝",
    "Crisis: wild bee species declining 40%+ toward extinction. Monarch butterflies down 80%. Insect biomass declining 2.5% per year (Krefeld study). Causes: pesticides (especially neonicotinoids), habitat loss, disease, climate change. (Source: Science, Biological Conservation) 📉",
    "Solutions: reduce pesticide use (EU banned some neonicotinoids), plant native flowers, create pollinator corridors, no-mow May/June, leave wild areas in gardens and farms, support organic agriculture. (Source: Xerces Society, Pollinator Partnership) 🌻",
    "Good news: when given habitat, pollinators recover quickly. Wildflower strips on farms boost yields, not just save bees. Urban gardens can be havens. Policy momentum building—EU Pollinators Initiative, Biden Executive Order. (Source: Nature Ecology & Evolution, EU Pollinators) 🌼"
  ],
  
  // ========================
  // WATER (Sources: UN Water, WHO, WRI Aqueduct, UNEP)
  // ========================
  "water conservation": [
    "Freshwater is just 2.5% of Earth's water, and 69% of that is locked in ice caps and glaciers. Only 0.3% is accessible surface freshwater. Climate change is intensifying both droughts and floods. (Source: USGS, UN Water) 💧",
    "Water use: agriculture 70% (irrigation), industry 20%, households 10%. But varies by region—in some developed countries, industry uses 60%+. Efficiency improvements can reduce agricultural water use 30-50%. (Source: FAO AQUASTAT, WRI) 🌾",
    "Home water savings: fix leaks (1 drip/second = 3,000 gallons/year), low-flow fixtures (30-50% savings), efficient appliances (ENERGY STAR washers use 33% less water), xeriscaping, rainwater harvesting. (Source: EPA WaterSense) 🚿",
    "Water stress increasing: 2 billion people lack safe drinking water, 4 billion experience severe water scarcity at least one month/year. By 2050, 5.7 billion could live in water-scarce areas. (Source: UN SDG6, WRI Aqueduct) 🔧"
  ],
  "ocean pollution": [
    "8-12 million tons of plastic enter oceans annually—a garbage truck every minute. By 2050, oceans could have more plastic than fish by weight if current trends continue. (Source: Ellen MacArthur Foundation, Ocean Conservancy) 🌊🐟",
    "Microplastics (<5mm) now found everywhere: Mariana Trench (deepest ocean), Mount Everest summit, Arctic ice cores, rainfall, human blood and placenta. Average person ingests 5 grams of plastic weekly. (Source: WWF, Environmental Science & Technology) 🔬",
    "Other major pollutants: nutrient runoff (nitrogen, phosphorus) creates 500+ dead zones; oil pollution (3 million tons/year); industrial chemicals (persistent organic pollutants); noise pollution affecting marine mammals; light pollution affecting sea turtles. (Source: UNEP Marine Litter, NOAA) ⚠️",
    "Solutions: reduce single-use plastic at source (most effective), better waste management in developing countries (80% of ocean plastic from 10 rivers), Extended Producer Responsibility, UN Global Plastics Treaty (negotiating now). (Source: Science, UNEA) 🚫"
  ],
  "wetlands": [
    "Wetlands (marshes, swamps, bogs, mangroves) are Earth's most productive ecosystems. They store 30% of land-based carbon despite covering 5-8% of land. Critical for water filtration and flood control. (Source: Ramsar Convention, IPCC) 🌿",
    "We've lost 87% of wetlands since 1700—more than any other ecosystem. Currently disappearing 3x faster than forests. Causes: drainage for agriculture, urban development, pollution, dam construction. (Source: Ramsar Global Wetland Outlook 2021) 📉",
    "Benefits: water purification (a single wetland can filter millions of gallons daily), flood buffering (coastal wetlands prevented $625 million in flood damages during Hurricane Sandy), habitat for 40% of species, carbon storage. (Source: EPA, Nature) 💚",
    "Restoration is possible and cost-effective: Florida Everglades restoration ($16B), UK Great Fen project. Constructed wetlands can treat wastewater. Mangrove restoration protects coastlines from storms and provides livelihoods. (Source: IUCN, The Nature Conservancy) 🌴"
  ],
  
  // ========================
  // FOOD & AGRICULTURE (Sources: FAO, IPCC Food, WRI, Project Drawdown)
  // ========================
  "sustainable agriculture": [
    "Food systems produce 26-34% of global emissions—not just farming but land use change, transport, processing, packaging, retail, waste. Agriculture alone is 10-12%. (Source: Nature Food, IPCC SRCCL 2019) 🌾",
    "Sustainable practices: crop rotation (reduces fertilizer need 20-30%), cover crops (prevent erosion, sequester carbon), reduced tillage (preserves soil structure), integrated pest management (cuts pesticide use 50%+), precision agriculture (optimizes inputs). (Source: FAO, Rodale Institute) 🚜",
    "Regenerative agriculture goes further: building soil organic matter (1% increase stores 8 tons carbon/hectare), increasing biodiversity, eliminating synthetic inputs, integrating livestock. Farms can become carbon sinks. (Source: Regeneration International, Carbon Underground) 🌱",
    "Agroecology combines ecological principles with farming: polycultures, beneficial insects, nitrogen-fixing plants, local varieties. Often matches or exceeds industrial yields while using less inputs and building resilience. (Source: IPES-Food, FAO Agroecology) 🧪"
  ],
  "plant based diet": [
    "Food's carbon footprint varies dramatically: beef (60kg CO2e/kg), lamb (24kg), cheese (21kg), pork (7kg), poultry (6kg), tofu (3kg), legumes (2kg), vegetables (2kg). Diet choices matter significantly. (Source: Poore & Nemecek 2018, Science) 🥩🥗",
    "Shifting to plant-rich diet can reduce food emissions 50-70% and land use 75%. Animal agriculture uses 77% of agricultural land globally for 18% of calories and 37% of protein. Huge efficiency opportunity. (Source: Our World in Data, Poore & Nemecek) 🌿",
    "You don't have to go fully vegan—flexitarian (reduced meat) diets achieve 70%+ of benefits. Mediterranean diet is healthy and lower-impact. Even replacing beef with chicken cuts emissions 50%. (Source: EAT-Lancet Commission, WRI) 🍽️",
    "Co-benefits: health (reduced heart disease, cancer, diabetes risk), water savings (beef needs 15,000L/kg vs vegetables 300L/kg), less deforestation (soy for feed drives Amazon clearing), less antibiotic resistance, animal welfare. (Source: The Lancet, WWF) 💧"
  ],
  "food waste": [
    "1/3 of all food produced globally is lost or wasted—1.3 billion tons/year worth $940 billion. If food waste were a country, it'd be the third-largest GHG emitter after China and USA. (Source: FAO, UNEP Food Waste Index 2021) 🗑️",
    "Where loss occurs varies: in developing countries, mostly at farm/transport stage (lack of infrastructure). In wealthy countries, 40% at consumer level (over-buying, confusion over date labels, aesthetic standards). (Source: FAO, WRAP UK) 📦",
    "Solutions: meal planning, proper food storage, understanding 'best by' (quality) vs 'use by' (safety), ugly produce programs, smaller portions, composting, food rescue apps (Too Good To Go, OLIO), better supply chain logistics. (Source: ReFED, WRAP) 📱",
    "Composting diverts waste from landfill where food produces methane (28x more potent than CO2). Home composting, municipal collection, anaerobic digestion all help. Food scraps become valuable soil amendment. (Source: EPA, NRDC) 🌱"
  ],
  
  // ========================
  // TECHNOLOGY & INNOVATION (Sources: DOE, IPCC, MIT, Nature journals)
  // ========================
  "carbon capture": [
    "Carbon capture, utilization, and storage (CCUS) can capture 85-95% of CO2 from industrial sources like cement (8% of emissions), steel (7%), chemicals. Essential for hard-to-abate sectors. (Source: IEA CCUS Report 2023) 🏭",
    "Types: post-combustion (capturing from flue gas—most common), pre-combustion (before burning, with hydrogen production), oxy-fuel (burning in pure oxygen). 40 large-scale facilities operate globally, capturing 45 Mt CO2/year. (Source: Global CCS Institute 2023) 🔧",
    "Direct Air Capture (DAC) pulls CO2 directly from atmosphere at 420ppm—technically harder but can address historical emissions. Leaders: Climeworks (Iceland, 36,000 tons/year), Carbon Engineering (Texas). (Source: IEA DAC Report) 💨",
    "Costs: point-source capture $50-100/ton; DAC currently $250-600/ton, target $100-150/ton by 2030. Captured CO2 stored underground in geological formations or used in products (concrete, fuels, plastics). CCUS is not a substitute for emissions cuts—it's complementary. (Source: IPCC, McKinsey) 📉"
  ],
  "smart grid": [
    "Smart grids use digital communication technology to detect, react to, and manage electricity supply and demand in real-time, enabling seamless integration of variable renewables and distributed resources. (Source: DOE Smart Grid) ⚡🖥️",
    "Key features: two-way communication (not just power but data flows), automated switching, demand response (shift consumption to match supply), real-time pricing, predictive maintenance, faster outage detection/restoration. (Source: IEA Smart Grids Report) 📊",
    "Enables: high renewable penetration (Denmark manages 50%+ wind), EV charging optimization (millions of EVs = massive battery storage), home battery coordination, virtual power plants (aggregate small resources). (Source: WindEurope, IRENA) 🔋",
    "Microgrids can island from main grid during emergencies—critical for hospitals, military, communities. Puerto Rico building microgrids after Maria. Community microgrids provide local resilience and energy democracy. (Source: NREL, Rocky Mountain Institute) 🏘️"
  ],
  "battery storage": [
    "Grid-scale battery storage solves renewable intermittency—storing excess solar/wind for when supply doesn't match demand. Global capacity: 16 GW (2022), projected 411 GW by 2030. (Source: IEA, BloombergNEF) 🔋☀️💨",
    "Technologies: lithium-ion dominates (but supply chain concerns—lithium, cobalt). Alternatives emerging: sodium-ion (cheaper, abundant), iron-air (long duration, cheap), flow batteries (zinc-bromine, vanadium—grid scale), solid-state (safer, denser). (Source: DOE, Nature Energy) 🔬",
    "Costs fell 90% in 10 years: lithium-ion from $1,100/kWh (2010) to $139/kWh (2023). Landmark projects: Hornsdale Power Reserve (Australia, 150MW/194MWh) saved grid $150M in 2 years. California adding gigawatts annually. (Source: BloombergNEF, AEMO) 💰",
    "Home batteries (Tesla Powerwall, LG RESU, Enphase) enable solar self-consumption and backup power. Vehicle-to-Grid (V2G) turns EVs into mobile storage—average EV battery (60kWh) could power home for 2 days. (Source: NREL, DOE) 🚗🏠"
  ],
  
  // ========================
  // RECYCLING & WASTE (Sources: EPA, Ellen MacArthur Foundation, World Bank)
  // ========================
  "recycling": [
    "Recycling conserves resources and energy: aluminum recycling saves 95% of energy vs virgin production, steel 60%, paper 60%, plastic 76%. But only 9% of all plastic ever produced has been recycled. (Source: EPA, Science Advances 2017) ♻️",
    "Challenges: contamination (food residue, mixed materials), low commodity prices (virgin materials often cheaper), limited markets (China's National Sword policy 2018 disrupted global recycling), wishcycling causes problems for recyclers. (Source: Resource Recycling, Waste Dive) 🚫",
    "What works well: aluminum and steel are infinitely recyclable with strong markets. Glass also infinitely recyclable. Paper can be recycled 5-7 times. Plastics complicated—#1 PET and #2 HDPE recyclable; #3-7 rarely. (Source: EPA, APR) 📦",
    "Better than recycling: refuse unnecessary items, reduce consumption, reuse through repair/sharing. Design for recyclability (mono-materials, no toxic additives). Extended Producer Responsibility makes manufacturers responsible. (Source: Ellen MacArthur Foundation, OECD EPR) 🔄"
  ],
  "plastic pollution": [
    "We produce 400+ million tons of plastic yearly—half is single-use. Only 9% is recycled, 12% incinerated, 79% accumulates in landfills or environment. Production projected to double by 2040 on current trends. (Source: OECD, UNEP) 🛢️",
    "Microplastics (<5mm) and nanoplastics now ubiquitous: ocean depths, mountain peaks, Arctic ice, rain, indoor air, human blood (77% of people), placenta, breast milk. Health impacts under active research. (Source: Environment International, PNAS) 😰",
    "Worst offenders: cigarette butts (#1 littered item), plastic bottles, food wrappers, straws, bags, fishing gear ('ghost nets' kill 136,000 marine animals/year). But also: synthetic clothing (microfiber shedding), tires. (Source: Ocean Conservancy, FAO) 🚬",
    "Solutions: UN Global Plastics Treaty (negotiating binding international law), national plastic bans, Extended Producer Responsibility, deposit-return systems, refill infrastructure, alternative materials, improved waste management in Global South. (Source: UNEA, OECD) 🌍"
  ],
  "composting": [
    "Composting transforms organic waste into nutrient-rich soil amendment through aerobic decomposition. Diverts waste from landfills where it produces methane (84x more potent than CO2 over 20 years). (Source: EPA, IPCC) 🌱",
    "Methods: backyard bin/pile (simple, free), tumbler (faster, neater), vermicomposting (worms, works indoors), Bokashi (fermentation, handles meat/dairy), hot composting (faster, kills pathogens), municipal programs. Match to your situation. (Source: Cornell Composting, Master Gardeners) 🏠",
    "What to compost: fruit/vegetable scraps, coffee grounds/filters, eggshells, yard waste, cardboard, newspaper. Avoid: meat/dairy (attract pests, unless Bokashi), diseased plants, pet waste, treated wood. Balance 'greens' (nitrogen) and 'browns' (carbon). (Source: EPA, Rodale) ☕🥚",
    "Benefits: diverts 30% of household waste, creates free fertilizer, improves soil structure (water retention +20%), increases soil carbon sequestration, reduces need for synthetic fertilizers, builds soil biodiversity. Gardens thrive! (Source: USDA, Soil Science Society) 🌻"
  ],
  "e waste": [
    "Electronic waste is the fastest-growing waste stream: 53.6 million metric tons in 2019, projected 74.7 Mt by 2030. Only 17.4% is formally recycled. Contains both valuable materials (gold, silver, copper) and hazardous substances. (Source: UN Global E-waste Monitor 2020) 📱💻",
    "Problem: short product lifespans (average smartphone: 2-3 years), difficult to repair (proprietary screws, glued batteries), planned obsolescence. When improperly disposed, toxic materials (lead, mercury, cadmium) leach into environment. (Source: WEEE Forum, iFixit) ⚠️",
    "Solutions: buy durable products, repair when possible (Right to Repair movement gaining ground—EU rules 2021), trade in or donate working devices, use certified e-waste recyclers (e-Stewards, R2). (Source: EPA, Repair.org) 🔧",
    "Policy momentum: EU Eco-design Directive requires repairability scores, replaceable batteries. France's repairability index. Right to Repair laws passing in US states. Apple, Samsung starting to offer self-repair parts. (Source: EU WEEE Directive, PIRG) ♻️"
  ],
  
  // ========================
  // POLICY & ACTION (Sources: UNFCCC, Climate Action Tracker, UNEP)
  // ========================
  "paris agreement": [
    "The Paris Agreement (2015) is a legally binding international treaty. 196 parties committed to limit warming to 'well below 2°C, pursuing 1.5°C' above pre-industrial levels. Countries set Nationally Determined Contributions (NDCs). (Source: UNFCCC) 🌍",
    "Current pledges fall short: if all 2030 NDCs implemented, warming would reach 2.4-2.6°C by 2100. Implementation gap even larger—policies in place lead to 2.7°C. (Source: Climate Action Tracker, UNEP Emissions Gap 2023) 📊",
    "Key mechanisms: 5-year Global Stocktakes (first 2023), ratcheting ambition (each NDC must be more ambitious), climate finance ($100B/year goal, finally met 2022), technology transfer, Loss and Damage fund (agreed COP27). (Source: UNFCCC, OECD) 💰",
    "Enforcement through transparency: countries must report emissions, track progress, be reviewed by experts. No penalties, but 'naming and shaming' plus domestic courts increasingly hold governments accountable (successful climate litigation in NL, Germany, France). (Source: Paris Agreement Article 13, Climate Litigation Database) ⚖️"
  ],
  "carbon pricing": [
    "Carbon pricing puts a cost on greenhouse gas emissions, creating economic incentives to reduce them. Two main types: carbon taxes (set price, variable reduction) and cap-and-trade/ETS (set reduction, variable price). (Source: World Bank Carbon Pricing Dashboard) 💰",
    "Coverage growing: 73 carbon pricing initiatives cover 23% of global emissions. Prices vary: EU ETS €80-100/ton, UK £85/ton, California $28/ton, China $8/ton. Sweden has highest tax: $130/ton. (Source: World Bank State and Trends 2024) 📈",
    "Impact: EU emissions covered by ETS fell 35% (2005-2019). British Columbia carbon tax reduced emissions 5-15% while economy grew. Carbon pricing drives clean investment—EU ETS raised €180 billion for climate action. (Source: ICAP, Nature Climate Change) 📊",
    "Challenges: prices often too low to drive sufficient change (social cost of carbon estimated $185/ton), political resistance, carbon leakage concerns. Solutions: border carbon adjustments (EU CBAM launching 2026), revenue recycling to households. (Source: IMF, Resources for the Future) ⚖️"
  ],
  "climate activism": [
    "Climate movements have grown massively: Fridays for Future (14 million+ strikers in 2019), Extinction Rebellion (direct action), Sunrise Movement (Green New Deal), 350.org (divestment), indigenous-led movements (Water Protectors), Just Stop Oil. (Source: various movement reports) ✊",
    "Tactics span spectrum: peaceful protests, school strikes, voter mobilization, shareholder activism, lawsuits (2,341 climate cases filed worldwide), civil disobedience, art and culture. Each plays a role in shifting Overton window. (Source: Grantham Research Institute Climate Litigation) ⚖️",
    "Impact: climate litigation has won major victories—Dutch Urgenda case (government must cut emissions), German Constitutional Court (strengthen 2030 targets), Shell ordered to cut emissions 45%. Movements shift public discourse and political possibility. (Source: Sabin Center, Client Earth) 🏛️",
    "Youth voice powerful: surveys show 75% of young people anxious about climate. This energy translates to political action. Intergenerational justice frames: those who will live longest with consequences deserve voice now. Every generation needs climate activists. (Source: Lancet Planetary Health, Greta Thunberg) 🌱"
  ],
  "environmental justice": [
    "Environmental justice recognizes that pollution and climate impacts disproportionately affect low-income communities and communities of color. In the US, Black Americans breathe 56% more pollutant particles than they produce. (Source: EPA Environmental Justice, PNAS) ⚖️",
    "Climate injustice is global: countries contributing least to emissions suffer most. Africa produces 3.8% of emissions but faces most severe impacts—heat, drought, flooding. Small island states face existential sea level threat despite minimal emissions. (Source: IPCC AR6 WG2, Climate Vulnerable Forum) 🌍",
    "Historical responsibility: industrialized countries (US, EU, Japan) responsible for majority of cumulative emissions. Climate reparations and Loss & Damage finance (fund agreed COP27) aim to address this inequity. (Source: Carbon Brief Historical Emissions) 💰",
    "Just transition: ensuring shift to clean economy doesn't harm workers and communities dependent on fossil fuels. Includes job retraining, economic diversification, social safety nets. Coal regions need investment and dignity in transition. (Source: ILO Just Transition Guidelines, BlueGreen Alliance) 👷"
  ],
  
  // ========================
  // CLIMATE PSYCHOLOGY & COMMUNICATION (Sources: Yale Climate Communication, APA)
  // ========================
  "climate anxiety": [
    "Climate anxiety (eco-anxiety, climate distress) is rational emotional response to real threat. 75% of young people find climate future frightening; 59% very or extremely worried. It's not a disorder but an appropriate response. (Source: Lancet Planetary Health 2021) 💚",
    "Healthy responses: channel anxiety into action (activism, career choices, lifestyle changes), connect with community (shared concern reduces isolation), limit doomscrolling, focus on solutions, practice self-compassion. (Source: APA Climate Mental Health, Force of Nature) 🌱",
    "The paradox: enough concern to motivate action, not so much it paralyzes. Balance awareness of problem with focus on solutions and collective action. Individual action + systemic change together. (Source: Yale Program on Climate Change Communication) ⚖️",
    "Hope is active: not naive optimism but 'stubborn hope' or 'urgent optimism.' Solutions exist, momentum is building, young people are powerful. Every fraction of a degree matters—there's no cliff edge, just gradations. (Source: Katharine Hayhoe, Mary Robinson) 🌟"
  ],
  "climate communication": [
    "Effective climate communication: lead with local, personal impacts (not polar bears); frame around values (freedom, fairness, innovation); tell stories with human characters; emphasize solutions and agency. (Source: Climate Outreach, Grist) 📣",
    "Avoid: information deficit model (more facts don't change minds), doom and gloom without solutions, partisan framing, jargon, guilt-tripping. People motivated by hope and self-efficacy more than fear. (Source: American Psychologist, George Marshall) 🧠",
    "The messenger matters: trust is key. People respond to those like them—farmers trust farmers, faith leaders influence congregations, doctors influence patients. Find trusted voices in each community. (Source: Yale Climate Communication, Katherine Hayhoe) 👥",
    "Shift is happening: 72% of Americans now think climate change is happening, 57% human-caused. 70% support climate action. Youth overwhelmingly engaged. But intensity of concern matters—making it salient drives action. (Source: Yale Climate Opinion Maps 2023) 📈"
  ],
  
  // ========================
  // SOLUTIONS & HOPE (Sources: Project Drawdown, IEA, various)
  // ========================
  "climate solutions": [
    "Top solutions by impact (Drawdown): 1) Reduce food waste 2) Plant-rich diets 3) Clean cooking 4) Distributed solar 5) Refrigerant management 6) Tropical forest restoration 7) Onshore wind 8) Reduced food packaging 9) Electric cars 10) Solar farms. (Source: Project Drawdown 2024) 🌍",
    "Technology is ready: solar and wind cheapest power sources, EVs reaching price parity, heat pumps more efficient than gas, batteries plummeting in cost, green hydrogen scaling. Now need policy and investment to deploy at speed. (Source: IEA Net Zero Roadmap) ⚡",
    "Co-benefits make action a win-win: clean energy creates 3x more jobs than fossil fuels, reduces air pollution (7 million deaths/year from fossil fuels), improves energy security, reduces fuel poverty. (Source: IRENA, Lancet Countdown) 💪",
    "We can limit warming if we act now: 1.5°C still possible but requires halving emissions by 2030, net-zero by 2050. Every 0.1°C matters. It's not all-or-nothing—2°C is better than 3°C is better than 4°C. (Source: IPCC AR6 Synthesis) 📉"
  ],
  "hope and action": [
    "Progress is real: renewable capacity additions broke records (507 GW in 2023), EV sales hit 14 million, global emissions growth is slowing, more than 150 countries have net-zero targets, corporate commitments multiplying. (Source: IEA, BloombergNEF) ✨",
    "Success stories: Costa Rica generates 99% electricity from renewables; UK cut emissions 49% below 1990 levels while growing economy; Bhutan is carbon negative; Morocco building world's largest solar plant; India leads in new solar capacity. (Source: Various national reports) 🌟",
    "Young people are powerful: not just the future but agents of change NOW. Student movements, young candidates, career choices, innovation, social media influence—generational transformation is underway. (Source: Fridays for Future, youth surveys) 🌱",
    "Your actions matter: direct impact + social influence (each person influences 5-15 others) + market signals + political voice + identity shift. Be part of the solution. Climate action is the greatest opportunity to improve quality of life for current and future generations. (Source: Seth Wynes, Kimberly Nicholas) 💚"
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
  const { profile, trackQuestion, getPersonalizedGreeting, getRecommendedTopics, getPersonalizedContext } = useEcoPalMemory();
  
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
    
    return [];
  });
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [hasShownGreeting, setHasShownGreeting] = useState(false);

  // Show personalized greeting when dialog opens
  useEffect(() => {
    if (isOpen && !hasShownGreeting && messages.length === 0) {
      const greeting = getPersonalizedGreeting();
      setMessages([{
        id: '1',
        content: greeting,
        sender: 'ecopal',
        timestamp: new Date()
      }]);
      setHasShownGreeting(true);
    }
  }, [isOpen, hasShownGreeting, messages.length, getPersonalizedGreeting]);

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
    const greeting = getPersonalizedGreeting();
    const initialMessage = {
      id: '1',
      content: greeting,
      sender: 'ecopal' as const,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
    localStorage.removeItem('ecopal-conversation');
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping) return;

    // Track the question for personalization
    trackQuestion(inputValue);

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
      let response = getAdvancedResponse(inputValue, messages);
      
      // Add personalized context occasionally (every 3rd question)
      const context = getPersonalizedContext();
      if (context && profile.totalQuestions % 3 === 0 && profile.totalQuestions > 0) {
        response = `${context}\n\n${response}`;
      }
      
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
        {/* Header - Compact and responsive with personalization */}
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
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="truncate">Ask me anything about the environment! 🌍</span>
              </div>
            </div>
            {/* User stats badges */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {profile.learningStreak >= 2 && (
                <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 text-orange-600 rounded-full text-xs font-medium">
                  <span>🔥</span>
                  <span className="hidden sm:inline">{profile.learningStreak}</span>
                </div>
              )}
              {profile.totalQuestions > 0 && (
                <div className="flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                  <Sparkles className="w-3 h-3" />
                  <span className="hidden sm:inline">{profile.totalQuestions}</span>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Main Content - Fully responsive */}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <Tabs defaultValue="chat" className="flex-1 flex flex-col min-h-0">
            {/* Tab Navigation - Compact */}
            <div className="px-3 sm:px-5 pt-2 sm:pt-3 pb-2 border-b bg-background/95 flex-shrink-0">
              <TabsList className="grid w-full grid-cols-3 h-9 sm:h-10 bg-muted/50 rounded-xl">
                <TabsTrigger value="chat" className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all">
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Chat</span>
                </TabsTrigger>
                <TabsTrigger value="questions" className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all">
                  <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Topics</span>
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all">
                  <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Profile</span>
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
                    
                    {/* Personalized Recommendations - Only show if user has some history */}
                    {profile.totalQuestions > 0 && (
                      <div className="space-y-2 animate-in fade-in duration-300">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                          <Compass className="w-3.5 h-3.5" />
                          <span>Recommended for you</span>
                        </div>
                        <div className="grid grid-cols-1 gap-1.5">
                          {getRecommendedTopics().slice(0, 3).map((topic, idx) => {
                            const topicLabels: Record<string, { label: string; icon: string; question: string }> = {
                              'renewable-energy': { label: 'Renewable Energy', icon: '⚡', question: 'How does renewable energy help the environment?' },
                              'climate-science': { label: 'Climate Science', icon: '🌡️', question: 'What is climate change and how does it affect us?' },
                              'sustainable-living': { label: 'Sustainable Living', icon: '🌱', question: 'How can I live more sustainably?' },
                              'nature-biodiversity': { label: 'Nature & Biodiversity', icon: '🦋', question: 'Why is biodiversity important for our planet?' },
                              'water-conservation': { label: 'Water Conservation', icon: '💧', question: 'How can I conserve water at home?' },
                              'transportation': { label: 'Green Transport', icon: '🚗', question: 'What are the most eco-friendly transportation options?' },
                              'food-agriculture': { label: 'Sustainable Food', icon: '🥗', question: 'How does my diet affect the environment?' },
                              'policy-economics': { label: 'Climate Policy', icon: '📋', question: 'What is the Paris Agreement and why does it matter?' },
                            };
                            const info = topicLabels[topic] || { label: topic, icon: '🌍', question: `Tell me about ${topic}` };
                            const isExplored = profile.topicsExplored.includes(topic);
                            
                            return (
                              <Button
                                key={topic}
                                variant="outline"
                                className={`w-full h-auto p-2.5 justify-start text-left rounded-xl transition-all ${
                                  isExplored 
                                    ? 'border-muted bg-muted/30' 
                                    : 'border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50'
                                }`}
                                onClick={() => handleQuestionClick(info.question)}
                              >
                                <div className="flex items-center gap-2 w-full">
                                  <span className="text-lg flex-shrink-0">{info.icon}</span>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-medium text-xs">{info.label}</span>
                                      {!isExplored && (
                                        <span className="px-1.5 py-0.5 bg-primary/20 text-primary text-[10px] rounded-full font-medium">
                                          New
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[10px] text-muted-foreground truncate">{info.question}</p>
                                  </div>
                                  <TrendingUp className="w-3 h-3 text-primary/50 flex-shrink-0" />
                                </div>
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    )}

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

                    {/* User Progress Summary - Show when user has history */}
                    {profile.totalQuestions > 0 && (
                      <Card className="p-2.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30 rounded-xl">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-amber-500/30 rounded-lg">
                            <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-medium">Your Learning Progress</p>
                            <p className="text-[10px] text-muted-foreground">
                              {profile.topicsExplored.length} of 8 topics explored • {profile.totalQuestions} questions asked
                            </p>
                          </div>
                        </div>
                      </Card>
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

            {/* Profile Tab - Learning Journey */}
            <TabsContent value="profile" className="flex-1 mt-0 px-3 sm:px-5 pb-3 sm:pb-4 min-h-0 overflow-hidden">
              <div className="h-full flex flex-col min-h-0 overflow-hidden">
                <div className="py-1.5 sm:py-2 flex-shrink-0">
                  <h3 className="font-semibold text-primary flex items-center gap-2 text-xs sm:text-sm">
                    <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Your Learning Journey
                  </h3>
                </div>
                
                <ScrollArea className="flex-1 min-h-0 overflow-hidden">
                  <div className="space-y-3 sm:space-y-4 pr-2">
                    
                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 gap-2">
                      <Card className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 rounded-xl">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-primary/20 rounded-lg">
                            <Flame className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-lg font-bold text-primary">{profile.learningStreak}</p>
                            <p className="text-[10px] text-muted-foreground">Day Streak</p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="p-3 bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/20 rounded-xl">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-amber-500/20 rounded-lg">
                            <MessageCircle className="w-4 h-4 text-amber-600" />
                          </div>
                          <div>
                            <p className="text-lg font-bold text-amber-600">{profile.totalQuestions}</p>
                            <p className="text-[10px] text-muted-foreground">Questions</p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border-blue-500/20 rounded-xl">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-blue-500/20 rounded-lg">
                            <BookOpen className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-lg font-bold text-blue-600">{profile.topicsExplored.length}/8</p>
                            <p className="text-[10px] text-muted-foreground">Topics</p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="p-3 bg-gradient-to-br from-purple-500/10 to-violet-500/5 border-purple-500/20 rounded-xl">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-purple-500/20 rounded-lg">
                            <Target className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-lg font-bold text-purple-600 capitalize">{profile.experienceLevel}</p>
                            <p className="text-[10px] text-muted-foreground">Level</p>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Experience Progress */}
                    <Card className="p-3 rounded-xl border-muted">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 text-amber-500" />
                            Experience Level
                          </span>
                          <Badge variant="secondary" className="text-[10px] capitalize">
                            {profile.experienceLevel}
                          </Badge>
                        </div>
                        <Progress 
                          value={
                            profile.experienceLevel === 'expert' ? 100 :
                            profile.experienceLevel === 'advanced' ? 75 :
                            profile.experienceLevel === 'intermediate' ? 50 : 25
                          } 
                          className="h-2"
                        />
                        <p className="text-[10px] text-muted-foreground">
                          {profile.experienceLevel === 'expert' 
                            ? 'Maximum level reached! 🎓' 
                            : profile.experienceLevel === 'advanced'
                            ? `${50 - profile.totalQuestions} more questions to Expert`
                            : profile.experienceLevel === 'intermediate'
                            ? `${25 - profile.totalQuestions} more questions to Advanced`
                            : `${10 - profile.totalQuestions} more questions to Intermediate`
                          }
                        </p>
                      </div>
                    </Card>

                    {/* Achievements */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        Achievements
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'first-question', label: 'First Steps', desc: 'Asked your first question', icon: '🌱', unlocked: profile.totalQuestions >= 1 },
                          { id: 'explorer', label: 'Explorer', desc: 'Explored 3 topics', icon: '🧭', unlocked: profile.topicsExplored.length >= 3 },
                          { id: 'curious', label: 'Curious Mind', desc: 'Asked 10 questions', icon: '💡', unlocked: profile.totalQuestions >= 10 },
                          { id: 'dedicated', label: 'Dedicated', desc: '3-day streak', icon: '🔥', unlocked: profile.learningStreak >= 3 },
                          { id: 'scholar', label: 'Scholar', desc: 'Asked 25 questions', icon: '📚', unlocked: profile.totalQuestions >= 25 },
                          { id: 'master', label: 'Eco Master', desc: 'Explored all topics', icon: '🌍', unlocked: profile.topicsExplored.length >= 8 },
                        ].map((achievement) => (
                          <Card 
                            key={achievement.id}
                            className={`p-2.5 rounded-xl transition-all ${
                              achievement.unlocked 
                                ? 'bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border-amber-500/30' 
                                : 'bg-muted/30 border-muted opacity-60'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <span className={`text-lg ${!achievement.unlocked && 'grayscale'}`}>
                                {achievement.icon}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1">
                                  <span className="text-[11px] font-medium truncate">{achievement.label}</span>
                                  {achievement.unlocked && (
                                    <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />
                                  )}
                                </div>
                                <p className="text-[9px] text-muted-foreground">{achievement.desc}</p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Topics Explored Visualization */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-blue-500" />
                        Topics Progress
                      </h4>
                      <div className="space-y-1.5">
                        {[
                          { id: 'renewable-energy', label: 'Renewable Energy', icon: '⚡' },
                          { id: 'climate-science', label: 'Climate Science', icon: '🌡️' },
                          { id: 'sustainable-living', label: 'Sustainable Living', icon: '🌱' },
                          { id: 'nature-biodiversity', label: 'Nature & Biodiversity', icon: '🦋' },
                          { id: 'water-conservation', label: 'Water Conservation', icon: '💧' },
                          { id: 'transportation', label: 'Green Transport', icon: '🚗' },
                          { id: 'food-agriculture', label: 'Sustainable Food', icon: '🥗' },
                          { id: 'policy-economics', label: 'Climate Policy', icon: '📋' },
                        ].map((topic) => {
                          const isExplored = profile.topicsExplored.includes(topic.id);
                          const isFavorite = profile.favoriteTopics.includes(topic.id);
                          const interestCount = profile.interests[topic.id] || 0;
                          
                          return (
                            <div 
                              key={topic.id}
                              className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
                                isExplored 
                                  ? 'bg-primary/5 border border-primary/20' 
                                  : 'bg-muted/30 border border-transparent'
                              }`}
                            >
                              <span className={`text-sm ${!isExplored && 'grayscale opacity-50'}`}>
                                {topic.icon}
                              </span>
                              <span className={`text-xs flex-1 ${isExplored ? 'font-medium' : 'text-muted-foreground'}`}>
                                {topic.label}
                              </span>
                              {isFavorite && (
                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                              )}
                              {isExplored ? (
                                <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
                                  {interestCount} {interestCount === 1 ? 'Q' : 'Qs'}
                                </Badge>
                              ) : (
                                <Circle className="w-3 h-3 text-muted-foreground/30" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Favorite Topics */}
                    {profile.favoriteTopics.length > 0 && (
                      <Card className="p-3 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border-amber-500/20 rounded-xl">
                        <div className="space-y-2">
                          <h4 className="text-xs font-semibold flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            Your Favorite Topics
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {profile.favoriteTopics.map((topic, idx) => {
                              const topicNames: Record<string, string> = {
                                'renewable-energy': '⚡ Energy',
                                'climate-science': '🌡️ Climate',
                                'sustainable-living': '🌱 Sustainability',
                                'nature-biodiversity': '🦋 Nature',
                                'water-conservation': '💧 Water',
                                'transportation': '🚗 Transport',
                                'food-agriculture': '🥗 Food',
                                'policy-economics': '📋 Policy',
                              };
                              return (
                                <Badge 
                                  key={topic} 
                                  className={`text-[10px] ${
                                    idx === 0 
                                      ? 'bg-amber-500/20 text-amber-700 border-amber-500/30' 
                                      : 'bg-muted text-muted-foreground'
                                  }`}
                                >
                                  {idx === 0 && '👑 '}
                                  {topicNames[topic] || topic}
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      </Card>
                    )}

                    {/* Sessions Info */}
                    <Card className="p-3 bg-muted/30 border-muted rounded-xl">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Total Sessions: {profile.totalSessions}</span>
                        <span>Last Visit: {new Date(profile.lastVisit).toLocaleDateString()}</span>
                      </div>
                    </Card>

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
