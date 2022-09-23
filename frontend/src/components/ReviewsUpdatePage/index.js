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
       const [submitted, setSubmitted] = useState(false);
       const [validationErrors, setValidationErrors] = useState([]);

       useEffect(() => {
         const errors = [];
         if (star < 1 || star > 5)
           errors.push("Stars must be within the range of 1 to 5");
        if (isNaN(star)) errors.push("Star must be a number");

         if (!reviewText.length || reviewText.length > 256)
           errors.push("Must have review");
         setValidationErrors(errors);
       }, [star, reviewText]);

         const onSubmit = async (event) => {
           event.preventDefault();
           setSubmitted(!submitted)

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
          <button className="closeButton" onClick={() => closeModal(false)}>
            X
          </button>
          <div className="updatereview_text">Edit a review</div>
        </div>
        <form className="updatereviewform" onSubmit={onSubmit}>
          {(validationErrors.length > 0 && submitted === true) && (
            <div className="updatereview_error">
              <div>
                {validationErrors.map((error, i) => (
                  <div key={i}>{error}</div>
                ))}
              </div>
            </div>
          )}
          <div>
            <input
              className="updatereviewstar"

              value={star}
             
              onChange={(event) => setStar(event.target.value)}

            />
          </div>
          <div>
            <textarea
              className="updatereviewtext"
              type="text-area"
              placeholder="Thoughts on the place..."
              value={reviewText}
              onChange={(event) => setReviewText(event.target.value)}
            ></textarea>
          </div>

          <button
            className="updatereviewbutton"
            type="submit"
            disabled={validationErrors.length > 0 && submitted}
          >
            Submit Review
          </button>
        </form>
      </div>
    );
}

export default ReviewsUpdatePage