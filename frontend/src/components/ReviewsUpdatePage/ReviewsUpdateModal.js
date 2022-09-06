import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewsUpdatePage from ".";

function ReviewsUpdateModal({firstName, reviewId, spotId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        // className="createreviewbuttonm"
        onClick={() => setShowModal(true)}
      >
        Edit Review
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <ReviewsUpdatePage firstName={firstName} reviewId={reviewId} spotId={spotId} onClick={(event) => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default ReviewsUpdateModal;
