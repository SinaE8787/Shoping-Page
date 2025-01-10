import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/UseDebounce';
import { fetchProducts } from '../../api/productsFetch';
import ProductProvider from '../../context/ProductProvider';
import TopHeader from './TopHeader';
import SearchResulte from './SearchResulte';
import Hstyles from './Header.module.css';
import Logo from '../../assets/images/Logo.png';
const Header = () => {
  const { productSelected } = useContext(ProductProvider);
  const [search, setSearch] = useState('');
  const [isSmallNow, setIsSmallNow] = useState(false);
  const [dropdownLink, setDropdownLink] = useState(false);
  const [searchFoucs, setSearchFoucs] = useState(false);
  const [productSearch, setProductSearch] = useState([]);
  const navigator = useNavigate();
  const debounceSearcher = useDebounce(search);
  const goProducts = () => {
    if (debounceSearcher) {
      navigator(`/products/search/${debounceSearcher}`);
      setSearch('');
      setSearchFoucs(false);
    } else return alert('pls search someting !');
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
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    fetchProducts({ search: debounceSearcher, signal: controller.signal }).then((data) => {
      setProductSearch(data);
    });
    return () => {
      controller.abort();
    };
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={() => setSearchFoucs(true)}
              placeholder="Search here"
            />
            <button type="button" className={Hstyles.searchBtn} onClick={goProducts}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            {debounceSearcher && searchFoucs ? <SearchResulte test={productSearch} /> : ''}
          </form>
          <div className={Hstyles.wishAndBasket}>
            <div className={Hstyles.basWish}>
              <i className="fa-regular fa-heart"></i>
              <span>Your Wishlist</span>
            </div>
            <Link to="/basket" className={`${Hstyles.basket} ${Hstyles.basWish}`}>
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Your Cart</span>
              {productSelected ? <div className={Hstyles.basketCount}>{productSelected}</div> : ''}
            </Link>
          </div>
        </div>
      </div>
      <div className={Hstyles.navLinks}>
        {isSmallNow ? (
          <div className={Hstyles.openLinksMenu} onClick={() => setDropdownLink((prev) => (prev = !prev))}>
            onClick
          </div>
        ) : (
          ''
        )}
        <div className={Hstyles.PageLinks} style={dropdownLink ? { display: 'flex' } : {}}>
          <NavLink className={Hstyles.Links} to="/">
            Home
          </NavLink>

          <NavLink className={Hstyles.Links} to="/products">
            Categories
          </NavLink>
          <NavLink className={Hstyles.Links} to="/products/category/6748dfa3c9017c78628d4a8d">
            Home & Garden
          </NavLink>
          <NavLink className={Hstyles.Links} to="/products/category/6748dfa3c9017c78628d4a93">
            Sports
          </NavLink>
          <NavLink className={Hstyles.Links} to="/products/category/6748dfa3c9017c78628d4a90">
            Books
          </NavLink>
          <NavLink className={Hstyles.Links} to="/products/category/6748dfa3c9017c78628d4a87">
            Electronics
          </NavLink>
          <NavLink className={Hstyles.Links} to="/products/category/6748dfa3c9017c78628d4a8a">
            Clothing
          </NavLink>
        </div>
      </div>
      {searchFoucs ? (
        <div className={Hstyles.darkGlass} onClick={() => setSearchFoucs((prev) => (prev = !prev))}></div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Header;
