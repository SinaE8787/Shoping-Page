import React, { useState, useEffect } from "react";
import Hstyles from "./Header.module.css";
import TopHeader from "./TopHeader";
import Logo from "../../../assets/images/Logo.png";
import { Link, NavLink } from "react-router-dom";
const Header = () => {
  const [isSmallNow, setIsSmallNow] = useState(false);
  const [dropdownLink, setDropdownLink] = useState(false);
  console.log(isSmallNow);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 580) {
        setIsSmallNow(true);
      } else {
        setIsSmallNow(false);
        setDropdownLink(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={Hstyles.Header}>
      <TopHeader />
      <div className={Hstyles.nav}>
        <div className={Hstyles.navSearchbox}>
          <Link className={Hstyles.Logo}>
            <img src={Logo} alt="Logo" />
          </Link>
          <div className={Hstyles.searchBox}>
            <input type="text" placeholder="Search here" />
            <button>Search</button>
          </div>
          <div className={Hstyles.wishAndBasket}>
            <div>
              <i class="fa-regular fa-heart"></i>
              <span>Your Wishlist</span>
            </div>
            <div>
              <i class="fa-solid fa-cart-shopping"></i>
              <span>Your Cart</span>
            </div>
          </div>
        </div>
      </div>
      <div className={Hstyles.navLinks}>
        {isSmallNow ? (
          <div onClick={() => setDropdownLink((prev) => (prev = !prev))}>
            onClick
          </div>
        ) : (
          ""
        )}
        <div
          className={Hstyles.PageLinks}
          style={dropdownLink ? { display: "flex" } : {}}
        >
          <NavLink className={Hstyles.Links} to="/">
            Home
          </NavLink>
          <NavLink className={Hstyles.Links} to="/vfvd">
            Hot Deals
          </NavLink>
          <NavLink className={Hstyles.Links} to="/cdcsv">
            Categories
          </NavLink>
          <NavLink className={Hstyles.Links} to="/csvsf">
            Laptops
          </NavLink>
          <NavLink className={Hstyles.Links} to="/sfvfv">
            SmartPhone
          </NavLink>
          <NavLink className={Hstyles.Links} to="/w">
            Cameras
          </NavLink>
          <NavLink className={Hstyles.Links} to="/csvfv">
            Accessories
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
