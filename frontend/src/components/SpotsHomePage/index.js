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
      <div className="spot_container_div">
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

              <div className='spot_detail_container'>
                <div className='city_state_container'> {`${spot.city}, ${spot.state}`}  </div>
                <div className='spot_star_container'>
                  <i class="fa-solid fa-star"></i>
                  {`${" "}${spot?.avgRating}`}
                </div>
              </div>
              <div className='spot_price_container'>{`$${spot.price}`} night</div>
            </div>
          ))}
        </div>
        <div className="footer_container">
          <div>@ 2022 Airbb, Inc.</div>
        </div>
      </div>
    );
}

export default SpotsHomePage;