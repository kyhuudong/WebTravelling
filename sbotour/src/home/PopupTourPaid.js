import React from "react";
import '../css/popup.css'
import TourPaidHistory from './TourPaidHistory'

export default ({ close }) => (
  <div className="modal">
    <a className="close" onClick={close}>
      &times;
    </a>
    <div className="header"> List Tour Paid </div>
    <div className="content">
      {" "}
      <TourPaidHistory/>
    </div>
  </div>
);