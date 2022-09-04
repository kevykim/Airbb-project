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
      <div className='spotcontainerdiv'>
        <div className='spotcard'>
          {spots.map((spot) => (
      <div className='hi' key={spot.id}>
        <div className="eachspot">
          <NavLink to={`/spots/${spot.id}`}>
            <img
              className="spotsplashimg"
              src={spot?.previewImage}
              alt="House test"
            ></img>
          </NavLink>
        </div>

        <div className="spotcityandstate">
          <div> {`${spot.city}, ${spot.state}`} </div>
          <div className="spotavg">
            <i class="fa-solid fa-star"></i>{spot?.avgRating}
          </div>
        </div>
        <div className="spotprice">{`$${spot.price}`} night</div>
      </div>
    ))}
            
        </div>
      </div>
    )
}

export default SpotsHomePage;