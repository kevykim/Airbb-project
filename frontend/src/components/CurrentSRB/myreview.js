import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { thunkReadReview } from "../../store/reviews";

function MyReview() {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(thunkReadReview())
    },[dispatch])

    const allReview = useSelector(state => state.review)
    const reviews = Object.values(allReview)
    const ownedReview = reviews.filter(review => review.User.id === user.id)
    return (
        <div>
            <h1>My reviews</h1>
            <div>{ownedReview.map(review => (
                <div key={review.id}>
                    <div>{review.review}</div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default MyReview;

