'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, signOut, signIn } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email);
      setShowLogin(false);
    } catch (err) {
      console.error(err);
      alert('Login failed. Check your email formatting.');
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
        <div className="nav-container">
          <Link href="/" className="brand neon-text">
            JupiterMed <span className="text-white">Quiz</span>
          </Link>
          
          <div className="nav-links">
            <Link href="/quiz">Practice</Link>
            <Link href="/leaderboard">Compete</Link>
            <Link href="/guidance">Guide</Link>
            
            <div className="nav-actions">
              {user ? (
                <>
                  <Link href="/dashboard" className="neon-btn btn-sm">Dashboard</Link>
                  <button onClick={signOut} className="logout-btn">Sign Out</button>
                </>
              ) : (
                <button className="neon-btn btn-sm" onClick={() => setShowLogin(true)}>
                  Student Portal
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-modal glass animate-fade" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowLogin(false)}>×</button>
            <h2 className="neon-text">Medical Access</h2>
            <p className="text-secondary">Enter your email to receive your magic entry link.</p>
            <form onSubmit={handleLogin} className="login-form">
              <input 
                type="email" 
                placeholder="doctor@medical.edu" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="glass-input"
              />
              <button type="submit" className="neon-btn w-full">Send Secure Link</button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding: 20px 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .navbar.scrolled {
          padding: 12px 0;
          border-bottom: 1px solid var(--glass-border);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
        }

        .brand {
          font-size: 1.5rem;
          font-weight: 800;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .text-white { color: white; }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .nav-links :global(a) {
          color: hsl(var(--fg-secondary));
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: 0.2s;
        }

        .nav-links :global(a):hover {
          color: hsl(var(--brand-primary));
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-left: 20px;
          padding-left: 20px;
          border-left: 1px solid var(--glass-border);
        }

        .btn-sm {
          padding: 8px 20px;
          font-size: 0.9rem;
        }

        .logout-btn {
          background: transparent;
          border: none;
          color: hsl(var(--error));
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          opacity: 0.8;
        }

        .logout-btn:hover { opacity: 1; }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .login-modal {
          padding: 50px;
          width: 100%;
          max-width: 450px;
          border-radius: 24px;
          text-align: center;
          position: relative;
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: transparent;
          border: none;
          color: hsl(var(--fg-secondary));
          font-size: 1.5rem;
          cursor: pointer;
        }

        .login-modal h2 {
          font-size: 2rem;
          margin-bottom: 10px;
          font-weight: 800;
        }

        .text-secondary {
          color: hsl(var(--fg-secondary));
          margin-bottom: 30px;
          font-size: 1.1rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .glass-input {
          background: hsla(0, 0%, 100%, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 15px;
          color: white;
          font-family: inherit;
          font-size: 1rem;
        }

        .w-full { width: 100%; justify-content: center; }

        @media (max-width: 900px) {
          .nav-links { display: none; }
        }
      `}</style>
    </<>
  );
}
