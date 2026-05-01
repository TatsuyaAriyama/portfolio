import { useEffect, useState } from "react";
import { ArrowUpRight, Camera, Code2, Mail, X } from "lucide-react";

const skills = ["React", "JavaScript", "CSS", "Firebase", "Python", "GitHub"];
const reflections = [
  {
    title: "開発の流れ",
    text: "書籍管理システムの開発を通して、単に画面や機能を作るだけでなく、要件整理から実装、改善、公開反映まで一連の流れを実践的に学ぶことができました。",
  },
  {
    title: "設計で意識したこと",
    text: "貸出・返却・読書記録・リクエスト・Activityなどの機能を追加していく中で、使う人にとって分かりやすいUI、権限管理、データ設計、運用面まで意識して開発を進める重要性を実感しました。",
  },
  {
    title: "改善を重ねた経験",
    text: "エラーや不具合が発生した際には、原因を切り分けて修正し、再度反映まで行う経験を重ねました。AIも活用しながら、要件を言語化し、出力内容を調整し、最終的に形にしていく工程を通して、プロダクトを前に進める力を養うことができたと感じています。",
  },
];
const screenshots = [
  {
    src: "/shelf-app/login.png",
    title: "Login",
    text: "メール認証とGoogleログインに対応",
  },
  {
    src: "/shelf-app/add-book.png",
    title: "Book Search",
    text: "Google Books APIで書籍情報を自動検索",
  },
  {
    src: "/shelf-app/top.png",
    title: "TOP",
    text: "貸出状況と月間目標を確認",
  },
  {
    src: "/shelf-app/library.png",
    title: "Library",
    text: "検索・フィルター付き書籍一覧",
  },
  {
    src: "/shelf-app/profile.png",
    title: "Profile",
    text: "読書状況と投稿を可視化",
  },
  {
    src: "/shelf-app/chat.png",
    title: "Chat",
    text: "改善案や連絡を共有",
  },
];
const storageKey = "portfolioProfileImage";

function App() {
  const [profileImage, setProfileImage] = useState("");
  const [activeScreenshot, setActiveScreenshot] = useState(null);

  useEffect(() => {
    setProfileImage(localStorage.getItem(storageKey) || "");
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = String(reader.result);
      setProfileImage(imageUrl);
      localStorage.setItem(storageKey, imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setProfileImage("");
    localStorage.removeItem(storageKey);
  };

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
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="hero" className="hero section">
        <div className="hero-copy">
          <p className="eyebrow">Frontend Engineer</p>
          <h1>有山達也</h1>
          <p className="lead">社内書籍管理アプリ SHELF-APP を制作。</p>
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
            {profileImage ? (
              <img src={profileImage} alt="有山達也のプロフィール写真" />
            ) : (
              <span>Photo</span>
            )}
          </div>

          <div className="profile-info">
            <p className="profile-label">Profile</p>
            <h2>有山達也</h2>
            <a href="mailto:ariyama.tatsuya@chion-tech.jp">
              ariyama.tatsuya@chion-tech.jp
            </a>
          </div>

          <div className="editor-actions">
            <label className="upload-button">
              <Camera size={18} />
              写真を追加
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
            {profileImage && (
              <button className="remove-button" type="button" onClick={removeImage}>
                <X size={18} />
                削除
              </button>
            )}
          </div>
        </aside>
      </section>

      <section id="about" className="section split-section">
        <p className="eyebrow">About</p>
        <p className="about-text">
          現在24歳で、昨年12月にIT業界へ転身しました。
          React・Firebaseを用いた社内向けアプリ開発を通じて、
          要件整理から実装、改善まで一連の流れを学んでいます。
          SHELF-APPは、社内の書籍管理と学習習慣づくりを目的に開発しました。
          AIも活用しながら、使いやすさと運用しやすさを意識した開発を進めています。
        </p>
      </section>

      <section id="skills" className="section">
        <p className="eyebrow">Skills</p>
        <div className="skills-grid">
          {skills.map((skill) => (
            <span className="skill-chip" key={skill}>
              {skill}
            </span>
          ))}
        </div>
        <p className="skill-note">
          UdemyやProgateを活用し、各技術の基礎を一通り学習しております。
        </p>
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
                <section className="reflection-item" key={reflection.title}>
                  <h3>{reflection.title}</h3>
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
