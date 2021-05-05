import React, { useContext, useEffect } from "react";
import { PhotoContext } from "../context/PhotoContext";
import Gallery from "./Gallery";
import Loader from "./Loader";
import { Modal } from "./Modal";
import { MapContainer } from "../components/Map";
import "./container.css";

function mockImageWithCoords(image) {
  return {
    ...image,
    lng: Math.random() * 90,
    lat: Math.random() * 90,
  };
}

function useModal() {
  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);
  return { show, handleHide, handleShow };
}

function useSearch(searchTerm, runSearch) {
  useEffect(() => {
    runSearch(searchTerm);
  }, [searchTerm, runSearch]);
}

const Container = ({ searchTerm }) => {
  const { images, loading, runSearch } = useContext(PhotoContext);
  const [[lng, lat], setCoords] = React.useState([20, 20]);

  useSearch(searchTerm, runSearch);

  const { handleShow, handleHide, show } = useModal();

  const handleImageClick = (image) => {
    const { lng, lat } = mockImageWithCoords(image);
    setCoords([lng, lat]);
    handleShow();
  };

  return (
    <div>
      <Modal open={show}>
        <MapContainer lat={lat} lng={lng} zoom={10} />
        <button onClick={handleHide} className="modal-close-btn">
          close
        </button>
      </Modal>
      <div className="photo-container">
        {loading ? (
          <Loader />
        ) : (
          <Gallery data={images} onImageClick={handleImageClick} />
        )}
      </div>
    </div>
  );
};

export default Container;
