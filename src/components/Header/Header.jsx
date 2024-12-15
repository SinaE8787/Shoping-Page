import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/UseDebounce";
import TopHeader from "./TopHeader";
import Logo from "../../assets/images/Logo.png";
import Hstyles from "./Header.module.css";
import axios from "axios";
import SearchResulte from "./SearchResulte";
const Header = () => {
  const [Search, setSearch] = useState();
  const [isSmallNow, setIsSmallNow] = useState(false);
  const [dropdownLink, setDropdownLink] = useState(false);
  const [searchFoucs, setSearchFoucs] = useState(false);
  const navigator = useNavigate();
  const debounceSearcher = useDebounce(Search);
  const [test, setTest] = useState();
  const goProducts = () => {
    if (debounceSearcher !== ("" || undefined)) {
      navigator(`/products/search/${debounceSearcher}`);
      setSearch("");
    } else return alert("pls search someting !");
  };
  const searchProducts = async () => {
    try {
      const controller = new AbortController();
      const signal = controller.signal;
      const response = await axios.get(
        `https://kaaryar-ecom.liara.run/v1/products?search=${debounceSearcher}&page=1&limit=100
      `,
        { signal }
      );
      setTest(response.data.products);
      console.log(response.data.products);
    } finally {
    }
  };
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
  useEffect(() => {
    if (debounceSearcher?.length >= 2) {
      searchProducts();
    }
  }, [debounceSearcher]);

  return (
    <div className={Hstyles.Header}>
      <TopHeader />
      <div className={Hstyles.nav}>
        <div className={Hstyles.navSearchbox}>
          <Link className={Hstyles.Logo}>
            <img src={Logo} alt="Logo" />
          </Link>
          <form className={Hstyles.searchBox}>
            <input
              type="text"
              value={Search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={() => setSearchFoucs(true)}
              placeholder="Search here"
            />
            <button
              type="button"
              className={Hstyles.searchBtn}
              onClick={goProducts}
            >
              Search
            </button>
            {debounceSearcher && searchFoucs ? (
              <SearchResulte test={test} />
            ) : (
              ""
            )}
          </form>
          <div className={Hstyles.wishAndBasket}>
            <div>
              <i className="fa-regular fa-heart"></i>
              <span>Your Wishlist</span>
            </div>
            <div>
              <i className="fa-solid fa-cart-shopping"></i>
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

          <NavLink className={Hstyles.Links} to="/products">
            Categories
          </NavLink>
          <NavLink
            className={Hstyles.Links}
            to="/products/category/6748dfa3c9017c78628d4a8d"
          >
            Home & Garden
          </NavLink>
          <NavLink
            className={Hstyles.Links}
            to="/products/category/6748dfa3c9017c78628d4a93"
          >
            Sports
          </NavLink>
          <NavLink
            className={Hstyles.Links}
            to="/products/category/6748dfa3c9017c78628d4a90"
          >
            Books
          </NavLink>
          <NavLink
            className={Hstyles.Links}
            to="/products/category/6748dfa3c9017c78628d4a87"
          >
            Electronics
          </NavLink>
          <NavLink
            className={Hstyles.Links}
            to="/products/category/6748dfa3c9017c78628d4a8a"
          >
            Clothing
          </NavLink>
        </div>
      </div>
      {searchFoucs ? (
        <div
          className={Hstyles.darkGlass}
          onClick={() => setSearchFoucs((prev) => (prev = !prev))}
        ></div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
