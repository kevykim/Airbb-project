import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams, useHistory} from 'react-router-dom'
import { thunkDeleteReview, thunkReadReview } from '../../store/reviews';

import './ReviewsDeletePage.css'



const ReviewsDeletePage = ({reviewId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();

    // console.log(id)

      useEffect(() => {
        dispatch(thunkReadReview(id));
      }, [dispatch, id]);

    const review = useSelector(state => state.review[reviewId])

    const onClick = async (event) => {
        event.preventDefault();
        await dispatch(thunkDeleteReview(Number(review.id)))
        history.push(`/spots/${id}`)
    }

    return (
        <button className='deletereviewbutton' onClick={onClick}>Delete Review</button>
    )
}

export default ReviewsDeletePage;