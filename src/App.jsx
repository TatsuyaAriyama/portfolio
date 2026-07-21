import { useEffect, useRef, useState } from "react";
import profilePhoto from "./assets/profile-photo.jpg";

const asset = (path) => import.meta.env.BASE_URL + path.replace(/^\//, "");

const APPS = [
  {
    id: "landfall",
    name: "Landfall",
    tagline: "休みながら続ける、学びの記録",
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
    pills: [
      "三日坊主の常習犯",
      "ストリークに疲れた",
      "休むと戻れなくなる",
      "がんばりを静かに残したい",
    ],
  },
  {
    id: "suzaku",
    name: "朱雀",
    tagline: "方角だけを示す、ミニマルなコンパス",
    meta: "2026.07 / React · Capacitor",
    icon: asset("/icons/suzaku.png"),
    repo: "https://github.com/TatsuyaAriyama/suzaku",
    appStore: "https://apps.apple.com/jp/app/id6788317890",
    live: "https://tatsuyaariyama.github.io/suzaku/",
    shots: [
      asset("/suzaku/01-direction.png"),
      asset("/suzaku/02-find.png"),
      asset("/suzaku/03-aligned.png"),
      asset("/suzaku/04-glance.png"),
      asset("/suzaku/05-arrive.png"),
    ],
    pills: [
      "地図を読むのが苦手",
      "歩きスマホをやめたい",
      "散歩と寄り道が好き",
      "「だいたいあっち」で十分",
    ],
  },
  {
    id: "madoromi",
    name: "Madoromi",
    tagline: "至高の睡眠を設計する",
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
    pills: [
      "翌日の頭のキレを上げたい",
      "夜ふかしがやめられない",
      "睡眠負債が気になる",
      "静かなアプリが好き",
    ],
  },
  {
    id: "kasane",
    name: "kasane",
    tagline: "同じ景色を、そっと重ねる定点フォトログ",
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
    pills: [
      "同じ構図で撮り続けたい",
      "少しずつの変化を残したい",
      "定点観測が好き",
      "静かなアプリが好き",
    ],
  },
];

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

function SiteNav() {
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
          <a href="#apps">アプリ</a>
          <a href="#about">航海士</a>
        </nav>
      </header>
    </>
  );
}

