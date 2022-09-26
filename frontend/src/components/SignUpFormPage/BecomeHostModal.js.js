import React from "react";
import { Modal } from "../../context/Modal";
import SignupFormPage from ".";
import './SignupForm.css'

function BecomeAHost({showMenu, modal, showModal}) {
  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="becomehostbutton" onClick={() => showModal(modal => !modal)}>Become a Host</button>
      {modal && (
        <Modal onClose={() => showModal(false)}>
            < SignupFormPage closeModal={showModal} />
        </Modal>
      )}
    </>
  );
}

export default BecomeAHost;