import React from "react";
import { Portal } from "../Portal";
import "./modal.css";

function Modal({ children, open }) {
  if (!open) {
    return null;
  }

  return (
    <Portal>
      <div className="modal-wrapper">
        <div className="modal-content">{children}</div>
      </div>
    </Portal>
  );
}

export default Modal;
