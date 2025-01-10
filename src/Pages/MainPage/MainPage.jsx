import Slider from '../../components/Slider/Slider';
import Mstyles from './Main.module.css';
import TopRateList from './maincomponent/TopRateList';
const MainPage = () => {
  return (
    <div className={Mstyles.Main}>
      <div className={Mstyles.SliderContainer}>
        <Slider />
        <TopRateList />
      </div>
    </div>
  );
};

export default MainPage;
