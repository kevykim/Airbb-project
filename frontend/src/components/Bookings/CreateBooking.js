import { useState, useEffect } from "react";



function CreateBooking() {

    //DATE STUFF
     const date = new Date().toISOString().split("T")[0];
     let nextDate = new Date()

     const addedDate = new Date()

        nextDate.setDate(addedDate.getDate() + 5)


     const fiveDays = new Date(nextDate).toISOString().split("T")[0];

    const [today, setToday] = useState()
    const [nextDay, setNextDay] = useState()

    return (
      <div>
        <form>
          <div>
            <label>
              CHECK-IN
              <input type="date" value={today} min={date}></input>
            </label>
            <label>
              CHECKOUT
              <input type="date" value={nextDay} min={date}></input>
            </label>
            <button>reserve</button>
          </div>
        </form>
      </div>
    );
}

export default CreateBooking;