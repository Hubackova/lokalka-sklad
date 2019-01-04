import React from "react";
import "./ItemSelect.scss";
import { itemList } from "../../data/items";

const ItemSelect = ({ addItem }) => {
  const items = itemList.map(i => (
    <div
      id={i.id}
      key={i.id}
      className="item-select"
      onClick={addItem}
    >
      {i.label}
      <span className="item-select-price">{i.price},-</span>
    </div>
  ));
  return <div className="items">{items}</div>;
};

export default ItemSelect;
