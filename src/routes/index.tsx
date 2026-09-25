import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ChevronDown, Instagram, MapPin, Menu, MessageCircle, Phone, ShieldCheck, Sparkles, Star, X } from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

const images = {
  hero: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1200&q=82",
  story: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1100&q=82",
  dayCare: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=82",
  grooming: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1000&q=82",
};

const services = [
  ["Banho & Tosa", "Um cuidado completo, com rotina tranquila e atenção ao perfil de cada pet.", images.grooming],
  ["Day Care", "Espaço pensado para brincar, socializar e gastar energia com segurança.", images.dayCare],
  ["Acompanhamento", "Orientação próxima para tornar os cuidados do dia a dia mais leves para você.", images.story],
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

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="pet-site">
      <header className="site-header">
        <div className="site-header__inner">
          <button className="brand" onClick={() => scrollTo("inicio")} type="button" aria-label="Pata & Cia, início">
            <span className="brand__mark"><span /></span>
            <span><strong>PATA & CIA</strong><small>pet care</small></span>
          </button>

          <nav className="desktop-nav" aria-label="Navegação principal">
            {[
              ["Início", "inicio"],
              ["Nossa história", "sobre"],
              ["Cuidados", "cuidados"],
              ["Depoimentos", "depoimentos"],
              ["FAQ", "faq"],
            ].map(([label, id]) => (
              <button key={id} type="button" onClick={() => scrollTo(id)}>{label}</button>
            ))}
          </nav>

          <button className="header-cta" type="button" onClick={() => scrollTo("contato")}>
            Falar com a equipe <ArrowRight size={16} />
          </button>

          <button className="mobile-menu-button" type="button" onClick={() => setMenuOpen(v => !v)} aria-expanded={menuOpen} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && <nav className="mobile-nav" aria-label="Navegação móvel">
          {[
            ["Início", "inicio"],
            ["Nossa história", "sobre"],
            ["Cuidados", "cuidados"],
            ["Depoimentos", "depoimentos"],
            ["FAQ", "faq"],
          ].map(([label, id]) => (
            <button key={id} type="button" onClick={() => scrollTo(id)}>{label}</button>
          ))}
          <button className="mobile-nav__cta" type="button" onClick={() => scrollTo("contato")}>Falar com a equipe <ArrowRight size={16} /></button>
        </nav>}
      </header>

      <section id="inicio" className="hero section-pad">
        <div className="hero__copy reveal">
          <p className="eyebrow"><Sparkles size={15} /> Cuidado que respeita cada jeito de ser</p>
          <h1>Mais carinho na rotina.<br /><em>Mais tranquilidade para você.</em></h1>
          <p className="hero__lead">Um espaço de cuidado para pets e tutores que acreditam que bem-estar começa nos pequenos detalhes.</p>
          <div className="hero__actions">
            <button className="button button--primary" type="button" onClick={() => scrollTo("contato")}>Falar com a equipe <ArrowRight size={18} /></button>
            <button className="text-link" type="button" onClick={() => scrollTo("cuidados")}>Conhecer nossos cuidados <ArrowRight size={16} /></button>
          </div>
          <div className="hero__note"><ShieldCheck size={16} /> Atendimento com rotina organizada, contato próximo e ambiente acolhedor.</div>
        </div>

        <div className="hero__visual reveal reveal--delay">
          <div className="hero__image-wrap">
            <img src={images.hero} alt="Cachorro em um ambiente claro e acolhedor" fetchPriority="high" />
            <div className="hero__seal"><span>cuidado</span><strong>próximo</strong><span>todos os dias</span></div>
          </div>
        </div>
      </section>

      <section className="pillars" aria-label="Diferenciais">
        <div className="pillars__inner">
          {[
            ["01", "Rotina tranquila", "Atendimento pensado para reduzir estresse e correria."],
            ["02", "Olhar individual", "Cada pet tem seus hábitos, sinais e preferências."],
            ["03", "Equipe presente", "Contato claro para você acompanhar o que importa."],
            ["04", "Cuidado de verdade", "Mais atenção aos detalhes que fazem parte da rotina."],
          ].map(([n, title, text]) => (
            <article key={n}><span>{n}</span><div><strong>{title}</strong><p>{text}</p></div></article>
          ))}
        </div>
      </section>

      <section id="sobre" className="story section-pad">
        <div className="story__image reveal">
          <img src={images.story} alt="Cachorro recebendo carinho" loading="lazy" />
          <span>FEITO PARA ELES. PENSADO PARA VOCÊ.</span>
        </div>
        <div className="story__copy reveal reveal--delay">
          <p className="eyebrow">Nossa forma de cuidar</p>
          <h2>Um olhar mais atento para o que o seu pet não consegue dizer.</h2>
          <p>A Pata & Cia nasceu com uma ideia simples: criar uma experiência de cuidado que respeita o tempo de cada pet e deixa o tutor mais seguro.</p>
          <p>Por isso, unimos uma rotina organizada, ambiente acolhedor e comunicação próxima. O objetivo é que cada visita seja tranquila — para quem chega de quatro patas e para quem deixa seu melhor amigo aos nossos cuidados.</p>
          <div className="signature"><span>com carinho,</span><strong>Pata & Cia</strong></div>
        </div>
        <div className="story__art" aria-hidden="true"><div className="art-sun" /><div className="art-hills" /><div className="art-house" /><div className="art-tree art-tree--one" /><div className="art-tree art-tree--two" /><div className="art-paw">🐾</div></div>
      </section>

      <section id="cuidados" className="services section-pad">
        <div className="section-heading reveal">
          <div><p className="eyebrow">Cuidados que fazem sentido</p><h2>Do básico ao especial,<br /><em>sem exagero.</em></h2></div>
          <p>Uma seleção de serviços para acompanhar a rotina do seu pet com mais conforto, organização e atenção.</p>
        </div>
        <div className="services-grid">
          {services.map(([title, text, image], index) => (
            <article className={"service-card reveal reveal--delay-" + (index + 1)} key={title}>
              <div className="service-card__image"><img src={image} alt={title} loading="lazy" /><span>0{index + 1}</span></div>
              <div className="service-card__copy"><h3>{title}</h3><p>{text}</p><button type="button" onClick={() => scrollTo("contato")}>Saber mais <ArrowRight size={16} /></button></div>
            </article>
          ))}
        </div>
      </section>

      <section id="depoimentos" className="testimonials section-pad">
        <div className="testimonials__intro reveal"><p className="eyebrow">De quem já conhece</p><h2>“Cuidado” também aparece<br /><em>na forma de atender.</em></h2></div>
        <div className="testimonial-grid">
          {testimonials.map(([name, detail, quote], index) => (
            <article className="testimonial reveal" key={name}>
              <div className="testimonial__stars" aria-label="5 estrelas">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} fill="currentColor" />)}</div>
              <blockquote>“{quote}”</blockquote>
              <div className="testimonial__author"><span>{String.fromCharCode(77 + index)}</span><div><strong>{name}</strong><small>{detail}</small></div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-band"><div className="contact-band__inner"><div><p className="eyebrow eyebrow--light">Uma conversa primeiro</p><h2>Quer conhecer o espaço<br />e entender qual cuidado faz sentido?</h2></div><button className="button button--light" type="button" onClick={() => scrollTo("contato")}>Falar com a equipe <ArrowRight size={18} /></button></div></section>

      <section id="faq" className="faq section-pad">
        <div className="faq__heading reveal"><p className="eyebrow">Antes de vir</p><h2>Algumas respostas<br /><em>para facilitar.</em></h2></div>
        <div className="faq__list">
          {faqs.map(([question, answer], index) => {
            const open = activeFaq === index;
            return <div className={"faq-item" + (open ? " is-open" : "")} key={question}>
              <button type="button" onClick={() => setActiveFaq(open ? -1 : index)} aria-expanded={open}><span>{question}</span><ChevronDown size={19} /></button>
              <div className="faq-answer"><p>{answer}</p></div>
            </div>;
          })}
        </div>
      </section>

      <section id="contato" className="contact section-pad">
        <div className="contact__image reveal"><img src={images.dayCare} alt="Dois cães em um espaço aberto" loading="lazy" /></div>
        <div className="contact__copy reveal reveal--delay">
          <p className="eyebrow">Fale com a gente</p>
          <h2>Seu pet merece um cuidado que faça sentido para a rotina dele.</h2>
          <p>Conte o nome do seu pet, o que você procura e o melhor horário para falar. A nossa equipe responde pelo WhatsApp.</p>
          <div className="contact__actions">
            <a className="button button--primary" href="https://wa.me/5522999999999" target="_blank" rel="noreferrer"><MessageCircle size={18} /> Chamar no WhatsApp</a>
            <a className="contact-detail" href="tel:+5522999999999"><Phone size={17} /> (22) 99999-9999</a>
            <div className="contact-detail"><MapPin size={17} /> Centro, Nova Friburgo — RJ</div>
            <a className="contact-detail" href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={17} /> @pataecia.pet</a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer__main">
          <div className="footer-brand"><div className="brand"><span className="brand__mark"><span /></span><span><strong>PATA & CIA</strong><small>pet care</small></span></div><p>Cuidado próximo, rotina tranquila e mais presença para os pets que fazem parte da família.</p></div>
          <div className="footer-col"><span>Horários</span><p>Seg — Sex<br />08h às 19h</p><p>Sáb<br />09h às 16h</p></div>
          <div className="footer-col"><span>Visite</span><p>Rua General Osório, 118<br />Centro · Nova Friburgo/RJ</p><p>(22) 99999-9999</p></div>
        </div>
        <div className="site-footer__bottom"><span>© 2026 Pata & Cia. Todos os direitos reservados.</span><div><a href="#privacidade">Privacidade</a><a href="#cookies">Cookies</a><a href="#acessibilidade">Acessibilidade</a></div></div>
      </footer>

      <a className="mobile-fixed-cta" href="https://wa.me/5522999999999" target="_blank" rel="noreferrer"><MessageCircle size={18} /> Falar com a equipe</a>

      {/* Analytics placeholders: Meta Pixel PIXEL_ID · GA4 GA_MEASUREMENT_ID · GTM GTM_CONTAINER_ID */}
    </main>
  );
}
