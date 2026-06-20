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
import LiquidezNegociosCupoInternacional from "./pages/LiquidezNegociosCupoInternacional";
import CupoDolaresCiudad from "./pages/CupoDolaresCiudad";
import CupoDolaresBancoTarjeta from "./pages/CupoDolaresBancoTarjeta";
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
          <Route path="/liquidez-para-negocios-cupo-internacional" element={<LiquidezNegociosCupoInternacional />} />
          <Route path="/cupo-en-dolares-santiago" element={<CupoDolaresCiudad cityKey="santiago" />} />
          <Route path="/cupo-en-dolares-las-condes" element={<CupoDolaresCiudad cityKey="las-condes" />} />
          <Route path="/cupo-en-dolares-providencia" element={<CupoDolaresCiudad cityKey="providencia" />} />
          <Route path="/cupo-en-dolares-concepcion" element={<CupoDolaresCiudad cityKey="concepcion" />} />
          <Route path="/cupo-en-dolares-antofagasta" element={<CupoDolaresCiudad cityKey="antofagasta" />} />
          <Route path="/bancos-y-tarjetas-cupo-en-dolares" element={<CupoDolaresBancoTarjeta />} />
          <Route path="/cupo-en-dolares-banco-estado" element={<CupoDolaresBancoTarjeta pageKey="banco-estado" />} />
          <Route path="/cupo-en-dolares-santander" element={<CupoDolaresBancoTarjeta pageKey="santander" />} />
          <Route path="/cupo-en-dolares-banco-de-chile" element={<CupoDolaresBancoTarjeta pageKey="banco-de-chile" />} />
          <Route path="/cupo-en-dolares-bci" element={<CupoDolaresBancoTarjeta pageKey="bci" />} />
          <Route path="/cupo-en-dolares-scotiabank" element={<CupoDolaresBancoTarjeta pageKey="scotiabank" />} />
          <Route path="/cupo-en-dolares-itau" element={<CupoDolaresBancoTarjeta pageKey="itau" />} />
          <Route path="/cupo-en-dolares-cmr-falabella" element={<CupoDolaresBancoTarjeta pageKey="cmr-falabella" />} />
          <Route path="/cupo-en-dolares-tarjeta-visa" element={<CupoDolaresBancoTarjeta pageKey="tarjeta-visa" />} />
          <Route path="/cupo-en-dolares-tarjeta-mastercard" element={<CupoDolaresBancoTarjeta pageKey="tarjeta-mastercard" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
