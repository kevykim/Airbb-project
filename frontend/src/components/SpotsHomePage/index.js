import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots';
import {NavLink} from 'react-router-dom'
import './SpotsHomePage.css'

// How to seperate each spot within a div? 


const SpotsHomePage = () => {
  const dispatch = useDispatch();
  

    const allSpot = useSelector((state) => state.spot)
    const spots = Object.values(allSpot)
  
    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

        const date = new Date();
        const nextDate = new Date();

        nextDate.setDate(date.getDate() + 5);

        const options = {
          month: "short",
          day: "numeric",
        };

    return (
      <div className="spothome_container">
        <div className="spotcard">
          {spots.map((spot) => (
            <div key={spot.id}>
              <div className="spot_image_container">
                <NavLink to={`/spots/${spot.id}`}>
                  <img
                    className="spot_image"
                    src={spot?.previewImage}
                    alt="House test"
                    onError={(event) => {
                      event.currentTarget.src =
                        "https://images.pexels.com/photos/4792480/pexels-photo-4792480.jpeg";
                    }}
                  ></img>
                </NavLink>
              </div>
              <div className="spot_detail_container">
                <div className="city_state_container">
                  {`${spot.city}, ${spot.state}`}
                </div>
                <div className="spot_star_container">
                  <i className="fa-solid fa-star"></i>
                  &nbsp;{`${spot?.avgRating}`}
                </div>
              </div>
              <div className="bookingdate">{`${date.toLocaleDateString(
                undefined,
                options
              )} - ${nextDate.toLocaleDateString(undefined, options)}`}</div>

              <div className="spot_price_container">
                <span className="spot_price_span">{`$${spot.price}`}</span>
                &nbsp;night
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="footer_container">
            <div className="footer_maindiv">
              <div className="footer_div">
                &copy; 2022 Airbb, Inc. &nbsp;??&nbsp;
                <a
                  className="github_link"
                  href="https://github.com/kevykim"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
                &nbsp;??&nbsp;
                <a
                  className="linkedin_link"
                  href="https://linkedin.com/in/kevin-kim-a88429150"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                &nbsp;??&nbsp;
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

export default SpotsHomePage;