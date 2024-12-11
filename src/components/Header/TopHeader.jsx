import Hstyles from "./Header.module.css";
const TopHeader = () => {
  return (
    <div className={Hstyles.topHead}>
      <div className={Hstyles.AboutUs}>
        <div className={Hstyles.calls}>
          <span>
            <i className="samecolor fa-solid fa-phone"></i> +021-95-51-84
          </span>
          <span>
            <i className="samecolor fa-regular fa-envelope"></i> email@gmail.com
          </span>
          <span>
            <i className="samecolor fa-solid fa-location-dot"></i> 1734
            Stonecool
          </span>
        </div>
        <div className={Hstyles.account}>
          <span>
            <i className="samecolor fa-solid fa-dollar-sign"></i> USD
          </span>
          <span>
            <i className="samecolor fa-solid fa-lock"></i> My Account
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
