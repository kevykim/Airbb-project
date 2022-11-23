import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteBooking from './DeleteBooking'
import './DeleteBooking.css'



function DeleteBookingModal({booking ,spotId}) {
  const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button className="deletebookingbutton" onClick={() => setShowModal(true)}>
          Delete Booking
        </button>
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
        <DeleteBooking booking={booking} spotId={spotId} closeModal={setShowModal}/>
        </Modal>
        )}
      </>
    );
}


export default DeleteBookingModal