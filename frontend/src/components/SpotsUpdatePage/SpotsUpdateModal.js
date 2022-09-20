import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SpotsUpdatePage from ".";
import './SpotsUpdatePage.css'
function SpotsUpdateModal({spot}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="updatespotbuttonmodal " onClick={() => setShowModal(true)}>
        Edit Spot
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SpotsUpdatePage
            spot={spot}
            closeModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
}

export default SpotsUpdateModal;
