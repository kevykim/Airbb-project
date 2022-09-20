import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { thunkAllCurrentReview } from "../../store/reviews";
import ReviewsDeletePage from "../ReviewsDeletePage";
import ReviewsUpdateModal from "../ReviewsUpdatePage/ReviewsUpdateModal";
import { getSpots } from "../../store/spots";

import './myreview.css'
import { useHistory } from "react-router-dom";


function MyReview() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkAllCurrentReview())
         dispatch(getSpots());

    },[dispatch])

    const allReview = useSelector(state => state.review)
    // const spot = useSelector(state => state.spot)
    const reviews = Object.values(allReview)

    // const allSpot = Object.values(spot).map(spot => spot.id)

    if (!user) history.push("/");


    return (
      <div className="myreview_container">
        <div className="myreview_text">My reviews</div>
        <div className="myreview_box">
          {reviews.map((review) => (
            <div className="myreview_review" key={review.id}>
              <div>
                <i className="fa-solid fa-star"></i>
                &nbsp;{review.stars}
              </div>
              <div>{review.review}</div>
              <ReviewsUpdateModal
                review={allReview}
                firstName={review?.User?.firstName}
                reviewId={review.id}
                spotId={review.spotId}
              />
              <ReviewsDeletePage reviewId={review.id} spotId={review.spotId}/>
            </div>
          ))}
        </div>
        <div className="footer_container">
          <div>
            @ 2022 Airbb, Inc. &nbsp;·&nbsp;
            <a
              className="github_link"
              href="https://github.com/kevykim"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            &nbsp;·&nbsp;
            <a
              className="linkedin_link"
              href="https://linkedin.com/in/kevin-kim-a88429150"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            &nbsp;·&nbsp;
            <a
              className="email_link"
              href="mailto:kebonkim@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    );
}

export default MyReview;

