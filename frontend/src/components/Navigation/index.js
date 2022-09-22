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
  const [startMenu, setStartMenu] = useState(false);

  // const openMenu = () => {
  //   if (startMenu) return;
  //   setStartMenu(true);
  // };

  // useEffect(() => {
  //   if (!startMenu) return;

  //   const closeMenu = (event) => {
  //       setStartMenu(false);
  //   };

  //   document.addEventListener("click", closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [startMenu]);

  //https://blog.logomyway.com/wp-content/uploads/2020/03/arbnb-logo.jpg

  let becomeHost;
  if (!sessionUser) {
    becomeHost = (
      <div>
        <BecomeAHost showMenu={setStartMenu} />
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
          <button
            className="startbutton"
            onClick={() => setStartMenu((banana) => !banana)}
          >
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
            <SignUpModal menu={startMenu} showMenu={setStartMenu} />
            <LoginFormModal showMenu={setStartMenu} />
            <DemoUser />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="navbar_container">
      <div className="navbar">
        <div>
          <NavLink className="airbnbhome" exact to="/">
            <img
              style={{ width: "40px", height: "40px" }}
              src="favicon_io/apple-touch-icon.png"
              alt="Home"
            ></img>
            <div className="airbnbhome_text">&nbsp;airbb</div>
          </NavLink>
        </div>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
