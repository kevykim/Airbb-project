import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots';
import { useParams } from 'react-router-dom'


import './SpotsHomePage.css'




const SpotsHomePage = () => {
    // const { id } = useParams()
    // console.log('id', id)
    const allSpot = useSelector((state) => state.spot)
    // console.log('component', allSpot)
    const spots = Object.values(allSpot)
    const address = spots.map(spot => spot.address)
    const dispatch = useDispatch();

    console.log(spots)

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    return (
        <div>
            <h1>testing ALL SPOTS</h1>
            {/* <h2>{spots.map(spot => spot.address)}</h2> */}
            <div>{address}</div>
        </div>
    )
}

export default SpotsHomePage;