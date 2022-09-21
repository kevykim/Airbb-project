import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupFormPage from ".";
import './SignupForm.css'

function BecomeAHost({showMenu}) {
  const [showModal, setShowModal] = useState(false);

  const test = () => {
    showMenu(false)
    setShowModal(true)
  }

  return (
    <>
      <button className="becomehostbutton" onClick={() => test()}>Become a Host</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            < SignupFormPage closeModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default BecomeAHost;
