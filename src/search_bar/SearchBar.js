import React from 'react';
import MagnifyingGlass from "../images/Magnifying-Glass.png";

const SearchBar = () => {
    return(
        <div className="search-bar">
            <input className="search-bar-input" placeholder="SEARCH STORY" />
            <img src={MagnifyingGlass} alt="MG" />
        </div>
    )
}

export default SearchBar;