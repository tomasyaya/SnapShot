import React from "react";
import { createPortal } from "react-dom";

function Portal({ children }) {
  const mount = document.getElementById("portal-root");
  const el = document.createElement("div");

  React.useEffect(() => {
    if (!mount) {
      throw new Error(
        'Could not find element with ID "portal-root" in the DOM'
      );
    }
    mount.appendChild(el);
    return () => {
      mount.removeChild(el);
    };
  }, [mount, el]);

  return createPortal(children, el);
}

export default Portal;
