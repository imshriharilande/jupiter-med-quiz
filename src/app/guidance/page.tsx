'use client';

import React from 'react';
import Link from 'next/link';

const GUIDANCE_ARTICLES = [
  { id: 1, title: 'Mastering the Anatomy Pool', category: 'Subject Strategy', readTime: '5 min', icon: '🦴' },
  { id: 2, title: 'NEET PG 2026: The Roadmap', category: 'Exam Updates', readTime: '12 min', icon: '📅' },
  { id: 3, title: 'Optimizing Biochemistry Mnemonics', category: 'Study Hack', readTime: '8 min', icon: '🧪' },
  { id: 4, title: 'Pathology Virtual Grand Test', category: 'Live Events', readTime: '3 min', icon: '🏆' },
];

export default function Guidance() {
  return (
    <div className="guidance-layout animate-fade">
      <header className="guidance-header">
        <h1 className="neon-text">Expert Guidance</h1>
        <p>Strategic insights for the modern medical student.</p>
      </header>

      <div className="guidance-grid">
        {GUIDANCE_ARTICLES.map((article) => (
          <article key={article.id} className="article-card glass-card">
            <div className="card-top">
              <span className="article-icon glass">{article.icon}</span>
              <div className="article-meta">
                <span className="category">{article.category}</span>
                <span className="read-time">{article.readTime} read</span>
              </div>
            </div>
            
            <h3>{article.title}</h3>
            <p className="article-preview">
              Discover the high-yield topics and strategic approaches recommended by top rankers...
            </p>
            
            <Link href={`/guidance/${article.id}`} className="read-more">
              Read Entire Strategy <span className="arrow">→</span>
            </Link>
          </article>
        ))}
      </div>

      <section className="newsletter-box glass animate-fade">
        <div className="news-content">
          <h3>Daily Clinical Pearls</h3>
          <p>Get high-yield medical facts delivered to your inbox every morning at 7 AM.</p>
          <div className="news-form">
            <input type="email" placeholder="doctor@medical.edu" className="glass-input" />
            <button className="neon-btn">Enroll Now</button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .guidance-layout {
          max-width: 1200px;
          margin: 140px auto 100px;
          padding: 0 40px;
        }

        .guidance-header { margin-bottom: 80px; text-align: center; }
        .guidance-header h1 { font-size: 3.5rem; margin-bottom: 10px; font-weight: 800; }
        .guidance-header p { color: hsl(var(--fg-secondary)); font-size: 1.2rem; }

        .guidance-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
          margin-bottom: 80px;
        }

        .article-card {
          display: flex;
          flex-direction: column;
          padding: 35px;
          text-align: left;
          transition: transform 0.3s ease;
        }

        .card-top {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 25px;
        }

        .article-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .article-meta { display: flex; flex-direction: column; }
        .category { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: hsl(var(--brand-primary)); }
        .read-time { font-size: 0.8rem; color: hsl(var(--fg-muted)); }

        .article-card h3 { font-size: 1.4rem; line-height: 1.4; margin-bottom: 15px; }

        .article-preview {
          color: hsl(var(--fg-secondary));
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 30px;
          flex: 1;
        }

        .read-more {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          color: white;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .read-more:hover { color: hsl(var(--brand-primary)); }
        .arrow { transition: transform 0.3s ease; }
        .read-more:hover .arrow { transform: translateX(5px); }

        .newsletter-box {
          padding: 60px;
          border-radius: 30px;
          text-align: center;
          background: linear-gradient(135deg, hsla(var(--brand-primary) / 0.1), transparent);
        }

        .news-content h3 { font-size: 2rem; margin-bottom: 12px; }
        .news-content p { color: hsl(var(--fg-secondary)); margin-bottom: 40px; }

        .news-form {
          display: flex;
          max-width: 500px;
          margin: 0 auto;
          gap: 15px;
        }

        .glass-input {
          flex: 1;
          padding: 15px;
          border-radius: 50px;
          background: hsla(0,0%,100%,0.05);
          border: 1px solid var(--glass-border);
          color: white;
          font-family: inherit;
        }

        @media (max-width: 700px) {
          .guidance-layout { padding: 0 20px; }
          .news-form { flex-direction: column; }
          .glass-input { border-radius: 15px; }
        }
      `}</style>
    </div>
  );
}
