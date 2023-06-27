import React, { useEffect, useState,useCallback} from "react";
import PriceSlider from "./PriceSlider";
import { Flightstate } from "../../context/Flightprovider";
import axios from "axios";

const NumberStopsOptions = [
  {
    label: "1 stop",
    value: "20",
    id: "1",
  },
  {
    label: "2 stop",
    value: "16",
    id: "2",
  },
  {
    label: "Non-stop",
    value: "22",
    id: "0",
  },
];

const flightClass = [
  {
    label: "Economy",
    value: "20",
    id: "economy",
  },
  {
    label: "Business",
    value: "20",
    id: "business",
  },
  {
    label: "First",
    value: "26",
    id: "frist",
  },
];

const AirlinesCheckboxOptions = [
  {
    label: "Duffel Airways",
    value: "17",
    id: "flexCheckDefaults1",
  },
  {
    label: "Fly Amirates",
    value: "14",
    id: "flexCheckDefaults2",
  },
  {
    label: "Novo Air",
    value: "62",
    id: "flexCheckDefaults3",
  },
  {
    label: "Air Asia",
    value: "08",
    id: "flexCheckDefaults4",
  },
  {
    label: "Singapore Airlines",
    value: "12",
    id: "flexCheckDefaults5",
  },
];

const RefundableCheckboxOptions = [
  {
    label: "Yes",
    value: "95",
    id: "true",
  },
  {
    label: "No",
    value: "14",
    id: "false",
  },
  
];

