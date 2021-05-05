import React, { createContext, useState } from "react";
import axios from "axios";
import { apiKey } from "../api/config";

export const PhotoContext = createContext();

const imgApi = axios.create({
  baseURL: `https://api.flickr.com/services/rest/`,
});

function formatQuery(query) {
  return `?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;
}

const PhotoContextProvider = (props) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const runSearch = React.useCallback(
    async (query) => {
      try {
        setLoading(true);
        const { data } = await imgApi.get(formatQuery(query));
        setImages(data.photos.photo);
      } catch (error) {
        console.error(
          "Encountered an error with fetching and parsing data",
          error
        );
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setImages]
  );

  return (
    <PhotoContext.Provider value={{ images, loading, runSearch }}>
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoContextProvider;
