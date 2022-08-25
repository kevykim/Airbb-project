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

  const owner = useSelector(state => state.session)
  const user = useSelector(state => state.review[id])
  const review = useSelector(state => state.review)

  const review2 = Object.values(review)
//   console.log('I am the owner', owner)

  console.log("this is review", review2);

  useEffect(() => {
    dispatch(thunkReadReview(id));
  }, [dispatch, id]);

//   if (!user) return null
  
  return (
      
      <div>
            <h2>Temporary this is review box down below</h2>
            <div>{`${user?.User?.firstName}`}</div>
            <div>{review2.map(reviews => reviews?.review)}</div>
            {owner?.user?.user && (
                <div>
                    <ReviewsCreatePage />
                    <ReviewsDeletePage />
                </div>
                )}
                
                
                </div>
       

  )
}

export default ReviewsReadPage;