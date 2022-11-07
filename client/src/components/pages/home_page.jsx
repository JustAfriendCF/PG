import React, { useContext } from 'react';
import SimpleImageSlider from "react-simple-image-slider";
// import add1 from '../../images/home_page_adds/add1.jpg';
// import add2 from '../../images/home_page_adds/add2.png';
import add3 from '../../images/home_page_adds/add3.png';
import add4 from '../../images/home_page_adds/add4.png';
import add5 from '../../images/home_page_adds/add5.png';

import { UserContext } from '../../UserContext';

const images = [
  // <img src={logo} className="App-logo" alt="logo" />
  // { url: add2 },
  // { url: add1 },

  { url: add5 },
  { url: add3 },
  { url: add4 },
  // { url: "images/3.jpg" },
  // { url: "images/4.jpg" },
  // { url: "images/5.jpg" },
  // { url: "images/6.jpg" },
  // { url: "images/7.jpg" },
];

const home_page = () => {
  return (
    <>
      <div>
        <SimpleImageSlider
          width={'100%'}
          height={710}
          images={images}
          showBullets={true}
          showNavs={true}
        />
      </div>
      <div>

      </div>
    </>


  );
};

export default home_page;
//const rootElement = document.getElementById("root");
//render(
 //  <BrowserRouter>
   //     <App />
 //   </BrowserRouter>,
  //  rootElement
//);