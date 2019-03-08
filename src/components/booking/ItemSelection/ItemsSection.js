import React from "react";

const ItemsSection = ({
  item,
  openType,
  list,
  someAvailable,
  dateSelected,
  availableItems,
  handleOpen
}) => {
  return (
    <>
      {list.length > 1 ? (
        <>
          <div
            id={item.type}
            className={`item-select main${
              someAvailable || !dateSelected ? "" : " notAvailable"
            }`}
            onClick={handleOpen}
          >
            {item.name}
            <span className="item-select-number">{dateSelected ? `${availableItems} / ${list.length}` : list.length}</span>
          </div>
          
          {item.type === openType && list}
        </>
      ) : (
        list
      )}
    </>
  );
};

export default ItemsSection;
