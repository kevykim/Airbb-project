import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {  getSpots } from "../../store/spots";
import SpotsDeletePage from "../SpotsDeletePage";
import SpotsUpdateModal from "../SpotsUpdatePage/SpotsUpdateModal";
import { useHistory } from "react-router-dom";

import './myspot.css'
import { NavLink } from "react-router-dom";

function MySpot() {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();

       useEffect(() => {
         dispatch(getSpots());
        //  dispatch(thunkCurrentSpots());
       }, [dispatch]);

    const allSpot = useSelector((state) => state.spot);
    const spots = Object.values(allSpot);
    const filteredSpot = spots?.filter(spot => spot?.ownerId === user?.id)
    // console.log(filteredSpot)

    
    if (!user) history.push('/');


    return (
      <div className="myspot_container">
        {filteredSpot?.length === 0 ? (
          <div className="myspot_notshown">
            <div className="myspot_notinner">
              <NavLink className="myspot_nolink" to={"/"}>
                <div className="myspot_notext"> No Listings Here...</div>
                <img
                  className="myspot_notshownimage"
                  src="https://images.pexels.com/photos/4032024/pexels-photo-4032024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Not Shown"
                  onError={(event) => {
                    event.currentTarget.src =
                      "https://images.pexels.com/photos/4032024/pexels-photo-4032024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
                  }}
                ></img>
                <div className="myspot_notext"> Click to go back Home!</div>
              </NavLink>
            </div>
          </div>
        ) : (
          <div>
            <div className="myspot_text">My Listings</div>
            <div className="myspot_card">
              {filteredSpot.map((spot) => (
                <div key={spot.id}>
                  <div className="myspot_image_div">
                    <NavLink to={`/spots/${spot?.id}`}>
                      <img
                        className="myspot_image"
                        src={spot?.previewImage}
                        alt="test"
                        onError={(event) => {
                          event.currentTarget.src =
                            "https://images.pexels.com/photos/4792480/pexels-photo-4792480.jpeg";
                        }}
                      ></img>
                    </NavLink>
                  </div>
                  <div className="myspot_info_div">
                    <div className="myspot_firstline">
                      <div>{`${spot.city}, ${spot.state}`}</div>
                      <div>
                        <i className="fa-solid fa-star"></i>
                        &nbsp;{spot.avgRating}
                      </div>
                    </div>
                    <p className="myspot_secondline">
                      <span className="myspot_span">{`$${spot.price}`}</span>
                      &nbsp;night
                    </p>
                  </div>
                  <div className="myspot_buttons">
                    <SpotsUpdateModal spot={spot} />
                    <SpotsDeletePage spot={spot} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          <div className="footer_container">
            <div className="footer_maindiv">
              <div className="footer_div">
                &copy; 2022 Airbb, Inc. &nbsp;·&nbsp;
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
              <div>
                <i className="fa-solid fa-globe"></i>
                &nbsp;English(US) &nbsp;&nbsp;$ USD
              </div>
            </div>
          </div>
        </div>
      </div>
    );}
        
export default MySpot;