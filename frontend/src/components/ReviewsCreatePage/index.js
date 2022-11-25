

import { useDispatch, useSelector } from 'react-redux';
import {   useHistory } from 'react-router-dom';
import './ReviewsCreatePage.css'
import { useState, useEffect } from 'react';
import { thunkCreateReview, thunkReadReview } from '../../store/reviews';
import { useParams } from 'react-router-dom';
import { getSpots } from '../../store/spots';

const ReviewsCreatePage = ({spotId, closeModal}) => {


    const {id} = useParams()
    const dispatch = useDispatch()

    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const spot = useSelector(state => state.spot[id])
    // console.log(spot)
    const reviewObj = useSelector(state => state.review)
    const review = Object.values(reviewObj)

    const [star, setStar] = useState('')
    const [reviewText, setReviewText] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])

    const ownedReview = review.map((review) => review.userId === user.id);
     const toOwned = ownedReview.filter((reviews) => reviews === true);
    

    useEffect(() => {
      
      const errors = [];
      if (spot?.ownerId === user?.id) {
        errors.push('Owner of spot cannot make reviews')
      } else if (toOwned.length >= 1) {
        errors.push('You cannot have more than one review')
      } else {
        if (star < 1 || star > 5) errors.push('Stars must be within the range of 1 to 5')
        if (isNaN(star)) errors.push("Star must be a number")
        if (!reviewText.length || reviewText.length > 256) errors.push('Must have review')
      }
        
        setValidationErrors(errors)
    }, [star, reviewText, toOwned.length, spot?.ownerId, user?.id])
    
    
    const onSubmit = async (event) => {
      event.preventDefault();
      setSubmitted(!submitted);
      const payload = {
        review: reviewText,
        stars: star,
        userId: user.id,
        spotId: spotId,
      };
      
      //  if (toOwned.length >= 1) {
      //    validationErrors.push("You cannot have more than one review for a Spot");
      //  }
      
      // let createdReview = await dispatch(thunkCreateReview(payload));

      // if (toOwned.length >= 1) {
      //   alert("You cannot have more than one review for a Spot. Go delete or edit the review.");
      //   history.push(`/reviews`)
      // } else {
      await dispatch(thunkCreateReview(payload));
      // if (createdReview) {
        history.push(`/spots/${spotId}`);
        closeModal(false);
      // }
      // }


      await dispatch(thunkReadReview(id));

      await dispatch(getSpots());

      // if (createdReview) {
      //   history.push(`/spots/${spotId}`);
      //   closeModal(false);
      // }
    };

      
    


    return (
      <div className="createreviewdiv">
        <div className="createreview_header">
          <button className="closeButton" onClick={() => closeModal(false)}>
            X
          </button>
          <div className="createreview_text">Create a review</div>
        </div>
        <form className="createreviewform" onSubmit={onSubmit}>
          {(validationErrors.length > 0 && submitted === true) && (
            <div>
              <div className="createreview_error">
                {validationErrors.map((error, i) => (
                  <div key={i}>{error}</div>
                ))}
              </div>
            </div>
          )}
          <div>
            <input
              className="createreviewstar"
              value={star}
              placeholder='Stars'
              
              onChange={(event) => setStar(event.target.value)}

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

          <button
            className="createreviewbutton"
            type="submit"
            disabled={validationErrors.length > 0 && submitted}
          >
            Submit Review
          </button>
        </form>
      </div>
    );
}

export default ReviewsCreatePage;