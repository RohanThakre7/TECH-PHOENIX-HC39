import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import MentorCard from "../../components/MentorCard/MentorCard";
import { AuthContext } from "../../context/authContext"; // Import AuthContext
import "./FieldPage.css";

const FieldPage = () => {
  const { domainTitle } = useParams(); // Get the 'domainTitle' from the URL
  const { token, isAuthenticated } = useContext(AuthContext); // Use AuthContext for auth data
  const [domain, setDomain] = useState(null);
  const [user, setUser] = useState(null); // For tracking logged-in user

  useEffect(() => {
    // Fetch domain details
    const fetchDomain = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/domains/${domainTitle}`
        );
        const data = await response.json();
        setDomain(data);
      } catch (error) {
        console.error("Error fetching domain data:", error);
      }
    };

    // Fetch logged-in user info (only if authenticated)
    const fetchUser = async () => {
      if (isAuthenticated && token) {
        try {
          const response = await fetch("http://localhost:5000/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = await response.json();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchDomain();
    fetchUser();
  }, [domainTitle, isAuthenticated, token]);

  const handleBecomeMentor = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/domains/${domainTitle}/mentor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass token for auth
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("You have been added as a mentor to this domain!");
        setDomain((prevDomain) => ({
          ...prevDomain,
          mentors: [...prevDomain.mentors, user],
        }));
      } else {
        alert(data.msg || "Failed to become a mentor");
      }
    } catch (error) {
      console.error("Error adding mentor to domain:", error);
    }
  };

  if (!domain) {
    return <div>Domain not found</div>;
  }

  return (
    <div className="field-page">
      <h1>{domain.title}</h1>
      <p>{domain.details}</p>

      {/* Show Become a Mentor button only if the user is a mentor */}
      {isAuthenticated && user && user.userType === "mentor" && (
        <button onClick={handleBecomeMentor}>Become a Mentor</button>
      )}

      <h2>Available Mentors</h2>
      <div className="mentor-cards-container">
        {domain.mentors.map((mentor, index) => (
          <MentorCard key={index} mentor={mentor} />
        ))}
      </div>
    </div>
  );
};

export default FieldPage;
