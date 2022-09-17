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
    //   return null 
    // }
    return (
      <div className="splash-container">
        {spot && (
          <div>
            <div className="title_img_div">
              <div className="spotheadercontainer">
                <div className="detailspotname" style={{ fontWeight: "bold" }}>
                  {spot?.name}
                </div>

                <div className="spotavgstarrating">
                  <i className="fa-solid fa-star"></i>
                  &nbsp;
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
              <div className="descript_pricecontainer">
                <div className="descript_container">
                  <div
                    style={{
                      margin: "10px 0px 20px 0px",
                      display: "flex",
                      justifyContent: "space-between",
                      width: "700px",
                      padding: "10px",
                      borderBottom: "1px solid rgb(222, 221, 221)",
                    }}
                  >
                    Entire home hosted by {spot?.Owner?.firstName}
                    <i class="fa-regular fa-circle-user fa-2xl"></i>
                  </div>
                  <div style={{ marginBottom: "15px", width: "650px" }}>
                    <div style={{ padding: "15px 0px 15px 0px" }}>
                      <i class="fa-solid fa-door-open fa-2xl"></i>
                      &nbsp; Self Check In
                    </div>
                    <div style={{ padding: "15px 0px 15px 0px" }}>
                      <i class="fa-solid fa-medal fa-2xl"></i>
                      &nbsp; {spot?.Owner?.firstName} is a Super Host
                    </div>
                    <div
                      style={{padding: "15px 0px 15px 0px" , width: "600px" }}
                    >
                      <i class="fa-solid fa-calendar fa-2xl"></i>
                      &nbsp; Free cancellation for 48 hours.
                    </div>
                  </div>
                  <div className="spotdescript">{spot.description}</div>
                </div>

                <div className="rightpricereview">
                  <div className="reviewprice_container">
                    <div style={{ fontSize: "10pt" }}>
                      <span
                        style={{
                          fontFamily: "Monteserrat-SemiBold",
                          fontSize: "14pt",
                        }}
                      >{`$${spot.price}`}</span>
                      night
                    </div>
                    <div className="avg_rating_div">
                      <i className="fa-solid fa-star"></i>
                      &nbsp;
                      {`${spot?.avgStarRating} · ${reviewCounter} reviews`}
                    </div>
                  </div>
                  <div>Calender will go here</div>
                  <div>Booking button?</div>
                  <div>Cleaning Fee</div>
                  <div>Service Fee</div>
                  <div>Total</div>
                </div>
              </div>
              <div className="review_container">
                <ReviewsReadPage />
              </div>
            </div>
          </div>
        )}

        {user?.id === spot?.ownerId && (
          <div className="spottybutton">
            {/* spot ={spot} */}
            <SpotsUpdateModal spot={spot} />
            <SpotsDeletePage />
          </div>
        )}
        <div className="footer_container">
          <div>
            @ 2022 Airbb, Inc. &nbsp;·&nbsp;
            <a
              className="github_link"
              href="https://github.com/kevykim"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            &nbsp;·&nbsp;
            <a
              className="linkedin_link"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            &nbsp;·&nbsp;
            <a
              className="email_link"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    );
    
}





export default SpotsDetailPage;