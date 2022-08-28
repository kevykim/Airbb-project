import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupFormPage from ".";
import './SignupForm.css'

function SignUpModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="signupmodal" onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            < SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default SignUpModal;
