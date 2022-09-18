import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import DemoUser from "../DemoUser";
import SignUpModal from "../SignUpFormPage/SignUpModal";
import { useState} from "react";
import BecomeAHost from "../SignUpFormPage/BecomeHostModal.js";

function Navigation({ isLoaded }) {

  const sessionUser = useSelector((state) => state.session.user);
  const [startMenu, setStartMenu] = useState(false)


    const openMenu = () => {
      if (startMenu) return;
      setStartMenu(true);
    };

    // useEffect(() => {
    //   if (!startMenu) return;

    //   const closeMenu = () => {
    //     setStartMenu(false);
    //   };

    //   document.addEventListener("click", closeMenu);

    //   return () => document.removeEventListener("click", closeMenu);
    // }, [startMenu]);

  let becomeHost;
  if (!sessionUser) {
    becomeHost = (
      <div>
        <BecomeAHost />
      </div>
    );
  }

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
          <div style={{ marginRight: "10px" }} className="">
            {becomeHost}
          </div>
          <button className="startbutton" onClick={openMenu}>
            <i
              className="fa-solid fa-bars fa-2xl"
              style={{ color: "rgb(113, 113, 113", marginRight: "12px" }}
            ></i>
            <i
              className="fa-solid fa-circle-user fa-2xl"
              style={{ color: "rgb(113, 113, 113)" }}
            ></i>
          </button>
        </div>

        {startMenu && (
          <div className="startmenu">
            <SignUpModal menu={startMenu} setMenu={setStartMenu} />
            <LoginFormModal menu={startMenu} setMenu={setStartMenu} />
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
      {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
