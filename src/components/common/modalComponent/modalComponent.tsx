import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-modal";
import { ModalComponentProps } from "../../../types";
import { customStyles } from "../../../utils/modalStyle";

const ModalComponent: React.FC<ModalComponentProps> = ({ error }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setModalIsOpen(true);
    }
  }, [error]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Error Modal"
    >
      <div className="error-modal">
        <p>{error}</p>
        <Button variant="btn btn-outline-warning" onClick={closeModal}>
          Попробовать еще раз
        </Button>
      </div>
    </Modal>
  );
};

export default ModalComponent;
