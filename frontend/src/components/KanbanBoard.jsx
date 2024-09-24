import React from 'react';
import KanbanColumn from './KanbanColumn';
import InProgress from '../assets/icons_FEtask/in-progress.svg';
import backlog from '../assets/icons_FEtask/Backlog.svg';
import todo from '../assets/icons_FEtask/To-do.svg';
import canceled from '../assets/icons_FEtask/Cancelled.svg';
import urgentIcon from "../assets/icons_FEtask/SVG - Urgent Priority grey.svg";
import highIcon from "../assets/icons_FEtask/Img - High Priority.svg";
import lowIcon from "../assets/icons_FEtask/Img - Low Priority.svg";
import mediumIcon from "../assets/icons_FEtask/Img - Medium Priority.svg";
import noPriorityIcon from "../assets/icons_FEtask/No-priority.svg";

function KanbanBoard({ tickets, users, groupBy, sortBy }) {
    // Ensure tickets is always an array
    if (!Array.isArray(tickets)) {
        return <div>No tickets available</div>;
    }

    // Map of images for different groups
    const groupImages = {
        status: {
            Backlog: backlog,
            "In progress": InProgress,
            Todo: todo,
            Canceled: canceled, 
        },
        user: {},  // You can map user images if needed
        priority: {
            0:noPriorityIcon,
            1:lowIcon,
            2:mediumIcon,
            3:highIcon,
            4:urgentIcon,
        },  
    };

    const priorityMapping = {
        0: 'No Priority',
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Urgent',
    };

    const groupTickets = (tickets, groupBy) => {
        return tickets.reduce((acc, ticket) => {
            let key;
            if (groupBy === 'user') {
                const user = users.find(user => user.id === ticket.userId);
                key = user ? user.name : 'Unknown';
            }else if (groupBy === 'priority') {
                key = priorityMapping[ticket.priority] || 'Other'; }
            else {
                key = ticket[groupBy] || 'Other';
            }

            if (!acc[key]) acc[key] = [];
            acc[key].push(ticket);
            return acc;
        }, {});
    };

    const sortTickets = (groupedTickets, sortBy) => {
        Object.keys(groupedTickets).forEach((key) => {
            groupedTickets[key].sort((a, b) => {
                if (sortBy === 'priority') {
                    return b.priority - a.priority;
                } else {
                    return a.title.localeCompare(b.title);
                }
            });
        });
        return groupedTickets;
    };

    const groupedTickets = groupTickets(tickets, groupBy);
    const sortedTickets = sortTickets(groupedTickets, sortBy);

    return (
        <div className="kanban-board">
            {Object.keys(sortedTickets).map((group) => (
                <KanbanColumn key={group} group={group} users={users} tickets={sortedTickets[group]} image={groupImages[groupBy][group] || ''} />
            ))}
        </div>
    );
}

export default KanbanBoard;
