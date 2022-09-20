import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewsCreatePage from ".";

function ReviewsCreateModal({spotId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="createreviewbuttonmodal" onClick={() => setShowModal(true)}>Create Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <ReviewsCreatePage spotId={spotId} closeModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default ReviewsCreateModal;
