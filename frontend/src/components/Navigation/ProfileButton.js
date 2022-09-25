import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import SpotCreateModal from "../SpotsCreatePage/SpotsCreateModal";
import BecomeAHost from "../SignUpFormPage/BecomeHostModal.js";
import './ProfileButton.css'

function ProfileButton({ user, showStartMenu }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    showStartMenu(false)
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <div className="profile_container">
      <div className="startbutton_container">
      {user ? (
      <div style={{"marginRight": "10px"}}>
        <SpotCreateModal />
      </div>
      ) : <div style={{ marginRight: "10px" }}>
            <BecomeAHost showModal={showModal} setShowModal={setShowModal}  />
       </div>}
      <button className="startbutton" onClick={openMenu}>
        <i
          className="fa-solid fa-bars fa-2xl"
          style={{ color: 'rgb(113, 113, 113)', "marginRight": "12px" }}
        ></i>
        <i
          className="fa-solid fa-circle-user fa-2xl"
          style={{ color: "rgb(113, 113, 113)" }}
        ></i>
      </button>
      </div>
      {showMenu && user && (
        <div className="profile_drop_container">
        <div className="profile-dropdown">
          <div className="profile-username">Hello, {user.username}</div>
          <div className="profile-email">{user.email}</div>
          <NavLink className="my_spot_link" to={'/spots'}>My Spots</NavLink>
          <NavLink className="my_review_link" to={'/reviews'}>My Reviews</NavLink>
          <div>
            <button className="profilelogout" onClick={logout}>
              Log Out
            </button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
