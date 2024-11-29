import React from "react";
import Card from "./Card";
// import "./Column.css";

const Column = ({ title, tickets }) => {
  return (
    <div className="column">
      <div className="column-header">{title}</div>
      <div className="column-tickets">
        {tickets.map((ticket) => (
          <Card key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default Column;
