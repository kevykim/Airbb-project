import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSpots } from "../../store/spots";
import SpotsDeletePage from "../SpotsDeletePage";
import SpotsUpdateModal from "../SpotsUpdatePage/SpotsUpdateModal";

import './myspot.css'
import { NavLink } from "react-router-dom";

function MySpot() {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();

       useEffect(() => {
         dispatch(getSpots());
       }, [dispatch]);

    const allSpot = useSelector((state) => state.spot);
    const spots = Object.values(allSpot);
    const ownedSpots = spots.filter(spot => spot.ownerId === user.id)
   

    return (
      <div className="myspot_container">
        <div className="myspot_text">My Spots</div>
        <div className="myspot_card">
          {ownedSpots.map((spot) => (
            <div key={spot.id}>
              <div className="myspot_image_div">
                <NavLink to={`/spots/${spot.id}`}>
                  <img
                    className="myspot_image"
                    src={spot.previewImage}
                    alt="test"
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
                  <span
                    style={{ fontFamily: "Monteserrat-SemiBold" }}
                  >{`$${spot.price}`}</span>
                  &nbsp;night
                </p>
              </div>
              <div className="myspot_buttons">
                <SpotsUpdateModal />
                <SpotsDeletePage />
              </div>
            </div>
          ))}
        </div>
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

export default MySpot;