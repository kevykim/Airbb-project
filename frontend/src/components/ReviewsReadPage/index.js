import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkReadReview } from '../../store/reviews';
import ReviewsCreatePage from '../ReviewsCreatePage';
import ReviewsDeletePage from '../ReviewsDeletePage';


import './ReviewsReadPage.css'


const ReviewsReadPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  console.log('this id', id)
  const owner = useSelector(state => state.session)
  const user = useSelector(state => state.review[id])
  // const spotId = useSelector(state => state.review[id].spotId)

  const review = useSelector(state => state.review)

  console.log('what is this', review)

  const review2 = Object.values(review)
  // console.log(review2)
  // let newArr = []
  // const review3 = review2.forEach(review => {
  //   if (review.spotId === id) {
  //     newArr.push(review)
  //   }
  //   console.log(newArr)
  // })

  // console.log('loop', review3)
  console.log("review2", review2);

//   console.log('I am the owner', owner)

  // console.log("this is review", review2);

  useEffect(() => {
    dispatch(thunkReadReview(id));
  }, [dispatch, id]);

//   if (!user) return null
  
  return (
    <div>
      <div>{`${user?.User?.firstName}`}</div>
      {review2.map((reviews) => (
        <div key={reviews?.spotId}>
          <div>{reviews?.review}</div>
        </div>
      ))}
      {owner?.user?.user && (
        <div>
          <ReviewsCreatePage />
          <ReviewsDeletePage />
        </div>
      )}
    </div>
  );
}

export default ReviewsReadPage;