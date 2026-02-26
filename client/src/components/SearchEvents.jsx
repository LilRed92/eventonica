



// TODO add label, placeholder

export function Search({ searchInput, setSearchInput }) {

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