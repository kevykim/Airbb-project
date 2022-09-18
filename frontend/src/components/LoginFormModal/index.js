import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import './LoginFormModal.css'

function LoginFormModal({menu, setMenu}) {
  const [showModal, setShowModal] = useState(false);

  const test = () => {
    setShowModal(false)
    setMenu(false)
  }

  return (
    <>
      <button className="loginmodal" onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => test()}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
