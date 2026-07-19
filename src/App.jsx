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
      asset("/madoromi/01-home.png"),
      asset("/madoromi/02-history.png"),
      asset("/madoromi/03-alarm.png"),
      asset("/madoromi/04-settings.png"),
      asset("/madoromi/05-winddown.png"),
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
          <a href="#apps">apps</a>
          <a href="#about">about</a>
        </nav>
      </header>
    </>
  );
}

function AppShots({ app }) {
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
          <img
            key={src}
            src={src}
            alt={`${app.name} screenshot ${i + 1}`}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </div>
  );
}

function AppBlock({ app }) {
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

      <AppShots app={app} />

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

function App() {
  const [year] = useState(() => new Date().getFullYear());
  useReveal();

  return (
    <div id="top">
      <SiteNav />
      <div className="page">
        <section className="hero">
          <h1 className="hero-title reveal">Tatsuya Ariyama</h1>
          <p className="hero-statement reveal">
            静かで、押し付けないデザイン。日常にそっと寄り添うアプリを作っています。
          </p>
        </section>

        <section className="impact">
          <div className="impact-item reveal" style={{ "--reveal-delay": "0s" }}>
            <div className="impact-number" data-count-to="4">
              4
            </div>
            <div className="impact-label">apps</div>
          </div>
          <div className="impact-item reveal" style={{ "--reveal-delay": "0.08s" }}>
            <div className="impact-number" data-count-to="3">
              3
            </div>
            <div className="impact-label">platforms</div>
          </div>
          <div className="impact-item reveal" style={{ "--reveal-delay": "0.16s" }}>
            <div className="impact-number">2026</div>
            <div className="impact-label">since</div>
          </div>
        </section>

        <section className="apps" id="apps">
          {APPS.map((app) => (
            <AppBlock key={app.id} app={app} />
          ))}
        </section>

        <section className="about" id="about">
          <div className="about-inner">
            <h2 className="about-title reveal">about</h2>
            <div className="about-body reveal">
              <div className="about-image">
                <img
                  src={profilePhoto}
                  width="480"
                  height="600"
                  alt="有山達也のプロフィール写真"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="about-content">
                <div className="about-identity">
                  <p className="about-name">有山達也（ありやま たつや）</p>
                  <p className="about-birth">2001年6月26日</p>
                </div>
                <div className="about-note">
                  <p>ReactとFirebaseで社内アプリを、SwiftUIでiOSアプリを制作。</p>
                  <p>小さく作り、動かし、使いながら磨き込む。</p>
                  <p>
                    2023年、大学在学中にUdemyでクリッカーゲームを開発し、Google
                    Playで公開（DL 10万+）。
                  </p>
                  <p>2026年、iOS・macOS向けのサービスを個人開発しています。</p>
                </div>
                <a
                  href="https://github.com/TatsuyaAriyama"
                  className="about-more"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>GitHub</span>
                  <span className="about-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="site">
          <div className="footer-icons">
            <a
              href="https://github.com/TatsuyaAriyama"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.67.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
            </a>
            <a href="mailto:ariyama.tatsuya@chion-tech.jp" aria-label="Email" className="footer-icon">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <polyline points="2 8 12 13 22 8" />
              </svg>
            </a>
          </div>
          <div className="footer-copy">© {year} Tatsuya Ariyama</div>
        </footer>
      </div>
    </div>
  );
}

export default App;
