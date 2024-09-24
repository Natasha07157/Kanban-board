// src/utils/dataGenerator.js

const statuses = ['To Do', 'In Progress', 'Done'];
const priorities = [0, 1, 2, 3, 4]; // 0: No Priority, 1: Low, 2: Medium, 3: High, 4: Urgent
const users = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve'];
const sampleTitles = [
    'Fix bug in login page',
    'Implement feature X',
    'Update documentation',
    'Refactor codebase',
    'Design new logo',
];
const sampleDescriptions = [
    'This needs to be fixed ASAP.',
    'Consider the edge cases.',
    'Refer to the guidelines.',
    'Coordinate with the design team.',
    'Review the pull requests.',
];

export function generateRandomTickets(count) {
    const tickets = [];
    for (let i = 0; i < count; i++) {
        const ticket = {
            id: i + 1,
            title: sampleTitles[Math.floor(Math.random() * sampleTitles.length)] + ` ${i + 1}`,
            description: sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            priority: priorities[Math.floor(Math.random() * priorities.length)],
            user: users[Math.floor(Math.random() * users.length)],
        };
        tickets.push(ticket);
    }
    return tickets;
}
