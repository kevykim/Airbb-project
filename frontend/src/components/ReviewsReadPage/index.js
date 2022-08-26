import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkReadReview } from '../../store/reviews';
import ReviewsCreatePage from '../ReviewsCreatePage';
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

  // console.log(reviews)
  // let newArr = []
  // const review3 = review2.forEach(review => {
  //   if (review.spotId === id) {
  //     newArr.push(review)
  //   }
  //   console.log(newArr)
  // })

  // console.log('loop', review3)
  // console.log("review2", review2);

//   console.log('I am the owner', owner)

  // console.log("this is review", review2);

  useEffect(() => {
    dispatch(thunkReadReview(id));
  }, [dispatch, id]);

//   if (!user) return null
  
  return (
    <div>
      {/* <div>{`${reviews?.User?.firstName}`}</div> */}
      {reviews.map((review) => (
        <div key={review?.id}>
          <div>{review?.review}</div>
          <h5>{`${date.toLocaleDateString(undefined, options)}`}</h5>
      {owner?.id === review.userId && <ReviewsDeletePage reviewId={review.id} />}
        </div>
      ))}
      {!reviews.find(review => review.userId === owner.id) && (
        <div>
          <ReviewsCreatePage />
        </div>
      )}
    </div>
  );
}

export default ReviewsReadPage;