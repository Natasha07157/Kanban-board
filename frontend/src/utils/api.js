const apiUrl = 'https://api.quicksell.co/v1/internal/frontend-assignment';

export async function fetchTickets() {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch tickets');
    }
    const data = await response.json();
    return data;
}
