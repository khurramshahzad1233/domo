import React from "react";
import { Flightstate } from "../../context/Flightprovider";

import { Slider } from "@mui/material";

const PriceSlider = () => {
  // const priceSliderRef = useRef(null);
  
  const {setPrice,price}=Flightstate()

  const priceHandler=(event,newValue)=>{
    setPrice(newValue)
  }
  

 

  

  return (
    <div>
      <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                   
                    min={0}
                    max={15000}
                    />
                    
    </div>
  )
};

export default PriceSlider;
