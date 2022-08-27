import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SpotsCreatePage from '.'

function SpotCreateModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create a Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <SpotsCreatePage />
        </Modal>
      )}
    </>
  );
}

export default SpotCreateModal;
