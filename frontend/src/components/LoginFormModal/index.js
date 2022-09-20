import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import './LoginFormModal.css'

function LoginFormModal({menu, setMenu}) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false)
    setMenu(false)
  }

  return (
    <>
      <button className="loginmodal" onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => closeModal()}>
          <LoginForm closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
