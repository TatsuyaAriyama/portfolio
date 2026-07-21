import { createContext, useContext, useEffect, useRef, useState } from "react";
import profilePhoto from "./assets/profile-photo.jpg";

const LangContext = createContext({ lang: "ja", t: null });
const useLang = () => useContext(LangContext);

const asset = (path) => import.meta.env.BASE_URL + path.replace(/^\//, "");

const APPS = [
  {
    id: "landfall",
    name: "Landfall - StudyLog",
    tagline: {
      ja: "休みながら続ける、学びの記録",
      en: "A study log you keep by resting, not by streaks",
    },
    meta: "2026.07 / SwiftUI · iOS",
    icon: asset("/icons/landfall.png"),
    repo: "https://github.com/TatsuyaAriyama/Landfall",
    live: null,
    shots: [
      asset("/landfall/00-share.png"),
      asset("/landfall/01.png"),
      asset("/landfall/02.png"),
      asset("/landfall/03.png"),
      asset("/landfall/04.png"),
      asset("/landfall/05.png"),
    ],
    shotsEn: [
      asset("/landfall/en/00-share.png"),
      asset("/landfall/en/01-home.png"),
      asset("/landfall/en/02-coding.png"),
      asset("/landfall/en/03-trace.png"),
      asset("/landfall/en/04-logbook.png"),
      asset("/landfall/en/05-phoenix.png"),
    ],
    pills: {
      ja: [
        "三日坊主の常習犯",
        "ストリークに疲れた",
        "休むと戻れなくなる",
        "がんばりを静かに残したい",
      ],
      en: [
        "Always quitting after a few days",
        "Tired of streaks",
        "Can't come back after a break",
        "Want effort quietly recorded",
      ],
    },
  },
  {
    id: "suzaku",
    name: {
      ja: "朱雀 Suzaku - 東京コンパス",
      en: "Suzaku - Tokyo Compass",
    },
    tagline: {
      ja: "方角だけを示す、ミニマルなコンパス",
      en: "A minimal compass that shows only the direction",
    },
    meta: "2026.07 / React · Capacitor",
    icon: asset("/icons/suzaku.png"),
    repo: "https://github.com/TatsuyaAriyama/suzaku",
    appStore: "https://apps.apple.com/jp/app/id6788317890",
    live: "https://tokyocompass.app/",
    shots: [
      asset("/suzaku/01-direction.png"),
      asset("/suzaku/02-find.png"),
      asset("/suzaku/03-aligned.png"),
      asset("/suzaku/04-glance.png"),
      asset("/suzaku/05-arrive.png"),
    ],
    shotsEn: [
      asset("/suzaku/en/01-direction.png"),
      asset("/suzaku/en/02-find.png"),
      asset("/suzaku/en/03-aligned.png"),
      asset("/suzaku/en/04-glance.png"),
      asset("/suzaku/en/05-arrive.png"),
    ],
    pills: {
      ja: [
        "地図を読むのが苦手",
        "歩きスマホをやめたい",
        "散歩と寄り道が好き",
        "「だいたいあっち」で十分",
      ],
      en: [
        "Not great at reading maps",
        "Want to stop walking while staring at the phone",
        "Loves strolls and detours",
        "\"Roughly that way\" is enough",
      ],
    },
  },
  {
    id: "madoromi",
    name: "Madoromi",
    tagline: {
      ja: "至高の睡眠を設計する",
      en: "Design your sleep for sharper thinking",
    },
    meta: "2026.06 / React · Capacitor",
    icon: asset("/icons/madoromi.png"),
    repo: "https://github.com/TatsuyaAriyama/Modoromi",
    appStore: "https://apps.apple.com/jp/app/id6782383530",
    live: null,
    shots: [
      asset("/madoromi/01-tonight.png"),
      asset("/madoromi/03-orbit.png"),
      asset("/madoromi/04-history.png"),
      asset("/madoromi/05-goodnight.png"),
    ],
    shotsEn: [
      asset("/madoromi/en/01-tonight.png"),
      asset("/madoromi/en/03-orbit.png"),
      asset("/madoromi/en/04-history.png"),
      asset("/madoromi/en/05-goodnight.png"),
    ],
    pills: {
      ja: [
        "翌日の頭のキレを上げたい",
        "夜ふかしがやめられない",
        "睡眠負債が気になる",
        "静かなアプリが好き",
      ],
      en: [
        "Want a sharper mind tomorrow",
        "Can't stop staying up late",
        "Worried about sleep debt",
        "Loves quiet apps",
      ],
    },
  },
  {
    id: "kasane",
    name: "kasane",
    tagline: {
      ja: "同じ景色を、そっと重ねる定点フォトログ",
      en: "A fixed-point photo log that gently layers the same view",
    },
    meta: "2026.06 / iOS",
    icon: asset("/icons/kasane.jpg"),
    repo: null,
    appStore: "https://apps.apple.com/jp/app/id6779988652",
    live: null,
    shots: [
      asset("/kasane/01-hero.png"),
      asset("/kasane/02-ghost.png"),
      asset("/kasane/03-timelapse.png"),
      asset("/kasane/04-home.png"),
    ],
    shotsEn: [
      asset("/kasane/en/01-hero.png"),
      asset("/kasane/en/02-ghost.png"),
      asset("/kasane/en/03-timelapse.png"),
      asset("/kasane/en/04-home.png"),
    ],
    pills: {
      ja: [
        "同じ構図で撮り続けたい",
        "少しずつの変化を残したい",
        "定点観測が好き",
        "静かなアプリが好き",
      ],
      en: [
        "Want to keep the same composition",
        "Want to record gradual change",
        "Loves fixed-point observation",
        "Loves quiet apps",
      ],
    },
  },
];

const UI = {
  ja: {
    navApps: "アプリ",
    navAbout: "航海士",
    heroKicker: "TATSUYA ARIYAMA — PORTFOLIO",
    heroTitleA: "小さく作って、",
    heroTitleB1: "また",
    heroTitleHl: "出航",
    heroTitleB2: "する。",
    heroNote:
      "静かで、押し付けないデザイン。日常にそっと寄り添うアプリを作っています。",
    statApps: "公開アプリ",
    statAppsUnit: "本",
    statPlatforms: "プラットフォーム",
    statPlatformsUnit: "つ",
    statSince: "個人開発",
    statSinceUnit: "年〜",
    appsLabel: "これまでの航海",
    appsTitle: "4つの、小さな船。",
    aboutLabel: "航海士",
    aboutTitle: "つくっている人。",
    recommend: "こんな人におすすめ：",
    web: "web",
    appStoreAria: (n) => `${n} を App Store で見る`,
    shotAria: (n, i) => `${n} のスクリーンショット ${i} を拡大`,
    lbClose: "閉じる",
    lbPrev: "前へ",
    lbNext: "次へ",
    crewKana: "ありやま たつや",
    crewName: "有山達也",
    crewBirth: "2001年6月26日",
    log1: "情報セキュリティを軸に、IT基礎を体系的に学習。安全で信頼されるものづくりを目指しています。",
    log1v: "now",
    log2: "iOS・macOS向けのサービスを個人開発中",
    log2v: "2026〜",
    log3: "2023 — 大学在学中、Udemyで学んでクリッカーゲームをGoogle Playで公開",
    log3v: "DL 10万+",
    quote: "小さく作り、動かし、使いながら磨き込む。",
    crewBrand: "Tatsuya Ariyama — 航海誌",
    btnGitHub: "GitHub を見る →",
    btnX: "X (@protoari) →",
    footHome: "ホーム",
    footCopy: (y) => `© ${y} Tatsuya Ariyama — 港にて`,
    langToggle: "EN",
  },
  en: {
    navApps: "Apps",
    navAbout: "Sailor",
    heroKicker: "TATSUYA ARIYAMA — PORTFOLIO",
    heroTitleA: "Build small,",
    heroTitleB1: "set ",
    heroTitleHl: "sail",
    heroTitleB2: " again.",
    heroNote:
      "Quiet design that never pushes. I make apps that gently sit beside everyday life.",
    statApps: "Apps shipped",
    statAppsUnit: "",
    statPlatforms: "Platforms",
    statPlatformsUnit: "",
    statSince: "Solo dev",
    statSinceUnit: "—",
    appsLabel: "The voyages so far",
    appsTitle: "Four small ships.",
    aboutLabel: "Sailor",
    aboutTitle: "The one who builds them.",
    recommend: "Made for people who:",
    web: "web",
    appStoreAria: (n) => `View ${n} on the App Store`,
    shotAria: (n, i) => `Enlarge ${n} screenshot ${i}`,
    lbClose: "Close",
    lbPrev: "Previous",
    lbNext: "Next",
    crewKana: "ARIYAMA Tatsuya",
    crewName: "Tatsuya Ariyama",
    crewBirth: "June 26, 2001",
    log1: "Studying IT fundamentals systematically, centered on information security — aiming to build safe, trustworthy things.",
    log1v: "now",
    log2: "Building services for iOS and macOS as a solo developer",
    log2v: "2026–",
    log3: "2023 — Learned on Udemy in university and shipped a clicker game on Google Play",
    log3v: "100k+ DL",
    quote: "Build small, ship it, and refine it while using it.",
    crewBrand: "Tatsuya Ariyama — Logbook",
    btnGitHub: "View GitHub →",
    btnX: "X (@protoari) →",
    footHome: "Home",
    footCopy: (y) => `© ${y} Tatsuya Ariyama — at harbor`,
    langToggle: "日本語",
  },
};

const pick = (v, lang) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] : v);

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const counters = Array.from(document.querySelectorAll("[data-count-to]"));
    counters.forEach((el) => {
      el.textContent = "0" + (el.dataset.countSuffix ?? "");
    });
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const runCount = (el) => {
      const target = Number(el.dataset.countTo);
      if (!Number.isFinite(target)) return;
      const suffix = el.dataset.countSuffix ?? "";
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / 1200, 1);
        el.textContent = Math.round(easeOut(p) * target).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          const counter = entry.target.matches("[data-count-to]")
            ? entry.target
            : entry.target.querySelector("[data-count-to]");
          if (counter) runCount(counter);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => els.forEach((el) => io.observe(el)));
    });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);
}

