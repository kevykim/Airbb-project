import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkReadReview } from '../../store/reviews';


import './ReviewsReadPage.css'


const ReviewsReadPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const owner = useSelector(state => state.session)
  const user = useSelector(state => state.review[id].User)
  const review = useSelector(state => state.review[id])

  console.log('I am the owner', owner)

  console.log("this is review", review);

  useEffect(() => {
    dispatch(thunkReadReview(id));
  }, [dispatch, id]);

//   if (!user) return null
  
  return (
      
      <div>
            <h2>Temporary this is review box down below</h2>
            <div>{`${user?.firstName}`}</div>
            <div>{review?.review}</div>
            {owner?.user?.user && (
                <h1>hi</h1>   
                )}
                
                
                </div>
       

  )
}

export default ReviewsReadPage;