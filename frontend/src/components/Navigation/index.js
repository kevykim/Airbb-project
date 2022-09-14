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
      <div className="startbutton_container">
        <div className="startbutton_div">
          <button className="startbutton" onClick={(event) => setStartMenu(!startMenu)}>
            <i className="fa-solid fa-bars fa-2xl" style={{color: 'rgb(113, 113, 113', "margin-right": "12px" }}></i>
            <i className="fa-solid fa-circle-user fa-2xl" style={{color: 'rgb(113, 113, 113)'}}></i>
          </button>
        </div>

        {startMenu && (
          <div className="startmenu">
            <SignUpModal />
            <LoginFormModal />
            <DemoUser />
          </div>
        )}
      </div>
    );
  }


  return (
    <div className="navbar_container">
    <div className="navbar">
      <div className="airbnbhome">
        <NavLink exact to="/">
          <img
            src="https://blog.logomyway.com/wp-content/uploads/2020/03/arbnb-logo.jpg"
            alt="Home"
            ></img>
        </NavLink>
      </div>
      <div>
      {sessionUser && (
        <div className="host_container">
          <SpotCreateModal />
        </div>
      )}
      </div>
      {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
