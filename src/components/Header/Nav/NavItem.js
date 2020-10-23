import React, { useState } from "react";
import "./NavItem.css";

import { IconButton } from "@material-ui/core";

const NavItem = ({ icon, shoudlBeClosedOnClick, children }) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="navItem">
      <li className="navItem__item">
        <div className="navItem__item--button">
          <IconButton onClick={() => setOpenMenu(!openMenu)}>{icon}</IconButton>

          {openMenu && children}
        </div>
      </li>
    </div>
  );
};

export default NavItem;
