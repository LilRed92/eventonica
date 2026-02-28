import React, { useState, useEffect, useReducer } from 'react';
import { Button, Form } from "react-bootstrap";

// 1. Reducer to handle the form state when in "Edit Mode"
const editReducer = (state, action) => {
    if (action.type === 'RESET_FORM') {
        return action.payload; // Resets back to the original event data
    }
    return {
        ...state,
        [action.type]: action.payload
    };
};

const ViewEvent = ({ event, onUpdateEvent, onDeleteEvent, setModalOpen }) => {
    // State to toggle between reading the event and editing the event
    const [isEditing, setIsEditing] = useState(false);
    
    // State for the edit form
    const [editData, dispatch] = useReducer(editReducer, event);
    const [categories, setCategories] = useState([]);

    // Fetch categories ONLY if the user clicks "Edit"
    useEffect(() => {
        if (isEditing && categories.length === 0) {
            fetch("http://localhost:8080/categories") 
                .then((response) => response.json())
                .then((data) => setCategories(data))
                .catch((error) => console.error("Error fetching categories:", error));
        }
    }, [isEditing, categories.length]);

    // --- Action Handlers ---

    const handleToggleFavorite = async () => {
        try {
            // Hits your toggleFavorite.js controller
            const response = await fetch(`http://localhost:8080/events/${event.id}/favorite`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ toggleFavorite: !event.is_favorite }),
            });
            const updatedEvent = await response.json();
            onUpdateEvent(updatedEvent); // Updates the master list in Dashboard
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    const handleDeleteClick = async () => {
        try {
            // Hits your deleteEvent.js controller
            const response = await fetch(`http://localhost:8080/events/${event.id}`, { method: "DELETE" });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            onDeleteEvent(event.id); // Removes from Dashboard
            setModalOpen(false);     // Closes the modal immediately
        } catch (err) {
            console.error('Error deleting event:', err);
        }
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        
        // Maps to the exact names expected by modifyEvent.js
        const payload = {
            id: editData.id,
            updatedEventName: editData.event_name,
            updatedCategory: editData.category,
            updatedDescription: editData.event_description,
            updatedStart: editData.start_time,
            updatedEnd: editData.end_time,
            updatedFavorite: editData.is_favorite
        };

        try {
            const response = await fetch(`http://localhost:8080/events/${event.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const updatedEvent = await response.json();
            
            onUpdateEvent(updatedEvent); // Update Dashboard
            setIsEditing(false);         // Flip back to "Read Only" view
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        dispatch({
            type: name,
            payload: type === 'checkbox' ? checked : value
        });
    };

    // --- RENDER: EDIT MODE ---
    if (isEditing) {
        return (
            <Form className='form-events' onSubmit={handleSaveEdit}>
                <h3>Edit Event</h3>
                
                <Form.Group>
                    <Form.Label>Event Name</Form.Label>
                    <input type="text" name="event_name" required value={editData.event_name} onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select name="category" value={editData.category} onChange={handleChange} required>
                        <option value="" disabled>Select a category...</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat.name || cat.category_name}>{cat.name || cat.category_name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <input type="text" name="event_description" value={editData.event_description} onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Start Time</Form.Label>
                    <input type="datetime-local" name="start_time" required value={editData.start_time} onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>End Time</Form.Label>
                    <input type="datetime-local" name="end_time" required value={editData.end_time} onChange={handleChange} />
                </Form.Group>

                <div className="form-buttons">
                    <Button type="submit" variant="outline-success">Save Changes</Button>
                    <Button type="button" variant="outline-secondary" onClick={() => {
                        setIsEditing(false); // Close edit mode
                        dispatch({ type: 'RESET_FORM', payload: event }); // Discard unsaved typing
                    }}>Cancel</Button>
                </div>
            </Form>
        );
    }

    // --- RENDER: READ-ONLY MODE ---
    return (
        <div className="view-event-details">
            <h2>{event.event_name}</h2>
            
            <div><strong>Category:</strong> {event.category}</div>
            <div><strong>Description:</strong> {event.event_description}</div>
            {/* Formats the raw timestamp into a readable date/time string */}
            <div><strong>Start:</strong> {new Date(event.start_time).toLocaleString()}</div>
            <div><strong>End:</strong> {new Date(event.end_time).toLocaleString()}</div>
            
            <div className="favorite-container">
                <strong>Favorite:</strong>
                <button className="favorite-btn" onClick={handleToggleFavorite}>
                    {event.is_favorite ? "❤️" : "🤍"}
                </button>
            </div>

            <div className="action-buttons">
                <Button variant="outline-info" onClick={() => setIsEditing(true)}>Edit Details</Button>
                <Button variant="outline-danger" onClick={handleDeleteClick}>Delete Event</Button>
            </div>
        </div>
    );
};

export default ViewEvent;