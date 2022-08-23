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
    const allSpot = useSelector((state) => state.spot)
    // console.log('component', allSpot)
    const spots = Object.values(allSpot)
    // const address = spots.map(spot => spot.address)
    // const city = spots.map(spot => spot.city)
    const spotsWork = spots.map((spot) => (
        <div key={spot.id}>
          <h1>image placeholders for now</h1>
          <NavLink to={`/spots/${spot.id}`}>
        <img
          src={spot.previewImage}
          alt="House test"
          width="250"
          height="250"
        ></img>
          </NavLink>
        <div>{`${spot.city}, ${spot.state}`}</div>
        <div>{spot.avgRating}</div>
        <div>{`$${spot.price} night`}</div>
      </div>
    ));

    const dispatch = useDispatch();

    // console.log(spots)

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    return (
        <div>
            {spotsWork}
            
            
        </div>
    )
}

export default SpotsHomePage;