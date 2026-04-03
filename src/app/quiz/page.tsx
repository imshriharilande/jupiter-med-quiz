'use client';

import React from 'react';
import Link from 'next/link';

const SUBJECTS = [
  { id: 'anatomy', name: 'Anatomy', icon: '🦴', count: '1,200 Qs' },
  { id: 'physiology', name: 'Physiology', icon: '🫁', count: '950 Qs' },
  { id: 'pathology', name: 'Pathology', icon: '🧬', count: '1,500 Qs' },
  { id: 'pharmacology', name: 'Pharmacology', icon: '💊', count: '800 Qs' },
  { id: 'microbiology', name: 'Microbiology', icon: '🦠', count: '1,100 Qs' },
  { id: 'biochemistry', name: 'Biochemistry', icon: '🧪', count: '700 Qs' },
];

export default function QuizSelection() {
  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <h1>Select Subject</h1>
        <p>Choose a subject to start your practice session.</p>
      </header>

      <div className="subjects-grid">
        {SUBJECTS.map((subject) => (
          <Link key={subject.id} href={`/quiz/${subject.id}`} className="subject-card glass">
            <div className="subject-icon">{subject.icon}</div>
            <h3>{subject.name}</h3>
            <span>{subject.count}</span>
            <div className="start-arrow">→</div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .quiz-container {
          max-width: 1200px;
          margin: 60px auto;
          padding: 0 20px;
        }

        .quiz-header {
          margin-bottom: 50px;
        }

        .quiz-header h1 {
          font-size: 2.5rem;
          color: hsl(var(--fg-primary));
          margin-bottom: 10px;
        }

        .quiz-header p {
          color: hsl(var(--fg-secondary));
          font-size: 1.1rem;
        }

        .subjects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 25px;
        }

        .subject-card {
          padding: 30px;
          border-radius: var(--radius);
          text-decoration: none;
          color: inherit;
          position: relative;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          border: 1px solid transparent;
        }

        .subject-card:hover {
          transform: translateY(-5px);
          background: hsla(var(--bg-secondary) / 0.9);
          border-color: hsla(var(--brand-primary) / 0.3);
          box-shadow: 0 15px 30px hsla(0, 0%, 0%, 0.2);
        }

        .subject-icon {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }

        .subject-card h3 {
          font-size: 1.5rem;
          margin-bottom: 5px;
        }

        .subject-card span {
          color: hsl(var(--fg-secondary));
          font-size: 0.9rem;
        }

        .start-arrow {
          position: absolute;
          bottom: 30px;
          right: 30px;
          font-size: 1.5rem;
          color: hsl(var(--brand-primary));
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .subject-card:hover .start-arrow {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </div>
  );
}
