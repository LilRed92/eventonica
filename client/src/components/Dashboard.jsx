import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { SearchEvents } from './SearchFilter';

const Dashboard = () => {

    // --- Core State ---
    const [events, setEvents] = useState([]);
    
    // --- Modal State ---
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    
    // --- Filter State ---
    const [searchInput, setSearchInput] = useState('');
    const [showFavorites, setShowFavorites] = useState(false);

    // --- Data Fetching ---
    const loadEvents = async () => {
        try {
            const response = await fetch(`http://localhost:8080/events`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setEvents(data);
        } catch (err) {
            console.error('Error fetching events:', err);
        }
    }

    useEffect(() => {
        loadEvents();
    }, []);

    // --- State Update Handlers (CRUD) ---
    
    const onAddEvent = (newEvent) => {
        setEvents((prevEvents) => [...prevEvents, newEvent]);
        setModalOpen(false); // Close modal on success
    };

    const onUpdateEvent = (updatedEvent) => {
        setEvents((prevEvents) => 
            prevEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event)
        );
    };

    const handleDelete = async (eventId) => {
        // Optimistic UI update or wait for server confirmation. 
        // Here, we wait for the server to confirm deletion before removing from state.
        try {
            const response = await fetch(`http://localhost:8080/events/${eventId}`, { method: "DELETE" });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            setEvents((prevEvents) => prevEvents.filter(event => event.id !== eventId));
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };

    // --- Modal Toggles ---

    const handleOpenNewEvent = () => {
        setSelectedEvent(null); // Null tells EventCard to render AddEventForm
        setModalOpen(true);
    };

    const handleOpenViewEvent = (eventToView) => {
        setSelectedEvent(eventToView); // Passing the object tells EventCard to render ViewEvent
        setModalOpen(true);
    };

    // --- Frontend Filtering ---

    const filteredEvents = events.filter((event) => {
        const matchesSearch = event.event_name.toLowerCase().includes(searchInput.toLowerCase());
        const matchesFavorites = showFavorites ? event.is_favorite === true : true;
        
        return matchesSearch && matchesFavorites;
    });

    // --- Render ---

    return (
        <div className="dashboard">
            
            <SearchEvents 
                searchInput={searchInput} 
                setSearchInput={setSearchInput}
                showFavorites={showFavorites}
                setShowFavorites={setShowFavorites}
            />

            <button onClick={handleOpenNewEvent} className="btn btn-primary" style={{ marginBottom: '20px' }}>
                + New Event
            </button>
            
            <div className="events-list">
                <table>
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredEvents.map((event) => (
                        <tr key={event.id}>
                            <td>{event.event_name} {event.is_favorite ? "❤️" : ""}</td>
                            <td>{event.category}</td>
                            <td>{event.event_description}</td>
                            <td>{new Date(event.start_time).toLocaleString()}</td>
                            <td>{new Date(event.end_time).toLocaleString()}</td>
                            <td>
                                <button onClick={() => handleOpenViewEvent(event)} className="editBtn">
                                    View / Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Conditionally render the Modal overlay */}
            {modalOpen && (
                <EventCard 
                    event={selectedEvent} 
                    setModalOpen={setModalOpen} 
                    onAddEvent={onAddEvent} 
                    onUpdateEvent={onUpdateEvent}    
                    onDeleteEvent={handleDelete}     
                />
            )}
        </div>
    );
}

export default Dashboard;