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

function getImages(data) {
  return data?.photos?.photo;
}

function useRunSearch(onLoading, onSuccess, hash) {
  return React.useCallback(
    async (query) => {
      if (hash.has(query)) {
        const images = hash.get(query);
        onSuccess(images);
        onLoading(false);
        return Promise.resolve();
      }
      try {
        onLoading(true);
        const { data } = await imgApi.get(formatQuery(query));
        hash.set(query, getImages(data));
        onSuccess(getImages(data));
      } catch (error) {
        console.error(
          "Encountered an error with fetching and parsing data",
          error
        );
      } finally {
        onLoading(false);
      }
    },
    [onLoading, onSuccess, hash]
  );
}

const PhotoContextProvider = (props) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const hashRef = React.useRef(new Map());
  const searchHash = hashRef?.current;
  const runSearch = useRunSearch(setLoading, setImages, searchHash);

  return (
    <PhotoContext.Provider value={{ images, loading, runSearch }}>
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoContextProvider;
