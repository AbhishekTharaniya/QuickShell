import React from 'react';
import './CardComponent.css';
import profile from "./Assets/profile.png"

const CardComponent = ({ ticket }) => {
  
  const icon = ticket.priority === 4 ? '!' : '•'; 

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{ticket.id}</span>
        <span className="card-profile">
        <img src={profile} alt="Profile" className="card-profile-picture" />
      </span>
      </div>
      <div className="card-content">
        <h4 className="card-title">{ticket.title}</h4>
        <div className="card-metadata">
          <span className="feature-icon">{icon}</span>
          <span className="card-tag">{ticket.tag.join(', ')}</span>
        </div>
      </div>
     
    </div>
  );
};

export default CardComponent;
