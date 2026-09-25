import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

const images = {
  hero: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1200&q=82&fm=webp",
  story: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1100&q=82&fm=webp",
  dayCare: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=82&fm=webp",
  grooming: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1000&q=82&fm=webp",
};

const services = [
  ["Banho & Tosa", "Higiene, conforto e uma rotina tranquila, com atenção ao perfil de cada pet.", images.grooming],
  ["Day Care", "Um espaço para brincar, socializar e gastar energia em uma rotina acompanhada.", images.dayCare],
  ["Acompanhamento", "Orientação próxima para deixar os cuidados do dia a dia mais simples para você.", images.story],
];

const faqs = [
  ["Como funciona o primeiro atendimento?", "A gente começa entendendo o perfil do pet, a rotina dele e o que você procura. A partir disso, indicamos o cuidado mais adequado."],
  ["Vocês atendem cães de diferentes portes?", "Sim. A rotina é organizada para receber diferentes portes e temperamentos, com atenção individual em cada etapa."],
  ["Preciso levar algo no dia do atendimento?", "No contato inicial, nossa equipe confirma tudo o que é necessário para aquele serviço. Assim você chega com tranquilidade."],
  ["Como acompanho o meu pet durante o dia?", "A comunicação é feita pelos canais da equipe. Quando necessário, combinamos atualizações e orientações específicas para cada pet."],
  ["Como faço para conhecer o espaço?", "Basta falar com a nossa equipe pelo WhatsApp. Podemos combinar o melhor horário para você conhecer o espaço e tirar suas dúvidas."],
];

const testimonials = [
  ["Marina Alves", "Tutora da Lola", "A equipe percebe o jeito da minha cachorra e adapta o atendimento. Isso faz toda diferença."],
  ["Bruno Martins", "Tutor do Theo", "O que mais gosto é da comunicação. Sei como ela está e sinto que realmente conhecem a rotina dela."],
  ["Camila Rocha", "Tutora da Nina", "É um lugar que passa cuidado de verdade, desde a chegada até a hora de buscar."],
];

type FormStatus = "idle" | "loading" | "success" | "error";
type LegalDoc = "privacidade" | "cookies" | "acessibilidade" | null;

function trackEvent(eventName: string, parameters?: Record<string, string>) {
  const win = window as Window & { fbq?: (...args: unknown[]) => void; dataLayer?: unknown[] };
  // Replace PIXEL_ID before enabling Meta Pixel in production.
  if (win.fbq) win.fbq("track", eventName, parameters ?? {});
  // Replace GA_MEASUREMENT_ID / GTM_CONTAINER_ID before enabling analytics.
  win.dataLayer?.push({ event: eventName, ...parameters });
}

