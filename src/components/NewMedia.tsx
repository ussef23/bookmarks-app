import React, { useState, useContext } from "react";
import { MediaContext } from "../context/media-context";
import { Media } from "../models/media.model";
import { Types } from "../reducers/mediaReducer";

import "./NewMedia.css";

const NewMedia = () => {
  const { state, dispatch } = useContext(MediaContext);
  const [url, setUrl] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const addMedia = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(url, { method: "get" });
      const media = await response.json();

      dispatch({
        type: Types.Add,
        payload: new Media(
          String(Math.round(Math.random() * 10000)),
          media.url || media.thumbnail_url,
          media.type,
          media.title,
          media.author_name,
          new Date(),
          media.width,
          media.height,
          media.duration,
          media.thumbnail_url
        ),
      });
      console.log(state);
      setUrl("");
    } catch (error) {
      setErrorMessage("Please check the url added");
    }
  };

  return (
    <form onSubmit={addMedia}>
      <div className="form-control">
        <input
          type="text"
          placeholder="Add Media URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {errorMessage && <div>{errorMessage}</div>}
        <button type="submit">ADD MEDIA</button>
      </div>
    </form>
  );
};

export { NewMedia as default };
