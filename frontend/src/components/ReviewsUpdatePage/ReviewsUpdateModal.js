import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewsUpdatePage from ".";

function ReviewsFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="createreviewbuttonm"
        onClick={() => setShowModal(true)}
      >
        Create Review
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <ReviewsUpdatePage />
        </Modal>
      )}
    </>
  );
}

export default ReviewsFormModal;
