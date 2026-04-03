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
        // Fallback or error handling
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
    }
  }, [timeLeft, isAnswered, loading, questions]);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
    setIsAnswered(true);
    if (idx === questions[currentQ].correct_option_index) {
      setScore(score + 100);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setIsAnswered(false);
      setTimeLeft(60);
    } else {
      router.push('/dashboard');
    }
  };

  if (loading) return <div className="loader glass neon-glow">Loading Question Pool...</div>;
  if (questions.length === 0) return <div className="error glass">No questions available for this subject yet.</div>;

  const currentQuestion = questions[currentQ];

  return (
    <div className="quiz-engine-container">
      <div className="quiz-status glass">
        <div className="progress-info">
          <span>Question {currentQ + 1} of {questions.length}</span>
          <div className="timer-box neon-glow">⏱ {timeLeft}s</div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}></div>
        </div>
      </div>

      <div className="question-card glass">
        <h2>{currentQuestion.question_text}</h2>
        <div className="options-list">
          {currentQuestion.options.map((option, idx) => {
            let className = 'option-item glass';
            if (isAnswered) {
              if (idx === currentQuestion.correct_option_index) className += ' correct';
              else if (idx === selected) className += ' wrong';
            } else if (selected === idx) {
              className += ' active';
            }
            return (
              <div key={idx} className={className} onClick={() => handleSelect(idx)}>
                <div className="option-letter">{String.fromCharCode(65 + idx)}</div>
                {option}
              </div>
            );
          })}
        </div>

        {isAnswered && (
          <div className="explanation-box neon-border">
            <h4>Explanation:</h4>
            <p>{currentQuestion.explanation}</p>
            <button className="next-btn" onClick={handleNext}>
              {currentQ === questions.length - 1 ? 'Finish' : 'Next Question →'}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .loader, .error {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .quiz-engine-container {
          max-width: 800px;
          margin: 40px auto;
          padding: 0 20px;
        }

        .quiz-status {
          padding: 20px;
          border-radius: var(--radius);
          margin-bottom: 30px;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .timer-box {
          font-family: monospace;
          font-size: 1.2rem;
          color: hsl(var(--brand-primary));
        }

        .progress-bar {
          height: 6px;
          background: hsl(var(--bg-accent));
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, hsl(var(--brand-primary)), hsl(var(--brand-secondary)));
          transition: width 0.3s ease;
        }

        .question-card {
          padding: 40px;
          border-radius: var(--radius);
        }

        .question-card h2 {
          font-size: 1.8rem;
          margin-bottom: 40px;
          line-height: 1.4;
        }

        .options-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .option-item {
          padding: 20px;
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          gap: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid hsla(var(--fg-primary) / 0.05);
        }

        .option-item:hover:not(.correct):not(.wrong) {
          background: hsla(var(--bg-accent) / 0.5);
          border-color: hsla(var(--brand-primary) / 0.5);
        }

        .option-letter {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: hsla(var(--bg-accent) / 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .option-item.correct {
          background: hsla(var(--success) / 0.1);
          border-color: hsl(var(--success));
        }

        .option-item.wrong {
          background: hsla(var(--error) / 0.1);
          border-color: hsl(var(--error));
        }

        .explanation-box {
          margin-top: 40px;
          padding: 25px;
          border-radius: var(--radius);
          background: hsla(var(--brand-primary) / 0.03);
          animation: slideUp 0.4s ease forwards;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .explanation-box h4 {
          color: hsl(var(--brand-primary));
          margin-bottom: 15px;
        }

        .explanation-box p {
          color: hsl(var(--fg-secondary));
          margin-bottom: 25px;
          line-height: 1.6;
        }

        .next-btn {
          background: hsl(var(--brand-primary));
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: var(--radius);
          font-weight: 600;
          cursor: pointer;
          float: right;
        }
      `}</style>
    </div>
  );
}
