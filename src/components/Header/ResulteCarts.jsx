import styles from "./Header.module.css";
import defaultimg from "../../assets/images/default.png";
const ResulteCarts = ({ name }) => {
  return (
    <div className={styles.resulteCart}>
      <img src={defaultimg} />
      <div>{name}</div>
    </div>
  );
};

export default ResulteCarts;
