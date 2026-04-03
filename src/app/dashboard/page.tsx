'use client';

import React from 'react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>Welcome back, Dr. Aditya</h1>
          <p>You're in the top 5% of NEET PG aspirants this week!</p>
        </div>
        <div className="streak-badge neon-border">🔥 12 Day Streak</div>
      </header>

      <div className="stats-grid">
        <div className="stat-card glass">
          <div className="stat-label">Overall Accuracy</div>
          <div className="stat-value neon-glow">84%</div>
          <div className="stat-delta positive">↑ 4% this month</div>
        </div>
        <div className="stat-card glass">
          <div className="stat-label">Quizzes Completed</div>
          <div className="stat-value neon-glow">128</div>
          <div className="stat-delta">Keep it up!</div>
        </div>
        <div className="stat-card glass">
          <div className="stat-label">Current Rank</div>
          <div className="stat-value neon-glow">#412</div>
          <div className="stat-delta positive">↑ 120 positions</div>
        </div>
      </div>

      <div className="main-content">
        <div className="chart-section glass">
          <h3>Subject Performance</h3>
          <div className="bar-chart">
            {[
              { name: 'Anatomy', val: 90 },
              { name: 'Physiology', val: 75 },
              { name: 'Pathology', val: 82 },
              { name: 'Pharmacol', val: 68 },
              { name: 'Microbio', val: 95 },
            ].map((s) => (
              <div key={s.name} className="chart-item">
                <div className="bar-wrapper">
                  <div className="bar-fill" style={{ height: `${s.val}%` }}>
                    <span className="bar-tooltip">{s.val}%</span>
                  </div>
                </div>
                <span className="bar-label">{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-activity glass">
          <h3>Recent Attempts</h3>
          <div className="activity-list">
            {[
              { subj: 'Anatomy', date: 'Today', score: '18/20' },
              { subj: 'Physiology', date: 'Yesterday', score: '15/20' },
              { subj: 'Biochemistry', date: '2 days ago', score: '19/20' },
            ].map((a, i) => (
              <div key={i} className="activity-item">
                <div className="subj-info">
                  <strong>{a.subj}</strong>
                  <span>{a.date}</span>
                </div>
                <div className="subj-score neon-glow">{a.score}</div>
              </div>
            ))}
          </div>
          <Link href="/quiz" className="new-quiz-btn neon-border">Take a New Quiz</Link>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          max-width: 1200px;
          margin: 60px auto;
          padding: 0 20px;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 50px;
        }

        .dashboard-header h1 {
          font-size: 2.2rem;
          margin-bottom: 5px;
        }

        .dashboard-header p {
          color: hsl(var(--fg-secondary));
        }

        .streak-badge {
          padding: 8px 15px;
          border-radius: 50px;
          font-weight: 700;
          color: hsl(var(--warning));
          background: hsla(var(--warning) / 0.1);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          margin-bottom: 50px;
        }

        .stat-card {
          padding: 30px;
          border-radius: var(--radius);
        }

        .stat-label {
          color: hsl(var(--fg-secondary));
          font-size: 0.9rem;
          margin-bottom: 10px;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .stat-delta {
          font-size: 0.85rem;
          color: hsl(var(--fg-secondary));
        }

        .stat-delta.positive {
          color: hsl(var(--success));
        }

        .main-content {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 25px;
        }

        .chart-section, .recent-activity {
          padding: 30px;
          border-radius: var(--radius);
          display: flex;
          flex-direction: column;
        }

        .chart-section h3, .recent-activity h3 {
          margin-bottom: 30px;
        }

        .bar-chart {
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          height: 300px;
          padding: 0 20px;
        }

        .chart-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          gap: 15px;
        }

        .bar-wrapper {
          width: 40px;
          height: 100%;
          background: hsla(var(--fg-primary) / 0.05);
          border-radius: 20px;
          position: relative;
          display: flex;
          align-items: flex-end;
        }

        .bar-fill {
          width: 100%;
          background: linear-gradient(180deg, hsl(var(--brand-primary)), hsl(var(--brand-secondary)));
          border-radius: 20px;
          position: relative;
        }

        .bar-tooltip {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.75rem;
          font-weight: 700;
          color: hsl(var(--brand-primary));
        }

        .bar-label {
          font-size: 0.8rem;
          color: hsl(var(--fg-secondary));
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 30px;
        }

        .activity-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .subj-info {
          display: flex;
          flex-direction: column;
        }

        .subj-info strong {
          color: hsl(var(--fg-primary));
        }

        .subj-info span {
          color: hsl(var(--fg-secondary));
          font-size: 0.8rem;
        }

        .subj-score {
          font-weight: 700;
          color: hsl(var(--brand-primary));
        }

        .new-quiz-btn {
          margin-top: auto;
          padding: 15px;
          text-align: center;
          border-radius: var(--radius);
          text-decoration: none;
          color: hsl(var(--brand-primary));
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .main-content { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
