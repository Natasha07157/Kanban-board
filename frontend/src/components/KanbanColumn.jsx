import React from 'react';
import Ticket from './Ticket';

function KanbanColumn({ group, users, tickets, image }) {
    return (
        <div className="kanban-column">
            <h3 style={{ display: 'flex', alignItems: 'center' }}>
                {image && <img src={image} alt={`${group} icon`} style={{ marginRight: '8px', width: '24px', height: '24px' }} />}
                {group}
            </h3>
            {tickets.map((ticket) => (
                <Ticket key={ticket.id} users={users} ticket={ticket} />
            ))}
        </div>
    );
}

export default KanbanColumn;
