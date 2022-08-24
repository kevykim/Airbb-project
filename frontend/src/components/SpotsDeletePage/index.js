import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { deleteSpots } from '../../store/spots';


import './SpotsDeletePage.css'


const SpotsDeletePage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const spot = useSelector(state => state.spot[id])
        // console.log('this is spot', Number(spot.id) === Number(id))
    const onClick = async (event) => {
        event.preventDefault()
        await dispatch(deleteSpots(Number(spot.id)))
        history.push('/')
    }

    // Async and await works! Look into race conditions. 
    // Will useEffect work instead of event.preventDefault?



    return (
        <button onClick={onClick}>Delete Spot</button>
    )
}

export default SpotsDeletePage;