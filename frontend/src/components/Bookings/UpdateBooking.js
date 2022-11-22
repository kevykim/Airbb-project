import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetCurrentBooking, thunkUpdateBooking} from "../../store/bookings";


function UpdateBooking({bookings, spotId, closeModal}) {

    const dispatch = useDispatch();
    const history = useHistory();

    // BOOKING STUFF

    // const booking = useSelector((state) => state.booking);
    // const bookingArr = Object.values(booking);

    // const start = bookingArr.map((date) => [
    //   new Date(date.startDate).toISOString().split("T")[0] +
    //     ", " +
    //     new Date(date.endDate).toISOString().split("T")[0],
    // ]);
    // console.log("start", start);

    //   const end = bookingArr.map(
    //     (date) => new Date(date.endDate).toISOString().split("T")[0]
    //   );
    //   console.log('end', end)

    const user = useSelector((state) => state.session.user);

    //DATE STUFF
    const date = new Date().toISOString().split("T")[0];
    let nextDate = new Date();
    let tomorrow = new Date();

    tomorrow.setDate(tomorrow.getDate() + 1);

    const minOneDay = new Date(tomorrow).toISOString().split("T")[0];

    let addedDate = new Date();

    nextDate.setDate(addedDate.getDate() + 5);

    const fiveDays = new Date(nextDate).toISOString().split("T")[0];

    const [today, setToday] = useState(new Date
      (bookings.startDate).toISOString().split("T")[0]
    );
    const [nextDay, setNextDay] = useState(new Date
      (bookings.endDate).toISOString().split("T")[0]
    );
    const [submitted, setSubmitted] = useState(false);
    const [validations, setValidations] = useState([]);

    useEffect(() => {
      const errors = [];
      if (today === nextDay) errors.push("Cannot check out on the same day");
      if (today > nextDay) errors.push("Cannot check in before checkout date");
      setValidations(errors);
    }, [today, nextDay]);


    const onSubmit = async (event) => {
      event.preventDefault();
      setSubmitted(!submitted);
      const payload = {
        bookingId : Number(bookings.id),
        userId: user.id,
        spotId: spotId,
        startDate: new Date(today),
        endDate: new Date(nextDay),
      };

      let updatedBooking = await dispatch(thunkUpdateBooking(payload));

      await dispatch(thunkGetCurrentBooking())

      if (updatedBooking) {
        history.push(`/bookings`);
        closeModal(false)
      }
    };

    if (!user) {
      alert("Must be logged in");
    }


    return (
      <div className="update_booking_main">
        <div className="updatebooking_header">
          <button className="closeButton" onClick={() => closeModal(false)}>
            X
          </button>
          <div className="updatebooking_text">Edit a booking</div>
        </div>
        <form className="update_booking_form" onSubmit={onSubmit}>
          <div className="update_booking_check_main">
            <div className="update_booking_input">
              <label className="update_booking_label">CHECK-IN</label>
              <input
                className="update_booking_inner"
                type="date"
                value={today}
                min={date}
                max={fiveDays}
                onChange={(event) => setToday(event.target.value)}
              ></input>
            </div>
            <div style={{ borderRight: "1px solid black" }}></div>

            <div className="update_booking_input">
              <label className="update_booking_label">CHECKOUT</label>
              <input
                className="update_booking_inner"
                type="date"
                value={nextDay}
                min={minOneDay}
                max={fiveDays}
                onChange={(event) => setNextDay(event.target.value)}
              ></input>
            </div>
          </div>
          <button className="update_booking_reserve">Update Booking</button>
        </form>
        <div className="update_booking_errors">
          {validations.length > 0 && submitted === true && (
            <div className="update_booking_errors">
              {validations.map((error, i) => (
                <div key={i}>{error}</div>
              ))}
            </div>
          )}
        </div>
        {/* <div>{`$${
          bookings.Spot.price *
          Number(new Date(nextDay).getDate() - new Date(today).getDate())
        }`}</div> */}
      </div>
    );
}


export default UpdateBooking;