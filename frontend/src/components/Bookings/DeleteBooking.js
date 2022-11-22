import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkDeleteBooking } from "../../store/bookings";

import './DeleteBooking.css'



function DeleteBooking({spotId}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const onClick = async (event) => {
        event.preventDefault()
        await dispatch(thunkDeleteBooking(Number(spotId)))
        history.push('/bookings')
    }
    return (
        <button className="deletebookingbutton" onClick={onClick}>Delete Booking</button>
    )
}

export default DeleteBooking;