'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/utils/supabaseClient';

type Subject = {
  id: string;
  name: string;
  icon: string;
  question_count: number;
  color_hsl?: string; // e.g., "199 89% 48%"
};

export default function QuizSelection() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubjects() {
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .order('name', { ascending: true });

      if (data) setSubjects(data);
      if (error) console.error(error);
      setLoading(false);
    }
    fetchSubjects();
  }, []);

  if (loading) {
    return (
      <div className="loading-state h-screen flex items-center justify-center">
        <div className="neon-text animate-pulse text-2xl font-bold">Initializing Medical Boards...</div>
        <style jsx>{`
          .loading-state { height: 100vh; display: flex; align-items: center; justify-content: center; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="selection-container">
      <header className="selection-header animate-fade">
        <h1 className="neon-text">Subject Modules</h1>
        <p>Select specialized practice pools for your NEET PG prep.</p>
      </header>

      <div className="subjects-grid">
        {subjects.map((subject) => (
          <Link 
            key={subject.id} 
            href={`/quiz/${subject.id}`} 
            className="subject-card glass-card"
            style={{ '--subject-color': subject.color_hsl || '199 89% 48%' } as any}
          >
            <div className="subject-aura"></div>
            <div className="icon-wrapper glass">
              <span className="icon">{subject.icon}</span>
            </div>
            
            <div className="subject-meta">
              <h3>{subject.name}</h3>
              <div className="stat-row">
                <span className="q-count">{subject.question_count} MCQs</span>
                <span className="difficulty">High-Yield</span>
              </div>
            </div>
            
            <div className="card-footer">
              <span className="action-label">Open Module</span>
              <span className="arrow">→</span>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .selection-container {
          max-width: 1200px;
          margin: 120px auto 100px;
          padding: 0 40px;
        }

        .selection-header {
          margin-bottom: 60px;
        }

        .selection-header h1 {
          font-size: 3rem;
          margin-bottom: 10px;
          font-weight: 800;
        }

        .selection-header p {
          color: hsl(var(--fg-secondary));
          font-size: 1.25rem;
        }

        .subjects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
        }

        .subject-card {
          position: relative;
          padding: 35px;
          display: flex;
          flex-direction: column;
          gap: 25px;
          text-decoration: none;
          color: inherit;
          overflow: hidden;
        }

        .subject-aura {
          position: absolute;
          top: -20%;
          right: -20%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, hsla(var(--subject-color) / 0.15) 0%, transparent 70%);
          z-index: 0;
          transition: transform 0.5s ease;
        }

        .subject-card:hover .subject-aura {
          transform: scale(1.5) translate(-10%, 10%);
        }

        .icon-wrapper {
          width: 70px;
          height: 70px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          background: hsla(var(--subject-color) / 0.05);
          border: 1px solid hsla(var(--subject-color) / 0.2);
          z-index: 1;
        }

        .subject-meta { z-index: 1; }

        .subject-meta h3 {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .stat-row {
          display: flex;
          gap: 15px;
          align-items: center;
          font-size: 0.9rem;
          color: hsl(var(--fg-secondary));
        }

        .q-count {
          color: hsl(var(--subject-color));
          font-weight: 600;
        }

        .difficulty {
          background: hsla(0, 0%, 100%, 0.05);
          padding: 2px 10px;
          border-radius: 4px;
        }

        .card-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 20px;
          border-top: 1px solid var(--glass-border);
          z-index: 1;
        }

        .action-label {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: hsl(var(--fg-muted));
          transition: color 0.3s ease;
        }

        .subject-card:hover .action-label {
          color: hsl(var(--subject-color));
        }

        .arrow {
          font-size: 1.5rem;
          color: hsl(var(--subject-color));
          transform: translateX(-5px);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .subject-card:hover .arrow {
          transform: translateX(0);
          opacity: 1;
        }

        @media (max-width: 700px) {
          .selection-container { margin-top: 100px; padding: 0 20px; }
          .selection-header h1 { font-size: 2.2rem; }
          .subjects-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
