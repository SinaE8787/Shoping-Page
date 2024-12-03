import Fstyles from "./Footer.module.css";
import lists from "./footerData";
const Footer = () => (
  <div className={Fstyles.allFather}>
    <div className={Fstyles.footerLinks}>
      {lists?.map((list, index) => (
        <div className={Fstyles.links} key={index}>
          {list?.map((data) => (
            <a href="#" key={data?.id}>
              {data?.icon} {data?.text}
            </a>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Footer;
