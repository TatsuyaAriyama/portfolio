import { useState } from "react";
import { ArrowUpRight, Code2, Mail, X } from "lucide-react";

const reflections = [
  {
    text: "この開発を通して、画面作成だけでなく、要件整理から実装、改善、公開反映までの一連の流れを実践的に学びました。",
  },
  {
    text: "また、機能追加を重ねる中で、UI/UXの改善、権限管理、データ設計、運用面まで意識して考える重要性を学びました。",
  },
];
const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;
const profilePhotoImage = assetPath("profile-photo.jpg");
const screenshots = [
  {
    src: assetPath("shelf-app/login.png"),
    title: "Login",
    text: "メール認証とGoogleログインに対応",
  },
  {
    src: assetPath("shelf-app/add-book.png"),
    title: "Book Search",
    text: "Google Books APIで書籍情報を自動検索",
  },
  {
    src: assetPath("shelf-app/top.png"),
    title: "TOP",
    text: "貸出状況と月間目標を確認",
  },
  {
    src: assetPath("shelf-app/library.png"),
    title: "Library",
    text: "検索・フィルター付き書籍一覧",
  },
  {
    src: assetPath("shelf-app/profile.png"),
    title: "Profile",
    text: "読書状況と投稿を可視化",
  },
  {
    src: assetPath("shelf-app/chat.png"),
    title: "Chat",
    text: "改善案や連絡を共有",
  },
];
const githubOverviewImage = assetPath("github-overview.png");

function App() {
  const [activeScreenshot, setActiveScreenshot] = useState(null);

  const closeScreenshot = () => {
    setActiveScreenshot(null);
  };

  return (
    <main className="app-shell">
      <header className="site-header">
        <a className="brand" href="#hero">
          有山達也
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#github">GitHub</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="hero" className="hero section">
        <div className="hero-copy">
          <p className="eyebrow">Frontend Engineer</p>
          <h1>有山達也</h1>
          <p className="lead">
            ReactとFirebaseを軸に、実際に使われる社内アプリを設計・実装しています。
            小さく作り、動かし、改善しながら、使いやすい体験へ磨き込むことを大切にしています。
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">
              Project
              <ArrowUpRight size={18} />
            </a>
            <a className="button ghost" href="mailto:ariyama.tatsuya@chion-tech.jp">
              Mail
              <Mail size={18} />
            </a>
          </div>
        </div>

        <aside className="profile-card" aria-label="Profile">
          <div className="photo-frame">
            <img src={profilePhotoImage} alt="有山達也のプロフィール写真" />
          </div>

          <div className="profile-info">
            <p className="profile-label">Profile</p>
            <h2>有山達也</h2>
            <a href="mailto:ariyama.tatsuya@chion-tech.jp">
              ariyama.tatsuya@chion-tech.jp
            </a>
            <p>Rookie developer building practical internal tools.</p>
          </div>
        </aside>
      </section>

      <section id="github" className="section github-section">
        <div className="github-copy">
          <p className="eyebrow">GitHub Activity</p>
          <h2>学んだことを、動く形で積み上げています。</h2>
          <p>
            Reactで制作したポートフォリオ、Javaのループ練習、KotlinのAndroidアプリなど、
            小さく作って試しながら理解を深めています。GitHubでは制作物だけでなく、
            日々の改善や学習の足跡も残し、継続してコードを書く習慣を大切にしています。
          </p>
        </div>
        <figure className="github-visual">
          <img src={githubOverviewImage} alt="GitHubプロフィールとリポジトリ一覧" />
          <figcaption>GitHubで公開しているリポジトリとコントリビューション</figcaption>
        </figure>
      </section>

      <section id="projects" className="section">
        <p className="eyebrow">Project</p>
        <article className="project-card">
          <div className="project-top">
            <div>
              <span className="project-type">Internal Book Management</span>
              <h2>SHELF-APP</h2>
            </div>
            <a
              className="small-button"
              href="https://shelf-app-213ca.web.app"
              target="_blank"
              rel="noreferrer"
            >
              Open App
              <ArrowUpRight size={16} />
            </a>
          </div>

          <p className="project-description">
            社内の本を探す、借りる、記録する流れをまとめた書籍管理アプリです。
            ログイン、本登録、貸出状況、読書記録、投稿、チャットまで一つの画面体験として設計しました。
          </p>

          <div className="project-flow">
            <span>画面構成</span>
            <p>ログインから本登録、利用状況の確認までを順に紹介します。</p>
          </div>

          <div className="screenshot-grid">
            {screenshots.map((screenshot) => (
              <figure className="screenshot-card" key={screenshot.title}>
                <button
                  className="screenshot-button"
                  type="button"
                  onClick={() => setActiveScreenshot(screenshot)}
                >
                  <img src={screenshot.src} alt={`SHELF-APP ${screenshot.title}画面`} />
                </button>
                <figcaption>
                  <strong>{screenshot.title}</strong>
                  <span>{screenshot.text}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="project-reflection">
            <div className="reflection-heading">
              <span>振り返り</span>
              <p>SHELF-APPを作成して学んだこと</p>
            </div>
            <div className="reflection-list">
              {reflections.map((reflection) => (
                <section className="reflection-item" key={reflection.text}>
                  <p>{reflection.text}</p>
                </section>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section id="contact" className="section contact-section">
        <p className="eyebrow">Contact</p>
        <h2>ariyama.tatsuya@chion-tech.jp</h2>
        <div className="hero-actions">
          <a className="button primary" href="mailto:ariyama.tatsuya@chion-tech.jp">
            Mail
            <Mail size={18} />
          </a>
          <a
            className="button ghost"
            href="https://github.com/TatsuyaAriyama"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
            <Code2 size={18} />
          </a>
        </div>
      </section>

      {activeScreenshot && (
        <div className="image-modal" role="dialog" aria-modal="true">
          <button
            className="modal-backdrop"
            type="button"
            aria-label="画像を閉じる"
            onClick={closeScreenshot}
          />
          <div className="modal-content">
            <button
              className="modal-close"
              type="button"
              aria-label="画像を閉じる"
              onClick={closeScreenshot}
            >
              <X size={20} />
            </button>
            <img
              src={activeScreenshot.src}
              alt={`SHELF-APP ${activeScreenshot.title}画面の拡大表示`}
            />
            <p>
              <strong>{activeScreenshot.title}</strong>
              <span>{activeScreenshot.text}</span>
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
