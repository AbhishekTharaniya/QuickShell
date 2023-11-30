import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KanbanBoard from './KanbanBoard';
import ControlPanel from './ControllPanel';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sorting, setSorting] = useState('priority'); 

  // Fetch tickets and users from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        setTickets(response.data.tickets);
        setUsers(response.data.users); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Save view state to localStorage
  useEffect(() => {
    const saveViewState = () => {
      const viewState = { grouping, sorting };
      localStorage.setItem('viewState', JSON.stringify(viewState));
    };

    saveViewState();
  }, [grouping, sorting]);

  // Load view state from localStorage
  useEffect(() => {
    const loadViewState = () => {
      const savedState = localStorage.getItem('viewState');
      if (savedState) {
        const { grouping, sorting } = JSON.parse(savedState);
        setGrouping(grouping);
        setSorting(sorting);
      }
    };

    loadViewState();
  }, []);

  return (
    <div className="app">
      <ControlPanel setGrouping={setGrouping} setSorting={setSorting} />
      <KanbanBoard tickets={tickets} users={users} grouping={grouping} sorting={sorting} />
    </div>
  );
};

export default App;
