import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupFormPage from ".";

function SignUpModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            < SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default SignUpModal;
