import React from "react";
import { itemList } from "../../data/items";

const SelectedItems = ({ itemNames, removeItem }) => {
  const items = itemNames.map(i => {
    const item = itemList.find(j => j.id === i);
    return (
      <div key={i} className="btn btn-orange rentitem" style={{ textAlign: "top" }}>
        <i
          id={i.key}
          onClick={() => removeItem(i)}
          className={`fa fa-times-circle remove`}
        /> {item.label}
      </div>
    );
  });
  return <div className="rent-summary-itemlist">{items}</div>;
};

export default SelectedItems;
