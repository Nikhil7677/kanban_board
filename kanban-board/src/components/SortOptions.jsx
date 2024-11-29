import React from "react";

const SortOptions = ({ setSortBy }) => {
  return (
    <div className="sort-options">
      <label>
        Sort By:
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </label>
    </div>
  );
};

export default SortOptions;

