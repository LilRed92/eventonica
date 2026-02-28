import React, { useState, useEffect, useReducer } from 'react';
import * as ioicons from 'react-icons/io5';
import EventCard from 'EventCard.jsx';
import SearchFilter from 'SearchFilter.jsx';

// TODO Will house logic to fetch for CRUD 

const Dashboard = () => {

    // this is my original state with an array of students 
    const [events, setEvents] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    //this is the state needed for the UpdateRequest
    // const [editingStudent, setEditingStudent] = useState(null)

    const loadEvents= (searchInput) => {
        //function to fetch the list of events that will load on page open & on user's search input
        fetch(`http://localhost:8080/api/events?searchInput=${searchInput || ''}`)
            .then((res) => response.json())
            .then((events) => {
                setEvents(events);
            });
    }

    useEffect(() => {
        loadEvents(searchInput);
    }, [searchInput]);

    const onEventSave = (newEvent) => {
        //console.log(newStudent, "From the parent - List of Students");
        setEvents((events) => [...events, newEvents]);
    }


    //function to control the update in the parent (student component)
    const updateStudent = (savedStudent) => {
        // console.log("Line 29 savedStudent", savedStudent);
        // This function should update the whole list of students - 
        loadStudents();
    }

    //A function to handle the Delete funtionality
    const onDelete = (student) => {
        //console.log(student, "delete method")
        return fetch(`http://localhost:8080/api/students/${student.id}`, {
            method: "DELETE"
        }).then((response) => {
            //console.log(response);
            if (response.ok) {
                loadStudents();
            }
        })
    }

    //A function to handle the Update functionality
    const onUpdate = (toUpdateStudent) => {
        //console.log(toUpdateStudent);
        setEditingStudent(toUpdateStudent);

    }

    const toggleModal = () => {
        setModalOpen(true)
    }

    const handleDelete = async (event) => {
        try {
            const response = await fetch(`http://localhost:8080/api/events/${event.id}`, { method: "DELETE" });

            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            };
            const events = await response.json();
            return events
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };



    return (
        <div className="dashboard">
        <SearchFilter />
        <button onClick={toggleModal}>+ New Event</button>
            <div className="events-list">
                <table>
                    <tbody>
                    {events.map((event) => {
                        <tr key={event.id}>
                            <td>{event.event_name}</td>
                            <td>{event.category}</td>
                            <td>{event.event_description}</td>
                            <td>{event.start_time}</td>
                            <td>{event.end_time}</td>
                            {/* <td>{event.start_time}</td> */}
                            <td><button onClick={toggleModal} className="editBtn">Edit</button></td>
                            <td><button onClick={handleDelete} className="deleteBtn">Delete</button></td>
                        </tr>
                    })}
                    </tbody>
                </table>
                {/* <ul>
                    {students.map((student) => {
                        return <li key={student.id}> <Student student={student} toDelete={onDelete} toUpdate={onUpdate} /></li>
                    })}
                </ul>
            </div>
        <MyForm key={editingStudent ? editingStudent.id : null} onSaveStudent={onSaveStudent} editingStudent={editingStudent} onUpdateStudent={updateStudent} /> */}
            </div>
            {modalOpen && <EventCard setModalOpen={setModalOpen} />}
        </div>
    );
}


export default ListStudents