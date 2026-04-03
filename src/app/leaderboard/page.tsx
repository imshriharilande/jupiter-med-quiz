'use client';

import React from 'react';
import Link from 'next/link';

const TOP_STUDENTS = [
  { rank: 1, name: 'Dr. Sarah K.', score: 12500, accuracy: '96%', color: '#ffd700' },
  { rank: 2, name: 'Dr. Rohan M.', score: 11200, accuracy: '92%', color: '#c0c0c0' },
  { rank: 3, name: 'Dr. Elena V.', score: 10800, accuracy: '89%', color: '#cd7f32' },
  { rank: 4, name: 'Dr. Amit S.', score: 9500, accuracy: '85%', color: 'transparent' },
  { rank: 5, name: 'Dr. Priya D.', score: 9200, accuracy: '84%', color: 'transparent' },
];

export default function Leaderboard() {
  return (
    <div className="leaderboard-container">
      <header className="leaderboard-header">
        <h1 className="neon-glow">Global Leaderboard</h1>
        <p>The elite medical minds of JupiterMed. Where do you stand?</p>
      </header>

      <div className="podium-section">
        {TOP_STUDENTS.slice(0, 3).map((student) => (
          <div key={student.rank} className={`podium-item rank-${student.rank} glass`}>
            <div className="podium-rank" style={{ color: student.color }}>
              {student.rank === 1 ? '👑' : student.rank}
            </div>
            <div className="podium-name">{student.name}</div>
            <div className="podium-score">{student.score} pts</div>
          </div>
        ))}
      </div>

      <div className="ranking-table glass">
        <div className="table-header">
          <span>Rank</span>
          <span>Name</span>
          <span>Accuracy</span>
          <span>Total Score</span>
        </div>
        <div className="table-body">
          {TOP_STUDENTS.map((student) => (
            <div key={student.rank} className="table-row">
              <span className="row-rank">#{student.rank}</span>
              <span className="row-name">{student.name}</span>
              <span className="row-acc">{student.accuracy}</span>
              <span className="row-score neon-glow">{student.score}</span>
            </div>
          ))}
        </div>
      </div>

      <Link href="/quiz" className="cta-link">Challenge Them Now →</Link>

      <style jsx>{`
        .leaderboard-container {
          max-width: 1000px;
          margin: 60px auto;
          padding: 0 20px;
          text-align: center;
        }

        .leaderboard-header {
          margin-bottom: 60px;
        }

        .leaderboard-header h1 {
          font-size: 3rem;
          margin-bottom: 15px;
        }

        .leaderboard-header p {
          color: hsl(var(--fg-secondary));
        }

        .podium-section {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 60px;
          height: 250px;
        }

        .podium-item {
          padding: 30px;
          border-radius: var(--radius);
          width: 200px;
          transition: transform 0.3s ease;
        }

        .podium-item:hover {
          transform: translateY(-10px);
        }

        .rank-1 { height: 100%; border-color: #ffd700 !important; }
        .rank-2 { height: 80%; }
        .rank-3 { height: 70%; }

        .podium-rank {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 20px;
        }

        .podium-name {
          font-weight: 700;
          margin-bottom: 5px;
        }

        .podium-score {
          color: hsl(var(--brand-primary));
          font-size: 1.1rem;
        }

        .ranking-table {
          padding: 20px;
          border-radius: var(--radius);
          margin-bottom: 50px;
        }

        .table-header {
          display: grid;
          grid-template-columns: 0.5fr 2fr 1fr 1fr;
          padding: 15px 30px;
          border-bottom: 1px solid hsla(var(--fg-primary) / 0.1);
          color: hsl(var(--fg-secondary));
          font-weight: 600;
          text-align: left;
        }

        .table-row {
          display: grid;
          grid-template-columns: 0.5fr 2fr 1fr 1fr;
          padding: 20px 30px;
          text-align: left;
          border-bottom: 1px solid hsla(var(--fg-primary) / 0.05);
          transition: background 0.2s ease;
        }

        .table-row:hover {
          background: hsla(var(--brand-primary) / 0.05);
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .row-rank {
          font-weight: 700;
          color: hsl(var(--fg-secondary));
        }

        .row-name {
          font-weight: 600;
        }

        .row-score {
          color: hsl(var(--brand-primary));
          font-weight: 700;
        }

        .cta-link {
          display: inline-block;
          margin-top: 20px;
          color: hsl(var(--brand-primary));
          font-weight: 700;
          text-decoration: none;
          font-size: 1.2rem;
        }

        @media (max-width: 700px) {
          .podium-section { flex-direction: column; height: auto; align-items: center; }
          .podium-item { width: 100%; height: auto !important; }
          .table-header, .table-row { grid-template-columns: 1fr 1fr; gap: 10px; }
          .row-acc, .row-score { text-align: right; }
        }
      `}</style>
    </div>
  );
}
