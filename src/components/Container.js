import React, { useContext, useEffect } from "react";
import { PhotoContext } from "../context/PhotoContext";
import Gallery from "./Gallery";
import Loader from "./Loader";
import { Modal } from "./Modal";

const Container = ({ searchTerm }) => {
  const { images, loading, runSearch } = useContext(PhotoContext);

  useEffect(() => {
    runSearch(searchTerm);
  }, [searchTerm, runSearch]);

  return (
    <div>
      <div className="photo-container">
        {loading ? <Loader /> : <Gallery data={images} />}
      </div>
    </div>
  );
};

export default Container;
