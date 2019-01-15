import React from 'react';

const ItemsSection = ({item, openType, list, someAvailable, dateSelected, selectFirst, handleOpen}) => {


    return (
        <>
       {list.length > 1 ? <>
          <div
            id={item.type}
            className={`item-select main${someAvailable || !dateSelected ? "" : " notAvailable"}`}
            onClick={handleOpen}
          >
            {item.name} 
          </div>
          {item.type === openType && list}
        </> : list}
        </> 
    );
};

export default ItemsSection;


