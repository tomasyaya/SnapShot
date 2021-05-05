import React from "react";
import NoImages from "./NoImages";
import Image from "./Image";
import { Tooltip } from "./Tooltip";

function buildUrl({ farm, server, id, secret }) {
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
}

function isFunction(fn) {
  return typeof fn === "function";
}

function curryCreateImage(onClick) {
  return function createImage(image) {
    const url = buildUrl(image);
    const handleClick = isFunction(onClick) && onClick.bind(this, image);
    return (
      <Tooltip label="click to open map" key={image.id}>
        <Image url={url} alt={image.title} onClick={handleClick} />
      </Tooltip>
    );
  };
}

function hasImages(images) {
  return Array.isArray(images) && images.length > 0;
}

function Images({ images, onClick }) {
  return <ul>{images.map(curryCreateImage(onClick))}</ul>;
}
const Gallery = ({ data, onImageClick }) => {
  return (
    <div>
      {hasImages(data) ? (
        <Images images={data} onClick={onImageClick} />
      ) : (
        <NoImages />
      )}
    </div>
  );
};

export default Gallery;
