import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateBooking from "./UpdateBooking";



function UpdateBookingModal({booking, spotId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="updatereviewbuttonmodal"
        onClick={() => setShowModal(true)}
      >
        Edit Booking
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateBooking
            spotId={spotId}
            bookings={booking}
            closeModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
}

export default UpdateBookingModal;