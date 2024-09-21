import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [domains, setDomains] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/domains");
        const data = await response.json();
        setDomains(data);
      } catch (error) {
        console.error("Error fetching domains:", error);
      }
    };

    fetchDomains();
  }, []);

  const handleCardClick = (title) => {
    setActiveCard(activeCard === title ? null : title);
  };

  return (
    <div className="home-page">
      <Link to="/quiz" className="quiz-link">
        Don't know which domain to go! Take a test.
      </Link>
      <h1 className="field-title">Computer Science Fields</h1>
      <div className="field-cards-container">
        {domains.map((domain) => (
          <div
            key={domain.title}
            className={`field-card ${
              activeCard === domain.title ? "active" : ""
            }`}
            onClick={() => handleCardClick(domain.title)}
          >
            <h2>{domain.title}</h2>
            {activeCard === domain.title && (
              <div className="card-details">
                <p>{domain.details}</p>
                <Link to={`/fields/${domain.title}`} className="mentor-link">
                  Go to Mentor Page
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
