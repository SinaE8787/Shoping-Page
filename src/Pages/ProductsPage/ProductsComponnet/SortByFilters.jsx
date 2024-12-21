import Pstyles from "../Products.module.css";

const SortByFilters = ({
  Defualt,
  value2,
  value3,
  stateName,
  stateChanger,
  functionHandel,
}) => {
  return (
    <select
      id="stateName"
      className={Pstyles.Selectors}
      value={stateName}
      onChange={(e) => {
        stateChanger(e.target.value);
        functionHandel();
      }}
    >
      <option value={Defualt}>{Defualt}</option>
      <option value={value2}>{value2}</option>
      <option value={value3}>{value3}</option>
    </select>
  );
};

export default SortByFilters;
