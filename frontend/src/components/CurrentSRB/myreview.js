import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { thunkAllCurrentReview } from "../../store/reviews";
import ReviewsDeletePage from "../ReviewsDeletePage";
import ReviewsUpdateModal from "../ReviewsUpdatePage/ReviewsUpdateModal";
import {thunkCurrentSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";

import './myreview.css'
import { useHistory } from "react-router-dom";


function MyReview() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkAllCurrentReview())
        //  dispatch(getSpots());
         dispatch(thunkCurrentSpots());

    },[dispatch])

    const allReview = useSelector(state => state.review)
    // const spot = useSelector(state => state.spot)
    const reviews = Object.values(allReview)


     const date = new Date();
     const options = {
       month: "long",
       year: "numeric",
     };
    // const allSpot = Object.values(spot).map(spot => spot.id)

    if (!user) history.push("/");

    

    return (
      <div className="myreview_container">
        {reviews?.length === 0 ? (
          <div className="myreview_notshown">
            <div className="myreview_notinner">
              <NavLink className="myreview_nolink" to={"/"}>
                <div className="myreview_notext">No Reviews Here... </div>
                <img
                  className="myreview_notshownimage"
                  src="https://images.pexels.com/photos/5428829/pexels-photo-5428829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Not Shown"
                ></img>
                <div className="myreview_notext">Click to go back Home!</div>
              </NavLink>
            </div>
          </div>
        ) : (
          <div>
            <div className="myreview_text">My reviews</div>
            <div className="myreview_box">
              <div className="myreview_outer">
                {reviews.map((review) => (
                  <div className="myreview_div" key={review.id}>
                    <NavLink
                      to={`/spots/${review.spotId}`}
                      className="myreview_links"
                    >
                      {`${review.Spot?.city}, ${review.Spot?.state}`}
                      <div className="myreview_review">
                        <div className="myreview_star">
                          <i className="fa-solid fa-star"></i>
                          &nbsp;{review.stars}
                        </div>
                        <div>{review.review}</div>
                        <div className="myreview_date">{`${date.toLocaleDateString(
                          undefined,
                          options
                        )}`}</div>
                      </div>
                    </NavLink>
                    <div className="myreview_buttons">
                      <ReviewsUpdateModal
                        review={allReview}
                        firstName={review?.User?.firstName}
                        reviewId={review.id}
                        spotId={review.spotId}
                      />
                      <ReviewsDeletePage
                        reviewId={review.id}
                        spotId={review.spotId}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div>
          <div className="footer_container">
            <div className="footer_maindiv">
              <div className="footer_div">
                &copy; 2022 Airbb, Inc. &nbsp;·&nbsp;
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
              <div>
                <i className="fa-solid fa-globe"></i>
                &nbsp;English(US) &nbsp;&nbsp;$ USD
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default MyReview;

