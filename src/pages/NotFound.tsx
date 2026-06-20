import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, Home, MessageCircle, Search, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { openWhatsApp } from "@/lib/whatsapp";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);

    const previousTitle = document.title;
    const previousRobots = document.head.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const previousRobotsContent = previousRobots?.getAttribute("content");
    const previousCanonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const previousCanonicalHref = previousCanonical?.getAttribute("href");

    document.title = "Página no encontrada | EnPesos.cl";

    let robotsMeta = previousRobots;
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute("content", "noindex, nofollow");

    if (previousCanonical) {
      previousCanonical.remove();
    }

    return () => {
      document.title = previousTitle;

      if (previousRobotsContent && robotsMeta) {
        robotsMeta.setAttribute("content", previousRobotsContent);
      } else if (robotsMeta) {
        robotsMeta.remove();
      }

      if (previousCanonicalHref) {
        const restoredCanonical = document.createElement("link");
        restoredCanonical.setAttribute("rel", "canonical");
        restoredCanonical.setAttribute("href", previousCanonicalHref);
        document.head.appendChild(restoredCanonical);
      }
    };
  }, [location.pathname]);

  const suggestedLinks = [
    {
      title: "Cupo en dólares a pesos",
      description: "Conoce cómo cotizar tu cupo internacional disponible.",
      href: "/cupo-en-dolares-a-pesos-chilenos",
      icon: Search,
    },
    {
      title: "Bancos y tarjetas",
      description: "Revisa información para BancoEstado, Santander, BCI, CMR, Visa y Mastercard.",
      href: "/bancos-y-tarjetas-cupo-en-dolares",
      icon: Home,
    },
    {
      title: "Seguridad",
      description: "Qué datos nunca debes entregar y cómo cotizar con más cuidado.",
      href: "/es-seguro-cambiar-cupo-en-dolares-a-pesos",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-6 py-20">
        <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/70 md:p-12">
          <p className="mx-auto mb-4 inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Error 404
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            Página no encontrada
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            La dirección que abriste no existe o cambió. Puedes volver al inicio, revisar las guías principales o escribirnos por WhatsApp para recibir ayuda.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link to="/">
                Volver al inicio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="rounded-full px-7"
              onClick={() => openWhatsApp("Hola, estaba navegando en EnPesos.cl y necesito ayuda para encontrar información sobre cupo en dólares.")}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Escribir por WhatsApp
            </Button>
          </div>

          <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
            {suggestedLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-lg"
                >
                  <Icon className="mb-4 h-6 w-6 text-blue-600" />
                  <h2 className="font-semibold text-slate-950 group-hover:text-blue-700">{link.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{link.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default NotFound;
