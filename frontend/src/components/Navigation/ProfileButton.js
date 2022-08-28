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
      <button classname="profilebuttonk" onClick={openMenu}>
        <i className="fa-solid fa-bars"></i>
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