function Boat({ className }) {
  return (
    <svg className={className} viewBox="0 0 150 92" aria-hidden="true">
      <path d="M92 4 C82 26 77 46 79 63 L50 63 C63 50 79 28 92 4 Z" />
      <path d="M42 70 Q75 82 110 70 L101 80 Q74 88 51 80 Z" />
      <rect x="6" y="54" width="28" height="5" rx="2.5" opacity="0.55" />
      <rect x="0" y="67" width="20" height="5" rx="2.5" opacity="0.35" />
    </svg>
  );
}

function Hills({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 190"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 190 L0 138 C140 124 300 92 470 98 C610 103 680 142 810 134 C940 126 1010 74 1170 68 C1280 64 1370 88 1440 100 L1440 190 Z" />
    </svg>
  );
}

function SiteNav({ onToggleLang }) {
  const { t } = useLang();
  const navRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    const sentinel = sentinelRef.current;
    if (!nav || !sentinel) return;
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(([entry]) => {
        nav.classList.toggle("is-shown", !entry.isIntersecting);
      });
      io.observe(sentinel);
      return () => io.disconnect();
    }
    const onScroll = () => nav.classList.toggle("is-shown", window.scrollY > 220);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="site-nav-sentinel" aria-hidden="true" />
      <header ref={navRef} className="site-nav">
        <a href="#top" className="site-nav__wm">
          Tatsuya Ariyama
        </a>
        <nav className="site-nav__links">
          <a href="#apps">{t.navApps}</a>
          <a href="#about">{t.navAbout}</a>
          <button type="button" className="lang-toggle" onClick={onToggleLang}>
            {t.langToggle}
          </button>
        </nav>
      </header>
    </>
  );
}