function AppShots({ app, onOpen }) {
  const wrapRef = useRef(null);
  const shotsRef = useRef(null);

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
        {app.shots.map((src, i) => (
          <button
            key={src}
            type="button"
            className="shot-btn"
            onClick={() => onOpen(app, i)}
            aria-label={`${app.name} のスクリーンショット ${i + 1} を拡大`}
          >
            <img
              src={src}
              alt={`${app.name} screenshot ${i + 1}`}
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
  return (
    <article className="app-block reveal">
      <div className="app-header">
        <a
          href={app.appStore ?? app.live ?? app.repo}
          className="app-icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={app.icon} width="256" height="256" alt={`${app.name} icon`} decoding="async" />
        </a>
        <div className="app-info">
          <p className="app-meta">{app.meta}</p>
          <h2 className="app-name">{app.name}</h2>
          <div className="app-tagline-row">
            <span className="app-tagline">{app.tagline}</span>
            <span className="app-links">
              {app.appStore && (
                <a
                  href={app.appStore}
                  className="app-store-badge"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${app.name} を App Store で見る`}
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
                  <span>Web で試す</span>
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

      <AppShots app={app} onOpen={onOpen} />

      <div className="recommend">
        <span className="recommend-label">こんな人におすすめ：</span>
        <div className="pills">
          {app.pills.map((pill) => (
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
  const { app, index } = data;
  const total = app.shots.length;
  const many = total > 1;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${app.name} のスクリーンショット`}
      onClick={onClose}
    >
      <button type="button" className="lightbox-close" aria-label="閉じる" onClick={onClose}>
        ✕
      </button>

      {many && (
        <button
          type="button"
          className="lightbox-nav lightbox-nav--prev"
          aria-label="前へ"
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
        src={app.shots[index]}
        alt={`${app.name} screenshot ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
      />

      {many && (
        <button
          type="button"
          className="lightbox-nav lightbox-nav--next"
          aria-label="次へ"
          onClick={(e) => {
            e.stopPropagation();
            onNav(1);
          }}
        >
          ›
        </button>
      )}

      <div className="lightbox-meta" onClick={(e) => e.stopPropagation()}>
        <span className="lightbox-name">{app.name}</span>
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
  const [lightbox, setLightbox] = useState(null);
  useReveal();

  const openShot = (app, index) => setLightbox({ app, index });
  const closeShot = () => setLightbox(null);
  const navShot = (dir) =>
    setLightbox((prev) => {
      if (!prev) return prev;
      const total = prev.app.shots.length;
      return { ...prev, index: (prev.index + dir + total) % total };
    });

  return (
    <div id="top">
      <SiteNav />
      <header className="voyage-hero">
        <div className="inner">
          <p className="hero-kicker reveal">TATSUYA ARIYAMA — PORTFOLIO</p>
          <h1 className="hero-title reveal" style={{ "--reveal-delay": "0.08s" }}>
            <span className="hero-line">小さく作って、</span>
            <span className="hero-line">
              また<mark className="hl">出航</mark>する。
            </span>
          </h1>
          <p className="hero-note reveal" style={{ "--reveal-delay": "0.16s" }}>
            静かで、押し付けないデザイン。日常にそっと寄り添うアプリを作っています。
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
              <p className="stat-label">公開アプリ</p>
              <p className="stat-num">
                <span data-count-to="4">4</span>
                <span className="stat-unit">本</span>
              </p>
            </div>
            <div className="stat reveal" style={{ "--reveal-delay": "0.08s" }}>
              <p className="stat-label">プラットフォーム</p>
              <p className="stat-num">
                <span data-count-to="3">3</span>
                <span className="stat-unit">つ</span>
              </p>
            </div>
            <div className="stat reveal" style={{ "--reveal-delay": "0.16s" }}>
              <p className="stat-label">個人開発</p>
              <p className="stat-num">
                2026<span className="stat-unit">年〜</span>
              </p>
            </div>
          </div>
        </section>

        <section className="apps" id="apps">
          <div className="section-head reveal">
            <p className="section-label">これまでの航海</p>
            <h2 className="section-title">4つの、小さな船。</h2>
          </div>
          {APPS.map((app) => (
            <AppBlock key={app.id} app={app} onOpen={openShot} />
          ))}
        </section>

        <section className="about" id="about">
          <div className="section-head reveal">
            <p className="section-label">航海士</p>
            <h2 className="section-title">つくっている人。</h2>
          </div>
          <div className="reveal">
            <div className="crew-card">
              <div className="crew-top">
                <div className="crew-photo">
                  <img
                    src={profilePhoto}
                    width="480"
                    height="600"
                    alt="有山達也のプロフィール写真"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="crew-idbox">
                  <p className="crew-kana">ありやま たつや</p>
                  <p className="crew-name">有山達也</p>
                  <p className="crew-birth">2001年6月26日</p>
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
                  <span className="log-label">
                    ReactとFirebaseで社内アプリを、SwiftUIでiOSアプリを制作
                  </span>
                  <span className="log-value">now</span>
                </div>
                <div className="log-row">
                  <span className="log-tile tile-coral">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 5.5 C10 3.8 7 3.4 4 4.2 L4 18.6 C7 17.8 10 18.2 12 19.8 C14 18.2 17 17.8 20 18.6 L20 4.2 C17 3.4 14 3.8 12 5.5 Z M12 7.4 L12 17.5" />
                      <path d="M11.2 6.4 L12.8 6.4 L12.8 18.4 L11.2 18.4 Z" fill="#e9967e" />
                    </svg>
                  </span>
                  <span className="log-label">
                    2023 — 大学在学中、Udemyで学んでクリッカーゲームをGoogle Playで公開
                  </span>
                  <span className="log-value">DL 10万+</span>
                </div>
                <div className="log-row">
                  <span className="log-tile tile-mint">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.6 a2.6 2.6 0 1 0 0.001 0 Z M12 5.2 L12 20 M12 20 C8 20 4.8 17.4 4 13.8 L2.4 15 M4 13.8 L6.4 14.6 M12 20 C16 20 19.2 17.4 20 13.8 L21.6 15 M20 13.8 L17.6 14.6 M8.4 8.6 L15.6 8.6" fill="none" stroke="#12352d" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="log-label">iOS・macOS向けのサービスを個人開発中</span>
                  <span className="log-value">2026〜</span>
                </div>
                <p className="log-quote">小さく作り、動かし、使いながら磨き込む。</p>
                <p className="log-brand">Tatsuya Ariyama — 航海誌</p>
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
              GitHub を見る →
            </a>
          </div>
        </section>

      </div>

      <footer className="harbor">
        <Hills className="harbor-hills" />
        <div className="harbor-body">
          <Boat className="harbor-boat" />
          <nav className="harbor-bar" aria-label="Footer navigation">
            <a href="#top">ホーム</a>
            <a
              href="https://github.com/TatsuyaAriyama"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a href="mailto:ariyama.tatsuya@chion-tech.jp">Mail</a>
          </nav>
          <p className="harbor-copy">© {year} Tatsuya Ariyama — 港にて</p>
        </div>
      </footer>
      <Lightbox data={lightbox} onClose={closeShot} onNav={navShot} />
    </div>
  );
}

export default App;
