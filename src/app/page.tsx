'use client';

import React, { useState } from 'react';
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
      <div className="glow-aura"></div>
      <div className="glow-aura-secondary"></div>

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
          <div className="social-proof">
            <span className="stars">★★★★★</span>
            Rated 4.9/5 by 2700+ medical students
          </div>
          <h1>Work smarter, <br/>achieve faster</h1>
          <p className="hero-sub">
            Effortlessly master your medical curriculum, collaborate with peers, and achieve your rank goals with our intuitive learning hub.
          </p>
          <div className="cta-group">
            <button className="cta-primary pulse-primary" onClick={() => user ? window.location.href='/quiz' : setShowLogin(true)}>
              Get Started Now <span className="icon">→</span>
            </button>
            {!user && <p className="cta-sub">Free for your first 50 MCQs. No credit card required.</p>}
          </div>
        </div>

        <div className="hero-visual">
          <div className="orb-container">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="glassy-orb"
            >
              <source src="https://future.co/images/homepage/glassy-orb/orb-purple.webm" type="video/webm" />
            </video>
          </div>
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
            <h3>Join JupiterMed</h3>
            <p>Master your medical career started here.</p>
            <form onSubmit={handleLogin}>
              <input 
                type="email" 
                placeholder="doctor@medical.edu" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="cta-primary w-full">Send Magic Link</button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          position: relative;
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

        .nav-links :global(a):hover {
          opacity: 1;
        }

        .theme-toggle {
          background: rgba(255,255,255,0.1);
          border: 1px solid var(--glass-stroke);
          border-radius: 8px;
          padding: 5px 10px;
          cursor: pointer;
          font-size: 1.1rem;
        }

        .login-btn {
          background: var(--brand);
          color: white;
          padding: 8px 20px;
          border-radius: 12px;
          font-weight: 600;
          border: none;
          cursor: pointer;
        }

        .hero-section {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          align-items: center;
          padding: 150px 60px;
          min-height: 80vh;
        }

        .hero-content {
          max-width: 700px;
        }

        .social-proof {
          font-size: 0.9rem;
          color: var(--fg-secondary);
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .stars {
          color: #FF801E;
          letter-spacing: 2px;
        }

        .hero-content h1 {
          font-size: 75px;
          line-height: 1.05;
          letter-spacing: -2px;
          margin-bottom: 30px;
          font-weight: 800;
        }

        .hero-sub {
          font-size: 1.15rem;
          line-height: 1.6;
          color: var(--fg-secondary);
          margin-bottom: 50px;
          letter-spacing: -0.5px;
        }

        .cta-primary {
          background-color: var(--brand);
          color: white;
          padding: 18px 40px;
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 700;
          border: none;
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          box-shadow: 0 10px 40px var(--brand-glow);
        }

        .cta-sub {
          font-size: 0.85rem;
          color: var(--fg-secondary);
          margin-top: 15px;
        }

        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .orb-container {
          position: relative;
          width: 600px;
          height: 600px;
        }

        .glassy-orb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          mix-blend-mode: screen;
          filter: hue-rotate(-55deg) saturate(250%) brightness(1.2) contrast(1.1);
          transform: scale(1.25);
        }

        .logos-section {
          margin-top: 50px;
          padding: 80px 60px;
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
          gap: 100px;
          opacity: 0.4;
          filter: grayscale(1);
        }

        .logo-placeholder {
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: 1px;
        }

        /* Modal Overhaul */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .login-modal {
          width: 100%;
          max-width: 450px;
          padding: 50px;
          border-radius: 24px;
          text-align: center;
        }

        .login-modal input {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          background: var(--bg);
          border: 1px solid var(--glass-stroke);
          color: var(--fg);
          margin-bottom: 20px;
          font-family: inherit;
        }

        @media (max-width: 1100px) {
          .hero-section { grid-template-columns: 1fr; text-align: center; padding: 100px 20px; }
          .hero-content { margin: 0 auto; }
          .hero-content h1 { font-size: 50px; }
          .hero-visual { display: none; }
          .navbar { width: 90%; }
        }
      `}</style>
    </div>
  );
}
