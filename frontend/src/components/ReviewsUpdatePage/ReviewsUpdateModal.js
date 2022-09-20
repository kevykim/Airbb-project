import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewsUpdatePage from ".";

function ReviewsUpdateModal({review, firstName, reviewId, spotId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="updatereviewbuttonmodal"
        onClick={() => setShowModal(true)}
      >
        Edit Review
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <ReviewsUpdatePage review={review} firstName={firstName} reviewId={reviewId} spotId={spotId} closeModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default ReviewsUpdateModal;
