import React from "react";
import "./MentorCard.css";

const MentorCard = ({ mentor }) => {
  return (
    <div className="mentor-card">
      <div className="mentor-image">
        <img src={mentor.photo} alt={mentor.name} className="mentor-photo" />
      </div>
      <div>
        <h3>{mentor.name}</h3>
        <p>Experience: {mentor.experience}</p>
        {/* <p>Contact: {mentor.contact}</p> */}
        <p>Email: {mentor.email}</p>
        <p>Fees: {mentor.fees}</p>
      </div>
    </div>
  );
};

export default MentorCard;
