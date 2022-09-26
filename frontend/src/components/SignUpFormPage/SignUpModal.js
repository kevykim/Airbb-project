import React from "react";
import { Modal } from "../../context/Modal";
import SignupFormPage from ".";
import "./SignupForm.css";

function SignUpModal({ menu, showMenu, signUp, setSignUp }) {
  // const [showModal, setShowModal] = useState(false);

  const closeAll = () => {
    setSignUp(false);
    showMenu(false);
  };

  return (
    <>
      {/* <button className="signupmodal" onClick={() => setShowModal(true)}>Sign Up</button> */}
      {signUp && (
        <Modal onClose={() => closeAll()}>
          <SignupFormPage closeModal={closeAll} />
        </Modal>
      )}
    </>
  );
}

export default SignUpModal;
