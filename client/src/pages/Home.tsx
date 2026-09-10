/**
 * Direção: Clube Editorial Cinematográfico — composição assimétrica, preto dominante,
 * tipografia monumental, imagens reais do Stúdio M8 e movimento de precisão.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate } from "animejs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  MoveUpRight,
  Scissors,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { ASSETS, CONTACT, SERVICES, TEAM_SLOTS, getWhatsAppUrl } from "@/brand";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  ["Início", "#inicio"],
  ["A barbearia", "#barbearia"],
  ["Serviços", "#servicos"],
  ["Experiência", "#experiencia"],
  ["Galeria", "#galeria"],
  ["Contato", "#contato"],
] as const;

const GALLERY = [
  { src: ASSETS.interior, alt: "Interior real do Stúdio M8 com profissionais e clientes", tag: "O ritual" },
  { src: ASSETS.haircut, alt: "Corte masculino executado no Stúdio M8", tag: "A precisão" },
  { src: ASSETS.facade, alt: "Fachada real do Stúdio M8 | Barbearia", tag: "O espaço" },
] as const;

function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <a className="brand-lockup" href="#inicio" aria-label="Stúdio M8 — voltar ao início">
      <img src={ASSETS.monogram} alt="" aria-hidden="true" />
      <span className="brand-type">
        <strong>STÚDIO M8</strong>
        {!compact && <small>BARBEARIA</small>}
      </span>
    </a>
  );
}

function SectionEyebrow({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="section-eyebrow" data-reveal>
      <span>{index}</span>
      <i />
      <p>{children}</p>
    </div>
  );
}

function MagneticLink({
  children,
  secondary = false,
  onClick,
  href,
}: {
  children: React.ReactNode;
  secondary?: boolean;
  onClick?: () => void;
  href?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const move = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia("(pointer:fine)").matches || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, { x: x * 0.16, y: y * 0.16, duration: 0.35, ease: "power3.out" });
  };

  const reset = () => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, .45)" });
  };

  return (
    <a
      ref={ref}
      href={href ?? "#contato"}
      onClick={(event) => {
        if (onClick) {
          event.preventDefault();
          onClick();
        }
      }}
      onPointerMove={move}
      onPointerLeave={reset}
      className={`magnetic-link ${secondary ? "is-secondary" : ""}`}
      data-cursor="link"
    >
      <span>{children}</span>
      <ArrowRight size={17} strokeWidth={1.5} />
    </a>
  );
}

function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadValue, setLoadValue] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeService, setActiveService] = useState(0);

  const requestBooking = () => {
    const url = getWhatsAppUrl();
    if (!url) {
      toast("WhatsApp em configuração", {
        description: "Adicione o número real em client/src/brand.ts para ativar o agendamento.",
      });
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    document.body.style.overflow = loading || menuOpen || lightbox !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading, menuOpen, lightbox]);

  useEffect(() => {
    const started = performance.now();
    const tick = window.setInterval(() => {
      const progress = Math.min(100, Math.round(((performance.now() - started) / 1750) * 100));
      setLoadValue(progress);
      if (progress >= 100) {
        window.clearInterval(tick);
        window.setTimeout(() => setLoading(false), 180);
      }
    }, 28);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(available > 0 ? window.scrollY / available : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    animate(".mobile-nav a", {
      opacity: [0, 1],
      translateY: [24, 0],
      delay: (_el, i) => (i ?? 0) * 65,
      duration: 520,
      ease: "out(4)",
    });
  }, [menuOpen]);

  useEffect(() => {
    const cursor = document.querySelector<HTMLElement>(".custom-cursor");
    if (!cursor || !window.matchMedia("(pointer:fine)").matches) return;
    const move = (event: MouseEvent) => {
      gsap.to(cursor, { x: event.clientX, y: event.clientY, duration: 0.16, ease: "power3.out" });
      const target = (event.target as HTMLElement).closest("[data-cursor]");
      cursor.dataset.mode = target?.getAttribute("data-cursor") || "default";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useLayoutEffect(() => {
    if (loading || !root.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".hero-kicker, .hero-title-line, .hero-copy, .hero-actions, .hero-scroll",
        { y: 42, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.15, stagger: 0.1, ease: "power4.out" },
      );

      gsap.to(".hero-photo", {
        scale: 1.08,
        xPercent: 1.8,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 },
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 86%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".parallax-media").forEach((frame) => {
        const image = frame.querySelector("img");
        if (!image) return;
        gsap.fromTo(
          image,
          { yPercent: -4, scale: 1.04 },
          { yPercent: 4, scale: 1.1, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 1 } },
        );
      });

      gsap.fromTo(
        ".about-photo-wrap",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          ease: "power4.inOut",
          scrollTrigger: { trigger: ".about-photo-wrap", start: "top 78%", end: "top 35%", scrub: 1 },
        },
      );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const track = document.querySelector<HTMLElement>(".space-track");
        if (!track) return;
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ".space-pin",
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth + 500}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    }, root);
    return () => context.revert();
  }, [loading]);

  return (
    <div ref={root} className="site-shell">
      <div className="custom-cursor" aria-hidden="true"><span>VIEW</span></div>
      <div className="scroll-progress" aria-hidden="true" style={{ transform: `scaleX(${Math.min(1, scrollProgress)})` }} />

      <div className={`preloader ${loading ? "is-visible" : "is-done"}`} aria-hidden={!loading}>
        <div className="preloader-brand">
          <img src={ASSETS.monogram} alt="" />
          <strong>STÚDIO M8</strong>
          <span>BARBEARIA</span>
        </div>
        <div className="preloader-rule"><i style={{ transform: `scaleX(${loadValue / 100})` }} /></div>
        <p>{String(loadValue).padStart(2, "0")} — 100%</p>
      </div>

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <BrandLockup />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {NAV_ITEMS.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <button className="header-cta" onClick={requestBooking}>Agendar horário <ArrowRight size={15} /></button>
        <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Abrir menu"><Menu /></button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-top"><BrandLockup /><button onClick={() => setMenuOpen(false)} aria-label="Fechar menu"><X /></button></div>
        <nav className="mobile-nav">
          {NAV_ITEMS.map(([label, href], index) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}<ArrowRight /></a>
          ))}
        </nav>
        <button className="mobile-book" onClick={requestBooking}>Agendar pelo WhatsApp <MoveUpRight /></button>
      </div>

      <main>
        <section id="inicio" className="hero">
          <img className="hero-photo" src={ASSETS.interior} alt="Interior real do Stúdio M8 | Barbearia durante o atendimento" />
          <div className="hero-shade" />
          <img className="precision-overlay" src={ASSETS.precisionLines} alt="" aria-hidden="true" />
          <div className="hero-content">
            <p className="hero-kicker"><span /> STÚDIO M8 | BARBEARIA</p>
            <h1>
              <span className="hero-title-line">Seu estilo.</span>
              <span className="hero-title-line is-outline">Sua presença.</span>
            </h1>
            <p className="hero-copy">Mais do que um corte. Uma experiência feita para homens que valorizam presença, precisão e estilo.</p>
            <div className="hero-actions">
              <MagneticLink onClick={requestBooking}>Agendar horário</MagneticLink>
              <MagneticLink href="#barbearia" secondary>Conhecer o Stúdio M8</MagneticLink>
            </div>
          </div>
          <div className="hero-index" aria-hidden="true"><b>01</b><span>/</span><small>08</small></div>
          <a href="#barbearia" className="hero-scroll"><span>Scroll to explore</span><i /><ArrowDown size={14} /></a>
        </section>

        <section id="barbearia" className="about section-pad">
          <div className="content-wide">
            <SectionEyebrow index="01">O Stúdio M8</SectionEyebrow>
            <div className="about-grid">
              <div className="about-heading" data-reveal>
                <h2>Não é apenas<br />um corte.</h2>
                <p>É uma experiência.</p>
              </div>
              <div className="about-copy" data-reveal>
                <p>No Stúdio M8, cada detalhe foi pensado para transformar o cuidado masculino numa experiência de estilo, precisão e confiança.</p>
                <span>STÚDIO M8 | BARBEARIA · EST. —</span>
              </div>
              <figure className="about-photo-wrap parallax-media" data-cursor="view">
                <img src={ASSETS.facade} alt="Fachada real do Stúdio M8 | Barbearia" />
                <figcaption><b>O espaço</b><span>Fachada Stúdio M8</span></figcaption>
              </figure>
              <div className="about-note" data-reveal><Scissors strokeWidth={1} /><p>Um lugar pensado para transformar cuidado em presença.</p></div>
            </div>
          </div>
        </section>

        <section className="values-strip" aria-label="Valores do Stúdio M8">
          <div className="values-marquee">
            {["ESTILO", "PRECISÃO", "PRESENÇA", "EXPERIÊNCIA", "ESTILO", "PRECISÃO", "PRESENÇA"].map((item, index) => (
              <span key={`${item}-${index}`}>{item}<i>✦</i></span>
            ))}
          </div>
        </section>

        <section id="servicos" className="services section-pad">
          <img className="services-texture" src={ASSETS.grainField} alt="" aria-hidden="true" />
          <div className="content-wide">
            <SectionEyebrow index="02">Serviços</SectionEyebrow>
            <div className="services-intro" data-reveal>
              <h2>Precisão<br /><em>em cada detalhe.</em></h2>
              <p>Escolha o ritual. Nós tratamos da forma, do acabamento e da intenção.</p>
            </div>
            <div className="services-layout">
              <div className="service-list">
                {SERVICES.map((service, index) => (
                  <button
                    key={service.number}
                    className={activeService === index ? "is-active" : ""}
                    onMouseEnter={() => setActiveService(index)}
                    onFocus={() => setActiveService(index)}
                  >
                    <span>{service.number}</span>
                    <strong>{service.title}</strong>
                    <p>{service.description}</p>
                    <ArrowRight strokeWidth={1.2} />
                  </button>
                ))}
              </div>
              <aside className="service-visual" data-cursor="view">
                <img src={ASSETS.haircut} alt="Detalhe de corte masculino realizado no Stúdio M8" />
                <span>0{activeService + 1} / 06</span>
                <p>{SERVICES[activeService].title}</p>
              </aside>
            </div>
          </div>
        </section>

        <section id="experiencia" className="experience">
          <div className="experience-photo parallax-media">
            <img src={ASSETS.interior} alt="Ambiente e atendimento reais no interior do Stúdio M8" />
            <div className="experience-shade" />
          </div>
          <div className="experience-content content-wide">
            <SectionEyebrow index="03">A experiência</SectionEyebrow>
            <h2 data-reveal><span>Entre.</span><span>Sente.</span><span>Transforme-se.</span></h2>
            <div className="experience-caption" data-reveal><span>01 — Escuta</span><span>02 — Técnica</span><span>03 — Presença</span></div>
          </div>
        </section>

        <section id="galeria" className="gallery section-pad">
          <div className="content-wide">
            <SectionEyebrow index="04">Galeria</SectionEyebrow>
            <div className="gallery-heading" data-reveal>
              <h2>O Stúdio M8<br />por dentro.</h2>
              <p>Imagens reais. Técnica real. A experiência como ela acontece.</p>
            </div>
            <div className="gallery-grid">
              {GALLERY.map((image, index) => (
                <button key={image.src} className={`gallery-item gallery-item-${index + 1}`} onClick={() => setLightbox(index)} data-cursor="view">
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <span><b>0{index + 1}</b>{image.tag}<MoveUpRight /></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="space-pin">
          <div className="space-track">
            <div className="space-panel space-title-panel">
              <SectionEyebrow index="05">Nosso espaço</SectionEyebrow>
              <h2>Um espaço<br />pensado<br /><em>para você.</em></h2>
            </div>
            <div className="space-image-panel">
              <img src={ASSETS.interior} alt="Vista ampla do espaço interior do Stúdio M8" loading="lazy" />
              <span>AMBIENTE REAL · STÚDIO M8</span>
            </div>
            <div className="space-word-panel space-index-panel">
              <div className="space-index-head"><span>ONM / 04</span><p>QUATRO MEDIDAS DE UMA EXPERIÊNCIA</p></div>
              <div className="space-values-grid">
                {[
                  ["Estilo", "A imagem começa na leitura certa de quem você é."],
                  ["Precisão", "Cada linha tem uma razão. Cada detalhe tem intenção."],
                  ["Conforto", "Tempo, ambiente e cuidado no ritmo certo."],
                  ["Experiência", "O resultado começa antes do primeiro corte."],
                ].map(([title, text], index) => (
                  <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="team section-pad">
          <img className="team-metal" src={ASSETS.metalSurface} alt="" aria-hidden="true" />
          <div className="content-wide">
            <SectionEyebrow index="06">Profissionais</SectionEyebrow>
            <div className="team-heading" data-reveal><h2>Quem domina<br />o detalhe.</h2><p>Esta área está preparada para receber os profissionais reais do Stúdio M8, sem nomes ou perfis fictícios.</p></div>
            <div className="team-slots">
              {TEAM_SLOTS.map((slot) => (
                <div className="team-slot" key={slot} data-reveal>
                  <span>ONM / {slot}</span>
                  <div className="team-placeholder">
                    <span className="plate-code">RESERVED — PROFILE {slot}</span>
                    <i aria-hidden="true" />
                    <b>Identidade em preparação</b>
                    <small>Dados reais necessários</small>
                  </div>
                  <div><strong>Profissional a adicionar</strong><small>Especialidade e Instagram</small></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="location section-pad">
          <div className="content-wide location-grid">
            <div className="location-copy">
              <SectionEyebrow index="07">Localização</SectionEyebrow>
              <h2 data-reveal>Encontre<br />o Stúdio M8.</h2>
              <div className="contact-lines" data-reveal>
                <div><span>Endereço</span><p>{CONTACT.address}</p></div>
                <div><span>Horário</span><p>{CONTACT.hours}</p></div>
                <div><span>WhatsApp</span><button onClick={requestBooking}>Número a configurar <ArrowRight /></button></div>
                <div><span>Instagram</span><p>{CONTACT.instagramHandle}</p></div>
              </div>
              <MagneticLink onClick={() => toast("Mapa em configuração", { description: "Adicione a morada real em client/src/brand.ts." })}>Como chegar</MagneticLink>
            </div>
            <div className="map-placeholder" data-reveal>
              <div className="map-grid-lines" />
              <div className="map-crosshair" aria-hidden="true"><i /><i /></div>
              <p>Mapa preparado para a morada real</p>
              <span>ONM / LOCATION — COORDENADAS A CONFIGURAR</span>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <img src={ASSETS.interior} alt="Interior do Stúdio M8 | Barbearia" loading="lazy" />
          <div className="final-cta-shade" />
          <img className="final-lines" src={ASSETS.precisionLines} alt="" aria-hidden="true" />
          <div className="final-cta-content" data-reveal>
            <span>O próximo capítulo</span>
            <h2>Seu próximo<br />visual começa aqui.</h2>
            <p>Agende o seu horário e viva a experiência Stúdio M8.</p>
            <MagneticLink onClick={requestBooking}>Agendar horário</MagneticLink>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <BrandLockup />
          <h2>Estilo.<br />Precisão.<br /><em>Presença.</em></h2>
          <nav>{NAV_ITEMS.slice(0, 5).map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
          <div className="footer-social">
            <button onClick={() => toast("Instagram em configuração")}>Instagram <Instagram /></button>
            <button onClick={requestBooking}>WhatsApp <MessageCircle /></button>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 STÚDIO M8 | BARBEARIA.</span><span>TODOS OS DIREITOS RESERVADOS.</span><a href="#inicio">VOLTAR AO TOPO <ArrowDown /></a></div>
      </footer>

      <button className="whatsapp-float" onClick={requestBooking} aria-label="Agendar pelo WhatsApp">
        <MessageCircle /><span>Agendar pelo WhatsApp</span>
      </button>
      <button className="mobile-sticky-book" onClick={requestBooking}>Agendar horário <ArrowRight /></button>

      {lightbox !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galeria ampliada">
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Fechar galeria"><X /></button>
          <button className="lightbox-prev" onClick={() => setLightbox((lightbox + GALLERY.length - 1) % GALLERY.length)} aria-label="Imagem anterior"><ChevronLeft /></button>
          <figure><img src={GALLERY[lightbox].src} alt={GALLERY[lightbox].alt} /><figcaption><span>0{lightbox + 1} / 03</span><strong>{GALLERY[lightbox].tag}</strong></figcaption></figure>
          <button className="lightbox-next" onClick={() => setLightbox((lightbox + 1) % GALLERY.length)} aria-label="Próxima imagem"><ChevronRight /></button>
        </div>
      )}
    </div>
  );
}

export default Home;
