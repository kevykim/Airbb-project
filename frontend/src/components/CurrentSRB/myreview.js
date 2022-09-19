import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { thunkAllCurrentReview } from "../../store/reviews";
import ReviewsDeletePage from "../ReviewsDeletePage";
import ReviewsUpdateModal from "../ReviewsUpdatePage/ReviewsUpdateModal";
import { getSpots } from "../../store/spots";

import './myreview.css'


function MyReview() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(thunkAllCurrentReview())
         dispatch(getSpots());

    },[dispatch])

    const allReview = useSelector(state => state.review)
    const spot = useSelector(state => state.spot)
    console.log(Object.values(spot))
    const reviews = Object.values(allReview)


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
              <ReviewsUpdateModal />
              <ReviewsDeletePage />
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

