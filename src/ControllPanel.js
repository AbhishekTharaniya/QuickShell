// ControlPanel.js
import React from 'react';
import './ControlPanel.css';

const ControlPanel = ({ setGrouping, setSorting }) => {
  
  const handleGroupingChange = (e) => {
    setGrouping(e.target.value);
  };


  const handleSortingChange = (e) => {
    setSorting(e.target.value);
  };

  return (
    <div className="control-panel">
      <div className="grouping-sorting-control">
        <label htmlFor="grouping" className="control-label">Group by:</label>
        <select id="grouping" onChange={handleGroupingChange} defaultValue="status" className="control-select">
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>

        <label htmlFor="sorting" className="control-label">Sort by:</label>
        <select id="sorting" onChange={handleSortingChange} defaultValue="priority" className="control-select">
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default ControlPanel;
