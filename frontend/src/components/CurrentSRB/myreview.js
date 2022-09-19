import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { thunkAllCurrentReview } from "../../store/reviews";


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
                </div>
            ))}
            </div>
        </div>
    )
}

export default MyReview;

