import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupFormPage from ".";
import './SignupForm.css'

function SignUpModal({showMenu, setShowMenu}) {
  const [showModal, setShowModal] = useState(false);
  console.log('df', showMenu)

  const test = () => {
    setShowMenu(false)
    setShowModal(true)
  }

  return (
    <>
      <button className="signupmodal" onClick={() => test()}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            < SignupFormPage showMenu={showMenu} setShowMenu={setShowMenu}/>
        </Modal>
      )}
    </>
  );
}

export default SignUpModal;
