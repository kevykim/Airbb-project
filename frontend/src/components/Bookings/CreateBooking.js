import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkCreateBooking } from "../../store/bookings";



function CreateBooking({spotId, spot}) {

    const dispatch = useDispatch()
    const history = useHistory()

    

    const user = useSelector(state => state.session.user)
    //DATE STUFF
     const date = new Date().toISOString().split("T")[0];
     let nextDate = new Date()
     const addedDate = new Date()

        nextDate.setDate(addedDate.getDate() + 5)


     const fiveDays = new Date(nextDate).toISOString().split("T")[0];

    const [today, setToday] = useState(date)
    const [nextDay, setNextDay] = useState(fiveDays)
    const [submitted, setSubmitted] = useState(false)
    const [validations, setValidations] = useState([])

    useEffect(() => {
        const errors = [];
        if (today === nextDay) errors.push('Cannot check out on the same day')
        setValidations(errors)
    }, [today, nextDay])

    const onSubmit = async (event) => {
        event.preventDefault()
        setSubmitted(!submitted)
        const payload = {
            userId: user.id,
            spotId: spotId,
            startDate: today,
            endDate: nextDay
        }
        
        let createdBooking = await dispatch(thunkCreateBooking(payload))
        
        if (createdBooking) {
            history.push(`/spots/${createdBooking.spotId}`)
        }
    }
    
    if (!user) {
        alert('Must be logged in')
    }
    
    return (
      <div>
        <form onSubmit={onSubmit}>
            {(validations.length > 0 && submitted === true && (
            <div>
                <div>
                    {validations.map((error, i) => (
                        <div key={i}>{error}</div>
                    ))}
                </div>
            </div>))}
          <div>
            <label>
              CHECK-IN
              <input type="date" value={today} min={date} max={fiveDays} onChange={(event) => setToday(event.target.value)}></input>
            </label>
            <label>
              CHECKOUT
              <input type="date" value={nextDay} min={date} max={fiveDays} onChange={(event) => setNextDay(event.target.value)}></input>
            </label>
            <button>reserve</button>
          </div>
        </form>
        <div>{`$${spot.price * Number(new Date(nextDay).getDate() - new Date(today).getDate())}`}</div>
      </div>
    );
}

export default CreateBooking;