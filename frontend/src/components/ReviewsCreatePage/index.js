

import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './ReviewsCreatePage.css'
import { useState, useEffect } from 'react';
import { thunkCreateReview, thunkReadReview } from '../../store/reviews';
// import ReviewsReadPage from '../ReviewsReadPage';

const ReviewsCreatePage = () => {
    const {id} = useParams()
    const history = useHistory()
    // console.log(id)
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)

    const [rating, setRating] = useState(0)
    const [reviewText, setReviewText] = useState('')
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() => {
        const errors = [];
        if (rating < 1 || rating > 5) errors.push('Stars must be within the range of 1 to 5')
        if (!reviewText.length || reviewText.length > 256) errors.push('Must have review')
        setValidationErrors(errors)
    }, [rating, reviewText])

    const onSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            review: reviewText,
            stars: rating,
            userId: user.id,
            spotId: id,

        }

        let createdReview = await dispatch(thunkCreateReview(payload, id))

        await dispatch(thunkReadReview(id))

        if (createdReview) {
            history.push(`/spots/${id}`)
        }


        setRating('')
        setReviewText('')
        setValidationErrors([])
    }

  


    return (
      <div className='reviewcreateform'>
          <h1>Create Review</h1>
         {validationErrors.length > 0 && (
          <div>
            <ul className='reviewerror'>
              {validationErrors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>   
        )}
        <form onSubmit={onSubmit}>
          <div>
            <input 
            className='reviewstar'
            type='number'
            value={rating}
            min={1}
            max={5}
            onChange={(event) => setRating(event.target.value)}
            required
            />
          </div>
          <div>
            <textarea
            className='reviewtext'
            type='text-area'
            placeholder='Thoughts on the place...'
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            >
            </textarea>
          </div>

            <button className='createreviewbuttony' type='submit'
            disabled={validationErrors.length > 0}
            > Submit Review </button>

        </form>

        </div>

        //1 - 5 star rating
        //review text area?? 
        // <button>Create Review</button>
    )
}

export default ReviewsCreatePage;