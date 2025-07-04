import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Learning from "./pages/Learning";
import Curriculum from "./pages/Curriculum";
import ClimateChange from "./pages/topics/ClimateChange";
import RenewableEnergy from "./pages/topics/RenewableEnergy";
import CarbonCapture from "./pages/topics/CarbonCapture";
import CircularEconomy from "./pages/topics/CircularEconomy";
import WaterConservation from "./pages/topics/WaterConservation";
import SustainableLiving from "./pages/topics/SustainableLiving";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/topics/climate-change" element={<ClimateChange />} />
          <Route path="/topics/renewable-energy" element={<RenewableEnergy />} />
          <Route path="/topics/carbon-capture" element={<CarbonCapture />} />
          <Route path="/topics/circular-economy" element={<CircularEconomy />} />
          <Route path="/topics/water-conservation" element={<WaterConservation />} />
          <Route path="/topics/sustainable-living" element={<SustainableLiving />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
