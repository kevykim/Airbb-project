import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import DemoUser from "../DemoUser";
import SpotCreateModal from "../SpotsCreatePage/SpotsCreateModal";
import SignUpModal from "../SignUpFormPage/SignUpModal";
import { useState } from "react";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [startMenu, setStartMenu] = useState(false)


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <ProfileButton user={sessionUser} />
      </div>
    );       
  } else {
    sessionLinks = (
      <div className="whatis">

          <button className="startbutton" onClick={(event) => setStartMenu(!startMenu)}>
            <i className="fa-solid fa-bars"></i>
            <i class="fa-solid fa-circle-user"></i>
          </button>

        {startMenu && (
          <div className="startmenu">
            <LoginFormModal />
            <SignUpModal />
            <DemoUser />
          </div>
        )}
      </div>
    );
  }


  return (
    <div className="wutnav">
    <div className="navbar">
      {/* <div className="actualnavbar"> */}
      <div className="airbnbhome">
        <NavLink exact to="/">
          <img
            src="https://blog.logomyway.com/wp-content/uploads/2020/03/arbnb-logo.jpg"
            alt="Home"
            ></img>
        </NavLink>
      </div>
      <div className="session">
      {sessionUser && (
        <div className="this">
          <SpotCreateModal />
        </div>
      )}
      </div>
      {/* </div> */}
      {isLoaded && sessionLinks}
      </div>
    <div className="navbottomline">
    </div>
    </div>
  );
}

export default Navigation;