function Index() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState("");
  const [consent, setConsent] = useState(false);
  const [legalDoc, setLegalDoc] = useState<LegalDoc>(null);
  const [cookiesVisible, setCookiesVisible] = useState(true);
  const contactSectionRef = useRef<HTMLElement | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(max > 0 ? window.scrollY / max : 0);
      });
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px" },
    );
    items.forEach(item => observer.observe(item));
    trackEvent("PageView");
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!legalDoc) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLegalDoc(null);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [legalDoc]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const whatsapp = String(data.get("whatsapp") ?? "").trim();

    setFormError("");

    if (!name || !email || !whatsapp) {
      setFormStatus("error");
      setFormError("Preencha nome, e-mail e WhatsApp para continuar.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormStatus("error");
      setFormError("Confira o e-mail informado.");
      return;
    }
    if (!consent) {
      setFormStatus("error");
      setFormError("Marque o consentimento para podermos usar seus dados para responder ao contato.");
      return;
    }

    setFormStatus("loading");
    // TODO: connect the real CRM/e-mail/webhook here. No third-party integration is simulated.
    await new Promise(resolve => window.setTimeout(resolve, 900));
    trackEvent("Lead", { source: "contact_form" });
    trackEvent("Contact", { source: "contact_form" });
    setFormStatus("success");
  };

  const openContact = () => {
    trackEvent("Contact", { source: "cta" });
    scrollTo("contato");
  };

  const legalCopy = {
    privacidade: {
      title: "Política de Privacidade",
      body: "Esta página é uma demonstração de uma landing page. O formulário coleta nome, e-mail e WhatsApp apenas para ilustrar um pedido de contato. A finalidade prevista é responder à solicitação e, somente quando configurado e autorizado, realizar comunicações relacionadas ao atendimento. O período de retenção e o canal operacional para solicitar exclusão não estão definidos neste protótipo e devem ser preenchidos pelo responsável antes da publicação. Na implantação real também devem ser definidos o responsável pelo tratamento, a base legal e as demais informações exigidas pela legislação aplicável.",
    },
    cookies: {
      title: "Política de Cookies",
      body: "A experiência pode usar cookies ou tecnologias equivalentes para recursos essenciais e, somente depois de configuração e consentimento quando aplicável, para métricas de audiência. Neste protótipo, Meta Pixel, GA4 e GTM estão apenas como placeholders e não possuem IDs reais configurados.",
    },
    acessibilidade: {
      title: "Acessibilidade",
      body: "A página foi estruturada com HTML semântico, foco visível, controles operáveis por teclado, textos alternativos nas imagens, hierarquia de títulos e suporte a prefers-reduced-motion. Em produção, recomendamos complementar o processo com auditoria assistiva real e testes com pessoas usuárias.",
    },
  } as const;

  return (
    <main className="pet-site" style={{ "--scroll-progress": scrollProgress } as React.CSSProperties}>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <div className="site-header__inner">
          <button className="brand" onClick={() => scrollTo("inicio")} type="button" aria-label="Pata & Cia, início">
            <span className="brand__mark" aria-hidden="true"><span /></span>
            <span><strong>PATA & CIA</strong><small>pet care</small></span>
          </button>

            <button className="header-cta" type="button" onClick={openContact}>
            Falar com a equipe <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </header>

      <section id="inicio" className="hero section-pad">
        <div className="hero__copy reveal">
          <p className="eyebrow"><Sparkles size={15} /> Cuidado que respeita cada jeito de ser</p>
          <h1>Mais carinho na rotina.<br /><em>Mais tranquilidade para você.</em></h1>
          <p className="hero__lead">Um espaço de cuidado para pets e tutores que acreditam que bem-estar começa nos pequenos detalhes.</p>
          <div className="hero__actions">
            <button className="button button--primary" type="button" onClick={openContact}>Falar com a equipe <ArrowRight size={18} /></button>
            <button className="text-link" type="button" onClick={() => scrollTo("cuidados")}>Conhecer nossos cuidados <ArrowRight size={16} /></button>
          </div>
          <div className="hero__note"><ShieldCheck size={16} /> Atendimento com rotina organizada, contato próximo e ambiente acolhedor.</div>
          <button className="hero__scroll-cue" type="button" onClick={() => scrollTo("sobre")} aria-label="Ir para a nossa forma de cuidar"><span>deslize para conhecer</span><i aria-hidden="true" /></button>
        </div>

        <div className="hero__visual reveal">
          <div className="hero__image-wrap"><span className="hero__image-caption" aria-hidden="true">A rotina também pode ser leve.</span>
            <img src={images.hero} alt="Cachorro em um ambiente claro e acolhedor" width="1200" height="1463" fetchPriority="high" decoding="async" />
            <div className="hero__seal"><span>cuidado</span><strong>próximo</strong><span>todos os dias</span></div>
          </div>
        </div>
      </section>

      <section className="pillars" aria-label="Diferenciais"><div className="motion-band" aria-hidden="true"><span>acolhimento</span><b>•</b><span>rotina</span><b>•</b><span>bem-estar</span><b>•</b><span>presença</span><b>•</b><span>acolhimento</span><b>•</b><span>rotina</span><b>•</b><span>bem-estar</span><b>•</b><span>presença</span></div>
        <div className="pillars__inner">
          {[
            ["01", "Rotina tranquila", "Atendimento pensado para reduzir estresse e correria."],
            ["02", "Olhar individual", "Cada pet tem seus hábitos, sinais e preferências."],
            ["03", "Equipe presente", "Contato claro para você acompanhar o que importa."],
            ["04", "Cuidado de verdade", "Mais atenção aos detalhes que fazem parte da rotina."],
          ].map(([n, title, text]) => <article key={n}><span>{n}</span><div><strong>{title}</strong><p>{text}</p></div></article>)}
        </div>
      </section>

      <section id="sobre" className="story section-pad"><div className="section-index" aria-hidden="true">02</div>
        <div className="story__image reveal">
          <img src={images.story} alt="Cachorro recebendo carinho durante um momento de cuidado" width="1100" height="1410" loading="lazy" decoding="async" />
          <span>FEITO PARA ELES. PENSADO PARA VOCÊ.</span>
        </div>
        <div className="story__copy reveal">
          <p className="eyebrow">Nossa forma de cuidar</p>
          <h2>Um olhar mais atento para o que o seu pet não consegue dizer.</h2>
          <p>A Pata & Cia nasceu com uma ideia simples: criar uma experiência de cuidado que respeita o tempo de cada pet e deixa o tutor mais seguro.</p>
          <p>Por isso, unimos uma rotina organizada, ambiente acolhedor e comunicação próxima. O objetivo é que cada visita seja tranquila — para quem chega de quatro patas e para quem deixa seu melhor amigo aos nossos cuidados.</p>
          <div className="signature"><span>com carinho,</span><strong>Pata & Cia</strong></div>
        </div>
        <div className="story__art" aria-hidden="true"><div className="art-sun" /><div className="art-hills" /><div className="art-house" /><div className="art-tree art-tree--one" /><div className="art-tree art-tree--two" /><div className="art-paw">🐾</div></div>
      </section>

      <section id="cuidados" className="services section-pad"><div className="section-index section-index--right" aria-hidden="true">03</div>
        <div className="section-heading reveal">
          <div><p className="eyebrow">Cuidados que fazem sentido</p><h2>Do básico ao especial,<br /><em>sem exagero.</em></h2></div>
          <p>Uma seleção de serviços para acompanhar a rotina do seu pet com mais conforto, organização e atenção.</p>
        </div>
        <div className="services-grid">
          {services.map(([title, text, image], index) => <article className={"service-card reveal reveal--delay-" + (index + 1)} key={title}>
            <div className="service-card__image"><img src={image} alt={title + ", serviço de cuidado para pets"} width="1000" height="1053" loading="lazy" decoding="async" /><span>0{index + 1}</span></div>
            <div className="service-card__copy"><h3>{title}</h3><p>{text}</p><button type="button" onClick={openContact}>Saber mais <ArrowRight size={16} /></button></div>
          </article>)}
        </div>
      </section>

      <section id="depoimentos" className="testimonials section-pad"><div className="testimonial-line" aria-hidden="true" />
        <div className="testimonials__intro reveal"><p className="eyebrow">De quem já conhece</p><h2>“Cuidado” também aparece<br /><em>na forma de atender.</em></h2></div>
        <div className="testimonial-grid">
          {testimonials.map(([name, detail, quote], index) => <article className="testimonial reveal" key={name}>
            <div className="testimonial__stars" aria-label="5 estrelas">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} fill="currentColor" aria-hidden="true" />)}</div>
            <blockquote>“{quote}”</blockquote>
            <div className="testimonial__author"><span>{String.fromCharCode(77 + index)}</span><div><strong>{name}</strong><small>{detail}</small></div></div>
          </article>)}
        </div>
      </section>

      <section className="contact-band">
        <div className="contact-band__inner">
          <div><p className="eyebrow eyebrow--light">Uma conversa primeiro</p><h2>Quer conhecer o espaço<br />e entender qual cuidado faz sentido?</h2></div>
          <button className="button button--light" type="button" onClick={openContact}>Falar com a equipe <ArrowRight size={18} /></button>
        </div>
      </section>

      <section id="faq" className="faq section-pad"><div className="section-index" aria-hidden="true">05</div>
        <div className="faq__heading reveal"><p className="eyebrow">Antes de vir</p><h2>Algumas respostas<br /><em>para facilitar.</em></h2></div>
        <div className="faq__list">
          {faqs.map(([question, answer], index) => {
            const open = activeFaq === index;
            return <div className={"faq-item" + (open ? " is-open" : "")} key={question}>
              <button type="button" onClick={() => setActiveFaq(open ? null : index)} aria-expanded={open}><span>{question}</span><ChevronDown size={19} aria-hidden="true" /></button>
              <div className="faq-answer"><p>{answer}</p></div>
            </div>;
          })}
        </div>
      </section>

      <section id="contato" className="contact section-pad" ref={contactSectionRef}><div className="contact__kicker" aria-hidden="true">06 · contact</div>
        <div className="contact__image reveal"><img src={images.dayCare} alt="Dois cães em um espaço aberto e tranquilo" width="1000" height="1250" loading="lazy" decoding="async" /></div>
        <div className="contact__copy reveal">
          <p className="eyebrow">Fale com a gente</p>
          <h2>Seu pet merece um cuidado que faça sentido para a rotina dele.</h2>
          <p>Conte o nome do seu pet, o que você procura e o melhor horário para falar. A nossa equipe responde pelo WhatsApp.</p>

          <form className="contact-form" onSubmit={handleSubmit} noValidate aria-describedby="form-status">
            <div className="field-grid">
              <div className="field">
                <label htmlFor="name">Nome</label>
                <input id="name" name="name" type="text" autoComplete="name" placeholder="Seu nome" required />
              </div>
              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input id="email" name="email" type="email" autoComplete="email" placeholder="seu@email.com" required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="whatsapp">WhatsApp</label>
              <input id="whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="(22) 99999-9999" required />
            </div>
            <label className="consent">
              <input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} />
              <span>Aceito que a Pata & Cia use meus dados para responder ao meu contato, conforme a <button type="button" className="inline-link" onClick={() => setLegalDoc("privacidade")}>Política de Privacidade</button>.</span>
            </label>

            <div className="form-actions">
              <button className="button button--primary" type="submit" disabled={formStatus === "loading"}>
                {formStatus === "loading" ? <><span className="spinner" aria-hidden="true" /> Enviando...</> : <>Enviar meu contato <ArrowRight size={18} /></>}
              </button>
              <span className="form-helper">Front-end pronto para conectar a CRM, e-mail marketing ou webhook.</span>
            </div>

            <div id="form-status" className={"form-status form-status--" + formStatus} aria-live="polite" role="status">
              {formStatus === "success" && <><Check size={17} /> Recebemos seu contato. Este protótipo simula o envio; a integração real precisa ser conectada antes da publicação.</>}
              {formStatus === "error" && formError}
            </div>
          </form>

          <div className="contact__direct">
            <a className="contact-detail" href="https://wa.me/5522999999999" target="_blank" rel="noreferrer" onClick={() => trackEvent("Contact", { source: "whatsapp" })}><MessageCircle size={17} /> Chamar no WhatsApp</a>
            <a className="contact-detail" href="tel:+5522999999999"><Phone size={17} /> (22) 99999-9999</a>
            <div className="contact-detail"><MapPin size={17} /> Centro, Nova Friburgo — RJ</div>
            <a className="contact-detail" href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={17} /> @pataecia.pet</a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer__main">
          <div className="footer-brand"><div className="brand"><span className="brand__mark" aria-hidden="true"><span /></span><span><strong>PATA & CIA</strong><small>pet care</small></span></div><p>Cuidado próximo, rotina tranquila e mais presença para os pets que fazem parte da família.</p></div>
          <div className="footer-col"><span>Horários</span><p>Seg — Sex<br />08h às 19h</p><p>Sáb<br />09h às 16h</p></div>
          <div className="footer-col"><span>Visite</span><p>Rua General Osório, 118<br />Centro · Nova Friburgo/RJ</p><p>(22) 99999-9999</p></div>
        </div>
        <div className="site-footer__bottom">
          <span>© 2026 Pata & Cia. Todos os direitos reservados.</span>
          <div>
            <button type="button" onClick={() => setLegalDoc("privacidade")}>Privacidade</button>
            <button type="button" onClick={() => setLegalDoc("cookies")}>Cookies</button>
            <button type="button" onClick={() => setLegalDoc("acessibilidade")}>Acessibilidade</button>
          </div>
        </div>
      </footer>

      <a className="mobile-fixed-cta" href="https://wa.me/5522999999999" target="_blank" rel="noreferrer" onClick={() => trackEvent("Contact", { source: "mobile_cta" })}><MessageCircle size={18} /> Falar com a equipe</a>

      {cookiesVisible && <aside className="cookie-banner" aria-label="Aviso de cookies">
        <div><strong>Cookies e privacidade</strong><p>Este protótipo mantém métricas externas desativadas até que os IDs sejam configurados. Veja a nossa política para entender o modelo previsto.</p></div>
        <div className="cookie-banner__actions"><button type="button" onClick={() => setLegalDoc("cookies")}>Ler política</button><button type="button" className="cookie-ok" onClick={() => setCookiesVisible(false)}>Entendi</button></div>
      </aside>}

      {legalDoc && <div className="legal-overlay" role="presentation" onMouseDown={event => { if (event.currentTarget === event.target) setLegalDoc(null); }}>
        <section className="legal-dialog" role="dialog" aria-modal="true" aria-labelledby="legal-title">
          <button className="legal-close" type="button" onClick={() => setLegalDoc(null)} aria-label="Fechar"><X size={20} /></button>
          <p className="eyebrow">Informações da página</p>
          <h2 id="legal-title">{legalCopy[legalDoc].title}</h2>
          <p>{legalCopy[legalDoc].body}</p>
        </section>
      </div>}

      {/* Integration placeholders — no secret keys are exposed in the frontend. */}
      {/* Meta Pixel: PIXEL_ID | GA4: GA_MEASUREMENT_ID | GTM: GTM_CONTAINER_ID */}
      {/* Backend/CORS: if a backend is added, restrict origins to the official production domain. */}
    </main>
  );
}
