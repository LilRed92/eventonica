import React from 'react';
import ViewEvent from './ViewEvent'; 
import AddEventForm from './AddEventForm';

export default function EventCard({ event, setModalOpen, onAddEvent, onUpdateEvent, onDeleteEvent, setIsEditing, isEditing }) {
    
   
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
                    <AddEventForm 
                        onAddEvent={onAddEvent}
                        setIsEditing={isEditing}
                    />
                ) : (
                    <ViewEvent 
                        event={event} 
                        onUpdateEvent={onUpdateEvent}
                        onDeleteEvent={onDeleteEvent}
                        setModalOpen={setModalOpen}
                        setIsEditing={isEditing}
                    />
                )}
            </div>
        </div>
    );
}