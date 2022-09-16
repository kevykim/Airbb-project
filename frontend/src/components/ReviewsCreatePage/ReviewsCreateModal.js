import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewsCreatePage from ".";

function ReviewsCreateModal({spotId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="createreviewbuttonm" onClick={() => setShowModal(true)}>Create Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <ReviewsCreatePage spotId={spotId} onClick={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default ReviewsCreateModal;
