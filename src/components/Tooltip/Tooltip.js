import React from "react";
import "./tooltip.css";

function Tooltip({ children, label }) {
  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);
  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={handleShow}
      onMouseLeave={handleHide}
    >
      {show && <span className="tooltip-label">{label}</span>}
      {children}
    </div>
  );
}

export default Tooltip;
