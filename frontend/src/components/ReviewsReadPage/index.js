import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkReadReview } from '../../store/reviews';
import ReviewsFormModal from '../ReviewsCreatePage/ReviewsCreateModal';
import ReviewsDeletePage from '../ReviewsDeletePage';


import './ReviewsReadPage.css'


const ReviewsReadPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  // console.log('this id', id)
  const owner = useSelector(state => state.session.user)

  // const spotId = useSelector(state => state.review[id].spotId)

  const reviewsObj = useSelector(state => state.review)



  const reviews = Object.values(reviewsObj)

  const date = new Date()
  const options = {
    month: 'long',
    year: 'numeric'

  }


  useEffect(() => {
    dispatch(thunkReadReview(id));
  }, [dispatch, id]);

//   if (!user) return null
  
  return (
    <div>
      {reviews?.map((review) => (
        <div key={review?.id}>
          <div>{`${review?.User?.firstName}`}</div>
          <div>{`${date.toLocaleDateString(undefined, options)}`}</div>
          <div>{review?.review}</div>
      {owner?.id === review?.userId && <ReviewsDeletePage reviewId={review.id} />}
        </div>
      ))}
      {!reviews?.find(review => review?.userId === owner?.id) && (
        <div>
          <ReviewsFormModal />
        </div>
      )}
    </div>
  );
}

export default ReviewsReadPage;