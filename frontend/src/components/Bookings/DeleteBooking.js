import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { thunkDeleteBooking } from "../../store/bookings";

import './DeleteBooking.css'



function DeleteBooking({ closeModal, booking, spotId}) {
    const dispatch = useDispatch()
    const history = useHistory()
    console.log(booking)

    const [validations, setValidations] = useState([])
    const [submitted, setSubmitted] = useState(false)

    const onClick = async (event) => {
        event.preventDefault()
        setSubmitted(!submitted)
         let deletedBooking = await dispatch(thunkDeleteBooking(Number(spotId))).catch (async (res) => {
            const data = await res.json()
            let errors = []
            if (data && data.message) {
                errors.push(data.message)
            }
            setValidations(errors)
        })
        if (deletedBooking) {
            history.push('/bookings')
            closeModal(false)
        }
    
    }
    return (
      <div className="delete_booking_modal">
          <div className="delete_booking_modal_confirm">Confirm delete</div>
        <div className="delete_booking_modal_header">
          <div>Are you sure? Canceling a reservation is irreversible.</div>
          <div>
            Refunds will be given within the 48 hours after confirmation.
          </div>
        </div>
        <div className="delete_booking_modal_buttons">
          <button className="deletebookingbutton" onClick={onClick}>
            Confirm
          </button>
          <button
            className="deletecancelbutton"
            onClick={() => closeModal(false)}
          >
            Cancel
          </button>
        </div>
        <div>
          {validations.length > 0 && submitted === true && (
            <div className="delete_booking_errors">
              {validations.map((error, i) => (
                <div key={i}>{error}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
}

export default DeleteBooking;