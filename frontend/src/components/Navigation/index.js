import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import SignUpModal from "../SignUpFormPage/SignUpModal";
import { useState} from "react";
import logo from '../../images/airbb.png'



function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [startMenu, setStartMenu] = useState(false);

  const [signUp, setSignUp] = useState(false)
  const [logIn, setLogIn] = useState(false)
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

  // let becomeHost;
  // if (!sessionUser) {
  //   becomeHost = (
  //     <div>
  //       <BecomeAHost showMenu={setStartMenu} />
  //     </div>
  //   );
  // }


  // if (sessionUser) {
    //   sessionLinks = (
      //     <div>
      //     </div>
      //   );
      // } 
      // else {
        //   sessionLinks = (
          //     <div className="startbutton_container">
          //       <div className="startbutton_div">
          //         <div style={{ marginRight: "10px" }}>{becomeHost}</div>
          //         <button
          //           className="startbutton"
          //           onClick={() => setStartMenu((banana) => !banana)}
          //         >
          //           <i
          //             className="fa-solid fa-bars fa-2xl"
          //             style={{ color: "rgb(113, 113, 113", marginRight: "12px" }}
          //           ></i>
          //           <i
          //             className="fa-solid fa-circle-user fa-2xl"
          //             style={{ color: "rgb(113, 113, 113)" }}
          //           ></i>
          //         </button>
          //       </div>
          //       {startMenu && (
            //         <div className="startmenu">
            //           <SignUpModal menu={startMenu} showMenu={setStartMenu} />
            //           <LoginFormModal showMenu={setStartMenu} />
            //           <DemoUser />
            //         </div>
            //       )}
            //     </div>
            //   );
            // }
            



let sessionLinks = <ProfileButton signUp={signUp} setSignUp={setSignUp} logIn={logIn} setLogIn={setLogIn} showStartMenu={setStartMenu} user={sessionUser} />
        
  return (
    <div className="navbar_container">
      <div className="navbar">
        <div className="airbnbhome_div">
          <NavLink className="airbnbhome" exact to="/">
            <img
              style={{ width: "40px", height: "40px", objectFit: "contain" }}
              src={logo}
              alt="Home"
            ></img>
            <div className="airbnbhome_text">&nbsp;airbb</div>
          </NavLink>
        </div>
        {isLoaded && sessionLinks}
        <SignUpModal menu={startMenu} showMenu={setStartMenu} signUp={signUp} setSignUp={setSignUp}/>
        <LoginFormModal showMenu={setStartMenu} logIn={logIn} setLogIn={setLogIn}/>
      </div>
    </div>
  );
}

export default Navigation;