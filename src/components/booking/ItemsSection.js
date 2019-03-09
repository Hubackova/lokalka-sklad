import React from "react";
import PropTypes from "prop-types";

const ItemsSection = React.memo(
  ({ item, openType, list, dateSelected, availableItems, handleOpen }) => {
    if (list.length === 1) return list; //case when there is just one item of some type
    const someAvailable = availableItems > 0;
    const availableClass = someAvailable || !dateSelected;

    return (
      <>
        <div
          id={item.type}
          className={`item-select main${availableClass ? "" : " notAvailable"}`}
          onClick={handleOpen}
        >
          {item.name}
          <span className="item-select-number">
            {dateSelected ? `${availableItems} / ${list.length}` : list.length}
          </span>
        </div>
        {item.type === openType && list}
      </>
    );
  }
);

ItemsSection.propTypes = {
  availableItems: PropTypes.number,
  dateSelected: PropTypes.bool,
  handleOpen: PropTypes.func,
  item: PropTypes.object,
  list: PropTypes.node,
  openType: PropTypes.string,
  someAvailable: PropTypes.bool
};

export default ItemsSection;
