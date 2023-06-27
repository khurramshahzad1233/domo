import React, { useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Flightstate } from "../../context/Flightprovider";
import CustomAsyncSelect from "../inputs/CustomAsyncSelect";
// import { Modal, Spinner } from "react-bootstrap";

// const categories = ["economy", "business", "first", "premium_economy"];
const FormSection = () => {
  // const [show, setShow] = useState(true);
  const {
    setFlightOffer,
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
    // fullOrigin,
    setFullOrigin,
    // fullDestination,
    setFullDestination,
  } = Flightstate();

  const searchFlightHandler = useCallback(async () => {
    // console.log("running", passenger.adult);
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
        live_mode: false,
      },
    };
    try {
      const response=await axios.post('/api/search/flight',searchParams)

      const data=response.data.searchFlight;
      // console.log(data)

      setFlightOffer(data);
    } catch (error) {
      console.error(error);
    }
  }, [
    passenger.adult,
    passenger.infant,
    passenger.child,
    setFlightOffer,
    destination,
    origin,
    departureDate,
  ]);

  // Return Flight Function

  const returnFlightSearchHandler = useCallback(async () => {
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
          {
            destination: origin,
            origin: destination,
            departure_date: returnDate,
          },
        ],
        passengers: passengerData,
        // cabin_class: category,
        live_mode: false,
      },
    };
    try {
      const response = await axios.post("/air/offer_requests", searchParams, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // 'Accept-Encoding':'gzip',
          "Duffel-Version": "v1",
          Authorization: `Bearer duffel_test_43bGm7ip2Xv4ecGiNOvh8XYvtabiFCobJf5y0Ipiggf`,
        },
      });

      const data = response.data.data;
      setFlightOffer(data);
    } catch (error) {
      console.error(error);
    }
  }, [
    // category,
    departureDate,
    destination,
    origin,
    passenger.adult,
    passenger.child,
    passenger.infant,
    returnDate,
    setFlightOffer,
  ]);

  const getLocations = async (query) => {
    console.log("query", query);
    const response = await axios.get(`/places/suggestions?query=${query}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // 'Accept-Encoding':'gzip',
        "Duffel-Version": "v1",
        Authorization: `Bearer duffel_test_43bGm7ip2Xv4ecGiNOvh8XYvtabiFCobJf5y0Ipiggf`,
      },
    });

    console.log(response);

    return response.data.data;
    // .then((res) => {
    //   // console.log(res)
    //   return res.data;
    // })
    // .catch((err) => console.log(err));
  };

  const filterData = (inputValue, formattedData) => {
    return formattedData;
  };

  const loadOptions = async (inputValue, callback) => {
    let data = await getLocations(inputValue);
    console.log("data", data);
    let formattedData = data.map((v) => ({
      value: v?.iata_city_code,
      label: v?.name,
    }));
    callback(filterData(inputValue, formattedData));
  };

  const memosearchflighthandler = useMemo(
    () => searchFlightHandler,
    [searchFlightHandler]
  );
  const memoreturnflighthandler = useMemo(
    () => returnFlightSearchHandler,
    [returnFlightSearchHandler]
  );

  useEffect(() => {
    memosearchflighthandler();
    memoreturnflighthandler();
  }, [memosearchflighthandler, memoreturnflighthandler]);

  // console.log("passengerMain", passenger);

  return (
    <>
      {/* <Modal centered show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <div className="text-center p-3">
            <div className="mb-3 icon-2 mx-auto">
              <img
                className="d-block h-100 w-100"
                src="/assets/img/icon/help.png"
                alt="..."
              />
            </div>
            <h5 className="mb-2 fw-semibold">
              Starting to Process Your Request
            </h5>
            <p className="mb-2 small text-black-50">
              <small>Please wait while the little evles take you three</small>
            </p>
            <Spinner animation="grow" variant="primary" />
          </div>
        </Modal.Body>
      </Modal> */}

      <section id="theme_search_form">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="theme_search_form_area">
                <div className="theme_search_form_tabbtn">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="flights-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#flights"
                        type="button"
                        role="tab"
                        aria-controls="flights"
                        aria-selected="true"
                      >
                        <i className="fas fa-plane-departure" />
                        Flights
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="tours-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#tours"
                        type="button"
                        role="tab"
                        aria-controls="tours"
                        aria-selected="false"
                      >
                        <i className="fas fa-globe" />
                        Tours
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="hotels-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#hotels"
                        type="button"
                        role="tab"
                        aria-controls="hotels"
                        aria-selected="false"
                      >
                        <i className="fas fa-hotel" />
                        Hotels
                      </button>
                    </li>
                  </ul>
                </div>
                <fieldset className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="flights"
                    role="tabpanel"
                    aria-labelledby="flights-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="flight_categories_search">
                          <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link active"
                                id="oneway-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#oneway_flight"
                                type="button"
                                role="tab"
                                aria-controls="oneway_flight"
                                aria-selected="true"
                              >
                                One Way
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="roundtrip-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#roundtrip"
                                type="button"
                                role="tab"
                                aria-controls="roundtrip"
                                aria-selected="false"
                              >
                                Roundtrip
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="multi_city-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#multi_city"
                                type="button"
                                role="tab"
                                aria-controls="multi_city"
                                aria-selected="false"
                              >
                                Multi city
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="tab-content" id="myTabContent1">
                      <div
                        className="tab-pane fade show active"
                        id="oneway_flight"
                        role="tabpanel"
                        aria-labelledby="oneway-tab"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="oneway_search_form">
                              <form action="#!">
                                <div className="row">
                                  <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      <p>From</p>
                                      <CustomAsyncSelect
                                        cacheOptions
                                        loadOptions={loadOptions}
                                        defaultOptions
                                        onChange={(e) => {
                                          setOrigin(e.value);
                                          setFullOrigin(e);
                                        }}
                                        placeholder="New York"
                                      />
                                      <span>
                                        JFK - John F. Kennedy International...
                                      </span>
                                      <div className="plan_icon_posation">
                                        <i className="fas fa-plane-departure" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      <p>To</p>
                                      <CustomAsyncSelect
                                        cacheOptions
                                        loadOptions={loadOptions}
                                        defaultOptions
                                        onChange={(e) => {
                                          setDestination(e.value);
                                          setFullDestination(e);
                                        }}
                                        placeholder="London"
                                      />
                                      <span>LCY, London city airport </span>
                                      <div className="plan_icon_posation">
                                        <i className="fas fa-plane-arrival" />
                                      </div>
                                      <div className="range_plan">
                                        <i className="fas fa-exchange-alt" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-4  col-md-6 col-sm-12 col-12">
                                    <div className="form_search_date">
                                      <div className="flight_Search_boxed date_flex_area">
                                        <div className="Journey_date">
                                          <p>Journey date</p>
                                          <input
                                            type="date"
                                            required
                                            // placeholder={Date.now}
                                            value={departureDate}
                                            onChange={(e) =>
                                              setDepartureDate(e.target.value)
                                            }
                                          />
                                          <span>Thursday</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed dropdown_passenger_area">
                                      <p>Passenger, Class </p>
                                      <div className="dropdown">
                                        <button
                                          className="dropdown-toggle final-count"
                                          data-toggle="dropdown"
                                          type="button"
                                          id="dropdownMenuButton1"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          {passenger.infant +
                                            passenger.adult +
                                            passenger.child}{" "}
                                          Passengers
                                        </button>
                                        <div
                                          className="dropdown-menu dropdown_passenger_info"
                                          aria-labelledby="dropdownMenuButton1"
                                        >
                                          <div className="traveller-calulate-persons">
                                            <div className="passengers">
                                              <h6>Passengers</h6>
                                              <div className="passengers-types">
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count pcount">
                                                      {passenger.adult}
                                                    </span>
                                                    <div className="type-label">
                                                      <p>Adult</p>
                                                      <span>12+ yrs</span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-add"
                                                      onClick={() => {
                                                        console.log("adding");
                                                        // countHandler("adult", "p")
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            adult:
                                                              prev.adult + 1,
                                                          })
                                                        );
                                                      }}
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-subtract"
                                                      onClick={() => {
                                                        // countHandler("adult", "m")
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            adult:
                                                              prev.adult - 1,
                                                          })
                                                        );
                                                      }}
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count ccount">
                                                      {passenger.child}
                                                    </span>
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">
                                                        Children
                                                      </p>
                                                      <span>
                                                        2 - Less than 12 yrs
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-add-c"
                                                      onClick={() =>
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            child:
                                                              prev.child + 1,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-c"
                                                      onClick={() =>
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            child:
                                                              prev.child - 1,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count incount">
                                                      {passenger.infant}
                                                    </span>
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">
                                                        Infant
                                                      </p>
                                                      <span>
                                                        Less than 2 yrs
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-add-in"
                                                      onClick={() =>
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            infant:
                                                              prev.infant + 1,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-in"
                                                      onClick={() =>
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            infant:
                                                              prev.infant - 1,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="cabin-selection">
                                              <h6>Cabin Class</h6>
                                              <div>
                                                {/* <select
                                                onChange={(e) =>
                                                  setCategory(e.target.value)
                                                }
                                              >
                                                <option value="">
                                                  Choose Cabin Class
                                                </option>
                                                {categories.map((category) => (
                                                  <option
                                                    key={category}
                                                    value={category}
                                                  >
                                                    {category}
                                                  </option>
                                                ))}
                                              </select> */}
                                              </div>
                                              {/*<div className="cabin-list">
                                              <button
                                                type="button"
                                                className="label-select-btn"
                                              >
                                                <span className="muiButton-label">
                                                  Economy
                                                </span>
                                              </button>
                                              <button
                                                type="button"
                                                className="label-select-btn active"
                                              >
                                                <span className="muiButton-label">
                                                  Busines
                                                </span>
                                              </button>
                                              <button
                                                type="button"
                                                className="label-select-btn"
                                              >
                                                <span className="MuiButton-label">
                                                  First Class
                                                </span>
                                              </button>
                                            </div> */}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <span>Business</span>
                                    </div>
                                  </div>
                                  <div className="top_form_search_button">
                                    <Link
                                      to="/flight-search"
                                      className="btn btn_theme btn_md"
                                      onClick={searchFlightHandler}
                                    >
                                      Search
                                    </Link>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="roundtrip"
                        role="tabpanel"
                        aria-labelledby="roundtrip-tab"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="oneway_search_form">
                              <form action="#!">
                                <div className="row">
                                  <div className="col-lg-3  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      <p>From</p>
                                      {/* <input
                                        type="text"
                                        required
                                        placeholder="LHR"
                                        value={origin}
                                        onChange={(e) =>
                                          setOrigin(e.target.value)
                                        }
                                        
                                      /> */}
                                      <CustomAsyncSelect
                                        cacheOptions
                                        loadOptions={loadOptions}
                                        defaultOptions
                                        onChange={(e) => {
                                          setOrigin(e.value);
                                          setFullOrigin(e);
                                        }}
                                        placeholder="New York"
                                      />
                                      <span>
                                        JFK - John F. Kennedy International...
                                      </span>
                                      <div className="plan_icon_posation">
                                        <i className="fas fa-plane-departure" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-3  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      <p>To</p>
                                      {/* <input
                                        type="text"
                                        required
                                        placeholder="LCY"
                                        value={destination}
                                        onChange={(e) =>
                                          setDestination(e.target.value)
                                        }
                                      /> */}
                                      <CustomAsyncSelect
                                        cacheOptions
                                        loadOptions={loadOptions}
                                        defaultOptions
                                        onChange={(e) => {
                                          setDestination(e.value);
                                          setFullDestination(e);
                                        }}
                                        placeholder="New York"
                                      />
                                      <span>LCY, London city airport </span>
                                      <div className="plan_icon_posation">
                                        <i className="fas fa-plane-arrival" />
                                      </div>
                                      <div className="range_plan">
                                        <i className="fas fa-exchange-alt" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-4  col-md-6 col-sm-12 col-12">
                                    <div className="form_search_date">
                                      <div className="flight_Search_boxed date_flex_area">
                                        <div className="Journey_date">
                                          <p>Journey date</p>
                                          <input
                                            type="date"
                                            required
                                            value={departureDate}
                                            onChange={(e) =>
                                              setDepartureDate(e.target.value)
                                            }
                                          />
                                          <span>Thursday</span>
                                        </div>
                                        <div className="Journey_date">
                                          <p>Return date</p>
                                          <input
                                            type="date"
                                            required
                                            value={returnDate}
                                            onChange={(e) =>
                                              setReturnDate(e.target.value)
                                            }
                                          />
                                          <span>Saturday</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed dropdown_passenger_area">
                                      <p>Passenger, Class </p>
                                      <div className="dropdown">
                                        <button
                                          className="dropdown-toggle final-count"
                                          data-toggle="dropdown"
                                          type="button"
                                          id="dropdownMenuButton1"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          {passenger.infant +
                                            passenger.adult +
                                            passenger.child}{" "}
                                          Passengers
                                        </button>
                                        <div
                                          className="dropdown-menu dropdown_passenger_info"
                                          aria-labelledby="dropdownMenuButton1"
                                        >
                                          <div className="traveller-calulate-persons">
                                            <div className="passengers">
                                              <h6>Passengers</h6>
                                              <div className="passengers-types">
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count pcount">
                                                      {passenger.adult}
                                                    </span>
                                                    <div className="type-label">
                                                      <p>Adult</p>
                                                      <span>12+ yrs</span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-add"
                                                      onClick={() =>
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            adult:
                                                              prev.adult + 1,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-subtract"
                                                      onClick={() =>
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            adult:
                                                              prev.adult - 1,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count ccount">
                                                      {passenger.child}
                                                    </span>
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">
                                                        Children
                                                      </p>
                                                      <span>
                                                        2 - Less than 12 yrs
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-add-c"
                                                      onClick={() =>
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            child:
                                                              prev.child + 1,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-c"
                                                      onClick={() =>
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            child:
                                                              prev.child - 1,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count incount">
                                                      {passenger.infant}
                                                    </span>
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">
                                                        Infant
                                                      </p>
                                                      <span>
                                                        Less than 2 yrs
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-add-in"
                                                      onClick={() =>
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            infant:
                                                              prev.infant + 1,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-in"
                                                      onClick={() =>
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            infant:
                                                              prev.infant - 1,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="cabin-selection">
                                              {/* <h6>Cabin Class</h6>
                                            <select
                                              onChange={(e) =>
                                                setCategory(e.target.value)
                                              }
                                            >
                                              <option value="">
                                                Choose Cabin Class
                                              </option>
                                              {categories.map((category) => (
                                                <option
                                                  key={category}
                                                  value={category}
                                                >
                                                  {category}
                                                </option>
                                              ))}
                                            </select> */}

                                              {/* <div className="cabin-list">
                                              <button
                                                type="button"
                                                className="label-select-btn"
                                              >
                                                <span className="muiButton-label">
                                                  Economy
                                                </span>
                                              </button>
                                              <button
                                                type="button"
                                                className="label-select-btn active"
                                              >
                                                <span className="muiButton-label">
                                                  Business
                                                </span>
                                              </button>
                                              <button
                                                type="button"
                                                className="label-select-btn"
                                              >
                                                <span className="MuiButton-label">
                                                  First Class{" "}
                                                </span>
                                              </button>
                                            </div> */}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <span>Business</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="top_form_search_button">
                                  <Link
                                    to="/flight-search"
                                    className="btn btn_theme btn_md"
                                    onClick={returnFlightSearchHandler}
                                  >
                                    Search
                                  </Link>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="multi_city"
                        role="tabpanel"
                        aria-labelledby="multi_city-tab"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="oneway_search_form">
                              <form action="#!">
                                <div className="multi_city_form_wrapper">
                                  <div className="multi_city_form">
                                    <div className="row">
                                      <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="flight_Search_boxed">
                                          <p>From</p>
                                          <input
                                            type="text"
                                            defaultValue="New York"
                                          />
                                          <span>
                                            DAC, Hazrat Shahajalal
                                            International...
                                          </span>
                                          <div className="plan_icon_posation">
                                            <i className="fas fa-plane-departure" />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="flight_Search_boxed">
                                          <p>To</p>
                                          <input
                                            type="text"
                                            defaultValue="London "
                                          />
                                          <span>LCY, London city airport </span>
                                          <div className="plan_icon_posation">
                                            <i className="fas fa-plane-arrival" />
                                          </div>
                                          <div className="range_plan">
                                            <i className="fas fa-exchange-alt" />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                        <div className="form_search_date">
                                          <div className="flight_Search_boxed date_flex_area">
                                            <div className="Journey_date">
                                              <p>Journey date</p>
                                              <input
                                                type="date"
                                                defaultValue="2022-05-05"
                                              />
                                              <span>Thursday</span>
                                            </div>
                                            <div className="Journey_date">
                                              <p>Return date</p>
                                              <input
                                                type="date"
                                                defaultValue="2022-05-10"
                                              />
                                              <span>Saturday</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                        <div className="flight_Search_boxed dropdown_passenger_area">
                                          <p>Passenger, Class </p>
                                          <div className="dropdown">
                                            <button
                                              className="dropdown-toggle final-count"
                                              data-toggle="dropdown"
                                              type="button"
                                              id="dropdownMenuButton1"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                            >
                                              0 Passenger
                                            </button>
                                            <div
                                              className="dropdown-menu dropdown_passenger_info"
                                              aria-labelledby="dropdownMenuButton1"
                                            >
                                              <div className="traveller-calulate-persons">
                                                <div className="passengers">
                                                  <h6>Passengers</h6>
                                                  <div className="passengers-types">
                                                    <div className="passengers-type">
                                                      <div className="text">
                                                        <span className="count pcount">
                                                          2
                                                        </span>
                                                        <div className="type-label">
                                                          <p>Adult</p>
                                                          <span>12+ yrs</span>
                                                        </div>
                                                      </div>
                                                      <div className="button-set">
                                                        <button
                                                          type="button"
                                                          className="btn-add"
                                                        >
                                                          <i className="fas fa-plus" />
                                                        </button>
                                                        <button
                                                          type="button"
                                                          className="btn-subtract"
                                                        >
                                                          <i className="fas fa-minus" />
                                                        </button>
                                                      </div>
                                                    </div>
                                                    <div className="passengers-type">
                                                      <div className="text">
                                                        <span className="count ccount">
                                                          0
                                                        </span>
                                                        <div className="type-label">
                                                          <p className="fz14 mb-xs-0">
                                                            Children
                                                          </p>
                                                          <span>
                                                            2 - Less than 12 yrs
                                                          </span>
                                                        </div>
                                                      </div>
                                                      <div className="button-set">
                                                        <button
                                                          type="button"
                                                          className="btn-add-c"
                                                        >
                                                          <i className="fas fa-plus" />
                                                        </button>
                                                        <button
                                                          type="button"
                                                          className="btn-subtract-c"
                                                        >
                                                          <i className="fas fa-minus" />
                                                        </button>
                                                      </div>
                                                    </div>
                                                    <div className="passengers-type">
                                                      <div className="text">
                                                        <span className="count incount">
                                                          0
                                                        </span>
                                                        <div className="type-label">
                                                          <p className="fz14 mb-xs-0">
                                                            Infant
                                                          </p>
                                                          <span>
                                                            Less than 2 yrs
                                                          </span>
                                                        </div>
                                                      </div>
                                                      <div className="button-set">
                                                        <button
                                                          type="button"
                                                          className="btn-add-in"
                                                        >
                                                          <i className="fas fa-plus" />
                                                        </button>
                                                        <button
                                                          type="button"
                                                          className="btn-subtract-in"
                                                        >
                                                          <i className="fas fa-minus" />
                                                        </button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="cabin-selection">
                                                  <h6>Cabin Class</h6>
                                                  <div className="cabin-list">
                                                    <button
                                                      type="button"
                                                      className="label-select-btn"
                                                    >
                                                      <span className="muiButton-label">
                                                        Economy
                                                      </span>
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="label-select-btn active"
                                                    >
                                                      <span className="muiButton-label">
                                                        Business
                                                      </span>
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="label-select-btn"
                                                    >
                                                      <span className="MuiButton-label">
                                                        First Class{" "}
                                                      </span>
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <span>Business</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="multi_city_form">
                                    <div className="row">
                                      <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="flight_Search_boxed">
                                          <p>From</p>
                                          <input
                                            type="text"
                                            defaultValue="New York"
                                          />
                                          <span>
                                            DAC, Hazrat Shahajalal
                                            International...
                                          </span>
                                          <div className="plan_icon_posation">
                                            <i className="fas fa-plane-departure" />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="flight_Search_boxed">
                                          <p>To</p>
                                          <input
                                            type="text"
                                            defaultValue="London "
                                          />
                                          <span>LCY, London city airport </span>
                                          <div className="plan_icon_posation">
                                            <i className="fas fa-plane-arrival" />
                                          </div>
                                          <div className="range_plan">
                                            <i className="fas fa-exchange-alt" />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                        <div className="form_search_date">
                                          <div className="flight_Search_boxed date_flex_area">
                                            <div className="Journey_date">
                                              <p>Journey date</p>
                                              <input
                                                type="date"
                                                defaultValue="2022-05-05"
                                              />
                                              <span>Thursday</span>
                                            </div>
                                            <div className="Journey_date">
                                              <p>Return date</p>
                                              <input
                                                type="date"
                                                defaultValue="2022-05-12"
                                              />
                                              <span>Saturday</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                        <div className="flight_Search_boxed dropdown_passenger_area">
                                          <p>Passenger, Class </p>
                                          <div className="dropdown">
                                            <button
                                              className="dropdown-toggle final-count"
                                              data-toggle="dropdown"
                                              type="button"
                                              id="dropdownMenuButton1"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                            >
                                              0 Passenger
                                            </button>
                                            <div
                                              className="dropdown-menu dropdown_passenger_info"
                                              aria-labelledby="dropdownMenuButton1"
                                            >
                                              <div className="traveller-calulate-persons">
                                                <div className="passengers">
                                                  <h6>Passengers</h6>
                                                  <div className="passengers-types">
                                                    <div className="passengers-type">
                                                      <div className="text">
                                                        <span className="count pcount">
                                                          2
                                                        </span>
                                                        <div className="type-label">
                                                          <p>Adult</p>
                                                          <span>12+ yrs</span>
                                                        </div>
                                                      </div>
                                                      <div className="button-set">
                                                        <button
                                                          type="button"
                                                          className="btn-add"
                                                        >
                                                          <i className="fas fa-plus" />
                                                        </button>
                                                        <button
                                                          type="button"
                                                          className="btn-subtract"
                                                        >
                                                          <i className="fas fa-minus" />
                                                        </button>
                                                      </div>
                                                    </div>
                                                    <div className="passengers-type">
                                                      <div className="text">
                                                        <span className="count ccount">
                                                          0
                                                        </span>
                                                        <div className="type-label">
                                                          <p className="fz14 mb-xs-0">
                                                            Children
                                                          </p>
                                                          <span>
                                                            2 - Less than 12 yrs
                                                          </span>
                                                        </div>
                                                      </div>
                                                      <div className="button-set">
                                                        <button
                                                          type="button"
                                                          className="btn-add-c"
                                                        >
                                                          <i className="fas fa-plus" />
                                                        </button>
                                                        <button
                                                          type="button"
                                                          className="btn-subtract-c"
                                                        >
                                                          <i className="fas fa-minus" />
                                                        </button>
                                                      </div>
                                                    </div>
                                                    <div className="passengers-type">
                                                      <div className="text">
                                                        <span className="count incount">
                                                          0
                                                        </span>
                                                        <div className="type-label">
                                                          <p className="fz14 mb-xs-0">
                                                            Infant
                                                          </p>
                                                          <span>
                                                            Less than 2 yrs
                                                          </span>
                                                        </div>
                                                      </div>
                                                      <div className="button-set">
                                                        <button
                                                          type="button"
                                                          className="btn-add-in"
                                                        >
                                                          <i className="fas fa-plus" />
                                                        </button>
                                                        <button
                                                          type="button"
                                                          className="btn-subtract-in"
                                                        >
                                                          <i className="fas fa-minus" />
                                                        </button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="cabin-selection">
                                                  <h6>Cabin Class</h6>
                                                  <div className="cabin-list">
                                                    <button
                                                      type="button"
                                                      className="label-select-btn"
                                                    >
                                                      <span className="muiButton-label">
                                                        Economy
                                                      </span>
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="label-select-btn active"
                                                    >
                                                      <span className="muiButton-label">
                                                        Business
                                                      </span>
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="label-select-btn"
                                                    >
                                                      <span className="MuiButton-label">
                                                        First Class{" "}
                                                      </span>
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <span>Business</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-lg-12">
                                    <div className="add_multy_form">
                                      <button
                                        type="button"
                                        id="addMulticityRow"
                                      >
                                        + Add another flight
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="top_form_search_button">
                                  <Link
                                    to="/flight-search"
                                    className="btn btn_theme btn_md"
                                  >
                                    Search
                                  </Link>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="tours"
                    role="tabpanel"
                    aria-labelledby="tours-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="tour_search_form">
                          <form action="#!">
                            <div className="row">
                              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                <div className="flight_Search_boxed">
                                  <p>Destination</p>
                                  <input
                                    type="text"
                                    placeholder="Where are you going?"
                                  />
                                  <span>Where are you going?</span>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <div className="form_search_date">
                                  <div className="flight_Search_boxed date_flex_area">
                                    <div className="Journey_date">
                                      <p>Journey date</p>
                                      <input
                                        type="date"
                                        defaultValue="2022-05-03"
                                      />
                                      <span>Thursday</span>
                                    </div>
                                    <div className="Journey_date">
                                      <p>Return date</p>
                                      <input
                                        type="date"
                                        defaultValue="2022-05-05"
                                      />
                                      <span>Thursday</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                <div className="flight_Search_boxed dropdown_passenger_area">
                                  <p>Passenger, Class </p>
                                  <div className="dropdown">
                                    <button
                                      className="dropdown-toggle final-count"
                                      data-toggle="dropdown"
                                      type="button"
                                      id="dropdownMenuButton1"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      0 Passenger
                                    </button>
                                    <div
                                      className="dropdown-menu dropdown_passenger_info"
                                      aria-labelledby="dropdownMenuButton1"
                                    >
                                      <div className="traveller-calulate-persons">
                                        <div className="passengers">
                                          <h6>Passengers</h6>
                                          <div className="passengers-types">
                                            <div className="passengers-type">
                                              <div className="text">
                                                <span className="count pcount">
                                                  2
                                                </span>
                                                <div className="type-label">
                                                  <p>Adult</p>
                                                  <span>12+ yrs</span>
                                                </div>
                                              </div>
                                              <div className="button-set">
                                                <button
                                                  type="button"
                                                  className="btn-add"
                                                >
                                                  <i className="fas fa-plus" />
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn-subtract"
                                                >
                                                  <i className="fas fa-minus" />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="passengers-type">
                                              <div className="text">
                                                <span className="count ccount">
                                                  0
                                                </span>
                                                <div className="type-label">
                                                  <p className="fz14 mb-xs-0">
                                                    Children
                                                  </p>
                                                  <span>
                                                    2 - Less than 12 yrs
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="button-set">
                                                <button
                                                  type="button"
                                                  className="btn-add-c"
                                                >
                                                  <i className="fas fa-plus" />
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn-subtract-c"
                                                >
                                                  <i className="fas fa-minus" />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="passengers-type">
                                              <div className="text">
                                                <span className="count incount">
                                                  0
                                                </span>
                                                <div className="type-label">
                                                  <p className="fz14 mb-xs-0">
                                                    Infant
                                                  </p>
                                                  <span>Less than 2 yrs</span>
                                                </div>
                                              </div>
                                              <div className="button-set">
                                                <button
                                                  type="button"
                                                  className="btn-add-in"
                                                >
                                                  <i className="fas fa-plus" />
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn-subtract-in"
                                                >
                                                  <i className="fas fa-minus" />
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="cabin-selection">
                                          <h6>Cabin Class</h6>
                                          <div className="cabin-list">
                                            <button
                                              type="button"
                                              className="label-select-btn"
                                            >
                                              <span className="muiButton-label">
                                                Economy
                                              </span>
                                            </button>
                                            <button
                                              type="button"
                                              className="label-select-btn active"
                                            >
                                              <span className="muiButton-label">
                                                Business
                                              </span>
                                            </button>
                                            <button
                                              type="button"
                                              className="label-select-btn"
                                            >
                                              <span className="MuiButton-label">
                                                First Class{" "}
                                              </span>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <span>Business</span>
                                </div>
                              </div>
                              <div className="top_form_search_button">
                                <Link
                                  to="/flight-search"
                                  className="btn btn_theme btn_md"
                                >
                                  Search
                                </Link>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="hotels"
                    role="tabpanel"
                    aria-labelledby="hotels-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="tour_search_form">
                          <form action="#!">
                            <div className="row">
                              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                <div className="flight_Search_boxed">
                                  <p>Destination</p>
                                  <input
                                    type="text"
                                    placeholder="Where are you going?"
                                  />
                                  <span>Where are you going?</span>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <div className="form_search_date">
                                  <div className="flight_Search_boxed date_flex_area">
                                    <div className="Journey_date">
                                      <p>Journey date</p>
                                      <input
                                        type="date"
                                        defaultValue="2022-05-03"
                                      />
                                      <span>Thursday</span>
                                    </div>
                                    <div className="Journey_date">
                                      <p>Return date</p>
                                      <input
                                        type="date"
                                        defaultValue="2022-05-05"
                                      />
                                      <span>Thursday</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                <div className="flight_Search_boxed dropdown_passenger_area">
                                  <p>Passenger, Class </p>
                                  <div className="dropdown">
                                    <button
                                      className="dropdown-toggle final-count"
                                      data-toggle="dropdown"
                                      type="button"
                                      id="dropdownMenuButton1"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      0 Passenger
                                    </button>
                                    <div
                                      className="dropdown-menu dropdown_passenger_info"
                                      aria-labelledby="dropdownMenuButton1"
                                    >
                                      <div className="traveller-calulate-persons">
                                        <div className="passengers">
                                          <h6>Passengers</h6>
                                          <div className="passengers-types">
                                            <div className="passengers-type">
                                              <div className="text">
                                                <span className="count pcount">
                                                  2
                                                </span>
                                                <div className="type-label">
                                                  <p>Adult</p>
                                                  <span>12+ yrs</span>
                                                </div>
                                              </div>
                                              <div className="button-set">
                                                <button
                                                  type="button"
                                                  className="btn-add"
                                                >
                                                  <i className="fas fa-plus" />
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn-subtract"
                                                >
                                                  <i className="fas fa-minus" />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="passengers-type">
                                              <div className="text">
                                                <span className="count ccount">
                                                  0
                                                </span>
                                                <div className="type-label">
                                                  <p className="fz14 mb-xs-0">
                                                    Children
                                                  </p>
                                                  <span>
                                                    2 - Less than 12 yrs
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="button-set">
                                                <button
                                                  type="button"
                                                  className="btn-add-c"
                                                >
                                                  <i className="fas fa-plus" />
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn-subtract-c"
                                                >
                                                  <i className="fas fa-minus" />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="passengers-type">
                                              <div className="text">
                                                <span className="count incount">
                                                  0
                                                </span>
                                                <div className="type-label">
                                                  <p className="fz14 mb-xs-0">
                                                    Infant
                                                  </p>
                                                  <span>Less than 2 yrs</span>
                                                </div>
                                              </div>
                                              <div className="button-set">
                                                <button
                                                  type="button"
                                                  className="btn-add-in"
                                                >
                                                  <i className="fas fa-plus" />
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn-subtract-in"
                                                >
                                                  <i className="fas fa-minus" />
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="cabin-selection">
                                          <h6>Cabin Class</h6>
                                          <div className="cabin-list">
                                            <button
                                              type="button"
                                              className="label-select-btn"
                                            >
                                              <span className="muiButton-label">
                                                Economy
                                              </span>
                                            </button>
                                            <button
                                              type="button"
                                              className="label-select-btn active"
                                            >
                                              <span className="muiButton-label">
                                                Business
                                              </span>
                                            </button>
                                            <button
                                              type="button"
                                              className="label-select-btn"
                                            >
                                              <span className="MuiButton-label">
                                                First Class{" "}
                                              </span>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <span>Business</span>
                                </div>
                              </div>
                              <div className="top_form_search_button">
                                <Link
                                  to="/flight-search"
                                  className="btn btn_theme btn_md"
                                >
                                  Search
                                </Link>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FormSection;
