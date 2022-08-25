import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory} from 'react-router-dom'
import { thunkDeleteReview } from '../../store/reviews';

import './ReviewsDeletePage.css'



const ReviewsDeletePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();

    // console.log(id)

    const review = useSelector(state => state.review[id])
    // console.log(review)

    const onClick = async (event) => {
        event.preventDefault();
        await dispatch(thunkDeleteReview(Number(review.id)))
        history.push(`/spots/${id}`)
    }

    return (
        <button onClick={onClick}>Delete Review</button>
    )
}

export default ReviewsDeletePage;