import React, { useState, useEffect } from "react";
import GroupingOptions from "./GroupingOptions";
import SortOptions from "./SortOptions";
import Column from "./Column";
// import "./KanbanBoard.css";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("priority");

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); // Inspect the structure
        if (data && Array.isArray(data.tickets)) {
          setTickets(data.tickets); // Assuming the tickets are inside a 'tickets' field
        } else {
          console.error("Tickets are not found or not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  // Group tickets based on the selected field (status, user, priority)
  const groupTickets = (tickets, groupBy) => {
    if (!Array.isArray(tickets)) {
      console.error("Expected tickets to be an array, but got:", tickets);
      return {};
    }

    const grouped = {};

    tickets.forEach((ticket) => {
      const groupKey = ticket[groupBy] || "Unassigned"; // Default to "Unassigned" if no groupBy key
      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(ticket);
    });

    return grouped;
  };

  // Sort tickets based on the selected option (priority or title)
  const sortTickets = (groupedTickets, sortBy) => {
    const sorted = {};

    Object.keys(groupedTickets).forEach((group) => {
      sorted[group] = groupedTickets[group].sort((a, b) => {
        if (sortBy === "priority") {
          return b.priority - a.priority; // Sort descending by priority
        } else if (sortBy === "title") {
          return a.title.localeCompare(b.title); // Sort ascending by title
        }
        return 0;
      });
    });

    return sorted;
  };

  // Group tickets based on the current state of 'groupBy' and then sort them based on 'sortBy'
  const groupedTickets = groupTickets(tickets, groupBy);
  const sortedTickets = sortTickets(groupedTickets, sortBy);

  return (
    <div className="kanban-board">
      <div className="options">
        <GroupingOptions setGroupBy={setGroupBy} />
        <SortOptions setSortBy={setSortBy} />
      </div>
      <div className="columns">
        {Object.entries(sortedTickets).map(([key, items]) => (
          <Column key={key} title={key} tickets={items} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
