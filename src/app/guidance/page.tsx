'use client';

import React from 'react';
import Link from 'next/link';

const ARTICLES = [
  { id: 1, title: 'How to Master Anatomy for NEET PG 2025', category: 'Strategy', readTime: '5 min read' },
  { id: 2, title: '10 High-Yield Topics in Physiology You Must Know', category: 'Tips', readTime: '8 min read' },
  { id: 3, title: 'Balancing MBBS Final Year with PG Preparation', category: 'Life-Hacks', readTime: '6 min read' },
  { id: 4, title: 'Microbiology: Systematic Approach to Bacteria', category: 'Subject-Focus', readTime: '10 min read' },
];

export default function Guidance() {
  return (
    <div className="guidance-container">
      <header className="guidance-header">
        <h1 className="neon-glow">Guidance Portal</h1>
        <p>Expert insights and strategies to crack NEET PG with a top rank.</p>
      </header>

      <div className="articles-section">
        <h2>Latest Articles</h2>
        <div className="articles-list">
          {ARTICLES.map((article) => (
            <div key={article.id} className="article-card glass">
              <div className="article-meta">
                <span className="category-tag">{article.category}</span>
                <span className="read-time">{article.readTime}</span>
              </div>
              <h3>{article.title}</h3>
              <p>Mastering this subject requires a blend of visual memory and conceptual clarity. In this guide, we break down the most important...</p>
              <button className="read-btn">Read Article →</button>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .guidance-container {
          max-width: 1000px;
          margin: 60px auto;
          padding: 0 20px;
        }

        .guidance-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .guidance-header h1 {
          font-size: 3rem;
          margin-bottom: 15px;
        }

        .guidance-header p {
          color: hsl(var(--fg-secondary));
          font-size: 1.2rem;
        }

        .articles-section h2 {
          font-size: 2rem;
          margin-bottom: 40px;
        }

        .articles-list {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .article-card {
          padding: 40px;
          border-radius: var(--radius);
          display: flex;
          flex-direction: column;
          gap: 15px;
          transition: border-color 0.3s ease;
          border: 1px solid transparent;
        }

        .article-card:hover {
          border-color: hsla(var(--brand-primary) / 0.3);
        }

        .article-meta {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .category-tag {
          padding: 4px 12px;
          background: hsla(var(--brand-primary) / 0.1);
          color: hsl(var(--brand-primary));
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .read-time {
          font-size: 0.85rem;
          color: hsl(var(--fg-secondary));
        }

        .article-card h3 {
          font-size: 1.8rem;
          line-height: 1.3;
        }

        .article-card p {
          color: hsl(var(--fg-secondary));
          line-height: 1.6;
        }

        .read-btn {
          background: transparent;
          border: none;
          color: hsl(var(--brand-primary));
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          align-self: flex-start;
          margin-top: 10px;
          padding: 0;
        }

        .read-btn:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