function AppShots({ app, shots, onOpen }) {
  const { lang, t } = useLang();
  const wrapRef = useRef(null);
  const shotsRef = useRef(null);
  const name = pick(app.name, lang);

  useEffect(() => {
    const wrap = wrapRef.current;
    const shots = shotsRef.current;
    if (!wrap || !shots) return;
    const update = () => {
      const max = shots.scrollWidth - shots.clientWidth;
      wrap.classList.toggle("is-end", shots.scrollLeft >= max - 4);
    };
    shots.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      shots.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={wrapRef} className="app-shots-wrap">
      <div ref={shotsRef} className="app-shots" tabIndex={0}>
        {shots.map((src, i) => (
          <button
            key={src}
            type="button"
            className="shot-btn"
            onClick={() => onOpen(app, i)}
            aria-label={t.shotAria(name, i + 1)}
          >
            <img
              src={src}
              alt={`${name} screenshot ${i + 1}`}
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function AppBlock({ app, onOpen }) {
  const { lang, t } = useLang();
  const name = pick(app.name, lang);
  const tagline = pick(app.tagline, lang);
  const pills = pick(app.pills, lang);
  const shots = lang === "en" && app.shotsEn ? app.shotsEn : app.shots;

  return (
    <article className="app-block reveal">
      <div className="app-header">
        <a
          href={app.appStore ?? app.live ?? app.repo}
          className="app-icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={app.icon} width="256" height="256" alt={`${name} icon`} decoding="async" />
        </a>
        <div className="app-info">
          <p className="app-meta">{app.meta}</p>
          <h2 className="app-name">{name}</h2>
          <div className="app-tagline-row">
            <span className="app-tagline">{tagline}</span>
            <span className="app-links">
              {app.appStore && (
                <a
                  href={app.appStore}
                  className="app-store-badge"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.appStoreAria(name)}
                >
                  <img src={asset("/app-store-badge.svg")} alt="Download on the App Store" />
                </a>
              )}
              {app.live && (
                <a
                  href={app.live}
                  className="app-link-badge"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{t.web}</span>
                  <span className="app-link-arrow">→</span>
                </a>
              )}
              {app.repo && (
                <a
                  href={app.repo}
                  className="app-link-badge"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>GitHub</span>
                  <span className="app-link-arrow">→</span>
                </a>
              )}
            </span>
          </div>
        </div>
      </div>

      <AppShots app={app} shots={shots} onOpen={onOpen} />

      <div className="recommend">
        <span className="recommend-label">{t.recommend}</span>
        <div className="pills">
          {pills.map((pill) => (
            <span className="pill" key={pill}>
              {pill}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function Lightbox({ data, onClose, onNav }) {
  useEffect(() => {
    if (!data) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNav(1);
      else if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [data, onClose, onNav]);

  if (!data) return null;
  const { app, index, lang, t } = data;
  const name = pick(app.name, lang);
  const shots = lang === "en" && app.shotsEn ? app.shotsEn : app.shots;
  const total = shots.length;
  const many = total > 1;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={name}
      onClick={onClose}
    >
      <button type="button" className="lightbox-close" aria-label={t.lbClose} onClick={onClose}>
        ✕
      </button>

      {many && (
        <button
          type="button"
          className="lightbox-nav lightbox-nav--prev"
          aria-label={t.lbPrev}
          onClick={(e) => {
            e.stopPropagation();
            onNav(-1);
          }}
        >
          ‹
        </button>
      )}

      <img
        className="lightbox-img"
        src={shots[index]}
        alt={`${name} screenshot ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
      />

      {many && (
        <button
          type="button"
          className="lightbox-nav lightbox-nav--next"
          aria-label={t.lbNext}
          onClick={(e) => {
            e.stopPropagation();
            onNav(1);
          }}
        >
          ›
        </button>
      )}

      <div className="lightbox-meta" onClick={(e) => e.stopPropagation()}>
        <span className="lightbox-name">{name}</span>
        {many && (
          <span className="lightbox-count">
            {index + 1} / {total}
          </span>
        )}
      </div>
    </div>
  );
}

function App() {
  const [year] = useState(() => new Date().getFullYear());
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "ja";
    const saved = localStorage.getItem("lang");
    if (saved === "ja" || saved === "en") return saved;
    return navigator.language && navigator.language.toLowerCase().startsWith("ja")
      ? "ja"
      : "en";
  });
  const [lightbox, setLightbox] = useState(null);
  useReveal();

  const t = UI[lang];

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === "ja" ? "en" : "ja"));
  const openShot = (app, index) => setLightbox({ app, index });
  const closeShot = () => setLightbox(null);
  const navShot = (dir) =>
    setLightbox((prev) => {
      if (!prev) return prev;
      const shots =
        lang === "en" && prev.app.shotsEn ? prev.app.shotsEn : prev.app.shots;
      const total = shots.length;
      return { ...prev, index: (prev.index + dir + total) % total };
    });

  return (
    <LangContext.Provider value={{ lang, t }}>
      <div id="top">
        <SiteNav onToggleLang={toggleLang} />
        <header className="voyage-hero">
          <div className="inner">
            <p className="hero-kicker reveal">{t.heroKicker}</p>
            <h1 className="hero-title reveal" style={{ "--reveal-delay": "0.08s" }}>
              <span className="hero-line">{t.heroTitleA}</span>
              <span className="hero-line">
                {t.heroTitleB1}
                <mark className="hl">{t.heroTitleHl}</mark>
                {t.heroTitleB2}
              </span>
            </h1>
            <p className="hero-note reveal" style={{ "--reveal-delay": "0.16s" }}>
              {t.heroNote}
            </p>
          </div>
          <div className="hero-shore" aria-hidden="true">
            <span className="drift drift-1" />
            <span className="drift drift-2" />
            <span className="drift drift-3" />
            <Boat className="hero-boat" />
            <Hills className="hero-hills" />
          </div>
        </header>

        <div className="page">
          <section className="stats">
            <div className="inner stats-row">
              <div className="stat reveal" style={{ "--reveal-delay": "0s" }}>
                <p className="stat-label">{t.statApps}</p>
                <p className="stat-num">
                  <span data-count-to="4">4</span>
                  {t.statAppsUnit && <span className="stat-unit">{t.statAppsUnit}</span>}
                </p>
              </div>
              <div className="stat reveal" style={{ "--reveal-delay": "0.08s" }}>
                <p className="stat-label">{t.statPlatforms}</p>
                <p className="stat-num">
                  <span data-count-to="3">3</span>
                  {t.statPlatformsUnit && (
                    <span className="stat-unit">{t.statPlatformsUnit}</span>
                  )}
                </p>
              </div>
              <div className="stat reveal" style={{ "--reveal-delay": "0.16s" }}>
                <p className="stat-label">{t.statSince}</p>
                <p className="stat-num">
                  2026<span className="stat-unit">{t.statSinceUnit}</span>
                </p>
              </div>
            </div>
          </section>

          <section className="apps" id="apps">
            <div className="section-head reveal">
              <p className="section-label">{t.appsLabel}</p>
              <h2 className="section-title">{t.appsTitle}</h2>
            </div>
            {APPS.map((app) => (
              <AppBlock key={app.id} app={app} onOpen={openShot} />
            ))}
          </section>

          <section className="about" id="about">
            <div className="section-head reveal">
              <p className="section-label">{t.aboutLabel}</p>
              <h2 className="section-title">{t.aboutTitle}</h2>
            </div>
            <div className="reveal">
              <div className="crew-card">
                <div className="crew-top">
                  <div className="crew-photo">
                    <img
                      src={profilePhoto}
                      width="480"
                      height="600"
                      alt={t.crewName}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="crew-idbox">
                    <p className="crew-kana">{t.crewKana}</p>
                    <p className="crew-name">{t.crewName}</p>
                    <p className="crew-birth">{t.crewBirth}</p>
                  </div>
                </div>
                <div className="crew-log">
                  <div className="log-row">
                    <span className="log-tile tile-navy">
                      <svg viewBox="0 0 150 92" aria-hidden="true">
                        <path d="M92 4 C82 26 77 46 79 63 L50 63 C63 50 79 28 92 4 Z" />
                        <path d="M42 70 Q75 82 110 70 L101 80 Q74 88 51 80 Z" />
                      </svg>
                    </span>
                    <span className="log-label">{t.log1}</span>
                    <span className="log-value">{t.log1v}</span>
                  </div>
                  <div className="log-row">
                    <span className="log-tile tile-mint">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.6 a2.6 2.6 0 1 0 0.001 0 Z M12 5.2 L12 20 M12 20 C8 20 4.8 17.4 4 13.8 L2.4 15 M4 13.8 L6.4 14.6 M12 20 C16 20 19.2 17.4 20 13.8 L21.6 15 M20 13.8 L17.6 14.6 M8.4 8.6 L15.6 8.6" fill="none" stroke="#12352d" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="log-label">{t.log2}</span>
                    <span className="log-value">{t.log2v}</span>
                  </div>
                  <div className="log-row">
                    <span className="log-tile tile-coral">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 5.5 C10 3.8 7 3.4 4 4.2 L4 18.6 C7 17.8 10 18.2 12 19.8 C14 18.2 17 17.8 20 18.6 L20 4.2 C17 3.4 14 3.8 12 5.5 Z M12 7.4 L12 17.5" />
                        <path d="M11.2 6.4 L12.8 6.4 L12.8 18.4 L11.2 18.4 Z" fill="#e9967e" />
                      </svg>
                    </span>
                    <span className="log-label">{t.log3}</span>
                    <span className="log-value">{t.log3v}</span>
                  </div>
                  <p className="log-quote">{t.quote}</p>
                  <p className="log-brand">{t.crewBrand}</p>
                </div>
              </div>
            </div>
            <div className="about-actions reveal">
              <a
                href="https://github.com/TatsuyaAriyama"
                className="voyage-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.btnGitHub}
              </a>
              <a
                href="https://x.com/protoari"
                className="voyage-btn voyage-btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.btnX}
              </a>
            </div>
          </section>
        </div>

        <footer className="harbor">
          <Hills className="harbor-hills" />
          <div className="harbor-body">
            <Boat className="harbor-boat" />
            <nav className="harbor-bar" aria-label="Footer navigation">
              <a href="#top">{t.footHome}</a>
              <a
                href="https://github.com/TatsuyaAriyama"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://x.com/protoari"
                target="_blank"
                rel="noopener noreferrer"
              >
                X
              </a>
              <a href="mailto:ariyama.tatsuya@chion-tech.jp">Mail</a>
            </nav>
            <p className="harbor-copy">{t.footCopy(year)}</p>
          </div>
        </footer>
        <Lightbox
          data={lightbox ? { ...lightbox, lang, t } : null}
          onClose={closeShot}
          onNav={navShot}
        />
      </div>
    </LangContext.Provider>
  );
}

export default App;
