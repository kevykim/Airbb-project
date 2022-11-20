import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { thunkGetCurrentBooking } from "../../store/bookings";

import './mybooking.css'


function MyBooking() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkGetCurrentBooking())
    }, [dispatch])

    const booking = useSelector(state => state.booking)

    const bookingArr = Object.values(booking)

    console.log(bookingArr)

    if (!user) history.push('/')


    return (
      <div className="mybooking_container">
        {bookingArr?.length === 0 ? (
          <div className="mybooking_notshown">
            <div className="mybooking_notinner">
              <NavLink className="mybooking_nolink" to={"/"}>
                <div className="mybooking_notext">No Bookings Here... </div>
                <img
                  className="mybooking_notshownimage"
                  src="https://images.pexels.com/photos/5428829/pexels-photo-5428829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Not Shown"
                ></img>
                <div className="mybooking_notext">Click to go back Home!</div>
              </NavLink>
            </div>
          </div>
        ) : (
          <div>
            <div className="mybooking_text">My Bookings</div>
            <div className="mybooking_box">
              <div className="mybooking_outer">
                {bookingArr.map((booking, i) => (
                  <div className="mybooking_div" key={i}>
                    <NavLink
                      to={`/spots/${booking.spotId}`}
                      className="mybooking_links"
                    >
                        <img src={booking.Spot?.previewImage} alt='booking' width='200px'></img>
                        {console.log(booking.Spot?.previewImage)}
                      {`${booking.Spot?.city}, ${booking.Spot?.state}`}
                      
                    </NavLink>
                    
                    <div className="mybooking_buttons">
                    
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div>
          <div className="footer_container">
            <div className="footer_maindiv">
              <div className="footer_div">
                &copy; 2022 Airbb, Inc. &nbsp;·&nbsp;
                <a
                  className="github_link"
                  href="https://github.com/kevykim"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
                &nbsp;·&nbsp;
                <a
                  className="linkedin_link"
                  href="https://linkedin.com/in/kevin-kim-a88429150"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                &nbsp;·&nbsp;
                <a
                  className="email_link"
                  href="mailto:kebonkim@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Email
                </a>
              </div>
              <div>
                <i className="fa-solid fa-globe"></i>
                &nbsp;English(US) &nbsp;&nbsp;$ USD
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}


export default MyBooking