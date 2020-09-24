import React, { useState } from "react";
import "./DropdownMenu.css";
import { CSSTransition } from "react-transition-group";

import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FeedbackIcon from "@material-ui/icons/Feedback";
import HelpIcon from "@material-ui/icons/Help";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import LanguageIcon from "@material-ui/icons/Language";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SettingsIcon from "@material-ui/icons/Settings";
import { Avatar } from "@material-ui/core";
import { useStateValue } from "../../../store/StateProvider";

const DropdownMenu = () => {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const [{ user }, dispatch] = useStateValue();

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  const logoutHandler = () => {
    // Logout function here
  };

  const colorModeChanger = () => {
    const app = document.querySelector(".app");
    const theme = localStorage.getItem("theme");
    console.log(theme);
    if (!theme || theme === "light") {
      app.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      app.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const DropdownItem = ({
    children,
    leftIcon,
    rightIcon,
    goToMenu,
    myClass,
  }) => {
    return (
      <div
        className={myClass}
        onClick={() => goToMenu && setActiveMenu(goToMenu)}
      >
        {leftIcon && <IconButton>{leftIcon}</IconButton>}
        {children}
        {rightIcon && (
          <IconButton className="icon-right">{rightIcon}</IconButton>
        )}
      </div>
    );
  };

  console.log(user);

  return (
    <div className="dropdownMenu" style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem myClass="avatarItem">
            <Avatar src={user.photoURL} className="dropdownMenu__avatar" />
            <div className="names">
              <h3>{user.displayName}</h3>
              <p>Check your profile</p>
            </div>
          </DropdownItem>
          <DropdownItem
            leftIcon={<FeedbackIcon />}
            myClass="dropdownItem feedbackItem"
          >
            <p>Give us some feedback!</p>
          </DropdownItem>
          <DropdownItem
            leftIcon={<SettingsIcon />}
            rightIcon={<ChevronRightIcon />}
            goToMenu="settings"
            myClass="dropdownItem"
          >
            <p>Settings</p>
          </DropdownItem>
          <DropdownItem
            leftIcon={<HelpIcon />}
            myClass="dropdownItem"
            rightIcon={<ChevronRightIcon />}
            goToMenu="help"
          >
            <p>Need some help?</p>
          </DropdownItem>
          <DropdownItem leftIcon={<Brightness3Icon />} myClass="dropdownItem">
            <p>DarkMode</p>
            {/* Dark mode switch Here */}
            <div className="theme-switch-wrapper">
              <label className="theme-switch" htmlFor="checkbox">
                <input
                  type="checkbox"
                  id="checkbox"
                  onClick={colorModeChanger}
                />
                <div className="slider round"></div>
              </label>
            </div>
          </DropdownItem>
          <DropdownItem leftIcon={<MeetingRoomIcon />} myClass="dropdownItem">
            <p onClick={logoutHandler}>Logout</p>
            {/* Logout function here */}
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem
            myClass="dropdownItem goBack"
            goToMenu="main"
            leftIcon={<ArrowBackIcon />}
          >
            <h2>Settings</h2>
          </DropdownItem>
          <DropdownItem myClass="dropdownItem" leftIcon={<LanguageIcon />}>
            <p>Language</p>
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "help"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem
            myClass="dropdownItem goBack"
            goToMenu="main"
            leftIcon={<ArrowBackIcon />}
          >
            <h2>Help Menu</h2>
          </DropdownItem>
          <DropdownItem myClass="dropdownItem" leftIcon={<ChatBubbleIcon />}>
            <p>Social help</p>
          </DropdownItem>
          <DropdownItem myClass="dropdownItem" leftIcon={<ReportProblemIcon />}>
            <p>Submit your problem</p>
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropdownMenu;
