'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

const MOCK_QUESTIONS = [
  {
    id: 1,
    question: 'Which of the following bones is the longest in the human body?',
    options: ['Humerus', 'Femur', 'Tibia', 'Fibula'],
    correct: 1,
    explanation: 'The femur is the longest and strongest bone in the human body, extending from the hip to the knee.',
  },
  {
    id: 2,
    question: 'The anatomical term for the "kneecap" is:',
    options: ['Scapula', 'Patella', 'Clavicle', 'Sternum'],
    correct: 1,
    explanation: 'The patella, also known as the kneecap, is a thick, circular-triangular bone which articulates with the femur and covers and protects the anterior articular surface of the knee joint.',
  },
];

export default function QuizEngine() {
  const params = useParams();
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isAnswered]);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
    setIsAnswered(true);
    if (idx === MOCK_QUESTIONS[currentQ].correct) {
      setScore(score + 100);
    }
  };

  const handleNext = () => {
    if (currentQ < MOCK_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setIsAnswered(false);
      setTimeLeft(60);
    } else {
      router.push('/dashboard');
    }
  };

  const currentQuestion = MOCK_QUESTIONS[currentQ];

  return (
    <div className="quiz-engine-container">
      <div className="quiz-status glass">
        <div className="progress-info">
          <span>Question {currentQ + 1} of {MOCK_QUESTIONS.length}</span>
          <div className="timer-box neon-glow">⏱ {timeLeft}s</div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentQ + 1) / MOCK_QUESTIONS.length) * 100}%` }}></div>
        </div>
      </div>

      <div className="question-card glass">
        <h2>{currentQuestion.question}</h2>
        <div className="options-list">
          {currentQuestion.options.map((option, idx) => {
            let className = 'option-item glass';
            if (isAnswered) {
              if (idx === currentQuestion.correct) className += ' correct';
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
              {currentQ === MOCK_QUESTIONS.length - 1 ? 'Finish' : 'Next Question →'}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
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
