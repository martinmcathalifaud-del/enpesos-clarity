import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Guias from "./pages/Guias";
import QueEsEnPesos from "./pages/QueEsEnPesos";
import CupoDolaresAPesos from "./pages/CupoDolaresAPesos";
import VenderCupoDolaresChile from "./pages/VenderCupoDolaresChile";
import CuantoReciboCupoDolares from "./pages/CuantoReciboCupoDolares";
import SeguroCambiarCupoDolares from "./pages/SeguroCambiarCupoDolares";
import AvanceCupoDolaresOnline from "./pages/AvanceCupoDolaresOnline";
import PagarDeudaDolaresTarjeta from "./pages/PagarDeudaDolaresTarjeta";
import SimuladorPagoTarjeta from "./pages/SimuladorPagoTarjeta";
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
          <Route path="/guias" element={<Guias />} />
          <Route path="/que-es-enpesos" element={<QueEsEnPesos />} />
          <Route path="/cupo-en-dolares-a-pesos-chilenos" element={<CupoDolaresAPesos />} />
          <Route path="/vender-cupo-en-dolares-chile" element={<VenderCupoDolaresChile />} />
          <Route path="/cuanto-recibo-por-mi-cupo-en-dolares" element={<CuantoReciboCupoDolares />} />
          <Route path="/es-seguro-cambiar-cupo-en-dolares-a-pesos" element={<SeguroCambiarCupoDolares />} />
          <Route path="/avance-cupo-en-dolares-online" element={<AvanceCupoDolaresOnline />} />
          <Route path="/como-pagar-deuda-en-dolares-tarjeta-credito" element={<PagarDeudaDolaresTarjeta />} />
          <Route path="/simulador-pago-tarjeta-credito" element={<SimuladorPagoTarjeta />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
