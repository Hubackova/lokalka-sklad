import React from "react";
import { itemList } from "../../data/items";

const SelectedItems = ({ itemNames, removeItem }) => {
  const items = itemNames.map(i => {
    const item = itemList.find(j => j.id === i);
    return (
      <div key={i} className="rentitem" style={{ textAlign: "top" }}>
        {item.label}
        <i
          style={{ marginLeft: 10 }}
          id={i.key}
          onClick={() => removeItem(i)}
          className={`fa fa-times-circle remove`}
        />
      </div>
    );
  });
  return <div className="rent-summary-itemlist">{items}</div>;
};

export default SelectedItems;
