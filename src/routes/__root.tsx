import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pata & Cia",
  url: "https://example.com/",
  description: "Pet care com atendimento próximo e rotina organizada.",
  telephone: "+55 22 99999-9999",
  sameAs: ["https://instagram.com/pataecia.pet"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua General Osório, 118",
    addressLocality: "Nova Friburgo",
    addressRegion: "RJ",
    addressCountry: "BR",
  },
};

function NotFoundComponent() {
  return <div className="min-h-screen flex items-center justify-center px-4"><div className="text-center max-w-md"><h1 className="text-7xl font-bold">404</h1><h2 className="mt-4 text-xl font-semibold">Página não encontrada</h2><p className="mt-2 text-sm opacity-70">A página que você procura não existe ou foi movida.</p><Link to="/" className="mt-6 inline-flex items-center justify-center rounded-md bg-[#536042] px-4 py-2 text-sm font-medium text-white">Voltar ao início</Link></div></div>;
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return <div className="min-h-screen flex items-center justify-center px-4"><div className="text-center max-w-md"><h1 className="text-xl font-semibold">Esta página não carregou</h1><p className="mt-2 text-sm opacity-70">Ocorreu um erro. Tente atualizar a página ou voltar ao início.</p><div className="mt-6 flex justify-center gap-2"><button onClick={() => { router.invalidate(); reset(); }} className="rounded-md bg-[#536042] px-4 py-2 text-sm font-medium text-white">Tentar novamente</button><a href="/" className="rounded-md border px-4 py-2 text-sm">Voltar ao início</a></div></div></div>;
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#536042" },
      { title: "Pata & Cia — Pet Care em Nova Friburgo" },
      { name: "description", content: "Cuidado próximo para pets, com banho e tosa, day care e acompanhamento em Nova Friburgo." },
      { name: "author", content: "Pata & Cia" },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:title", content: "Pata & Cia — Pet Care em Nova Friburgo" },
      { property: "og:description", content: "Mais carinho na rotina. Mais tranquilidade para você." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://example.com/" },
      { property: "og:site_name", content: "Pata & Cia" },
      { property: "og:image", content: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1200&q=82&fm=webp" },
      { property: "og:image:alt", content: "Cachorro em um ambiente claro e acolhedor" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pata & Cia — Pet Care em Nova Friburgo" },
      { name: "twitter:description", content: "Cuidado próximo para pets e tutores." },
      { name: "twitter:image", content: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1200&q=82&fm=webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://example.com/" },
      { rel: "icon", href: "/paw.svg", type: "image/svg+xml" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return <html lang="pt-BR"><head><HeadContent /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} /></head><body>{children}<Scripts /></body></html>;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>;
}
