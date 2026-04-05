'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home-container">
      {/* Visual Background Layers */}
      <div className="glow-aura"></div>
      <div className="medical-grid"></div>
      <div className="orb-visual">
        <video autoPlay loop muted playsInline className="orb-video">
          <source src="https://future.co/images/homepage/glassy-orb/orb-purple.webm" type="video/webm" />
        </video>
      </div>

      <section className="hero animate-fade">
        <div className="content-wrapper">
          <div className="trust-badge-container">
            <span className="badge-item">👨‍⚕️ Built for MBBS Professionals</span>
            <span className="badge-item">⚡ 1,000+ High-Yield MCQs</span>
          </div>

          <h1 className="hero-title">
            Master Medicine <br/>
            <span className="neon-text">Precision Learning.</span>
          </h1>

          <p className="hero-subtitle">
            The high-performance learning ecosystem for NEET PG aspirants. 
            Topic-wise mastery, real-time analytics, and expert preparation tools.
          </p>

          <div className="cta-group">
            <Link href="/quiz" className="neon-btn">
              Start Free Practice <span className="arrow">→</span>
            </Link>
            <Link href="/guidance" className="glass-btn">
              Preparation Guide
            </Link>
          </div>

          <div className="social-proof">
            <div className="stat-pills">
              <div className="pill glass">
                <strong>10k+</strong>
                <span>Active Doctors</span>
              </div>
              <div className="pill glass">
                <strong>84%</strong>
                <span>Avg. Accuracy</span>
              </div>
              <div className="pill glass">
                <strong>#1</strong>
                <span>Prep Tool</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating UI Elements */}
        <div className="floating-elements">
          <div className="ui-card glass-card float-1">
            <div className="card-icon">🎯</div>
            <div className="card-info">
              <strong>92% Acc</strong>
              <span>Anatomy Pool</span>
            </div>
          </div>
          <div className="ui-card glass-card float-2">
            <div className="card-icon">🧠</div>
            <div className="card-info">
              <strong>Rank #42</strong>
              <span>Biochem Master</span>
            </div>
          </div>
          <div className="ui-card glass-card float-3">
            <div className="card-icon">🔥</div>
            <div className="card-info">
              <strong>12 Day</strong>
              <span>Quiz Streak</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features-grid-section">
        <div className="section-header">
          <h2>Engineered for Excellence</h2>
          <p>Everything you need to secure your top rank.</p>
        </div>
        
        <div className="features-container">
          <div className="feature-item glass-card">
            <div className="f-icon">🧪</div>
            <h3>Smart Engine</h3>
            <p>Adaptive question randomization with instant medical reasoning.</p>
          </div>
          <div className="feature-item glass-card">
            <div className="f-icon">📊</div>
            <h3>Deep Insights</h3>
            <p>Advanced metrics to track your weak subjects and performance growth.</p>
          </div>
          <div className="feature-item glass-card">
            <div className="f-icon">🏆</div>
            <h3>Global Arena</h3>
            <p>Compete with thousands of students on the global leaderboard.</p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>© 2026 JupiterMed Quiz • The Doctor's Choice for Excellence</p>
      </footer>

      <style jsx>{`
        .home-container {
          position: relative;
          min-height: 100vh;
        }

        .orb-visual {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
          opacity: 0.3;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .orb-video {
          width: 900px;
          height: 900px;
          filter: hue-rotate(-60deg) saturate(1.5);
        }

        .medical-grid {
          position: fixed;
          inset: 0;
          z-index: -2;
          background-image: 
            radial-gradient(circle at 2px 2px, hsla(var(--brand-primary) / 0.1) 1px, transparent 0);
          background-size: 40px 40px;
        }

        .hero {
          padding: 180px 40px 100px;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          position: relative;
        }

        .content-wrapper {
          max-width: 700px;
          z-index: 10;
        }

        .trust-badge-container {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
        }

        .badge-item {
          padding: 6px 16px;
          background: hsla(0, 0%, 100%, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          color: hsl(var(--fg-secondary));
        }

        .hero-title {
          font-size: 5.5rem;
          line-height: 1.1;
          margin-bottom: 25px;
          font-weight: 800;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: hsl(var(--fg-secondary));
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .cta-group {
          display: flex;
          gap: 20px;
          margin-bottom: 60px;
        }

        .glass-btn {
          padding: 12px 28px;
          border-radius: 50px;
          background: hsla(0, 0%, 100%, 0.05);
          border: 1px solid var(--glass-border);
          color: white;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.3s ease;
        }

        .glass-btn:hover {
          background: hsla(0, 0%, 100%, 0.1);
        }

        .stat-pills {
          display: flex;
          gap: 20px;
        }

        .pill {
          padding: 12px 20px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
        }

        .pill strong { font-size: 1.2rem; color: hsl(var(--brand-primary)); }
        .pill span { font-size: 0.75rem; color: hsl(var(--fg-secondary)); }

        /* Floating Elements */
        .floating-elements {
          position: absolute;
          right: 0;
          top: 200px;
          width: 400px;
          height: 600px;
          pointer-events: none;
        }

        .ui-card {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px 25px;
        }

        .card-icon { font-size: 1.5rem; }
        .card-info { display: flex; flex-direction: column; }
        .card-info strong { font-size: 1.1rem; }
        .card-info span { font-size: 0.75rem; color: hsl(var(--fg-secondary)); }

        .float-1 { top: 0; right: 20px; animation: float 6s ease-in-out infinite; }
        .float-2 { top: 180px; right: 120px; animation: float 8s ease-in-out infinite 1s; }
        .float-3 { top: 360px; right: 40px; animation: float 7s ease-in-out infinite 2s; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .features-grid-section {
          padding: 100px 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-header h2 { font-size: 2.5rem; margin-bottom: 10px; }
        .section-header p { color: hsl(var(--fg-secondary)); }

        .features-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .feature-item h3 { font-size: 1.5rem; margin-bottom: 15px; }
        .f-icon { font-size: 2.5rem; margin-bottom: 20px; }
        .feature-item p { color: hsl(var(--fg-secondary)); }

        .home-footer {
          padding: 60px 40px;
          text-align: center;
          color: hsl(var(--fg-muted));
          font-size: 0.9rem;
          border-top: 1px solid var(--glass-border);
        }

        @media (max-width: 1100px) {
          .hero { flex-direction: column; text-align: center; padding-top: 120px; }
          .trust-badge-container, .cta-group { justify-content: center; }
          .floating-elements { display: none; }
          .hero-title { font-size: 3.5rem; }
          .features-container { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
