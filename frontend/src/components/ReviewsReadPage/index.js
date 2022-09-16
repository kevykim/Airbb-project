import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkReadReview } from '../../store/reviews';
import ReviewsCreateModal from '../ReviewsCreatePage/ReviewsCreateModal';
import ReviewsDeletePage from '../ReviewsDeletePage';
import ReviewsUpdateModal from '../ReviewsUpdatePage/ReviewsUpdateModal';


import './ReviewsReadPage.css'


const ReviewsReadPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  const owner = useSelector(state => state.session.user)
  const reviewsObj = useSelector(state => state.review)
  const reviews = Object.values(reviewsObj)

  const spot = useSelector(state => state.spot[id])

  const date = new Date()
  const options = {
    month: 'long',
    year: 'numeric'

  }

  // console.log("review finds",reviews?.find((review) => review?.userId === owner?.id))

  useEffect(() => {
    dispatch(thunkReadReview(id));
  }, [dispatch, id]);

//   if (!user) return null
  
  return (
    <div>
      <div className="reviewstitlediv">
        <i className="fa-solid fa-star"></i>{" "}
        {`${spot?.avgStarRating} · ${reviews.length} reviews`}
      </div>
      {reviews?.map((review) => (
        <div className="reviewcontainer" key={review?.id}>
          <div className="profilereview">
            <div style={{ "fontWeight": "bold" }}>
              <i className="fa-solid fa-user"></i>
              {` ${review?.User?.firstName}`}
            </div>
            <div style={{ color: "grey" }}>{`${date.toLocaleDateString(
              undefined,
              options
            )}`}</div>
          </div>
          <div className="allreviewcontainer">{review?.review}</div>
          {owner?.id === review?.userId && (
            <div>
              <ReviewsUpdateModal firstName={review?.User?.firstName} reviewId={review?.id} spotId={spot?.id}/>
              <ReviewsDeletePage reviewId={review?.id} />
              </div>
          )}
        </div>
      ))}
      {owner && (
        <div>
          <ReviewsCreateModal spotId={spot?.id} />
        </div>
      )}
    </div>
  );
}

export default ReviewsReadPage;