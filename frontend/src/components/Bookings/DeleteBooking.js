import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkDeleteBooking } from "../../store/bookings";





function DeleteBooking() {
    const dispatch = useDispatch()
    const history = useHistory()

    const onClick = async (event) => {
        event.preventDefault()
        await dispatch(thunkDeleteBooking)
        history.push('/')
    }
    return (
        <button></button>
    )
}

export default DeleteBooking;