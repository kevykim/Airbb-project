import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteSpots } from '../../store/spots';


import './SpotsDeletePage.css'


const SpotsDeletePage = ({spot}) => {
    // const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    // const spot = useSelector(state => state.spot[id])
    const onClick = async (event) => {
        event.preventDefault()
        await dispatch(deleteSpots(Number(spot.id)))
        history.push('/')
    }

    // Async and await works! Look into race conditions. 
    // Will useEffect work instead of event.preventDefault?



    return (
        <button className='deletespotbutton' onClick={onClick}>Delete Spot</button>
    )
}

export default SpotsDeletePage;