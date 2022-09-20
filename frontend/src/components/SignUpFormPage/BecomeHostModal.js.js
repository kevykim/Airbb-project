import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupFormPage from ".";
import './SignupForm.css'

function BecomeAHost() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="becomehostbutton" onClick={() => setShowModal(true)}>Become a Host</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            < SignupFormPage closeModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default BecomeAHost;
