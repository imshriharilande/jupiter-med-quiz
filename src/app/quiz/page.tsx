'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/utils/supabaseClient';

type Subject = {
  id: string;
  name: string;
  icon: string;
  question_count: number;
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
    return <div className="loading neon-glow">Loading subjects...</div>;
  }

  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <h1>Select Subject</h1>
        <p>Choose a subject to start your practice session.</p>
      </header>

      <div className="subjects-grid">
        {subjects.map((subject) => (
          <Link key={subject.id} href={`/quiz/${subject.id}`} className="subject-card glass">
            <div className="subject-icon">{subject.icon}</div>
            <h3>{subject.name}</h3>
            <span>{subject.question_count} Qs</span>
            <div className="start-arrow">→</div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .loading {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

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
