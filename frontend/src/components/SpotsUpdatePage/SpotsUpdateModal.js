import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SpotsUpdatePage from ".";

function SpotsUpdateModal({spot}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <SpotsUpdatePage spot={spot} onClick={(event) => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default SpotsUpdateModal;
