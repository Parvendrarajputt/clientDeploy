import React from "react";
import "./TestUser.css";

const TestUser = ({ onClick }) => {
  return (
    <div className="container">
      {/* Wi-Fi Switch */}
      <div className="switch-holder" onClick={onClick}>
        <div className="switch-label">
          <i className="fa-solid fa-user"></i>
          <span>Enter as a Test user </span>
        </div>
        <div className="switch-toggle">
          <input type="checkbox" id="wifi" />
          <label htmlFor="wifi"></label>
        </div>
      </div>
    </div>
  );
};

export default TestUser;
