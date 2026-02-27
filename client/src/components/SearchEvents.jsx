import React, { useState, useEffect, useReducer } from 'react';

// TODO add label, placeholder

export function SearchEvents({ searchInput, setSearchInput }) {

    function handleChange(e) {
        setSearchInput(e.target.value)
    };

    return (
        <form>
             <input
                value={searchInput} 
                onChange={handleChange}
                />
        </form>
    )
}