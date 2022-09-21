import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupFormPage from ".";
import './SignupForm.css'

function SignUpModal({menu, showMenu}) {
  const [showModal, setShowModal] = useState(false);

  const closeAll = () => {
    setShowModal(false)
    showMenu(false)
  }


  return (
    <>
      <button className="signupmodal" onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => closeAll()}>
            < SignupFormPage closeModal={closeAll}/>
        </Modal>
      )}
    </>
  );
}

export default SignUpModal;
