import React, { useState, useEffect, useReducer } from 'react';

export function SearchEvents({ searchInput, setSearchInput }) {

    function handleChange(e) {
        setSearchInput(e.target.value)
    };

    return (
        <form>
            <lable>Search:
                <input
                    type="text"
                    value={searchInput} 
                    onChange={handleChange}
                    placeholder="JavaScript Study Night"
                    />
            </lable>
        </form>
    )
}