'use client';

import React from 'react';
import HeartExperience from '@/components/Guidance/HeartExperience';
import Link from 'next/link';

export default function Guidance() {
  return (
    <div className="guidance-story-page">
      {/* The 3D Engine Backdrop */}
      <HeartExperience />

      {/* Persistence Overlay (Back Button) */}
      <nav className="persistence-nav liquid-glass">
        <Link href="/" className="back-link">← Home</Link>
        <span className="current-subject">Module: Cardiology</span>
      </nav>

      {/* Floating Guidance UI (Scroll-driven typography is inside HeartExperience) */}
      <div className="footer-scroll-tip">
        <span>SCROLL TO DIVE DEEPER</span>
        <div className="mouse-scroll-icon neon-border"></div>
      </div>

      <style jsx>{`
        .guidance-story-page {
          background-color: #000;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .persistence-nav {
          position: fixed;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 30px;
          padding: 10px 25px;
          border-radius: 50px;
        }

        .back-link {
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          opacity: 0.8;
          transition: 0.3s;
        }

        .back-link:hover { opacity: 1; color: var(--brand-neon); }

        .current-subject {
          color: var(--brand-neon);
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 2px;
        }

        .footer-scroll-tip {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: white;
          opacity: 0.6;
        }

        .footer-scroll-tip span {
          font-size: 0.65rem;
          letter-spacing: 3px;
          font-weight: 800;
        }

        .mouse-scroll-icon {
          width: 20px;
          height: 35px;
          border-radius: 20px;
          position: relative;
        }
        .mouse-scroll-icon::before {
          content: '';
          position: absolute;
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 7px;
          background: white;
          border-radius: 10px;
          animation: scrollDown 2s infinite;
        }

        @keyframes scrollDown {
          0% { opacity: 0; transform: translate(-50%, 0); }
          50% { opacity: 1; transform: translate(-50%, 15px); }
          100% { opacity: 0; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}
