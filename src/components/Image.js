import React from "react";

const Image = ({ onClick, title, url }) => (
  <li>
    <img src={url} alt={title} onClick={onClick} />
  </li>
);

export default Image;
