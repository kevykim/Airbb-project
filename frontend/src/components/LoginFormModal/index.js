import React from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import "./LoginFormModal.css";

function LoginFormModal({ showMenu, logIn, setLogIn }) {
  // const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setLogIn(false);
    showMenu(false);
  };

  return (
    <>
      {/* <button className="loginmodal" onClick={() => setLogIn(true)}>Log In</button> */}
      {logIn && (
        <Modal onClose={() => closeModal()}>
          <LoginForm closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
