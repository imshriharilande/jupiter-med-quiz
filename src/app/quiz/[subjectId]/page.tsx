'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

type Question = {
  id: string;
  question_text: string;
  options: string[];
  correct_option_index: number;
  explanation: string;
};

export default function QuizEngine() {
  const params = useParams();
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('subject_id', params.subjectId);

      if (data && data.length > 0) {
        setQuestions(data);
      } else {
        console.warn('No questions found for this subject.');
      }
      setLoading(false);
    }
    if (params.subjectId) fetchQuestions();
  }, [params.subjectId]);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered && !loading && questions.length > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleSelect(-1); // Timeout
    }
  }, [timeLeft, isAnswered, loading, questions]);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
    setIsAnswered(true);
    if (idx === questions[currentQ].correct_option_index) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setIsAnswered(false);
      setTimeLeft(60);
    } else {
      // Save attempt to Supabase (Future)
      router.push('/dashboard');
    }
  };

  if (loading) return (
    <div className="engine-loader">
      <div className="neon-text animate-pulse">Syncing Question Pool...</div>
      <style jsx>{`
        .engine-loader { height: 100vh; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; }
      `}</style>
    </div>
  );

  if (questions.length === 0) return (
    <div className="engine-error">
      <div className="glass-card text-center p-12">
        <h2 className="mb-4">No Questions Found</h2>
        <p className="text-secondary mb-6">We're currently populating this medical module. Check back shortly!</p>
        <button onClick={() => router.back()} className="neon-btn">Return to Subjects</button>
      </div>
      <style jsx>{`
        .engine-error { height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
      `}</style>
    </div>
  );

  const currentQuestion = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <div className="engine-layout">
      {/* Quiz Header - Progress & Timer */}
      <header className="engine-header glass">
        <div className="header-inner">
          <div className="progress-section">
            <span className="q-label">Question <span className="neon-text">{currentQ + 1}</span> / {questions.length}</span>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          <div className={`timer-box glass ${timeLeft < 10 ? 'low-time' : ''}`}>
            ⏱ <span className="time">{timeLeft}s</span>
          </div>
        </div>
      </header>

      <main className="engine-main animate-fade">
        <div className="question-container">
          <h2 className="question-text">{currentQuestion.question_text}</h2>
          
          <div className="options-grid">
            {currentQuestion.options.map((option, idx) => {
              let state = '';
              if (isAnswered) {
                if (idx === currentQuestion.correct_option_index) state = 'correct';
                else if (idx === selected) state = 'wrong';
                else state = 'disabled';
              } else if (selected === idx) {
                state = 'active';
              }

              return (
                <button 
                  key={idx} 
                  className={`option-card glass-card ${state}`}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                >
                  <span className="option-label">{String.fromCharCode(65 + idx)}</span>
                  <span className="option-text">{option}</span>
                  {isAnswered && idx === currentQuestion.correct_option_index && <span className="check-icon">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Medical Reasoning Slide */}
        {isAnswered && (
          <div className="reasoning-slide glass">
            <div className="slide-content">
              <div className="feedback-badge">
                {selected === currentQuestion.correct_option_index ? 
                  <span className="text-success">🎯 Correct Response</span> : 
                  <span className="text-error">💡 Clinical Insight Required</span>
                }
              </div>
              <h3>Medical Reasoning</h3>
              <p className="explanation">{currentQuestion.explanation}</p>
              <button className="neon-btn next-btn" onClick={handleNext}>
                {currentQ === questions.length - 1 ? 'Complete Session' : 'Continue Step →'}
              </button>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .engine-layout {
          min-height: 100vh;
          background: radial-gradient(circle at top right, hsla(var(--brand-primary) / 0.05), transparent 60%);
          padding-top: 100px;
        }

        .engine-header {
          position: fixed;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 900px;
          padding: 15px 30px;
          border-radius: 20px;
          z-index: 100;
        }

        .header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
        }

        .progress-section {
          flex: 1;
        }

        .q-label { font-weight: 600; font-size: 0.9rem; margin-bottom: 8px; display: block; }

        .progress-track {
          height: 6px;
          background: hsla(0,0%,100%,0.05);
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, hsl(var(--brand-primary)), hsl(var(--brand-secondary)));
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 10px hsla(var(--brand-primary) / 0.5);
        }

        .timer-box {
          padding: 8px 18px;
          border-radius: 12px;
          font-family: 'Space Grotesk', monospace;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .low-time {
          color: hsl(var(--error));
          border-color: hsla(var(--error) / 0.4);
          animation: pulse-red 1s infinite;
        }

        @keyframes pulse-red {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .engine-main {
          max-width: 800px;
          margin: 60px auto 200px;
          padding: 0 20px;
        }

        .question-text {
          font-size: 2.2rem;
          line-height: 1.3;
          margin-bottom: 50px;
          font-weight: 800;
        }

        .options-grid {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .option-card {
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          text-align: left;
          width: 100%;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 18px;
        }

        .option-label {
          width: 40px;
          height: 40px;
          background: hsla(0,0%,100%,0.05);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1rem;
        }

        .option-text { flex: 1; font-size: 1.15rem; font-weight: 500; }

        .option-card:hover:not(:disabled) {
          border-color: hsla(var(--brand-primary) / 0.4);
          background: hsla(var(--brand-primary) / 0.03);
        }

        .option-card.active { border-color: hsl(var(--brand-primary)); }
        
        .option-card.correct {
          background: hsla(var(--success) / 0.1);
          border-color: hsl(var(--success)) !important;
        }

        .option-card.wrong {
          background: hsla(var(--error) / 0.1);
          border-color: hsl(var(--error)) !important;
          opacity: 0.8 !important;
        }

        .option-card.disabled { opacity: 0.4; cursor: default; }

        .check-icon { color: hsl(var(--success)); font-weight: 800; font-size: 1.5rem; }

        /* Reasoning Slide */
        .reasoning-slide {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 40px 0;
          z-index: 200;
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          border-top: 1px solid var(--glass-border);
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .slide-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .feedback-badge {
          font-size: 0.85rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 15px;
        }

        .text-success { color: hsl(var(--success)); }
        .text-error { color: hsl(var(--error)); }

        .reasoning-slide h3 { font-size: 1.5rem; margin-bottom: 12px; }
        
        .explanation {
          color: hsl(var(--fg-secondary));
          line-height: 1.7;
          margin-bottom: 30px;
          font-size: 1.1rem;
        }

        .next-btn { float: right; padding: 14px 40px; }

        @media (max-width: 900px) {
          .engine-header { top: 70px; width: 92%; }
          .question-text { font-size: 1.6rem; }
          .reasoning-slide { padding: 30px 0 50px; }
        }
      `}</style>
    </div>
  );
}
