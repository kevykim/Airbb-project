import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SpotsCreatePage from '.'
import './SpotsCreatePage.css'

function SpotCreateModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="becomehostbutton" onClick={() => setShowModal(true)}>Become a Host</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <SpotsCreatePage onClick={(event) => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default SpotCreateModal;
