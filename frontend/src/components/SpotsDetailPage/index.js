    import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
    import { useParams } from "react-router-dom";
// import { thunkReadReview } from "../../store/reviews";
import { getASpot } from "../../store/spots";
import ReviewsReadPage from "../ReviewsReadPage";
import SpotsDeletePage from "../SpotsDeletePage";
import SpotsUpdateModal from "../SpotsUpdatePage/SpotsUpdateModal";

import './SpotsDetailPage.css'


const SpotsDetailPage = () => {
     const {id} = useParams()
    //  console.log('id', id)
     const dispatch = useDispatch()

    // const test2 = useSelector(state => state.spot[id].Images)
    // const image = test2.map((image) => (
    //   <img src={image.url} alt="House test" width="250" height="250"></img>
    // ));
    // console.log('WHERE ARE YOU', test2)
    
    
    const spot = useSelector(state => state.spot[id])
    const user = useSelector(state => state.session.user)
    //  const state = useSelector(state => console.log(state))

    //  console.log('WHO ARE YOU',test.ownerId)
    // const review = useSelector(state => state)
    // console.log('dfs', review)


    
    useEffect(() => {
      dispatch(getASpot(id))
      // dispatch(thunkReadReview(id))
    }, [dispatch, id])
    
    
    // if (!user) {
    //   return 
    // }
    return (
      <>
        {spot && (
          <div>
            <div>{spot?.name}</div>
            <div>{spot?.avgStarRating}</div>
            {/* A NAV LINK TO REVIEWS FOR THAT SPOT */}
            <div>{`${spot.city}, ${spot.state}, ${spot.country}`}</div>

            {spot.Images && (
              <div>
                <img
                  src={spot?.Images[0]?.url}
                  alt="House test"
                  width="750"
                  height="500"
                ></img>
                {/* {image} */}
              </div>
            )}

            <div>{spot.description}</div>
            <div>{`$${spot.price}`}</div>
            <div>
              {spot.avgStarRating}
            </div>
            {/* reviews  */}
            <ReviewsReadPage />
          </div>
        )}

        {user?.id === spot?.ownerId && (
          <div>
            {/* spot ={spot} */}
            <SpotsUpdateModal spot={spot}/>
            <SpotsDeletePage />
          </div>
        )}
      </>
    );
    
}





export default SpotsDetailPage;