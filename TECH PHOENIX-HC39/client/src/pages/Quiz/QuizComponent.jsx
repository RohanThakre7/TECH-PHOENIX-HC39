import React, { useState, useEffect } from "react";
import "./QuizComponent.css";

// Array of 25 questions and options with associated domains
const allQuestions = [
  {
    question: "Which project would you find most exciting?",
    options: [
      "Creating a smart assistant using AI.",
      "Developing a secure app for financial transactions.",
      "Building an interactive website.",
      "Analyzing data trends to predict outcomes.",
    ],
    domains: ["AI", "Cybersecurity", "Web Development", "Data Science"],
  },
  {
    question: "What do you enjoy doing the most?",
    options: [
      "Solving complex algorithms.",
      "Designing user interfaces.",
      "Securing networks from threats.",
      "Creating data visualizations.",
    ],
    domains: [
      "Machine Learning",
      "Web Development",
      "Cybersecurity",
      "Data Science",
    ],
  },
  {
    question: "What aspect of technology excites you the most?",
    options: [
      "The creativity involved in AI.",
      "The challenge of cybersecurity.",
      "The versatility of web applications.",
      "The power of data-driven decisions.",
    ],
    domains: ["AI", "Cybersecurity", "Web Development", "Data Science"],
  },
  {
    question: "Which type of coding challenge do you prefer?",
    options: [
      "Building a chatbot.",
      "Implementing a secure login system.",
      "Creating an engaging user experience.",
      "Predicting outcomes based on data.",
    ],
    domains: ["AI", "Cybersecurity", "Web Development", "Data Science"],
  },
  {
    question: "What motivates you to learn new technologies?",
    options: [
      "Creating innovative solutions.",
      "Protecting information and assets.",
      "Enhancing user experiences.",
      "Uncovering insights from data.",
    ],
    domains: ["AI", "Cybersecurity", "Web Development", "Data Science"],
  },
  {
    question: "When working on a project, what role do you prefer?",
    options: [
      "Leading the AI development.",
      "Managing security protocols.",
      "Overseeing the web development team.",
      "Interpreting and analyzing data.",
    ],
    domains: ["AI", "Cybersecurity", "Web Development", "Data Science"],
  },
  {
    question: "What kind of problems do you enjoy solving?",
    options: [
      "Creative challenges in AI.",
      "Security vulnerabilities.",
      "User experience issues.",
      "Data interpretation challenges.",
    ],
    domains: ["AI", "Cybersecurity", "Web Development", "Data Science"],
  },
  {
    question: "How do you keep your coding skills sharp?",
    options: [
      "Working on personal AI projects.",
      "Participating in security challenges.",
      "Building new web applications.",
      "Analyzing datasets for insights.",
    ],
    domains: ["AI", "Cybersecurity", "Web Development", "Data Science"],
  },
  {
    question: "What is your favorite programming language to work with?",
    options: ["Python", "JavaScript", "Java", "C++"],
    domains: [
      "AI, Data Science",
      "Web Development",
      "Cybersecurity, Machine Learning",
      "Machine Learning",
    ],
  },
  {
    question: "What inspires your technical projects?",
    options: [
      "The potential of AI to change lives.",
      "Ensuring safety and privacy for users.",
      "Creating visually appealing applications.",
      "The story behind the data.",
    ],
    domains: ["AI", "Cybersecurity", "Web Development", "Data Science"],
  },
  // Add more questions as needed...
];

// Shuffle and select 10 questions
const getRandomQuestions = (questions) => {
  const shuffled = questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
};

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(Array(10).fill(null));
  const [modalVisible, setModalVisible] = useState(false);
  const [suggestedDomains, setSuggestedDomains] = useState([]);

  useEffect(() => {
    setQuestions(getRandomQuestions(allQuestions));
  }, []);

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.includes(null)) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const domainScores = {};

    answers.forEach((answer, index) => {
      const domains = questions[index].domains[answer]
        .split(", ")
        .map((domain) => domain.trim());
      domains.forEach((domain) => {
        domainScores[domain] = (domainScores[domain] || 0) + 1;
      });
    });

    const sortedDomains = Object.entries(domainScores)
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .slice(0, 3)
      .map(([domain]) => domain);

    setSuggestedDomains(sortedDomains);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    window.location.href = "/"; // Redirect to home page
  };

  return (
    <div className="quiz-container">
      <h2 className="quiz-titile">Select Your Domain</h2>
      <div>
        {questions.map((q, index) => (
          <div key={index}>
            <h3>{q.question}</h3>
            {q.options.map((option, i) => (
              <div key={i}>
                <input
                  className="quiz"
                  type="radio"
                  name={`question${index}`}
                  value={i}
                  checked={answers[index] === i}
                  onChange={() => handleAnswerChange(index, i)}
                  id={`question${index}-option${i}`} // Unique ID for the label
                />
                <label
                  htmlFor={`question${index}-option${i}`}
                  className="radio-label"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button className="quiz-button" onClick={handleSubmit}>
          Submit
        </button>

        {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <h2>Suggested Domains</h2>
              <p>{suggestedDomains.join(", ")}</p>
              <button className="modal-button" onClick={handleCloseModal}>
                Find Suggested Domain on Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
