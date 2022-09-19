import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { thunkAllCurrentReview } from "../../store/reviews";
import ReviewsDeletePage from "../ReviewsDeletePage";
import ReviewsUpdateModal from "../ReviewsUpdatePage/ReviewsUpdateModal";



function MyReview() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(thunkAllCurrentReview())
    },[dispatch])

    const allReview = useSelector(state => state.review)
    const reviews = Object.values(allReview)


    return (
        <div>
            <h1>My reviews</h1>
            <div>{reviews.map(review => (
                <div key={review.id}>
                    <div>{review.review}</div>
                    <div>{review.stars}</div>
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
    )
}

export default MyReview;

