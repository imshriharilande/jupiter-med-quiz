'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="dashboard-loader">
        <div className="neon-text animate-pulse">Syncing Doctor Profile...</div>
        <style jsx>{`
          .dashboard-loader { height: 100vh; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; }
        `}</style>
      </div>
    );
  }

  const SUBJECT_STATS = [
    { name: 'Anatomy', score: 92, status: 'Mastered' },
    { name: 'Physiology', score: 78, status: 'Review Needed' },
    { name: 'Biochemistry', score: 85, status: 'Stable' },
    { name: 'Pathology', score: 64, status: 'Critical Area' },
  ];

  return (
    <div className="dashboard-layout animate-fade">
      <header className="dashboard-header">
        <div className="user-intro">
          <h1>Welcome, <span className="neon-text">Dr. {user.email?.split('@')[0]}</span></h1>
          <p>Your diagnostic performance report is ready for review.</p>
        </div>
        <div className="header-badges">
          <div className="streak-badge glass">🔥 14 Day Streak</div>
          <div className="rank-badge glass">🎖️ Global Rank: #412</div>
        </div>
      </header>

      <div className="stats-overview">
        <div className="stat-card glass-card">
          <span className="sc-label">Average Accuracy</span>
          <h2 className="sc-value neon-text">84%</h2>
          <span className="sc-delta text-success">↑ 12% this week</span>
        </div>
        <div className="stat-card glass-card">
          <span className="sc-label">MCQs Practiced</span>
          <h2 className="sc-value">1,420</h2>
          <span className="sc-delta">Total attempts</span>
        </div>
        <div className="stat-card glass-card">
          <span className="sc-label">Time Per Q</span>
          <h2 className="sc-value">42s</h2>
          <span className="sc-delta text-warning">Optimize for NEET PG</span>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Performance Visualization */}
        <section className="chart-section glass-card">
          <div className="section-title">
            <h3>Subject Proficiency</h3>
            <span className="text-muted">Live diagnostic analytics</span>
          </div>
          
          <div className="radar-chart-placeholder">
            {/* Custom SVG Performance Chart */}
            <svg viewBox="0 0 400 300" className="w-full">
              {SUBJECT_STATS.map((s, i) => (
                <g key={s.name}>
                  <rect 
                    x="80" 
                    y={40 + i*60} 
                    width="280" 
                    height="12" 
                    rx="6" 
                    fill="hsla(0,0%,100%,0.05)" 
                  />
                  <rect 
                    x="80" 
                    y={40 + i*60} 
                    width={(s.score/100) * 280} 
                    height="12" 
                    rx="6" 
                    fill={`hsl(${i*40 + 199} 89% 48%)`}
                    className="animate-bar"
                  />
                  <text x="0" y={50 + i*60} fill="white" className="label-text">{s.name}</text>
                  <text x="370" y={50 + i*60} fill="white" textAnchor="end" className="score-text">{s.score}%</text>
                </g>
              ))}
            </svg>
          </div>
        </section>

        {/* Diagnostic Insights */}
        <section className="insight-section">
          <div className="glass-card insight-box warning">
            <div className="i-header">
              <span className="i-icon">⚠️</span>
              <h4>Critical Focus: Pathology</h4>
            </div>
            <p>Your accuracy in 'General Pathology' has dipped below 65%. We recommend a targeted session today.</p>
            <Link href="/quiz/pathology" className="inline-action">Start Targeted Quiz →</Link>
          </div>

          <div className="recent-activity glass-card">
            <h3>Session History</h3>
            <div className="activity-list">
              {[
                { subj: 'Anatomy', date: 'Jul 12', score: '18/20' },
                { subj: 'Biochemistry', date: 'Jul 10', score: '15/20' },
                { subj: 'Physiology', date: 'Jul 08', score: '19/20' },
              ].map((a, i) => (
                <div key={i} className="activity-item">
                  <div className="a-info">
                    <strong>{a.subj}</strong>
                    <span>{a.date}</span>
                  </div>
                  <span className="a-score neon-text">{a.score}</span>
                </div>
              ))}
            </div>
            <Link href="/quiz" className="neon-btn w-full block-center">Explore All Subjects</Link>
          </div>
        </section>
      </div>

      <style jsx>{`
        .dashboard-layout {
          max-width: 1200px;
          margin: 120px auto 100px;
          padding: 0 40px;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 60px;
          gap: 20px;
        }

        .dashboard-header h1 { font-size: 2.8rem; margin-bottom: 8px; }
        .dashboard-header p { color: hsl(var(--fg-secondary)); font-size: 1.15rem; }

        .header-badges { display: flex; gap: 15px; }
        .header-badges > div { padding: 8px 18px; border-radius: 50px; font-weight: 700; font-size: 0.9rem; }

        .stats-overview {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          margin-bottom: 50px;
        }

        .sc-label { color: hsl(var(--fg-muted)); font-weight: 700; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 15px; }
        .sc-value { font-size: 3rem; font-weight: 800; margin-bottom: 5px; }
        .sc-delta { font-size: 0.85rem; font-weight: 600; }
        .text-success { color: hsl(var(--success)); }
        .text-warning { color: hsl(var(--warning)); }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 25px;
          align-items: start;
        }

        .section-title { margin-bottom: 40px; }
        .section-title h3 { font-size: 1.6rem; }
        .text-muted { color: hsl(var(--fg-muted)); font-size: 0.9rem; }

        .label-text { font-size: 0.8rem; font-weight: 600; opacity: 0.7; }
        .score-text { font-size: 0.9rem; font-weight: 800; }

        .animate-bar {
          animation: fillBar 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: left;
        }

        @keyframes fillBar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .insight-section { display: flex; flex-direction: column; gap: 25px; }

        .insight-box { padding: 30px; border-radius: 20px; }
        .insight-box.warning { border-color: hsla(var(--warning) / 0.3); background: hsla(var(--warning) / 0.05); }

        .i-header { display: flex; align-items: center; gap: 12px; margin-bottom: 15px; }
        .i-header h4 { font-size: 1.2rem; font-weight: 800; }
        .insight-box p { color: hsl(var(--fg-secondary)); line-height: 1.6; margin-bottom: 20px; }
        
        .inline-action { color: hsl(var(--warning)); font-weight: 700; text-decoration: none; font-size: 0.9rem; }

        .recent-activity { padding: 30px; }
        .activity-list { display: flex; flex-direction: column; gap: 20px; margin-bottom: 30px; }
        .activity-item { display: flex; justify-content: space-between; align-items: center; }
        .a-info { display: flex; flex-direction: column; }
        .a-info strong { font-size: 1rem; }
        .a-info span { font-size: 0.8rem; color: hsl(var(--fg-muted)); }
        .a-score { font-weight: 800; font-size: 1.1rem; }

        .block-center { width: 100%; text-align: center; }

        @media (max-width: 1000px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .stats-overview { grid-template-columns: 1fr; }
          .dashboard-header { flex-direction: column; align-items: flex-start; }
          .dashboard-layout { padding: 0 20px; }
        }
      `}</style>
    </div>
  );
}
