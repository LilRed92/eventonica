import React, { useState, useEffect, useReducer } from 'react';
import * as ioicons from 'react-icons/io5';
import AddEventForm from 'AddEventForm.jsx';
import EventCard from 'EventCard.jsx';
import SearchEvents from 'SearchEvents.jsx';

// TODO Will house logic to fetch for CRUD 

const Dashboard = () => {

    // this is my original state with an array of students 
    const [events, setEvents] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    //this is the state needed for the UpdateRequest
    // const [editingStudent, setEditingStudent] = useState(null)

    const loadEvent= (searchInput) => {
        //function to fetch the list of events that will load on page open & on user's search input
        fetch(`http://localhost:8080/api/events?searchInput=${searchInput || ''}`)
            .then((res) => response.json())
            .then((events) => {
                setEvents(events);
            });
    }

    useEffect(() => {
        loadEvent(searchInput);
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



    return (
        <div className="dashboard">
        <SearchEvents />
            <div className="events-list">
                {listView ? <ul>
                    {events.map((event) => {
                        return <li key={event.id}> </li>
                    })}
                </ul>}
                {/* <ul>
                    {students.map((student) => {
                        return <li key={student.id}> <Student student={student} toDelete={onDelete} toUpdate={onUpdate} /></li>
                    })}
                </ul>
            </div>
        <MyForm key={editingStudent ? editingStudent.id : null} onSaveStudent={onSaveStudent} editingStudent={editingStudent} onUpdateStudent={updateStudent} /> */}
            </div>
        </div>
    );
}


export default ListStudents