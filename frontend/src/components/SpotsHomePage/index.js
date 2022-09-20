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

    return (
          <div className='spothome_container'>
            <div className="spotcard">
              {spots.map((spot) => (
                <div key={spot.id}>
                  <div className="spot_image_container">
                    <NavLink to={`/spots/${spot.id}`}>
                      <img
                        className="spot_image"
                        src={spot?.previewImage}
                        alt="House test"
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
                  <p className="spot_price_container">
                    <span
                      style={{ fontFamily: "Monteserrat-SemiBold" }}
                    >{`$${spot.price}`}</span>
                    &nbsp;night
                  </p>
                </div>
              ))}
            </div>
            <div className="footer_container">
              <div>
                @ 2022 Airbb, Inc. &nbsp;·&nbsp;
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
            </div>
          </div>
    );
}

export default SpotsHomePage;