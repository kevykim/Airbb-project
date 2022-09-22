

import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './ReviewsCreatePage.css'
import { useState, useEffect } from 'react';
import { thunkCreateReview, thunkReadReview } from '../../store/reviews';
// import ReviewsReadPage from '../ReviewsReadPage';

const ReviewsCreatePage = ({spotId, closeModal}) => {


    const {id} = useParams()
    const history = useHistory()
    // console.log(id)
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)

    const [star, setStar] = useState(0)
    const [reviewText, setReviewText] = useState('')
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() => {
        const errors = [];
        if (star < 1 || star > 5) errors.push('Stars must be within the range of 1 to 5')
        if (!reviewText.length || reviewText.length > 256) errors.push('Must have review')
        setValidationErrors(errors)
    }, [star, reviewText])

    // useEffect(() => {
    //   dispatch(thunkReadReview(id))
    // }, [dispatch, id])

    const onSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            review: reviewText,
            stars: star,
            userId: user.id,
            spotId: spotId,

        }

        let createdReview = await dispatch(thunkCreateReview(payload))

        await dispatch(thunkReadReview(id))

        if (createdReview) {
            history.push(`/spots/${spotId}`);
            closeModal(false)
        }


        setStar('')
        setReviewText('')
        setValidationErrors([])
    };

  


    return (
      <div className="createreviewdiv">
        <div className='createreview_header'>
        <button className='closeButton' onClick={() => closeModal(false)}>X</button>
        <div className='createreview_text'>Create a review</div>
        </div>
        <form className='createreviewform' onSubmit={onSubmit}>
          <div>
            <input
              className="createreviewstar"
              type="number"
              value={star}
              min={1}
              max={5}
              onChange={(event) => setStar(event.target.value)}
              required
            />
          </div>
          <div>
            <textarea
              className="createreviewtext"
              type="text-area"
              placeholder="Thoughts on the place..."
              value={reviewText}
              onChange={(event) => setReviewText(event.target.value)}
            ></textarea>
          </div>
          {validationErrors.length > 0 && (
            <div>
              <ul className="createreview_error">
                {validationErrors.map((error, i) => (
                  <div key={i}>{error}</div>
                ))}
              </ul>
            </div>
          )}
          <button
            className="createreviewbutton"
            type="submit"
            disabled={validationErrors.length > 0}
          >
            Submit Review
          </button>
        </form>
      </div>
    );
}

export default ReviewsCreatePage;