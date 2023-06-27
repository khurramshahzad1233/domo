import catchasyncerror from "../middleware/catchasyncerror.js";
import dotenv from "dotenv"
if(process.env.NODE_ENV!=="PRODUCTION"){
    dotenv.config({path:"backend/config.env"})
};
import axios from "axios"

export const searchflightcontroller=catchasyncerror(async(req,res,next)=>{
    const searchParams=req.body;
    // console.log(searchParams)
    const searchdata = await axios.post("https://api.duffel.com/air/offer_requests", searchParams, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // 'Accept-Encoding':'gzip',
          "Duffel-Version": "v1",
          Authorization: process.env.DUFFEL_API_KEY,
        },
      });
      let searchFlight=searchdata.data.data;
      // console.log(searchFlight)
      res.status(201).json({
        success:true,
        searchFlight
      })

});


export const bookflightcontroller=catchasyncerror(async(req,res,next)=>{
  const searchParams=req.body;
  // console.log(searchParams)
  const response = await axios.post(`https://api.duffel.com/air/orders`, searchParams, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // 'Accept-Encoding':'gzip',
      "Duffel-Version": "v1",
      Authorization:  process.env.DUFFEL_API_KEY,
    },
  });
  let createOrder = response.data;
    // console.log(searchFlight)
    res.status(201).json({
      success:true,
      createOrder
    })

});


