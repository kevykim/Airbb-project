import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateBooking from "./UpdateBooking";

import './UpdateBooking.css'

function UpdateBookingModal({booking, spotId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="updatebookingbuttonmodal"
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