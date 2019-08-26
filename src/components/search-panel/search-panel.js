import React from 'react';

const SearchPanel= ({onSearchChange, term}) => {
  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="type to search"
      value={term}
      onChange={(e) => onSearchChange(e.target.value)} />
  );
};

export default SearchPanel;
