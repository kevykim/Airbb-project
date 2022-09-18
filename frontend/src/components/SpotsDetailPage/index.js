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
                      alignItems: "center",
                      width: "700px",
                      paddingBottom: "15px",
                      borderBottom: "1px solid rgb(222, 221, 221)",
                      fontFamily: "Monteserrat-SemiBold",
                      fontSize: "20pt",
                    }}
                  >
                    Entire home hosted by {spot?.Owner?.firstName}
                    <i class="fa-regular fa-circle-user fa-2xl"></i>
                  </div>
                  <div
                    style={{
                      marginBottom: "15px",
                      width: "650px",
                      fontFamily: "Monteserrat-Regular",
                    }}
                  >
                    <div style={{ padding: "15px 0px 15px 0px" }}>
                      <i class="fa-solid fa-door-open fa-2xl"></i>
                      &nbsp; Self Check In
                    </div>
                    <div style={{ padding: "15px 0px 15px 0px" }}>
                      <i class="fa-solid fa-medal fa-2xl"></i>
                      &nbsp; {spot?.Owner?.firstName} is a Super Host
                    </div>
                    <div
                      style={{ padding: "15px 0px 15px 0px", width: "600px" }}
                    >
                      <i class="fa-solid fa-calendar fa-2xl"></i>
                      &nbsp; Free cancellation for 48 hours.
                    </div>
                  </div>
                  <div className="spotdescript">{spot.description}</div>
                  <div className="placeoffer_div">
                    <h3 style={{ fontFamily: "Monteserrat-SemiBold" }}>
                      What this place offers
                    </h3>
                    <div className="placeoffer_container">
                      <div style={{ padding: "4px 0px 4px 0px" }}>
                        <i class="fa-solid fa-utensils fa-xl"></i>
                        &nbsp;Kitchen
                      </div>
                      <div style={{ padding: "4px 0px 4px 0px" }}>
                        <i class="fa-solid fa-car fa-xl"></i>
                        &nbsp;Parking
                      </div>
                      <div style={{ padding: "4px 0px 4px 0px" }}>
                        <i class="fa-solid fa-paw fa-xl"></i>
                        &nbsp;Pets allowed
                      </div>
                      <div style={{ padding: "4px 0px 4px 0px" }}>
                        <i class="fa-solid fa-wifi fa-xl"></i>
                        &nbsp;Wifi
                      </div>
                      <div style={{ padding: "4px 0px 4px 0px" }}>
                        <i class="fa-regular fa-snowflake fa-xl"></i>
                        &nbsp;Air Conditioning
                      </div>
                      <div style={{ padding: "4px 0px 4px 0px" }}>
                        <i class="fa-solid fa-tv fa-xl"></i>
                        &nbsp;TV
                      </div>
                      <div style={{ padding: "4px 0px 4px 0px" }}>
                        <i class="fa-solid fa-charging-station fa-xl"></i>
                        &nbsp;EV charger
                      </div>
                      <div style={{ padding: "4px 0px 4px 0px" }}>
                        <i class="fa-solid fa-video fa-xl"></i>
                        &nbsp;Security Camera
                      </div>
                    </div>
                  </div>
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
                  <div style={{ fontFamily: "Monteserrat-Regular" }}>
                    Calender will go here
                  </div>
                  <div style={{ fontFamily: "Monteserrat-Regular" }}>
                    Booking button?
                  </div>
                  <div style={{ fontFamily: "Monteserrat-Regular" }}>
                    Cleaning Fee
                  </div>
                  <div style={{ fontFamily: "Monteserrat-Regular" }}>
                    Service Fee
                  </div>
                  <div>Total</div>
                </div>
              </div>

              <div className="review_container">
                <ReviewsReadPage />
              </div>
              <div className="things_div">
                <h3 style={{ fontFamily: "Monteserrat-SemiBold" }}>
                  Things to know
                </h3>

                <div className="toknow_text">
                  <div>
                    <div style={{ fontFamily: "Monteserrat-SemiBold" }}>
                      House Rules
                    </div>
                    <div>
                      <i class="fa-regular fa-clock"></i>&nbsp;Check-in
                    </div>
                    <div>
                      <i class="fa-regular fa-clock"></i>&nbsp;Check-out
                    </div>
                    <div>
                      <i class="fa-solid fa-ban-smoking"></i>&nbsp;No smoking
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "Monteserrat-SemiBold" }}>
                      {`Health & safety`}
                    </div>
                    <div>
                      <i class="fa-solid fa-notes-medical"></i>&nbsp;COVID-19
                      safety
                    </div>
                    <div>
                      <i class="fa-solid fa-video"></i>&nbsp;Security camera
                    </div>
                    <div>
                      <i class="fa-solid fa-shield-heart"></i>&nbsp;Carbon
                      monoxide alarm
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "Monteserrat-SemiBold" }}>
                      Cancellation policy
                    </div>
                    <div>Free cancellation for 48 hours</div>
                    <div>Review the Host's full cancellation policy</div>
                  </div>
                </div>
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
              href="https://linkedin.com/in/kevin-kim-a88429150"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            &nbsp;·&nbsp;
            <a
              className="email_link"
              href="mailto:kebonkim@gmail.com"
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