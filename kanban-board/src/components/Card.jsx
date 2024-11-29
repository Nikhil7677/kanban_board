import React from "react";
// import "./styles/Card.css";

const Card = ({ ticket }) => {
  return (
    <div className="card">
      <div className="card-title">{ticket.title}</div>
      <div className="card-description">{ticket.description}</div>
      <div className="card-footer">
        <span>Priority: {ticket.priority}</span>
        <span>User: {ticket.user}</span>
      </div>
    </div>
  );
};

export default Card;
