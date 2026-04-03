'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export default function Home() {
  const { user, signIn, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email);
      setShowLogin(false);
    } catch (error) {
      console.error(error);
      alert('Error signing in');
    }
  };

  return (
    <div className="container">
      {/* Dynamic Background */}
      <div className="glow-aura"></div>
      <div className="particles-layer">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="dna-particle" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      <nav className="liquid-glass navbar">
        <div className="brand neon-glow">JupiterMed</div>
        <div className="nav-links">
          <Link href="/quiz">Quizzes</Link>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/guidance">Guidance</Link>
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {user ? (
            <div className="user-profile">
              <Link href="/dashboard" className="nav-user">Dashboard</Link>
              <button onClick={signOut} className="logout-btn">Logout</button>
            </div>
          ) : (
            <button className="login-btn neon-border" onClick={() => setShowLogin(true)}>Sign Up</button>
          )}
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <div className="trust-badges">
            <span className="badge-item">👨‍⚕️ Built for MBBS Students</span>
            <span className="badge-item">📊 1000+ High-Yield MCQs</span>
            <span className="badge-item">⏱️ Real Exam Pattern</span>
          </div>
          
          <h1 className="hero-headline">Crack NEET PG with <br/><span className="text-neon">Smart Practice 🚀</span></h1>
          
          <p className="hero-sub">
            Practice high-yield MCQs, track your performance, and improve your rank with real exam-level quizzes. Master MBBS concepts with daily prep tools tailored for success.
          </p>
          
          <div className="cta-row">
            <button className="cta-btn btn-neon-gradient" onClick={() => user ? window.location.href='/quiz' : setShowLogin(true)}>
              Start Free Quiz <span className="icon">→</span>
            </button>
            <Link href="/quiz" className="cta-btn btn-glass">Explore Quizzes</Link>
          </div>

          <p className="cta-footer-note">🔒 Secure & Free Registration • No Credit Card Required</p>
        </div>

        {/* Floating UI Elements */}
        <div className="floating-ui-layer">
          <div className="ui-card glass float-card" style={{ top: '10%', right: '10%' }}>
            <div className="card-icon">🎯</div>
            <div className="card-data">
              <strong>95% Accuracy</strong>
              <span>Anatomy MCQ Pool</span>
            </div>
          </div>
          <div className="ui-card glass float-card" style={{ bottom: '20%', right: '5%', animationDelay: '1s' }}>
            <div className="card-icon">⚡</div>
            <div className="card-data">
              <strong>Rank #120</strong>
              <span>Global Leaderboard</span>
            </div>
          </div>
          <div className="ui-card glass float-card" style={{ top: '40%', right: '15%', animationDelay: '2.5s' }}>
            <div className="card-icon">📊</div>
            <div className="card-data">
              <strong>128 Tests</strong>
              <span>Completed This Week</span>
            </div>
          </div>
        </div>

        {/* Background Visual (Electric Orb) */}
        <div className="hero-visual-bg">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="glassy-orb-bg"
          >
            <source src="https://future.co/images/homepage/glassy-orb/orb-purple.webm" type="video/webm" />
          </video>
        </div>
      </section>

      <footer className="logos-section">
        <p>Trusted by students from India's top medical colleges</p>
        <div className="logos-grid">
          {['AIIMS', 'CMC', 'JIPMER', 'KGMU', 'MAMC'].map(logo => (
            <div key={logo} className="logo-placeholder">{logo}</div>
          ))}
        </div>
      </footer>

      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-modal liquid-glass" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowLogin(false)}>×</button>
            <h3>Sign Up Free</h3>
            <p>Access 1000+ high-yield medical MCQs today.</p>
            <form onSubmit={handleLogin}>
              <input 
                type="email" 
                placeholder="doctor@medical.edu" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="cta-btn btn-neon-gradient w-full py-4">Get Magic link</button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Sticky CTA */}
      {!user && (
        <div className="sticky-mobile-cta">
          <button className="cta-btn btn-neon-gradient w-full py-4 text-center" onClick={() => setShowLogin(true)}>
            Start Free Practice Now
          </button>
        </div>
      )}

      <style jsx>{`
        .container {
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
        }

        .particles-layer {
          position: absolute;
          inset: 0;
          z-index: -1;
          overflow: hidden;
        }

        .dna-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: var(--brand-neon);
          border-radius: 50%;
          opacity: 0.3;
          animation: float-up linear infinite;
        }

        @keyframes float-up {
          from { transform: translateY(100vh) scale(1); opacity: 0; }
          50% { opacity: 0.3; }
          to { transform: translateY(-20vh) scale(1.5); opacity: 0; }
        }

        .navbar {
          position: sticky;
          top: 30px;
          width: fit-content;
          margin: 0 auto;
          padding: 10px 30px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 40px;
          z-index: 1000;
        }

        .brand {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--brand);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .nav-links :global(a) {
          text-decoration: none;
          color: var(--fg);
          font-weight: 500;
          font-size: 0.95rem;
          opacity: 0.8;
          transition: 0.2s;
        }

        .theme-toggle {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-stroke);
          border-radius: 8px;
          padding: 5px 10px;
          cursor: pointer;
        }

        .login-btn {
          background: var(--brand);
          color: white;
          padding: 8px 20px;
          border-radius: 50px;
          font-weight: 700;
          border: none;
        }

        /* Hero Layout */
        .hero-section {
          padding: 150px 60px;
          min-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
        }

        .hero-content {
          max-width: 900px;
          z-index: 10;
        }

        .trust-badges {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .badge-item {
          padding: 8px 16px;
          background: hsla(0, 0%, 100%, 0.05);
          border: 1px solid hsla(0, 0%, 100%, 0.1);
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--fg-secondary);
        }

        .hero-headline {
          font-size: 85px;
          line-height: 1.05;
          letter-spacing: -2px;
          margin-bottom: 25px;
          font-weight: 800;
        }

        .text-neon {
          color: var(--brand-neon);
          text-shadow: 0 0 20px rgba(0, 242, 255, 0.4);
        }

        .hero-sub {
          font-size: 1.25rem;
          line-height: 1.6;
          color: var(--fg-secondary);
          margin-bottom: 50px;
          max-width: 750px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-row {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .cta-btn {
          padding: 18px 45px;
          font-size: 1.1rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .cta-footer-note {
          font-size: 0.85rem;
          color: var(--fg-secondary);
          opacity: 0.7;
        }

        /* Floating UI */
        .floating-ui-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 5;
        }

        .ui-card {
          position: absolute;
          padding: 15px 25px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }

        .card-icon { font-size: 1.5rem; }
        .card-data { display: flex; flex-direction: column; text-align: left; }
        .card-data strong { font-size: 1.1rem; color: var(--fg); }
        .card-data span { font-size: 0.75rem; color: var(--fg-secondary); }

        /* Orb Background */
        .hero-visual-bg {
          position: absolute;
          inset: 0;
          z-index: 2;
          opacity: 0.4;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          pointer-events: none;
        }

        .glassy-orb-bg {
          width: 800px;
          height: 800px;
          object-fit: cover;
          mix-blend-mode: screen;
          filter: hue-rotate(-55deg) saturate(150%) brightness(0.8) contrast(1.1);
        }

        .logos-section {
          padding: 100px 60px;
          text-align: center;
        }

        .logos-section p {
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 2px;
          font-weight: 700;
          color: var(--fg-secondary);
          margin-bottom: 40px;
        }

        .logos-grid {
          display: flex;
          justify-content: center;
          gap: 80px;
          opacity: 0.3;
          filter: grayscale(1);
          flex-wrap: wrap;
        }

        .logo-placeholder {
          font-size: 1.2rem;
          font-weight: 800;
        }

        /* Modals */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(15px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .login-modal {
          width: 100%;
          max-width: 450px;
          padding: 50px;
          border-radius: 30px;
          text-align: center;
        }

        .login-modal input {
          width: 100%;
          padding: 18px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-stroke);
          color: #fff;
          margin-bottom: 20px;
          font-family: inherit;
        }

        .sticky-mobile-cta { display: none; }

        @media (max-width: 1100px) {
          .hero-headline { font-size: 50px; }
          .hero-sub { font-size: 1.1rem; }
          .cta-row { flex-direction: column; align-items: stretch; }
          .floating-ui-layer, .hero-visual-bg { display: none; }
          .navbar { width: 95%; gap: 10px; }
          .brand { font-size: 1.2rem; }
          .sticky-mobile-cta { display: block; }
          .logos-grid { gap: 40px; }
        }
      `}</style>
    </div>
  );
}
