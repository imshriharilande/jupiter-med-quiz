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
    <div className="leaderboard-layout animate-fade">
      <header className="leaderboard-header">
        <h1 className="neon-text">Global Elite</h1>
        <p>Ranking the most dedicated medical minds of 2026.</p>
      </header>

      <div className="podium-experience">
        {/* Silver - 2nd */}
        <div className="podium-rank glass-card rank-2">
          <div className="avatar glass">RM</div>
          <div className="name">Dr. Rohan M.</div>
          <div className="score">11,200 pts</div>
          <div className="place">2nd</div>
        </div>

        {/* Gold - 1st */}
        <div className="podium-rank glass-card rank-1">
          <div className="crown">👑</div>
          <div className="avatar glass gold-glow">SK</div>
          <div className="name">Dr. Sarah K.</div>
          <div className="score">12,500 pts</div>
          <div className="place">1st</div>
        </div>

        {/* Bronze - 3rd */}
        <div className="podium-rank glass-card rank-3">
          <div className="avatar glass">EV</div>
          <div className="name">Dr. Elena V.</div>
          <div className="score">10,800 pts</div>
          <div className="place">3rd</div>
        </div>
      </div>

      <section className="ranking-table glass-card">
        <div className="table-header">
          <span>Rank</span>
          <span>Student Physician</span>
          <span className="text-right">Accuracy</span>
          <span className="text-right">Total XP</span>
        </div>
        <div className="table-body">
          {TOP_STUDENTS.map((s) => (
            <div key={s.rank} className="table-row">
              <span className={`rank-num ${s.rank <= 3 ? 'top' : ''}`}>#{s.rank}</span>
              <span className="student-name">{s.name}</span>
              <span className="student-acc text-right">{s.accuracy}</span>
              <span className="student-score text-right neon-text">{s.score.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="leaderboard-cta">
        <Link href="/quiz" className="neon-btn">Challenge Your Peers →</Link>
      </div>

      <style jsx>{`
        .leaderboard-layout {
          max-width: 1000px;
          margin: 140px auto 100px;
          padding: 0 40px;
          text-align: center;
        }

        .leaderboard-header { margin-bottom: 80px; }
        .leaderboard-header h1 { font-size: 3.5rem; margin-bottom: 10px; font-weight: 800; }
        .leaderboard-header p { color: hsl(var(--fg-secondary)); font-size: 1.2rem; }

        .podium-experience {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 80px;
          height: 350px;
        }

        .podium-rank {
          flex: 1;
          max-width: 200px;
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          position: relative;
        }

        .rank-1 { height: 100%; border-color: hsla(45, 100%, 50%, 0.3); }
        .rank-2 { height: 85%; }
        .rank-3 { height: 75%; }

        .avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.2rem;
          color: white;
        }

        .gold-glow { box-shadow: 0 0 20px hsla(45, 100%, 50%, 0.4); border: 2px solid #ffd700; }
        
        .crown { font-size: 2.5rem; position: absolute; top: -35px; }
        .name { font-weight: 700; font-size: 1.1rem; }
        .score { color: hsl(var(--fg-secondary)); font-size: 0.9rem; }
        .place { 
          font-size: 1.5rem; 
          font-weight: 900; 
          margin-top: auto;
          color: hsl(var(--brand-primary));
        }

        .rank-1 .place { color: #ffd700; }

        .ranking-table { padding: 0; overflow: hidden; border-radius: 24px; }
        
        .table-header {
          display: grid;
          grid-template-columns: 0.8fr 2fr 1fr 1fr;
          padding: 25px 40px;
          background: hsla(0,0%,100%,0.02);
          border-bottom: 1px solid var(--glass-border);
          color: hsl(var(--fg-muted));
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 1.5px;
          text-align: left;
        }

        .table-row {
          display: grid;
          grid-template-columns: 0.8fr 2fr 1fr 1fr;
          padding: 25px 40px;
          text-align: left;
          align-items: center;
          border-bottom: 1px solid var(--glass-border);
          transition: background 0.3s ease;
        }

        .table-row:hover { background: hsla(var(--brand-primary) / 0.05); }
        .text-right { text-align: right; }

        .rank-num { font-weight: 800; font-family: 'Space Grotesk'; font-size: 1.1rem; opacity: 0.5; }
        .rank-num.top { color: hsl(var(--brand-primary)); opacity: 1; }
        
        .student-name { font-weight: 600; font-size: 1.1rem; }
        .student-acc { color: hsl(var(--fg-secondary)); }

        .leaderboard-cta { margin-top: 60px; }

        @media (max-width: 800px) {
          .podium-experience { flex-direction: column; height: auto; align-items: stretch; }
          .podium-rank { max-width: none; height: auto !important; padding: 20px; flex-direction: row; }
          .table-header, .table-row { grid-template-columns: 0.5fr 2fr 1fr; padding: 20px; }
          .student-acc { display: none; }
          .crown { left: 10px; top: -20px; font-size: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
