import './ReviewsUpdatePage.css'


import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

import { thunkUpdateReview } from '../../store/reviews';

const ReviewsUpdatePage = ({reviewId, spotId, onClick}) => {
    const history = useHistory()
    const dispatch = useDispatch()

       const user = useSelector((state) => state.session.user);

       const [rating, setRating] = useState(0);
       const [reviewText, setReviewText] = useState("");
       const [validationErrors, setValidationErrors] = useState([]);

       useEffect(() => {
         const errors = [];
         if (rating < 1 || rating > 5)
           errors.push("Stars must be within the range of 1 to 5");
         if (!reviewText.length || reviewText.length > 256)
           errors.push("Must have review");
         setValidationErrors(errors);
       }, [rating, reviewText]);

         const onSubmit = async (event) => {
           event.preventDefault();

           const payload = {
             review: reviewText,
             stars: rating,
             userId: user.id,
             reviewId: reviewId,
             spotId: spotId
           };

           let updatedReview = await dispatch(thunkUpdateReview(payload));

           // await dispatch(thunkReadReview(id))

           if (updatedReview) {
             history.push(`/spots/${spotId}`);
             onClick()
           }

           setRating("");
           setReviewText("");
           setValidationErrors([]);
         };
    return (
      <div>
        <h1>Edit Review</h1>
        {validationErrors.length > 0 && (
          <div>
            <ul>
              {validationErrors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div>
            <input 
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
            type='text-area'
            placeholder='Thoughts on the place...'
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            >
            </textarea>
          </div>

            <button type='submit'
            disabled={validationErrors.length > 0}
            > Update Review </button>

        </form>
      </div>
    );
}

export default ReviewsUpdatePage