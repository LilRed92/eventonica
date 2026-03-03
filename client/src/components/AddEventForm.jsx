import React, { useState, useEffect, useReducer } from 'react';
import { Button, Form } from "react-bootstrap";


const initialFormState = {
    event_name: "",
    category: "",
    event_description: "",
    start_time: "",
    end_time: "",
    is_favorite: false
};


const formReducer = (state, action) => {
    if (action.type === 'RESET_FORM') {
        return initialFormState;
    }
    
    
    return {
        ...state,
        [action.type]: action.payload
    };
};

const AddEventForm = ({ onAddEvent }) => {
   
    const [eventData, dispatch] = useReducer(formReducer, initialFormState);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/categories") 
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

  
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        dispatch({
            type: name, 
            payload: type === 'checkbox' ? checked : value
        });
    };

    const clearForm = () => {
        dispatch({ type: 'RESET_FORM' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
      
        const payload = {
            newEventName: eventData.event_name,
            selectedCategory: eventData.category,
            newDescription: eventData.event_description,
            newStart: eventData.start_time,
            newEnd: eventData.end_time,
            newFavorite: eventData.is_favorite
        };

        try {
            const response = await fetch("http://localhost:3000/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            
            onAddEvent(data); 
            clearForm();
        } catch (error) {
            console.error("Error posting event:", error);
        }
    };

    return (
        <Form className='form-events' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Event Name</Form.Label>
                <input
                    type="text"
                    name="event_name"
                    placeholder="Event Name"
                    required
                    value={eventData.event_name}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select 
                    name="category" 
                    value={eventData.category} 
                    onChange={handleChange} 
                    required
                    style={{ display: 'block', width: '100%', border: '3px solid #98d0f1' }}
                >
                    <option value="" disabled>Select a category...</option>
                    {categories.map((cat, index) => (
                        <option key={index} style={{backgroundColor: cat.color}} value={cat.name || cat.category_name}>
                            {cat.name || cat.category_name} {cat.emoji}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <input
                    type="text"
                    name="event_description"
                    placeholder="Description"
                    value={eventData.event_description}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Start Time</Form.Label>
                <input
                    type="datetime-local"
                    name="start_time"
                    required
                    value={eventData.start_time}
                    onChange={handleChange}
                    style={{ display: 'block', width: '100%', border: '3px solid #98d0f1' }}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>End Time</Form.Label>
                <input
                    type="datetime-local"
                    name="end_time"
                    required
                    value={eventData.end_time}
                    onChange={handleChange}
                    style={{ display: 'block', width: '100%', border: '3px solid #98d0f1' }}
                />
            </Form.Group>

            <Form.Check
                type="checkbox"
                name="is_favorite"
                id="isFavorite"
                checked={eventData.is_favorite}
                onChange={handleChange}
                label="Favorite this event?"
            />

            <Form.Group>
                <Button type="submit" variant="outline-success" style={{ marginTop: '1rem' }}>
                    Add Event
                </Button>
            </Form.Group>
        </Form>
    );
};

export default AddEventForm;