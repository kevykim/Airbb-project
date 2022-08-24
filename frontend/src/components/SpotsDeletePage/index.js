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
    const onClick = (event) => {
        event.preventDefault()
        dispatch(deleteSpots(Number(spot.id)))
        history.push('/')
    }

    
    return (
        <button onClick={onClick}>Delete Spot</button>
    )
}

export default SpotsDeletePage;