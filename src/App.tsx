import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

const Guias = lazy(() => import("./pages/Guias"));
const QueEsEnPesos = lazy(() => import("./pages/QueEsEnPesos"));
const ComoFunciona = lazy(() => import("./pages/ComoFunciona"));
const PreguntasFrecuentes = lazy(() => import("./pages/PreguntasFrecuentes"));
const Seguridad = lazy(() => import("./pages/Seguridad"));
const Nosotros = lazy(() => import("./pages/Nosotros"));
const CupoDolaresAPesos = lazy(() => import("./pages/CupoDolaresAPesos"));
const VenderCupoDolaresChile = lazy(() => import("./pages/VenderCupoDolaresChile"));
const CuantoReciboCupoDolares = lazy(() => import("./pages/CuantoReciboCupoDolares"));
const SeguroCambiarCupoDolares = lazy(() => import("./pages/SeguroCambiarCupoDolares"));
const AvanceCupoDolaresOnline = lazy(() => import("./pages/AvanceCupoDolaresOnline"));
const PagarDeudaDolaresTarjeta = lazy(() => import("./pages/PagarDeudaDolaresTarjeta"));
const SimuladorPagoTarjeta = lazy(() => import("./pages/SimuladorPagoTarjeta"));
const CalculadoraCredito = lazy(() => import("./pages/CalculadoraCredito"));
const LiquidezNegociosCupoInternacional = lazy(() => import("./pages/LiquidezNegociosCupoInternacional"));
const FormasFinanciamientoPersonas = lazy(() => import("./pages/FormasFinanciamientoPersonas"));
const FinanciamientoNegociosPymes = lazy(() => import("./pages/FinanciamientoNegociosPymes"));
const ProgramaColaboradores = lazy(() => import("./pages/ProgramaColaboradores"));
const CupoDolaresCiudad = lazy(() => import("./pages/CupoDolaresCiudad"));
const CupoDolaresBancoTarjeta = lazy(() => import("./pages/CupoDolaresBancoTarjeta"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/guias" element={<Guias />} />
            <Route path="/que-es-enpesos" element={<QueEsEnPesos />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
            <Route path="/seguridad" element={<Seguridad />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/cupo-en-dolares-a-pesos-chilenos" element={<CupoDolaresAPesos />} />
            <Route path="/vender-cupo-en-dolares-chile" element={<VenderCupoDolaresChile />} />
            <Route path="/cuanto-recibo-por-mi-cupo-en-dolares" element={<CuantoReciboCupoDolares />} />
            <Route path="/es-seguro-cambiar-cupo-en-dolares-a-pesos" element={<SeguroCambiarCupoDolares />} />
            <Route path="/avance-cupo-en-dolares-online" element={<AvanceCupoDolaresOnline />} />
            <Route path="/como-pagar-deuda-en-dolares-tarjeta-credito" element={<PagarDeudaDolaresTarjeta />} />
            <Route path="/simulador-pago-tarjeta-credito" element={<SimuladorPagoTarjeta />} />
            <Route path="/calculadora-credito" element={<CalculadoraCredito />} />
            <Route path="/liquidez-para-negocios-cupo-internacional" element={<LiquidezNegociosCupoInternacional />} />
            <Route path="/formas-de-financiamiento-para-personas-chile" element={<FormasFinanciamientoPersonas />} />
            <Route path="/financiamiento-para-negocios-y-pymes-chile" element={<FinanciamientoNegociosPymes />} />
            <Route path="/programa-de-colaboradores" element={<ProgramaColaboradores />} />
            <Route path="/referidos" element={<ProgramaColaboradores />} />
            <Route path="/cupo-en-dolares-santiago" element={<CupoDolaresCiudad cityKey="santiago" />} />
            <Route path="/cupo-en-dolares-las-condes" element={<CupoDolaresCiudad cityKey="las-condes" />} />
            <Route path="/cupo-en-dolares-providencia" element={<CupoDolaresCiudad cityKey="providencia" />} />
            <Route path="/cupo-en-dolares-concepcion" element={<CupoDolaresCiudad cityKey="concepcion" />} />
            <Route path="/cupo-en-dolares-antofagasta" element={<CupoDolaresCiudad cityKey="antofagasta" />} />
            <Route path="/cupo-en-dolares-valparaiso" element={<CupoDolaresCiudad cityKey="valparaiso" />} />
            <Route path="/cupo-en-dolares-rancagua" element={<CupoDolaresCiudad cityKey="rancagua" />} />
            <Route path="/cupo-en-dolares-puente-alto" element={<CupoDolaresCiudad cityKey="puente-alto" />} />
            <Route path="/cupo-en-dolares-vitacura" element={<CupoDolaresCiudad cityKey="vitacura" />} />
            <Route path="/cupo-en-dolares-quillota" element={<CupoDolaresCiudad cityKey="quillota" />} />
            <Route path="/cupo-en-dolares-lo-barnechea" element={<CupoDolaresCiudad cityKey="lo-barnechea" />} />
            <Route path="/cupo-en-dolares-iquique" element={<CupoDolaresCiudad cityKey="iquique" />} />
            <Route path="/cupo-en-dolares-la-serena" element={<CupoDolaresCiudad cityKey="la-serena" />} />
            <Route path="/cupo-en-dolares-arica" element={<CupoDolaresCiudad cityKey="arica" />} />
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
