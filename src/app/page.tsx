'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <nav className="glass">
        <div className="logo neon-glow">JupiterMed Quiz</div>
        <div className="nav-links">
          <Link href="/quiz">Quizzes</Link>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/guidance">Guidance</Link>
          <button className="login-btn neon-border">Login</button>
        </div>
      </nav>

      <section className="hero">
        <div className="badge neon-border">🚀 Next-Gen Learning</div>
        <h1 className="neon-glow">Master Your Medical Career</h1>
        <p>The high-performance learning ecosystem for MBBS & NEET PG aspirants. Topic-wise practice, live tests, and AI-driven insights.</p>
        
        <div className="hero-stats">
          <div className="stat-card glass">
            <h3>1,000+</h3>
            <p>MCQs</p>
          </div>
          <div className="stat-card glass">
            <h3>50+</h3>
            <p>Active Quizzes</p>
          </div>
          <div className="stat-card glass">
            <h3>10k+</h3>
            <p>Students</p>
          </div>
        </div>

        <Link href="/quiz" className="cta-button">
          Start Free Quiz
        </Link>
      </section>

      <section className="features-section">
        <h2>Built for High-Performers</h2>
        <div className="features-grid">
          <div className="feature-card glass">
            <div className="feature-icon">🧪</div>
            <h3>Dynamic Engine</h3>
            <p>Randomized questions with instant evaluations and detailed explanations.</p>
          </div>
          <div className="feature-card glass">
            <div className="feature-icon">📊</div>
            <h3>Real-time Stats</h3>
            <p>Track your accuracy, weak subjects, and rank among peers globally.</p>
          </div>
          <div className="feature-card glass">
            <div className="feature-icon">📅</div>
            <h3>Live Events</h3>
            <p>Participate in scheduled Grand Tests and win recognition (Future).</p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 20px;
          background: radial-gradient(circle at top center, hsla(var(--brand-primary) / 0.05) 0%, transparent 70%);
        }

        nav {
          width: 100%;
          max-width: 1200px;
          margin-top: 20px;
          padding: 15px 30px;
          border-radius: var(--radius);
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 100;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: hsl(var(--brand-primary));
        }

        .nav-links {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .nav-links :global(a) {
          color: hsl(var(--fg-secondary));
          font-weight: 500;
          text-decoration: none;
        }

        .nav-links :global(a):hover {
          color: hsl(var(--fg-primary));
        }

        .login-btn {
          background: transparent;
          color: hsl(var(--brand-primary));
          border-radius: 50px;
          padding: 8px 25px;
          font-weight: 600;
        }

        .hero {
          margin-top: 80px;
          text-align: center;
          max-width: 900px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .badge {
          padding: 6px 15px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 25px;
          background: hsla(var(--brand-primary) / 0.1);
          color: hsl(var(--brand-primary));
        }

        .hero h1 {
          font-size: 4.5rem;
          margin-bottom: 20px;
          line-height: 1.1;
          background: linear-gradient(to bottom, #fff 40%, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero p {
          font-size: 1.3rem;
          color: hsl(var(--fg-secondary));
          margin-bottom: 50px;
          line-height: 1.6;
          max-width: 700px;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          width: 100%;
          margin-bottom: 60px;
        }

        .stat-card {
          padding: 30px;
          border-radius: var(--radius);
          text-align: center;
        }

        .stat-card h3 {
          font-size: 2.2rem;
          color: hsl(var(--brand-secondary));
          margin-bottom: 5px;
        }

        .cta-button {
          background-color: hsl(var(--brand-primary));
          color: white;
          border: none;
          padding: 18px 50px;
          font-size: 1.2rem;
          font-weight: 700;
          border-radius: 50px;
          text-decoration: none;
          box-shadow: 0 10px 40px hsla(var(--brand-primary) / 0.4);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .cta-button:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 50px hsla(var(--brand-primary) / 0.5);
        }

        .features-section {
          margin-top: 150px;
          padding-bottom: 100px;
          width: 100%;
          max-width: 1200px;
          text-align: center;
        }

        .features-section h2 {
          font-size: 2.5rem;
          margin-bottom: 60px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .feature-card {
          padding: 40px;
          border-radius: var(--radius);
          text-align: left;
          transition: border-color 0.3s ease;
          border: 1px solid transparent;
        }

        .feature-card:hover {
          border-color: hsla(var(--brand-primary) / 0.3);
        }

        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 25px;
        }

        .feature-card h3 {
          margin-bottom: 15px;
          font-size: 1.5rem;
        }

        .feature-card p {
          color: hsl(var(--fg-secondary));
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .features-grid { grid-template-columns: 1fr; }
          .hero h1 { font-size: 3rem; }
          .nav-links { display: none; }
        }
      `}</style>
    </div>
  );
}
