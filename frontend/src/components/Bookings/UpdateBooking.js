import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetCurrentBooking, thunkUpdateBooking} from "../../store/bookings";


function UpdateBooking({bookings, spotId, closeModal}) {

    const dispatch = useDispatch();
    const history = useHistory();

    // BOOKING STUFF

    const booking = useSelector((state) => state.booking);
    const bookingArr = Object.values(booking);

    const start = bookingArr.map((date) => [
      new Date(date.startDate).toISOString().split("T")[0] +
        ", " +
        new Date(date.endDate).toISOString().split("T")[0],
    ]);
    console.log("start", start);

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
      <div>
        <form onSubmit={onSubmit}>
          {validations.length > 0 && submitted === true && (
            <div>
              <div>
                {validations.map((error, i) => (
                  <div key={i}>{error}</div>
                ))}
              </div>
            </div>
          )}
          <div>
            <label>
              CHECK-IN
              <input
                type="date"
                value={today}
                min={date}
                max={fiveDays}
                onChange={(event) => setToday(event.target.value)}
              ></input>
            </label>
            <label>
              CHECKOUT
              <input
                type="date"
                value={nextDay}
                min={minOneDay}
                max={fiveDays}
                onChange={(event) => setNextDay(event.target.value)}
              ></input>
            </label>
            <button>Update Booking</button>
          </div>
        </form>
        {/* <div>{`$${
          bookings.Spot.price *
          Number(new Date(nextDay).getDate() - new Date(today).getDate())
        }`}</div> */}
      </div>
    );
}


export default UpdateBooking;