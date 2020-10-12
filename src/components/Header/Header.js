import React from "react";

import SearchIcon from "@material-ui/icons/Search";
import FlagIcon from "@material-ui/icons/Flag";
import HomeIcon from "@material-ui/icons/Home";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import StorefrontOutlinedIcon from "@material-ui/icons/StorefrontOutlined";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import AddIcon from "@material-ui/icons/Add";
import ForumIcon from "@material-ui/icons/Forum";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SettingsIcon from "@material-ui/icons/Settings";

import "./Header.css";
import { Avatar } from "@material-ui/core";
import { useStateValue } from "../store/StateProvider";
import NavItem from "./Nav/NavItem";
import DropdownMenu from "./Nav/DropdownMenu/DropdownMenu";
import DropMessenger from "../Messenger/DropMessenger";
import { useState } from "react";

const Header = () => {
  const [{ user }, dispatch] = useStateValue();

  const [menu, setMenu] = useState(false);

  const menuHandler = () => {
    setMenu(!menu);
  };

  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png"
          alt="facebook"
        />
        <div className="header__input">
          <SearchIcon />
          <input type="text" placeholder="Search Facebook" />
        </div>
      </div>
      <div
        className={`menu__toggler ${menu ? "open" : null}`}
        onClick={menuHandler}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="header__center">
        <div className="header__option header__option--active">
          <HomeIcon fontSize="large" />
        </div>
        <div className="header__option">
          <FlagIcon fontSize="large" />
        </div>
        <div className="header__option">
          <SubscriptionsOutlinedIcon fontSize="large" />
        </div>
        <div className="header__option">
          <StorefrontOutlinedIcon fontSize="large" />
        </div>
        <div className="header__option">
          <SupervisedUserCircleIcon fontSize="large" />
        </div>
      </div>
      <div className="header__right">
        <div className="header__info">
          <Avatar src={user.photoURL} />
          <h4>{user.displayName}</h4>
        </div>
        <NavItem icon={<AddIcon />} />
        <NavItem icon={<ForumIcon />}>
          <DropMessenger />
        </NavItem>
        <NavItem icon={<NotificationsActiveIcon />} />
        <NavItem icon={<ExpandMoreIcon />}>
          <DropdownMenu />
        </NavItem>
      </div>
      <div className={`header__rightSmall ${menu ? "active" : null}`}>
        <div className="header__info">
          <Avatar src={user.photoURL} />
          <h4>{user.displayName}</h4>
        </div>
        <NavItem icon={<AddIcon />} />
        <NavItem icon={<ForumIcon />} />
        <NavItem icon={<NotificationsActiveIcon />} />
        <NavItem icon={<SettingsIcon />}>Settings</NavItem>
      </div>
    </div>
  );
};

export default Header;
