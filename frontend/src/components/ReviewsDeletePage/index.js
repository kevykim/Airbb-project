import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory} from 'react-router-dom'
import { thunkDeleteReview, thunkReadReview } from '../../store/reviews';

import './ReviewsDeletePage.css'



const ReviewsDeletePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {
        dispatch(thunkReadReview(id))
    }, [dispatch, id])

    const review = useSelector(state => state.review)
    const array = Object.values(review)
    const testing = array.map(review => Number(review.spotId))

    console.log('wut', testing.includes(Number(id)))
    const onClick = async (event) => {
        event.preventDefault();
        if (testing.includes(Number(id))) {
            await dispatch(thunkDeleteReview(Number(review.id)))
        } else {
            alert('You must be the owner!')
        }
        // history.push(`/spots/${id}`)
    }

    return (
        <button onClick={onClick}>Delete Review</button>
    )
}

export default ReviewsDeletePage;