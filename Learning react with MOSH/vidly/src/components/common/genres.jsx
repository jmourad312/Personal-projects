import React from "react";

const Genres = ({
  genres,
  onItemSelect,
  textProperty,
  valueProperty,
  selectedItem,
}) => {
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          onClick={() => onItemSelect(genre)}
          key={genre[valueProperty]}
          className={
            genre === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Genres.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default Genres;
