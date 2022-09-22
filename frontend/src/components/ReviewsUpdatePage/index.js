import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { thunkUpdateReview } from '../../store/reviews';
import './ReviewsUpdatePage.css'

const ReviewsUpdatePage = ({review, reviewId, spotId, closeModal}) => {
    const history = useHistory()
    const dispatch = useDispatch()


       const user = useSelector((state) => state.session.user);

       const [star, setStar] = useState(review[reviewId].stars);
       const [reviewText, setReviewText] = useState(review[reviewId].review);
       const [validationErrors, setValidationErrors] = useState([]);

       useEffect(() => {
         const errors = [];
         if (star < 1 || star > 5)
           errors.push("Stars must be within the range of 1 to 5");
         if (!reviewText.length || reviewText.length > 256)
           errors.push("Must have review");
         setValidationErrors(errors);
       }, [star, reviewText]);

         const onSubmit = async (event) => {
           event.preventDefault();

           const payload = {
             review: reviewText,
             stars: star,
             userId: user.id,
             reviewId: reviewId,
             spotId: spotId
           };

           let updatedReview = await dispatch(thunkUpdateReview(payload));

           // await dispatch(thunkReadReview(id))

           if (updatedReview) {
             history.push(`/spots/${spotId}`);
             closeModal(false)
           }


           setStar("");
           setReviewText("");
           setValidationErrors([]);
         };
    return (
      <div className="updatereviewdiv">
        <div className="updatereview_header">
        <button className="closeButton" onClick={() => closeModal(false)}>X</button>
        <div className="updatereview_text">Edit a review</div>
        </div>
        <form className="updatereviewform" onSubmit={onSubmit}>
          <div>
            <input 
            className="updatereviewstar"
            type='number'
            value={star}
            min={1}
            max={5}
            onChange={(event) => setStar(event.target.value)}
            required
            />
          </div>
          <div>
            <textarea
            className="updatereviewtext"
            type='text-area'
            placeholder='Thoughts on the place...'
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            >
            </textarea>
          </div>
          {validationErrors.length > 0 && (
          <div className="updatereview_error">
            <ul>
              {validationErrors.map((error, i) => (
                <div key={i}>{error}</div>
              ))}
            </ul>
          </div>
        )}
            <button className="updatereviewbutton" type='submit'
            disabled={validationErrors.length > 0}
            > Submit Review </button>

        </form>
      </div>
    );
}

export default ReviewsUpdatePage