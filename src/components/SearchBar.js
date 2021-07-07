import React from 'react'
import SearchItem from './SearchItem'

const SearchBar = ({
  searchQuery,
  handleInput,
  searchStatus,
  searchData,
  setSearchStatus,
}) => {
  return (
    <form className="search" autoComplete="off">
      <input
        className="search-input"
        placeholder="Search for a programmer.."
        autoComplete="off"
        type="text"
        name="search"
        value={searchQuery}
        onChange={(e) => handleInput(e)}
        onBlur={() => setSearchStatus(false)}
      />
      {searchStatus && (
        <div className="search-box">
          {searchData.map((item, key) => (
            <SearchItem item={item} key={key} />
          ))}
        </div>
      )}
    </form>
  )
}

export default SearchBar
