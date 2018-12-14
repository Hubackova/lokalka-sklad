import React from "react";
import "./ItemSelect.scss";
import { itemList } from "../data/items";

const ItemSelect = ({ handleSelectItem }) => {
  const items = itemList.map(i => (
    <div
      id={i.id}
      key={i.id}
      className="item-select"
      onClick={e => handleSelectItem(e.target.id)}
    >
      {i.label}
      <span className="item-select-price">{i.price},-</span>
    </div>
  ));
  return <div className="items">{items}</div>;
};

export default ItemSelect;
