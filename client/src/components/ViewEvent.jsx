import React, { useState, useEffect, useReducer } from 'react';
import AddEventForm from './AddEventForm.jsx'
import { Button, Form } from "react-bootstrap";


const editReducer = (state, action) => {
    if (action.type === 'RESET_FORM') {
        return action.payload;
    }
    return {
        ...state,
        [action.type]: action.payload
    };
};

const ViewEvent = ({ event, onUpdateEvent, onDeleteEvent, setModalOpen }) => {

    const [isEditing, setIsEditing] = useState(false);
    

    const [editData, dispatch] = useReducer(editReducer, event);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/categories`) 
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

//    async function editEvent() {
//         setIsEditing(true);
//         fetch("http://localhost:3000/api/events/:id/categories") 
//             .then((response) => response.json())
//             .then((data) => setCategories(data))
//             .catch((error) => console.error("Error fetching categories:", error));
        // try {
        //     const response = await fetch("http://localhost:3000/events/:id/categories");
        //     if (!response.ok) {
        //         throw new Error(`Error fetching categories: ${response.status}`);
        //     };
        //     const data = await response.json();
        //     setCategories(data);
        // } catch (err) {
        //     console.error('Fetching categories error: ', err);
        // }
    // }
  

    const handleToggleFavorite = async () => {
        try {
            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/${event.id}/favorites`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ toggleFavorite: !event.is_favorite }),
            });
            const updatedEvent = await response.json();
            onUpdateEvent(updatedEvent); 
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    const handleDeleteClick = async () => {
        try {
            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/${event.id}`, { method: "DELETE" });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            onDeleteEvent(event.id); 
            setModalOpen(false);    
        } catch (err) {
            console.error('Error deleting event:', err);
        }
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
       

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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/${event.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const updatedEvent = await response.json();
            
            onUpdateEvent(updatedEvent); 
            setIsEditing(false);         
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
  
    return (
        <div className="view-edit-event">
            {isEditing ? (
                <AddEventForm />
            ) : (
                <div className="view-event-details">
                <h2>{event.event_name}</h2>
                
                <div><strong>Category:</strong> {event.category}</div>
                <div><strong>Description:</strong> {event.event_description}</div>
                <div><strong>Start:</strong> {new Date(event.start_time).toLocaleString()}</div>
                <div><strong>End:</strong> {new Date(event.end_time).toLocaleString()}</div>
                
                <div className="favorite-container">
                    <strong>Favorite:</strong>
                    <button className="favorite-btn" onClick={handleToggleFavorite}>
                        {event.is_favorite ? "❤️" : "🩶"}
                    </button>
                </div>

                <div className="action-buttons">
                    <Button variant="outline-info" onClick={() => setIsEditing(true)}>Edit Details</Button>
                    <Button variant="outline-danger" onClick={handleDeleteClick}>Delete Event</Button>
                </div>
            </div>
            )}
        </div>
        
    )
}

export default ViewEvent;