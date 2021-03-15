import React from "react";

import "./Modal.css";

interface ModalProps {
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, closeModal }) => {
  return (
    <div>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeModal()}>
            &times;
          </span>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
