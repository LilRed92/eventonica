import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { SearchEvents } from './SearchFilter';

const Dashboard = () => {

   
    const [events, setEvents] = useState([]);
    

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    
  
    const [searchInput, setSearchInput] = useState('');
    const [showFavorites, setShowFavorites] = useState(false);

  
    const loadEvents = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/events`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            console.log("Data from server:", data);
            setEvents(data);
        } catch (err) {
            console.error('Error fetching events:', err);
        }
    }

    useEffect(() => {
        loadEvents();
    }, []);

    
    
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
        try {
            const response = await fetch(`http://localhost:3000/api/events/${eventId}`, { method: "DELETE" });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            setEvents((prevEvents) => prevEvents.filter(event => event.id !== eventId));
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };


    const handleOpenNewEvent = () => {
        setSelectedEvent(null); 
        setModalOpen(true);
    };

    const handleOpenViewEvent = (eventToView) => {
        setSelectedEvent(eventToView); 
        setModalOpen(true);
    };

    

    const filteredEvents = events.filter((event) => {
        const matchesSearch = event.event_name.toLowerCase().includes(searchInput.toLowerCase());
        const matchesFavorites = showFavorites ? event.is_favorite === true : true;
        
        return matchesSearch && matchesFavorites;
    });

    const eventsToDisplay = (searchInput !== '' || showFavorites) ? filteredEvents : events;



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
                    <tbody>
                    {eventsToDisplay.map((event) => (
                        <tr key={event.id}>
                            <td>{event.event_name}</td>
                            <td style={{backgroundColor: event.color}}>{event.emoji} {event.category_name}</td>
                            <td>{event.event_description}</td>
                            <td>{new Date(event.start_time).toLocaleString()}</td>
                            <td>{new Date(event.end_time).toLocaleString()}</td>
                            <td>
                                <button onClick={() => handleChangeFavorite(event)} className="favorite">
                                    {event.is_favorite ? "❤️" : "🩶"}
                                </button>
                            </td>
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