import React from "react";
import '../css/popup.css'
import ShoppingCart from './ShoppingCart'

export default ({ close }) => (
  <div className="modal">
    <a className="close" onClick={close}>
      &times;
    </a>
    <div className="header"> Your Shopping Cart </div>
    <div className="content">
      {" "}
      <ShoppingCart/>
    </div>
  </div>
);