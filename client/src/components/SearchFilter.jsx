import React from 'react';

export function SearchEvents({ searchInput, setSearchInput, showFavorites, setShowFavorites }) {

    function handleSearchChange(e) {
        setSearchInput(e.target.value);
    };

    function handleToggleChange(e) {
        setShowFavorites(e.target.checked);
    };

    return (
        <form>
            <label>Search:
                <input
                    type="text"
                    value={searchInput} 
                    onChange={handleSearchChange}
                    placeholder="JavaScript Study Night"
                />
            </label>
            {/* Added toggle to filter favorite events */}
            <label>
                <input
                    type="checkbox"
                    checked={showFavorites}
                    onChange={handleToggleChange}
                />
                Show Favorites Only
            </label>
        </form>
    );
}