import React from 'react';
import './KanbanBoard.css';
import CardComponent from './CardComponent';

const KanbanBoard = ({ tickets, users, grouping, sorting }) => {
  const userMap = users.reduce((map, user) => {
    map[user.id] = user.name;
    return map;
  }, {});

  // Function to group tickets
  const groupTickets = (tickets, grouping) => {
    const grouped = {};

    tickets.forEach(ticket => {
      let key;
      if (grouping === 'user') {
        key = userMap[ticket.userId] || 'Unassigned';
      } else if (grouping === 'priority') {
        key = getPriorityName(ticket.priority);
      } else {
        key = ticket[grouping] || 'Unassigned';
      }

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(ticket);
    });

    return grouped;
  };

  // Function to sort tickets
  const sortTickets = (groupedTickets, sorting) => {
    Object.keys(groupedTickets).forEach(group => {
      if (sorting === 'priority') {
        groupedTickets[group].sort((a, b) => b.priority - a.priority);
      } else if (sorting === 'title') {
        groupedTickets[group].sort((a, b) => a.title.localeCompare(b.title));
      }
    });
  };

  const groupedTickets = groupTickets(tickets, grouping);
  sortTickets(groupedTickets, sorting);

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map(group => (
        <div key={group} className="kanban-column">
          <div className="kanban-column-header">
            <span className="kanban-column-title">{group}</span>
            <span className="kanban-column-count">{groupedTickets[group].length}</span>
          </div>
          <div className="kanban-column-cards">
            {groupedTickets[group].map(ticket => (
              <CardComponent key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// function to convert priority number to name
const getPriorityName = (priority) => {
  switch (priority) {
    case 4: return 'Urgent';
    case 3: return 'High';
    case 2: return 'Medium';
    case 1: return 'Low';
    default: return 'No Priority';
  }
};

export default KanbanBoard;
