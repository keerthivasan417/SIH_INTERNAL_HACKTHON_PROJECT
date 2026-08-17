import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, Award, HelpCircle, Sparkles, Check, AlertCircle } from 'lucide-react';
import soundFX from '../../utils/audioFX';

// 5 Questions generator tailored per topic/subject
const TOPIC_QUESTIONS = {
  default: [
    {
      id: 1,
      question: "What is 3/4 expressed as a percentage?",
      questionOdia: "୩/୪ କୁ ପ୍ରତିଶତରେ ପ୍ରକାଶ କଲେ କେତେ ହେବ?",
      options: ["50%", "75%", "80%", "60%"],
      correct: 1
    },
    {
      id: 2,
      question: "Which of the following is a prime number?",
      questionOdia: "ନିମ୍ନଲିଖିତ ମଧ୍ୟରୁ କେଉଁଟି ଏକ ମୌଳିକ ସଂଖ୍ୟା?",
      options: ["9", "15", "17", "21"],
      correct: 2
    },
    {
      id: 3,
      question: "What is the square root of 144?",
      questionOdia: "୧୪୪ ର ବର୍ଗମୂଳ କେତେ?",
      options: ["10", "12", "14", "16"],
      correct: 1
    },
    {
      id: 4,
      question: "If 2x + 5 = 15, what is the value of x?",
      questionOdia: "ଯଦି ୨x + ୫ = ୧୫, ତେବେ x ର ମୂଲ୍ୟ କେତେ?",
      options: ["3", "4", "5", "6"],
      correct: 2
    },
    {
      id: 5,
      question: "What is the area of a rectangle with length 8cm and width 5cm?",
      questionOdia: "୮ ସେମି ଲମ୍ବ ଏବଂ ୫ ସେମି ଓସାର ଥିବା ଆୟତକ୍ଷେତ୍ରର କ୍ଷେତ୍ରଫଳ କେତେ?",
      options: ["40 cm²", "26 cm²", "35 cm²", "45 cm²"],
      correct: 0
    }
  ],
  science: [
    {
      id: 1,
      question: "Which gas do plants absorb during photosynthesis?",
      questionOdia: "ସୂର୍ଯ୍ୟାଲୋକରେ ଉଦ୍ଭିଦ କେଉଁ ଗ୍ୟାସ୍ ଗ୍ରହଣ କରେ?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correct: 1
    },
    {
      id: 2,
      question: "What is the unit of electric current?",
      questionOdia: "ବିଦ୍ୟୁତ୍ ସ୍ରୋତର ଏକକ କ’ଣ?",
      options: ["Volt", "Watt", "Ampere", "Joule"],
      correct: 2
    },
    {
      id: 3,
      question: "Which organ pumps blood throughout the human body?",
      questionOdia: "ମଣିଷ ଶରୀରରେ ରକ୍ତ କେଉଁ ଅଙ୍ଗ ସଞ୍ଚାଳନ କରେ?",
      options: ["Lungs", "Heart", "Kidney", "Liver"],
      correct: 1
    },
    {
      id: 4,
      question: "What is the chemical symbol for Water?",
      questionOdia: "ଜଳର ରାସାୟନିକ ସଙ୍କେତ କ’ଣ?",
      options: ["CO2", "O2", "H2O", "NaCl"],
      correct: 2
    },
    {
      id: 5,
      question: "What state of matter is steam?",
      questionOdia: "ବାଷ୍ପ ପଦାର୍ଥର କେଉଁ ଅବସ୍ଥା?",
      options: ["Solid", "Liquid", "Gas", "Plasma"],
      correct: 2
    }
  ]
};

export const TopicQuizModal = ({ isOpen, onClose, chapter, onCompleteAll, isOdia }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentIdx(0);
      setSelectedOption(null);
      setUserAnswers({});
      setIsSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen || !chapter) return null;

  const questionsList = TOPIC_QUESTIONS[chapter.subjectId] || TOPIC_QUESTIONS.default;
  const currentQ = questionsList[currentIdx];
  const totalQ = questionsList.length;

  const handleSelectOption = (idx) => {
    soundFX.playHover();
    setSelectedOption(idx);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;

    soundFX.playStarChime();
    const updatedAnswers = { ...userAnswers, [currentIdx]: selectedOption };
    setUserAnswers(updatedAnswers);

    if (currentIdx < totalQ - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
    } else {
      // All 5 questions submitted!
      setIsSubmitted(true);
      // Calculate correct count
      let correctCount = 0;
      Object.keys(updatedAnswers).forEach(qIdx => {
        if (updatedAnswers[qIdx] === questionsList[qIdx].correct) {
          correctCount++;
        }
      });

      setTimeout(() => {
        onCompleteAll(correctCount, totalQ);
      }, 500);
    }
  };

  return (
    <div className="champion-reward-overlay">
      <div className="topic-quiz-modal-card">
        {/* TOP HEADER */}
        <div className="topic-quiz-header">
          <div className="quiz-topic-pill">
            <Sparkles size={14} /> {isOdia ? '୫-ପ୍ରଶ୍ନ ପରୀକ୍ଷା' : '5-QUESTION TOPIC CHALLENGE'}
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={18} />
          </button>
        </div>

        {/* TOPIC TITLE */}
        <h3 className="topic-quiz-title">
          {isOdia ? chapter.titleOdia : chapter.title}
        </h3>

        {/* PROGRESS BAR */}
        <div className="quiz-progress-section">
          <div className="quiz-progress-text">
            <span>{isOdia ? `ପ୍ରଶ୍ନ ${currentIdx + 1} ରୁ ${totalQ}` : `Question ${currentIdx + 1} of ${totalQ}`}</span>
            <span className="quiz-xp-tag">+{chapter.xp || 50} XP</span>
          </div>
          <div className="quiz-progress-bar-bg">
            <div
              className="quiz-progress-bar-fill"
              style={{ width: `${((currentIdx + 1) / totalQ) * 100}%` }}
            />
          </div>
        </div>

        {/* QUESTION BOX */}
        <div className="question-content-box">
          <h4 className="question-text">
            {isOdia ? currentQ.questionOdia : currentQ.question}
          </h4>

          {/* 4 OPTIONS */}
          <div className="options-grid">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`quiz-option-btn ${isSelected ? 'selected' : ''}`}
                >
                  <div className="option-letter">{String.fromCharCode(65 + idx)}</div>
                  <span className="option-text-val">{opt}</span>
                  {isSelected && <Check size={18} className="selected-check-icon" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* FOOTER ACTION BUTTON */}
        <div className="topic-quiz-footer">
          <button
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
            className={`submit-q-btn ${selectedOption === null ? 'disabled' : ''}`}
          >
            {currentIdx === totalQ - 1 ? (
              <>
                <CheckCircle2 size={20} />
                {isOdia ? 'ସମସ୍ତ ୫ ପ୍ରଶ୍ନ ଦାଖଲ କରନ୍ତୁ' : 'SUBMIT ALL 5 QUESTIONS'}
              </>
            ) : (
              <>
                <span>{isOdia ? 'ପରବର୍ତ୍ତୀ ପ୍ରଶ୍ନ' : 'NEXT QUESTION'}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicQuizModal;
