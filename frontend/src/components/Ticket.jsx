import React from 'react';
import urgentIcon from "../assets/icons_FEtask/SVG - Urgent Priority grey.svg";
import highIcon from "../assets/icons_FEtask/Img - High Priority.svg";
import lowIcon from "../assets/icons_FEtask/Img - Low Priority.svg";
import mediumIcon from "../assets/icons_FEtask/Img - Medium Priority.svg";
import noPriorityIcon from "../assets/icons_FEtask/No-priority.svg";

// Priority icon mapping
const priorityIcons = {
    0: lowIcon,
    1: mediumIcon,
    2: mediumIcon,
    3: highIcon,
    4: urgentIcon,
};

const getUserById = (users, userId) => {
    return users.find(user => user.id === userId);
};

function Ticket({ users, ticket }) {
    const user = getUserById(users, ticket.userId);

    const getPriorityIcon = (priority) => {
        return priorityIcons[priority] || noPriorityIcon;
    };

    return (
        <div className={`ticket priority-${ticket.priority}`}>
            <div className="ticket-id" style={{ color: 'grey', fontSize: '12px', marginBottom: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{ticket.id}</span>
                <span className="user-info" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span className="profile-picture">
                        <img
                            src={`https://ui-avatars.com/api/?name=${user?.name || 'Unknown'}&background=random`}
                            alt={`${user?.name || 'Unknown'}'s profile`}
                            style={{ borderRadius: '50%', width: '24px', height: '24px' }} // Adjust size as needed
                        />
                        <span
                            className="status-dot"
                            style={{
                                position: 'absolute',
                                bottom: '-2px',
                                right: '-2px',
                                width: '7px',
                                height: '7px',
                                borderRadius: '50%',
                                backgroundColor: user?.available ? 'green' : 'grey',
                                border: '2px solid white'
                            }}
                        />
                    </span>
                </span>
            </div>

            <div className="ticket-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0 }}>{ticket.title}</h4>
            </div>
            <p>{ticket.description}</p>
            <div className="priority-container" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="priority-icon" style={{ marginRight: '8px' }}>
                    <img src={getPriorityIcon(ticket.priority)} alt={`Priority level: ${ticket.priority}`} />
                </div>
                {ticket.tag && ticket.tag.length > 0 && (
                    <div className="ticket-tags" style={{ display: 'flex', alignItems: 'center' }}>
                        {ticket.tag.map((tag, index) => (
                            <span key={index} className="tag" style={{ marginLeft: '4px', display: 'flex', alignItems: 'center' }}>
                                <span style={{
                                    display: 'inline-block',
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: 'grey',
                                    marginRight: '4px', // Space between dot and tag
                                }} />
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Ticket;
