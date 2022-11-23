import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { thunkDeleteBooking } from "../../store/bookings";

import './DeleteBooking.css'



function DeleteBooking({spotId}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const [validations, setValidations] = useState([])
    const [submitted, setSubmitted] = useState(false)

    const onClick = async (event) => {
        event.preventDefault()
        setSubmitted(!submitted)
        await dispatch(thunkDeleteBooking(Number(spotId))).catch (async (res) => {
            const data = await res.json()
            let errors = []
            if (data && data.message) {
                errors.push(data.message)
            }
            setValidations(errors)
        })
        history.push('/bookings')
    }
    return (
      <div>
        <button className="deletebookingbutton" onClick={onClick}>
          Delete Booking
        </button>
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