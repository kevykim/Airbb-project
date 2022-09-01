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
     const dispatch = useDispatch()


    
    
    const spot = useSelector(state => state.spot[id])
    const user = useSelector(state => state.session.user)
   
    const review = useSelector(state => state.review)
    const reviewCounter = (Object.values(review).length);

    
    useEffect(() => {
      dispatch(getASpot(id))
      // dispatch(thunkReadReview(id))
    }, [dispatch, id])
    
    
    // if (!user) {
    //   return 
    // }
    return (
      <div>
        {spot && (
          <div>
            <div className="spotheadercontainer">
              <div className="detailspotname" style={{ "font-weight": "bold" }}>
                {spot?.name}
              </div>

              <div className="spotavgstarrating">
                <i class="fa-solid fa-star"></i>

                {`${spot?.avgStarRating} · ${reviewCounter} reviews · ${spot.city}, ${spot.state}, ${spot.country}`}
              </div>
              {/* A NAV LINK TO REVIEWS FOR THAT SPOT */}
            </div>

            {spot.Images && (
              <div className="spotimgdiv">
                <img
                  className="spotimgdetail"
                  src={spot?.Images[0]?.url}
                  alt="House test"
                ></img>
              </div>
            )}
            <div className="descandpricecontainer">
              <div className="spotdescript">{spot.description}</div>
              <div className="rightpricereview">
                <div>{`$${spot.price} night`}</div>
                <div>
                  <i class="fa-solid fa-star"></i>
                  {`${spot.avgStarRating} · ${reviewCounter} reviews`}
                </div>
              </div>
            </div>
          </div>
        )}
        <div>
          <ReviewsReadPage />
        </div>

        {user?.id === spot?.ownerId && (
          <div className="spottybutton">
            {/* spot ={spot} */}
            <SpotsUpdateModal spot={spot} />
            <SpotsDeletePage />
          </div>
        )}
      </div>
    );
    
}





export default SpotsDetailPage;