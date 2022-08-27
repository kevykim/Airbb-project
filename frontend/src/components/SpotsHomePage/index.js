import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots';
// import { useParams } from 'react-router-dom'



import {NavLink} from 'react-router-dom'

import './SpotsHomePage.css'

// How to seperate each spot within a div? 


const SpotsHomePage = () => {
    // const { id } = useParams()
    // console.log('id', id)
    // const review = useSelector((state) => state.review)
    const allSpot = useSelector((state) => state.spot)
    // console.log('component', allSpot)
    const spots = Object.values(allSpot)
    // const address = spots.map(spot => spot.address)
    // const city = spots.map(spot => spot.city)
    const spotsWork = spots.map((spot) => (
      <div key={spot.id}>
        <div className="eachspot">
          <NavLink to={`/spots/${spot.id}`}>
            <img
              className="spotsplashimg"
              src={spot?.previewImage}
              alt="House test"
              width="250"
              height="250"
            ></img>
          </NavLink>
        </div>

        <div className="spotcityandstate">
          <div> {`${spot.city}, ${spot.state}`} </div>
          <div className='spotavg'>
             <i class="fa-solid fa-star"></i>{spot?.avgRating}
          </div>
        </div>
        <div className="spotprice">{`$${spot.price} night`}</div>
      </div>
    ));

    const dispatch = useDispatch();


    

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    return (
        <div className='spotcard'>
            {spotsWork}
            
        </div>
    )
}

export default SpotsHomePage;