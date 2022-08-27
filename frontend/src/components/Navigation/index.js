import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import DemoUser from "../DemoUser";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;          
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup"><button>Sign up</button></NavLink>
      </>
    );
  }

  return (
    <ul>
      <li className="test">
        <NavLink exact to="/">
          <img
            src="https://icon-library.com/images/home-button-icon-png/home-button-icon-png-11.jpg"
            alt="Home"
            width={50}
            height={50}
          ></img>
        </NavLink>

        {sessionUser && (
          <NavLink exact to="/spots">
          <button>
            Create a Spot
          </button>
          </NavLink>
        )}
        <div>
          <DemoUser />
          {isLoaded && sessionLinks}
        </div>
      </li>
    </ul>
  );
}

export default Navigation;
