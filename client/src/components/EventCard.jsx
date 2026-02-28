import React from 'react';
import ViewEvent from './ViewEvent'; 
import AddEventForm from './AddEventForm';

export default function EventCard({ event, setModalOpen, onAddEvent, onUpdateEvent, onDeleteEvent }) {
    
    // If no event object is passed in, we are creating a new event
    const creatingEvent = !event;

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                
                {/* Close Button properly wrapped for your App.css */}
                <div className="titleCloseBtn">
                    <button onClick={() => setModalOpen(false)}>
                        X
                    </button>
                </div>

                {/* Form or View component */}
                {creatingEvent ? (
                    <AddEventForm onAddEvent={onAddEvent} />
                ) : (
                    <ViewEvent 
                        event={event} 
                        onUpdateEvent={onUpdateEvent}
                        onDeleteEvent={onDeleteEvent}
                        setModalOpen={setModalOpen}
                    />
                )}
            </div>
        </div>
    );
}