const FilterPrice = () => {
  const [checked, setChecked] = useState("");
  const [stopcheck, setStopcheck] = useState("");
  const [airlinecheck, setAirlinecheck] = useState("");
  const [refund,setRefund]=useState("")
  const { price, flightOffer, querrydata, setQuerrydata,origin,destination,departureDate,passenger } = Flightstate();
 
  

  
  console.log(querrydata)

  // main query handler function
  const sliderHandlerSearch = async () => {
    let slideroffer =
      (await flightOffer.offers) &&
      flightOffer.offers.filter(
        (off) => off.total_amount >= price[0] && off.total_amount <= price[1]
      );

    

    setQuerrydata(slideroffer);
  };

  const querryclassfunction = useCallback(async () => {
    console.log("running", passenger.adult);
    const passengerData = [];
    if (passenger.adult > 0) {
      for (let i = 0; i < passenger.adult; i++) {
        passengerData.push({ type: "adult" });
      }
    }
    if (passenger.child > 0) {
      for (let i = 0; i < passenger.adult; i++) {
        passengerData.push({ type: "child" });
      }
    }
    if (passenger.infant > 0) {
      for (let i = 0; i < passenger.adult; i++) {
        passengerData.push({ type: "infant_without_seat" });
      }
    }
    

    const searchParams = {
      data: {
        slices: [
          {
            destination,
            origin,
            departure_date: departureDate,
          },
        ],
        passengers: passengerData,

        cabin_class: checked,
        live_mode: false,
      },
    };
    try {
      const response=await axios.post('/api/search/flight',searchParams)
      
      const data=response.data.searchFlight;
     
      
      setQuerrydata(data);
    } catch (error) {
      console.error(error);
    }
  }, [
    passenger.adult,
    passenger.infant,
    passenger.child,
    setQuerrydata,
    checked,
    destination,
    origin,
    departureDate,
  ]);


  const querrystopfunction = useCallback(async () => {

    
    console.log("running", passenger.adult);
    const passengerData = [];
    if (passenger.adult > 0) {
      for (let i = 0; i < passenger.adult; i++) {
        passengerData.push({ type: "adult" });
      }
    }
    if (passenger.child > 0) {
      for (let i = 0; i < passenger.adult; i++) {
        passengerData.push({ type: "child" });
      }
    }
    if (passenger.infant > 0) {
      for (let i = 0; i < passenger.adult; i++) {
        passengerData.push({ type: "infant_without_seat" });
      }
    }
    

    const searchParams = {
      data: {
        slices: [
          {
            destination,
            origin,
            departure_date: departureDate,
          },
        ],
        passengers: passengerData,

        max_connections: stopcheck,
        live_mode: false,
      },
    };
    try {
      const response=await axios.post('/api/search/flight',searchParams)
      
      const data=response.data.searchFlight;
      // console.log(data)
      setQuerrydata(data);
    } catch (error) {
      console.error(error);
    }
  }, [
    passenger.adult,
    passenger.infant,
    passenger.child,
    setQuerrydata,
    // checked,
    stopcheck,
    destination,
    origin,
    departureDate,
  ]);

  const querryclassstopfunction = useCallback(async () => {

    
    
    const passengerData = [];
    if (passenger.adult > 0) {
      for (let i = 0; i < passenger.adult; i++) {
        passengerData.push({ type: "adult" });
      }
    }
    if (passenger.child > 0) {
      for (let i = 0; i < passenger.adult; i++) {
        passengerData.push({ type: "child" });
      }
    }
    if (passenger.infant > 0) {
      for (let i = 0; i < passenger.adult; i++) {
        passengerData.push({ type: "infant_without_seat" });
      }
    }
    

    const searchParams = {
      data: {
        slices: [
          {
            destination,
            origin,
            departure_date: departureDate,
          },
        ],
        passengers: passengerData,
        cabin_class: checked,
        max_connections: stopcheck,
        live_mode: false,
      },
    };
    try {
      const response=await axios.post('/api/search/flight',searchParams)
     
      const data=response.data.searchFlight;
      console.log(data)
      setQuerrydata(data);
    } catch (error) {
      console.error(error);
    }
  }, [
    passenger.adult,
    passenger.infant,
    passenger.child,
    setQuerrydata,
    checked,
    stopcheck,
    destination,
    origin,
    departureDate,
  ]);

  const querryairlinefilter1=useCallback(()=>{
    
    let airlinename=flightOffer && flightOffer.offers.filter((airline)=>(
      airlinecheck.includes(airline.owner.name)
      ));     

    setQuerrydata(airlinename);
  },[airlinecheck,flightOffer,setQuerrydata]);

  const querryairlinefilter2=useCallback(()=>{
   let airlinenamequerry=querrydata && querrydata.filter((airline)=>(
    airlinecheck.includes(airline.owner.name)
    ));     

  setQuerrydata(airlinenamequerry);
  
    
  },[airlinecheck,querrydata,setQuerrydata]);

  const setrefundfunction=useCallback(()=>{
    
    if(refund==="true"){
      let refundoffer=flightOffer && flightOffer.offers.filter((fund)=>
      fund.conditions.refund_before_departure?.allowed===true
      
    );
    setQuerrydata(refundoffer)
    };
    if(refund==="false"){
      let refundoffer1=flightOffer && flightOffer.offers.filter((fund)=>
      fund.conditions.refund_before_departure?.allowed===false
      
    );
    setQuerrydata(refundoffer1)
    }
   
    
  },[flightOffer,refund,setQuerrydata]);
  // console.log(refund)

  const setrefundfunction1=useCallback(()=>{
    
    if(refund==="true"){
      let querryrefund=querrydata && querrydata.filter((fund)=>
      fund.conditions.refund_before_departure?.allowed===true
      
    );
    setQuerrydata(querryrefund)
    };
    if(refund==="false"){
      let querryrefund1=querrydata && querrydata.filter((fund)=>
      fund.conditions.refund_before_departure?.allowed===false
      
    );
    setQuerrydata(querryrefund1)
    }
   
    
  },[querrydata,refund,setQuerrydata]);

  useEffect(()=>{
    if(checked){
      if(stopcheck)return;
      querryclassfunction()
    }
    if(stopcheck){
      if(checked)return;
      
      querrystopfunction()
    };
    
  },[checked,querryclassfunction,stopcheck,querrystopfunction]);

  useEffect(()=>{

    if(stopcheck){
      if(checked){
        querryclassstopfunction()
      }return;
    };
    if(checked){
      if(stopcheck){
        querryclassstopfunction()
      }return
    }
  },[checked,querryclassstopfunction,stopcheck])

  // console.log(flightOffer.offers)
  // console.log(querrydata.length)


  useEffect(()=>{
    if(airlinecheck && querrydata.length===0){
      
        querryairlinefilter1();
        setAirlinecheck("")
      

    }return
  },[airlinecheck,querryairlinefilter1,querrydata.length])

  useEffect(()=>{
    if(airlinecheck && querrydata.length>0){
      
        querryairlinefilter2();
        setAirlinecheck("")
      }return;
    
  },[airlinecheck,querryairlinefilter2,querrydata.length]);
  console.log(refund)

  useEffect(()=>{
    if(refund && querrydata.length===0){
      setrefundfunction();
      setRefund("")
    }
  },[refund,setrefundfunction,querrydata.length])

  useEffect(()=>{
    if(refund && querrydata.length>0){
      setrefundfunction1();
      setRefund("")
    }
  },[refund,setrefundfunction1,querrydata.length])
 
 
  return (
    <div className="left_side_search_area">
      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Filter by price</h5>
        </div>
        <div className="filter-price">
          <PriceSlider />
        </div>
        <button
          className="apply"
          type="button"
          style={{ backgroundColor: "blue", color: "white" }}
          onClick={sliderHandlerSearch}
        >
          Apply
        </button>
      </div>
      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Number of stops</h5>
        </div>
        <div className="tour_search_type">
          {NumberStopsOptions.map((option) => (
            <div className="form-check" key={option.label}>
              <input
                className="form-check-input"
                type="checkbox"
                value={option.id}
                checked={stopcheck===option.id}
                onChange={(e)=>setStopcheck(e.target.value)}
                id={option.id}
              />
              <label className="form-check-label" htmlFor={option.id}>
                <span className="area_flex_one">
                  <span>{option.label}</span>
                  <span>{option.value}</span>
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Flight class</h5>
        </div>
        <div className="tour_search_type">
          {flightClass.map((item) => (
            <div className="form-check" key={item.id}>
              <input
                className="form-check-input"
                type="checkbox"
                value={item.label}
                checked={checked===item.label}
                onChange={(e)=>setChecked(e.target.value)}
                id={item.id}
              />
              <label className="form-check-label" htmlFor={item.id}>
                <span className="area_flex_one">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Airlines</h5>
        </div>
        <div className="tour_search_type">
          {AirlinesCheckboxOptions.map((option) => (
            <div className="form-check" key={option.id}>
              <input
                className="form-check-input"
                type="checkbox"
                value={option.label}
                checked={checked===option.label}
                onChange={(e)=>setAirlinecheck(e.target.value)}
                id={option.id}
              />
              <label className="form-check-label" htmlFor={option.id}>
                <span className="area_flex_one">
                  <span>{option.label}</span>
                  <span>{option.value}</span>
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Refundable</h5>
        </div>
        <div className="tour_search_type">
          {RefundableCheckboxOptions.map((option) => (
            <div className="form-check" key={option.id}>
              <input
                className="form-check-input"
                type="checkbox"
                value={option.id}
                checked={checked===option.id}
                onChange={(e)=>setRefund(e.target.value)}
                id={option.id}
              />
              <label className="form-check-label" htmlFor={option.id}>
                <span className="area_flex_one">
                  <span>{option.label}</span>
                  <span>{option.value}</span>
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default FilterPrice;


