export const groupBy = (tickets, key) => {
    return tickets.reduce((acc, ticket) => {
      const groupKey = ticket[key] || "Unassigned";
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(ticket);
      return acc;
    }, {});
  };

  export const sortTickets = (tickets, sortBy) => {
    if (sortBy === "priority") {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === "title") {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };
