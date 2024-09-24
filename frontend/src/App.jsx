import React, { useEffect, useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import './App.css';
import { fetchTickets } from './utils/api';
import display from'./assets/icons_FEtask/Display.svg';
import arrow from './assets/icons_FEtask/down.svg';

function App() {
    const [tickets, setTickets] = useState([]);  
    const [users, setUsers] = useState([]);
    const [groupBy, setGroupBy] = useState('status');
    const [sortBy, setSortBy] = useState('priority');
    const [loading, setLoading] = useState(true);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownType, setDropdownType] = useState('group');

    useEffect(() => {
        async function loadTickets() {
            try {
                const data = await fetchTickets();
                setTickets(data.tickets);
                setUsers(data.users);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load tickets:', error);
            }
        }
        loadTickets();
    }, []);

    const handleGroupChange = (e) => {
        setGroupBy(e.target.value);
        setDropdownVisible(false); // Close dropdown after selection
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setDropdownVisible(false); // Close dropdown after selection
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleDropdownTypeChange = (type) => {
        setDropdownType(type);
        setDropdownVisible(true);
    };

    return (
        <div className="app-container">
            <button className="display-button" onClick={toggleDropdown}>
            <img src={display} alt="Display Icon" style={{ marginRight: '5px' }} />
                Display
            <img src={arrow}/>
            </button>

            {dropdownVisible && (
                <div className="dropdown">
                <div className="dropdown-item">
                    <span>Grouping   </span>
                    <select onChange={handleGroupChange} defaultValue={groupBy} className="group-select">
                        <option value="status">Status</option>
                        <option value="user">User</option>
                        <option value="priority">Priority</option>
                    </select>
                </div>
                <div className="dropdown-item">
                    <span>Ordering   </span>
                    <select onChange={handleSortChange} defaultValue={sortBy} className="sort-select">
                        <option value="priority">Priority</option>
                        <option value="title">Title</option>
                    </select>
                </div>
            </div>
            
            )}

            {loading ? (
                <div>Loading...</div>
            ) : (
                <KanbanBoard tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
            )}
        </div>
    );
}

export default App;
