import React, { useContext, useState } from "react";
import { MediaContext } from "../context/media-context";
import { Types } from "../reducers/mediaReducer";
import Pagination from "./Pagination";
import Modal from "./Modal";
import EditMedia from "./EditMedia";

import "./MediaList.css";
import { Imedia, Media } from "../models/media.model";

const initialMedia = new Media("", "", "", "", "", new Date());

const MediaList: React.FC = () => {
  const { state, dispatch } = useContext(MediaContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mediaPerPage] = useState<number>(1);
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [editedMedia, setEditedMedia] = useState<Imedia>(initialMedia);

  const indexOfLastMedia = currentPage * mediaPerPage;
  const indexOfFirstMedia = indexOfLastMedia - mediaPerPage;
  const currentMedia = state.mediaList.slice(
    indexOfFirstMedia,
    indexOfLastMedia
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const removeMedia = (id: string) => {
    dispatch({
      type: Types.Delete,
      payload: { id },
    });
  };

  const startEditMedia = (id: string) => {
    setDisplayModal(true);
    const media = state.mediaList.find((item) => item.id === id);
    setEditedMedia(media!);
    console.log(media);
  };

  const closeModal = () => {
    setDisplayModal(false);
  };

  return (
    <div>
      {displayModal && (
        <Modal closeModal={closeModal}>
          <EditMedia media={editedMedia} closeModal={closeModal} />
        </Modal>
      )}
      <ul>
        {currentMedia.map((media) => (
          <li key={media.id}>
            <div className="media-container">
              <a href={media.url} target="_bank">
                <img
                  className="img img-thumb"
                  src={media.thumbnail_url}
                  alt={media.title}
                />
              </a>
              <div className="info-list">
                <div className="title">{media.title}</div>
                <div>
                  <div className="col-40">Author</div>
                  <div className="col">{media.author_name}</div>
                </div>
                <div>
                  <div className="col-40">Type</div>
                  <div className="col">{media.type}</div>
                </div>
                <div>
                  <div className="col-40">Creation Date </div>
                  <div className="col">
                    {media.dateCreation.toLocaleDateString()}
                  </div>
                </div>
                {media.type === "video" && (
                  <div>
                    <div className="col-40">Duration </div>
                    <div className="col">{media.duration}</div>
                  </div>
                )}
              </div>
              <div className="button-container">
                <button type="button" onClick={() => removeMedia(media.id)}>
                  REMOVE
                </button>
                <button type="button" onClick={() => startEditMedia(media.id)}>
                  EDIT
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        mediaPerPage={mediaPerPage}
        totalMedia={state.mediaList.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export { MediaList as default };
