import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

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
    dispatch(sessionActions.logout());
  };

  return (
    <div className="profilecontain">
      <button className="startbutton" style={{'width':'75px', 
      'borderRadius':'15px', 
      'height':'45px',
      'cursor': 'pointer'}} onClick={openMenu}>
        <i className="fa-solid fa-bars fa-sm" style={{color: 'rgb(113, 113, 113)'}}></i>
        <i className="fa-solid fa-circle-user fa-2xl" style={{color: 'rgb(113, 113, 113)'}}></i>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div className="profile-username">{user.username}</div>
          <div className="profile-email">{user.email}</div>
          <div>
            <button className="profilelogout" onClick={logout}>
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
