import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupFormPage from ".";
import './SignupForm.css'

function SignUpModal({menu, setMenu}) {
  const [showModal, setShowModal] = useState(false);

  const test = () => {
    setShowModal(false)
    setMenu(false)
  }


  return (
    <>
      <button className="signupmodal" onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => test()}>
            < SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default SignUpModal;
