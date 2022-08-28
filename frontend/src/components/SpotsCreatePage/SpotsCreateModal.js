import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SpotsCreatePage from '.'

function SpotCreateModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Become a Host</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <SpotsCreatePage />
        </Modal>
      )}
    </>
  );
}

export default SpotCreateModal;
