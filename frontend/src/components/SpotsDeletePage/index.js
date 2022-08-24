import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteSpots } from '../../store/spots';


import './SpotsDeletePage.css'


const SpotsDeletePage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spot[id])
        // console.log('this is spot', Number(spot.id) === Number(id))
    const onClick =  dispatch(deleteSpots(Number(spot.id)))
    
    return (
        <button onClick={onClick}>Delete Spot</button>
    )
}

export default SpotsDeletePage;