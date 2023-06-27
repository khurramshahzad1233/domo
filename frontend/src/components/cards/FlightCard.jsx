import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Flightstate } from "../../context/Flightprovider";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

const FlightCard = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const {
    flightOffer,
    setBookingData,
    querrydata,
    data,
    setData,
    data1,
    setData1,
  } = Flightstate();
  const [currentPage, setCurrentPage] = useState(1);

  // console.log(data1);
  const itemPerPage = 10;
  let totalItems = data.length || 0;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const indexoflastitem = currentPage * itemPerPage;
  const indexoffirstitem = indexoflastitem - itemPerPage;
  // console.log(indexoflastitem)
  // console.log(indexoffirstitem)
  const currentitems = data.slice(indexoffirstitem, indexoflastitem);
  const currentitems1 = data1.slice(indexoffirstitem, indexoflastitem);
  // console.log(currentitems1);
  // console.log(currentitems);

  // console.log(currentitems)

  useEffect(() => {
    if (flightOffer.offers && flightOffer.offers.length >= 1) {
      setData(flightOffer.offers);
    }

    if (!querrydata) {
      setData1("");
    }
    if (querrydata && querrydata.length && querrydata.length > 0) {
      setData1(querrydata);
    }
  }, [flightOffer, querrydata, setData, setData1]);

  const bookFlightHandler = (e, bdata) => {
    setBookingData(bdata);
  };

  const handleNotLoggedIn = () => {
    console.log("running");
    toast.warn("Please log in to book flight");
  };

  return (
    <>
      {currentitems1 && currentitems1.length >= 1 ? (
        <>
          {currentitems1 && currentitems1.length >= 1 ? (
            currentitems1.map((flight, index) => (
              <div className="flight_search_item_wrappper" key={index}>
                <div className="flight_search_items">
                  <div className="multi_city_flight_lists">
                    <div className="flight_multis_area_wrapper">
                      <div className="flight_search_left">
                        <div className="flight_logo">
                          <img src={flight.owner.logo_symbol_url} alt="img" />
                        </div>
                        <div className="flight_search_destination">
                          <p>From</p>
                          <h3>{flight?.slices[0]?.origin?.city?.name}</h3>
                          <h6>{flight?.slices[0]?.origin?.name}</h6>
                        </div>
                      </div>
                      <div className="flight_search_middel">
                        <div className="flight_right_arrow">
                          <img
                            className="img-color"
                            src="assets/img/icon/right_arrow.png"
                            alt="icon"
                          />
                          <h6>Non-stop</h6>
                          <p>01h 05minute </p>
                        </div>
                        <div className="flight_search_destination">
                          <p>To</p>
                          <h3>{flight?.slices[0]?.destination?.city?.name}</h3>
                          <h6>{flight?.slices[0]?.destination?.name}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flight_search_right">
                    <h5>
                      <del>$9,560</del>
                    </h5>
                    <h2>
                      {flight.total_amount}
                      <sup>*20% OFF</sup>
                    </h2>
                    {!auth?.uid ? (
                      <button
                        className="btn btn_theme btn_sm"
                        onClick={() => handleNotLoggedIn()}
                      >
                        Book Now
                      </button>
                    ) : (
                      <Link
                        to="/flight-booking"
                        className="btn btn_theme btn_sm"
                        onClick={(e) => bookFlightHandler(e, flight)}
                      >
                        Book now {flight.id}
                      </Link>
                    )}

                    <p>*Discount applicable on some conditions</p>
                    <button
                      className="btn p-0"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Show more <i className="fas fa-chevron-down" />
                    </button>
                  </div>
                </div>

                {/* slice section end here */}

                {/* SEGEMENT START HERE */}

                {flight.slices &&
                  flight.slices.map((slice, index) => (
                    <div key={index}>
                      {slice?.segments &&
                        slice?.segments?.map((seg, index) => (
                          <div
                            className="flight_policy_refund collapse"
                            id="collapseExample"
                            key={index}
                          >
                            <div className="flight_show_down_wrapper">
                              <div className="flight-shoe_dow_item">
                                <div className="airline-details">
                                  <div className="img">
                                    <img
                                      src="assets/img/icon/bg.png"
                                      alt="img"
                                    />
                                  </div>
                                  <span className="airlineName fw-500">
                                    {seg?.aircraft?.name}
                                  </span>
                                  <span className="flightNumber">
                                    {seg?.aircraft?.name}
                                  </span>
                                </div>
                                <div className="flight_inner_show_component">
                                  <div className="flight_det_wrapper">
                                    <div className="flight_det">
                                      <div className="code_time">
                                        <span className="code">{}</span>
                                        <span className="time">
                                          {seg?.departing_at}
                                        </span>
                                      </div>
                                      <p className="airport">
                                        {seg?.origin.name}
                                      </p>
                                      <p className="date">7th Jun 2022</p>
                                    </div>
                                  </div>
                                  <div className="flight_duration">
                                    <div className="arrow_right" />
                                    <span>{seg?.duration}</span>
                                  </div>
                                  <div className="flight_det_wrapper">
                                    <div className="flight_det">
                                      <div className="code_time">
                                        <span className="code">DAC</span>
                                        <span className="time">
                                          {seg?.arriving_at}
                                        </span>
                                      </div>
                                      <p className="airport">
                                        {seg?.destination?.name}
                                      </p>
                                      <p className="date">7th Jun 2022</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flight_refund_policy">
                                <div className="TabPanelInner flex_widht_less">
                                  <h4>Refund Policy</h4>
                                  <p className="fz12">
                                    1. Refund and Date Change are done as per
                                    the following policies.
                                  </p>
                                  <p className="fz12">
                                    2. Refund Amount= Refund Charge (as per
                                    airline policy + ShareTrip Convenience Fee).{" "}
                                  </p>
                                  <p className="fz12">
                                    3. Date Change Amount= Date Change Fee (as
                                    per Airline Policy + ShareTrip Convenience
                                    Fee).
                                  </p>
                                </div>
                                <div className="TabPanelInner">
                                  <h4>Baggage</h4>
                                  <div className="flight_info_taable">
                                    <h3>DAC-SPD</h3>
                                    <p>
                                      <span>20KG /</span> person
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <div></div>
          )}
        </>
      ) : (
        <>
          {currentitems && currentitems.length >= 1 ? (
            currentitems.map((flight, index) => (
              <div className="flight_search_item_wrappper" key={index}>
                <div className="flight_search_items">
                  <div className="multi_city_flight_lists">
                    <div className="flight_multis_area_wrapper">
                      <div className="flight_search_left">
                        <div className="flight_logo">
                          <img src={flight?.owner?.logo_symbol_url} alt="img" />
                        </div>
                        <div className="flight_search_destination">
                          <p>From</p>
                          <h3>{flight?.slices[0]?.origin?.city?.name}</h3>
                          <h6>{flight?.slices[0]?.origin?.name}</h6>
                        </div>
                      </div>
                      <div className="flight_search_middel">
                        <div className="flight_right_arrow">
                          <img
                            className="img-color"
                            src="assets/img/icon/right_arrow.png"
                            alt="icon"
                          />
                          <h6>Non-stop</h6>
                          <p>01h 05minute </p>
                        </div>
                        <div className="flight_search_destination">
                          <p>To</p>
                          <h3>{flight?.slices[0]?.destination?.city?.name}</h3>
                          <h6>{flight?.slices[0]?.destination?.name}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flight_search_right">
                    <h5>
                      <del>$9,560</del>
                    </h5>
                    <h2>
                      {flight?.total_amount}
                      <sup>*20% OFF</sup>
                    </h2>
                    {!auth?.uid ? (
                      <button
                        className="btn btn_theme btn_sm"
                        onClick={handleNotLoggedIn}
                      >
                        Book Now
                      </button>
                    ) : (
                      <Link
                        to="/flight-booking"
                        className="btn btn_theme btn_sm"
                        onClick={(e) => bookFlightHandler(e, flight)}
                      >
                        Book now {flight?.id}
                      </Link>
                    )}

                    <p>*Discount applicable on some conditions</p>
                    <button
                      className="btn p-0"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Show more <i className="fas fa-chevron-down" />
                    </button>
                  </div>
                </div>

                {/* slice section end here */}

                {/* SEGEMENT START HERE */}

                {flight?.slices &&
                  flight?.slices?.map((slice, index) => (
                    <div key={index}>
                      {slice?.segments &&
                        slice?.segments.map((seg, index) => (
                          <div
                            className="flight_policy_refund collapse"
                            id="collapseExample"
                            key={index}
                          >
                            <div className="flight_show_down_wrapper">
                              <div className="flight-shoe_dow_item">
                                <div className="airline-details">
                                  <div className="img">
                                    <img
                                      src="assets/img/icon/bg.png"
                                      alt="img"
                                    />
                                  </div>
                                  <span className="airlineName fw-500">
                                    {seg?.aircraft?.name}
                                  </span>
                                  <span className="flightNumber">
                                    {seg?.aircraft?.name}
                                  </span>
                                </div>
                                <div className="flight_inner_show_component">
                                  <div className="flight_det_wrapper">
                                    <div className="flight_det">
                                      <div className="code_time">
                                        <span className="code">{}</span>
                                        <span className="time">
                                          {seg?.departing_at}
                                        </span>
                                      </div>
                                      <p className="airport">
                                        {seg?.origin?.name}
                                      </p>
                                      <p className="date">7th Jun 2022</p>
                                    </div>
                                  </div>
                                  <div className="flight_duration">
                                    <div className="arrow_right" />
                                    <span>{seg?.duration}</span>
                                  </div>
                                  <div className="flight_det_wrapper">
                                    <div className="flight_det">
                                      <div className="code_time">
                                        <span className="code">DAC</span>
                                        <span className="time">
                                          {seg?.arriving_at}
                                        </span>
                                      </div>
                                      <p className="airport">
                                        {seg?.destination.name}
                                      </p>
                                      <p className="date">7th Jun 2022</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flight_refund_policy">
                                <div className="TabPanelInner flex_widht_less">
                                  <h4>Refund Policy</h4>
                                  <p className="fz12">
                                    1. Refund and Date Change are done as per
                                    the following policies.
                                  </p>
                                  <p className="fz12">
                                    2. Refund Amount= Refund Charge (as per
                                    airline policy + ShareTrip Convenience Fee).{" "}
                                  </p>
                                  <p className="fz12">
                                    3. Date Change Amount= Date Change Fee (as
                                    per Airline Policy + ShareTrip Convenience
                                    Fee).
                                  </p>
                                </div>
                                <div className="TabPanelInner">
                                  <h4>Baggage</h4>
                                  <div className="flight_info_taable">
                                    <h3>DAC-SPD</h3>
                                    <p>
                                      <span>20KG /</span> person
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <div>
              <p>No Data Found</p>
            </div>
          )}{" "}
        </>
      )}
      ;
      <div>
        {itemPerPage < totalItems && (
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={itemPerPage}
              totalItemsCount={totalItems}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FlightCard;
