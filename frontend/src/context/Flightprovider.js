import React, { createContext, useContext, useState, useEffect } from "react";
const Flightcontext = createContext();

const Flightprovider = ({ children }) => {
  const initialState = () => {
    const storedPassenger = localStorage.getItem("passenger");
    if (storedPassenger) {
      return JSON.parse(storedPassenger);
    }
    return {
      adult: 0,
      child: 0,
      infant: 0,
    };
  };

  const [flightOffer, setFlightOffer] = useState([]);
  const [querrydata, setQuerrydata] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [price, setPrice] = useState([1, 15000]);
  const [data, setData] = useState("");
  const [data1, setData1] = useState("");
  const [pagedata, setPagedata] = useState("");
  const [origin, setOrigin] = useState("");
  const [fullOrigin, setFullOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [fullDestination, setFullDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passenger, setPassenger] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedestination = localStorage.getItem("destination");
    const storeorigin = localStorage.getItem("origin");
    const storedepartureDate = localStorage.getItem("departureDate");
    const storereturnDate = localStorage.getItem("returnDate");
    const storedFullOrigin = localStorage.getItem("fullOrigin");
    const storedFullDestination = localStorage.getItem("fullDestination");

    if (storedFullOrigin) {
      setFullOrigin(storedFullOrigin);
    }

    if (storedFullDestination) {
      setFullDestination(storedFullDestination);
    }

    if (storedestination) {
      setDestination(storedestination);
    }

    if (storeorigin) {
      setOrigin(storeorigin);
    }

    if (storedepartureDate) {
      setDepartureDate(storedepartureDate);
    }

    if (storereturnDate) {
      setReturnDate(storereturnDate);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("destination", destination);
    localStorage.setItem("origin", origin);
    localStorage.setItem("departureDate", departureDate);
    localStorage.setItem("passenger", JSON.stringify(passenger));
    localStorage.setItem("returnDate", returnDate);
    localStorage.setItem("fullOrigin", fullOrigin);
    localStorage.setItem("fullDestination", fullDestination);
  }, [
    destination,
    origin,
    departureDate,
    passenger,
    returnDate,
    fullOrigin,
    fullDestination,
  ]);

  return (
    <Flightcontext.Provider
      value={{
        fullOrigin,
        setFullOrigin,
        fullDestination,
        setFullDestination,
        flightOffer,
        setFlightOffer,
        bookingData,
        setBookingData,
        price,
        setPrice,
        querrydata,
        setQuerrydata,
        data,
        setData,
        data1,
        setData1,
        pagedata,
        setPagedata,
        origin,
        setOrigin,
        destination,
        setDestination,
        departureDate,
        setDepartureDate,
        returnDate,
        setReturnDate,
        passenger,
        setPassenger,
        loading,
        setLoading,
      }}
    >
      {children}
    </Flightcontext.Provider>
  );
};

export const Flightstate = () => {
  return useContext(Flightcontext);
};

export default Flightprovider;
