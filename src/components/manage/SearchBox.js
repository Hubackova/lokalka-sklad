import React from "react";
import "./SearchBox.scss";

const SearchBox = ({ value, handleChange }) => (
  <div className="search">
    <input
      type="text"
      className="searchbox"
      placeholder="Hledejte název položky nebo ID člena"
      onChange={handleChange}
      value={value}
    /><i className="fa fa-search" />
  </div>
);

export default SearchBox;
