import React from "react";
import { Menu as Nav, Icon, Button } from "element-react";
import { NavLink } from "react-router-dom";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

const Navbar = ({ user, handleSignOut }) => {
  return (
    <Nav mode="horizontal" theme="dark" defaultActive="1">
      <div className="nav-container">
        <Nav.Item index="1">
          <NavLink to="/" className="nav-link">
            <span className="app-title">
              <AccountBalanceIcon />
              Agora
            </span>
          </NavLink>
        </Nav.Item>

        {/* Navbar Items */}
        <div className="nav-items">
          <Nav.Item index="2">
            <span className="app-user"> Hello, {user.user.username}</span>
          </Nav.Item>
        </div>

        <Nav.Item index="3">
          <NavLink to="/profile" className="nav-link">
            <Icon name="setting" />
          </NavLink>
        </Nav.Item>

        <Nav.Item index="4">
          <button type="warning" onClick={handleSignOut}>
            Sign Out
          </button>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default Navbar;
