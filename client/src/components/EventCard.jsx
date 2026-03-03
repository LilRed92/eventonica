import React from 'react';
import ViewEvent from './ViewEvent'; 
import AddEventForm from './AddEventForm';

export default function EventCard({ event, setModalOpen, onAddEvent, onUpdateEvent, onDeleteEvent }) {
    
   
    const creatingEvent = !event;

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                
          
                <div className="titleCloseBtn">
                    <button onClick={() => setModalOpen(false)}>
                        X
                    </button>
                </div>

            
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