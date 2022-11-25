import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkCreateBooking, thunkGetAllSpotsBooking } from "../../store/bookings";
import { getSpots } from "../../store/spots";

import './CreateBooking.css'


function CreateBooking({spotId, spot}) {
  const dispatch = useDispatch();
  const history = useHistory();

  // BOOKING STUFF

  // const booking = useSelector((state) => state.booking);
//   const bookingArr = Object.values(booking)
  
//   const start = bookingArr.map(
//     (date) => [new Date(date.startDate).toISOString().split("T")[0] + ', ' +
//     new Date(date.endDate).toISOString().split("T")[0]]
//   );
//   console.log('start', start)

//   const end = bookingArr.map(
//     (date) => new Date(date.endDate).toISOString().split("T")[0]
//   );
//   console.log('end', end)

  const user = useSelector((state) => state.session.user);

  // console.log(spot.ownerId)


  //DATE STUFF
  const date = new Date().toISOString().split("T")[0];
  let nextDate = new Date();
  let tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  const minOneDay = new Date(tomorrow).toISOString().split("T")[0];

  let addedDate = new Date();

  nextDate.setDate(addedDate.getDate() + 5);

  const fiveDays = new Date(nextDate).toISOString().split("T")[0];

  const [today, setToday] = useState(date);
  const [nextDay, setNextDay] = useState(fiveDays);
  // const [submitted, setSubmitted] = useState(false);
  const [validations, setValidations] = useState([]);

  useEffect(() => {
    const errors = [];
    // if (today === nextDay) errors.push("Cannot check out on the same day");
    // if (today > nextDay) errors.push("Cannot check in before checkout date");
    if (user?.id === spot?.ownerId) errors.push('Owners of spot cannot book reservation')
    setValidations(errors);
  }, [spot?.ownerId, user?.id]);

  useEffect(() => {
    dispatch(thunkGetAllSpotsBooking(spotId));
    dispatch(getSpots())
  }, [dispatch, spotId]);

  const onSubmit = async (event) => {
    if (!user) {
      alert('Please log in')
    }
    event.preventDefault();

    const payload = {
      userId: user.id,
      spotId: spotId,
      startDate: today,
      endDate: nextDay,
    };

    let createdBooking = await dispatch(thunkCreateBooking(payload)).catch (async (res) => {
      const data = await res.json()
      let errors = []
      if (data && data.message) {
        errors.push(data.message)
      }
      setValidations(errors)
    })

    if (createdBooking) {
      history.push(`/bookings`);
    }
  };

 

  return (
    <div className="create_booking_main">
      <form className="create_booking_form" onSubmit={onSubmit}>
        <div className="create_booking_check_main">
          <div className="create_booking_input">
            <label className="create_booking_label">CHECK-IN</label>
            <input
              className="create_booking_inner"
              type="date"
              value={today}
              min={date}
              // max={fiveDays}
              onChange={(event) => setToday(event.target.value)}
            ></input>
          </div>
          <div style={{ borderRight: "1px solid black" }}></div>
          <div className="create_booking_input">
            <label className="create_booking_label">CHECKOUT</label>
            <input
              className="create_booking_inner"
              type="date"
              value={nextDay}
              min={minOneDay}
              // max={fiveDays}
              onChange={(event) => setNextDay(event.target.value)}
            ></input>
          </div>
        </div>
        <button
          className="create_booking_reserve"
          type="submit"
          // disabled={validations.length > 0}
        >
          Reserve
        </button>
      </form>
      <div className="create_booking_errors">
        {validations.length > 0 && (
          <div className="create_booking_errors">
            {validations.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
        )}
      </div>
      <div className="create_booking_boxed">
        <div className="fifthbox_maindiv">
          <div className="fifthbox_div">
            <div>{`$${spot.price} x ${Number(
              new Date(nextDay).getDate() - new Date(today).getDate()
            )} nights`}</div>
            <div>{`$${
              spot.price *
              Number(new Date(nextDay).getDate() - new Date(today).getDate())
            }`}</div>
          </div>
          <div className="fifthbox_div">
            <div>Cleaning Fee</div>
            <div>Free</div>
          </div>
          <div className="fifthbox_div">
            <div>Service Fee</div>
            <div>Free</div>
          </div>
        </div>
        <div className="fifthbox_total">
          <div>Total before taxes</div>
          <div>{`$${
            spot.price *
            Number(new Date(nextDay).getDate() - new Date(today).getDate())
          }`}</div>
        </div>
      </div>
    </div>
  );
}

export default CreateBooking;