import React, { useState, useEffect, useReducer } from 'react';
import ViewEvent from 'ViewEvent.jsx';
import AddEventForm from 'AddEventForm.jsx';

export function EventCard({  }) {

    
    return (
        <div className="event-card">
            {!creatingEvent ? (
                <ViewEvent />
            ) : (
                <AddEventForm />
            )}
        </div>
    )
}