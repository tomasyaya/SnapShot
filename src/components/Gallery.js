import React from "react";
import NoImages from "./NoImages";
import Image from "./Image";

function buildUrl({ farm, server, id, secret }) {
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
}

function mapImages(image) {
  const url = buildUrl(image);

  return <Image url={url} alt={image.title} key={image.id} />;
}

function hasImages(images) {
  return Array.isArray(images) && images.length > 0;
}

function Images({ images }) {
  return <ul>{images.map(mapImages)}</ul>;
}
const Gallery = ({ data }) => {
  return <div>{hasImages(data) ? <Images images={data} /> : <NoImages />}</div>;
};

export default Gallery;
