import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SpotsCreatePage from '.'
import './SpotsCreatePage.css'

function SpotCreateModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="becomehostbutt" onClick={() => setShowModal(true)}>Become a Host</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <SpotsCreatePage />
        </Modal>
      )}
    </>
  );
}

export default SpotCreateModal;
