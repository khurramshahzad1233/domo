import React, { useState } from "react";
import Layout from "../components/global/Layout";
import CtaSection from "../components/sections/CtaSection";
import TourTravelDateCard from "../components/cards/TourTravelDateCard";
import { Flightstate } from "../context/Flightprovider";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const cities = ["lahore", "london", "peshawar", "karachi"];
const countries = ["pakistan", "iran", "arab", "uae"];
const states = ["punjab", "sindh", "kpk", "balouchistan"];
const FlightBookingPage = () => {
  const { bookingData } = Flightstate();
  const [ setLoading] = useState(false);
  const [fname, setFname] = useState("");
  const [lName, setLName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mNumber, setMNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [hNumber, setHNumber] = useState("");
  const [state, setState] = useState("");
  const [pNumber, setPNumber] = useState("");
  const [country, setCountry] = useState("");
  const [vNumber, setVNumber] = useState("");
  const [city, setcity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Payment by card");
  const user = useSelector((state) => state.firebase.auth);
  const navigate = useNavigate();

  console.log(bookingData);

  const updateDatabase = async (data) => {
    const db = getFirestore();
    await addDoc(collection(db, "bookings"), {
      ...data,
      user: user.uid,
    });
    navigate("/my-bookings");
    setLoading(false);
  };

  // useEffect(() => {
  //   updateDatabase()

  // },[])

  // console.log("bookingData", bookingData);
  // console.log(state)
  // console.log(city)
  // console.log(country)

  const bookFlightHandler = async (e) => {
    e.preventDefault();
    let offerId = bookingData.id;
    let currency = bookingData.total_currency;
    let amount = bookingData.total_amount;
    let passengerId = bookingData.passengers[0].id;
    let firstName = fname;
    let lastName = lName;
    let email = emailAddress;
    // let phoneNumber = mNumber;

    setLoading(true);

    const searchParams = {
      data: {
        selected_offers: [offerId],
        payments: [
          {
            type: "balance",
            currency: currency,
            amount: amount,
          },
        ],
        passengers: [
          {
            phone_number: "+44 7424805374",
            email: email,
            born_on: "1980-07-24",
            title: "mr",
            gender: "m",
            family_name: lastName,
            given_name: firstName,

            id: passengerId,
          },
        ],
        type: "instant",
      },
    };
    try {
      const response=await axios.post('/api/search/flight/book',searchParams)

      // const response = await axios.post(`/air/orders`, searchParams, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //     // 'Accept-Encoding':'gzip',
      //     "Duffel-Version": "v1",
      //     Authorization: `Bearer duffel_test_43bGm7ip2Xv4ecGiNOvh8XYvtabiFCobJf5y0Ipiggf`,
      //   },
      // });
      const createOrder = response.data.createOrder;
      updateDatabase(createOrder);
      console.log(createOrder);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      {/* Common Banner Area */}
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text">
                <h2>Flight submission</h2>
                <ul>
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li>
                    <span>
                      <i className="fas fa-circle" />
                    </span>
                    <a href="flight-search-result.html">Flight search </a>
                  </li>
                  <li>
                    <span>
                      <i className="fas fa-circle" />
                    </span>{" "}
                    Flight booking
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Tour Booking Submission Areas */}
      <section id="tour_booking_submission" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <form className="tou_booking_form_Wrapper">
                <div className="booking_tour_form">
                  <h3 className="heading_theme">Passenger information</h3>
                  <div className="tour_booking_form_box">
                    <div id="tour_bookking_form_item">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control bg_input"
                              placeholder="First name*"
                              required
                              value={fname}
                              onChange={(e) => setFname(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control bg_input"
                              placeholder="Last name*"
                              required
                              value={lName}
                              onChange={(e) => setLName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control bg_input"
                              placeholder="Email address (Optional)"
                              value={emailAddress}
                              onChange={(e) => setEmailAddress(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="string"
                              className="form-control bg_input"
                              placeholder="Mobile number*"
                              required
                              value={mNumber}
                              onChange={(e) => setMNumber(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control bg_input"
                              placeholder="Street address"
                              required
                              value={streetAddress}
                              onChange={(e) => setStreetAddress(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control bg_input"
                              placeholder="Apartment, Suite, House no (optional)"
                              value={hNumber}
                              onChange={(e) => setHNumber(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <select
                              className="form-control form-select bg_input"
                              onChange={(e) => setcity(e.target.value)}
                            >
                              <option value="">city</option>
                              {cities.map((cit) => (
                                <option key={cit} value={cit}>
                                  {cit}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <select
                              className="form-control form-select bg_input"
                              onChange={(e) => setState(e.target.value)}
                            >
                              <option value="">State</option>
                              {states.map((stat) => (
                                <option value="stat" key={stat}>
                                  {stat}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <select
                              className="form-control form-select bg_input"
                              onChange={(e) => setCountry(e.target.value)}
                            >
                              <option value="">Country</option>
                              {countries.map((count) => (
                                <option value="count" key={count}>
                                  {count}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control bg_input"
                              placeholder="Passport no."
                              required
                              value={pNumber}
                              onChange={(e) => setPNumber(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control bg_input"
                              placeholder="Visa no."
                              required
                              value={vNumber}
                              onChange={(e) => setVNumber(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="booking_tour_form">
                  <h3 className="heading_theme">Payment method</h3>
                  <div className="tour_booking_form_box">
                    <div className="booking_payment_boxed">
                      <div id="payment_checked">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            // defaultValue="red"
                            // checked={
                            //   paymentMethod === "Payment by card" && true
                            // }
                            onClick={() => setPaymentMethod("Payment by card")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                            onClick={() => setPaymentMethod("Payment by card")}
                          >
                            Payment by card
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            defaultValue="green"
                            // checked={paymentMethod === "Paypal" && true}
                            onClick={() => setPaymentMethod("Paypal")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                            onClick={() => setPaymentMethod("Paypal")}
                          >
                            Paypal
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault3"
                            defaultValue="black"
                            // checked={paymentMethod === "Payoneer" && true}
                            onClick={() => setPaymentMethod("Payoneer")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault3"
                            onClick={() => setPaymentMethod("Payoneer")}
                          >
                            Payoneer
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault4"
                            defaultValue="white"
                            // checked={
                            //   paymentMethod === "Cash on delivery" && null
                            // }
                            onClick={() => setPaymentMethod("Cash on delivery")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault4"
                            onClick={() => setPaymentMethod("Cash on delivery")}
                          >
                            Cash on delivery
                          </label>
                        </div>
                        <div className="payment_filed_wrapper">
                          <div
                            className={`payment_card payment_toggle red ${
                              paymentMethod === "Payment by card" && "d-block"
                            }`}
                          >
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control bg_input"
                                    placeholder="Card number"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control bg_input"
                                    placeholder="Cardholder name"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control bg_input"
                                    placeholder="Date of expiry"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control bg_input"
                                    placeholder="Security code"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`paypal_payment payment_toggle green ${
                              paymentMethod === "Paypal" && "d-block"
                            }`}
                          >
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control bg_input"
                                    placeholder="Email Address"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`paypal_payment payment_toggle black ${
                              paymentMethod === "Payoneer" && "d-block"
                            }`}
                          >
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control bg_input"
                                    placeholder="Email Address"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="booking_tour_form_submit">
                  <div className="form-check write_spical_check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue
                      id="flexCheckDefaultf1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefaultf1"
                    >
                      I read and accept all{" "}
                      <a href="terms-service.html">Terms and conditios</a>
                    </label>
                  </div>
                  <button
                    // type="submit"
                    className="btn btn_theme btn_md"
                    onClick={(e) => bookFlightHandler(e)}
                  >
                    Pay now
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-4">
              <div className="tour_details_right_sidebar_wrapper">
                <div className="tour_detail_right_sidebar">
                  <div className="tour_details_right_boxed">
                    <div className="tour_details_right_box_heading">
                      <h3>Flights</h3>
                    </div>

                    {/* flight information block */}
                    {bookingData.slices && bookingData.slices.length >= 1 ? (
                      bookingData.slices.map((slice, index) => (
                        <div className="flight_sidebar_right" key={index}>
                          <div className="flight_search_left_sidebar">
                            <div className="flight_search_destination_sidebar">
                              <p>From</p>
                              <h3>{slice.origin.city.name}</h3>
                              <h6>{slice.origin.name}</h6>
                            </div>
                          </div>
                          <div className="flight_search_middel_sidebar">
                            <div className="flight_right_arrow_sidebar">
                              <img
                                className="img-color"
                                src="assets/img/icon/right_arrow.png"
                                alt="icon"
                              />
                              <h6>Non-stop</h6>
                              <p>{slice.duration} </p>
                            </div>
                            <div className="flight_search_destination_sidebar">
                              <p>To</p>
                              <h3>{slice.destination.city.name} </h3>
                              <h6>{slice.destination.name} </h6>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}

                    <div className="tour_package_details_bar_list">
                      <h5>Package rules</h5>
                      <ul>
                        <li>
                          <i className="fas fa-circle" />
                          Buffet breakfast as per the Itinerary
                        </li>
                        <li>
                          <i className="fas fa-circle" />
                          Visit eight villages showcasing Polynesian culture
                        </li>
                        <li>
                          <i className="fas fa-circle" />
                          Complimentary Camel safari, Bonfire,
                        </li>
                        <li>
                          <i className="fas fa-circle" />
                          All toll tax, parking, fuel, and driver allowances
                        </li>
                        <li>
                          <i className="fas fa-circle" />
                          Comfortable and hygienic vehicle
                        </li>
                      </ul>
                    </div>
                    <div className="tour_package_details_bar_price">
                      <h5>Price</h5>
                      <div className="tour_package_bar_price">
                        <h6>
                          <del>$ 35,500</del>
                        </h6>
                        <h3>
                          {bookingData.total_currency}{" "}
                          {bookingData.total_amount} <sub> / Adult X 1</sub>{" "}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tour_detail_right_sidebar">
                  <TourTravelDateCard />
                </div>
                <div className="tour_detail_right_sidebar">
                  <div className="tour_details_right_boxed">
                    <div className="tour_details_right_box_heading">
                      <h3>Coupon code</h3>
                    </div>
                    <div className="coupon_code_area_booking">
                      <form action="#!">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control bg_input"
                            placeholder="Enter coupon code"
                          />
                        </div>
                        <div className="coupon_code_submit">
                          <button className="btn btn_theme btn_md">
                            Apply voucher
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="tour_detail_right_sidebar">
                  <div className="tour_details_right_boxed">
                    <div className="tour_details_right_box_heading">
                      <h3>Booking amount</h3>
                    </div>
                    <div className="tour_booking_amount_area">
                      <ul>
                        <li>
                          Adult Price x 1{" "}
                          <span>{bookingData.total_amount}</span>
                        </li>
                        <li>
                          Discount <span>-10%</span>
                        </li>
                        <li>
                          Tax<span>5%</span>
                        </li>
                      </ul>
                      <div className="tour_bokking_subtotal_area">
                        <h6>
                          Subtotal <span>{bookingData.total_amount}</span>
                        </h6>
                      </div>
                      <div className="coupon_add_area">
                        <h6>
                          <span className="remove_coupon_tour">Remove</span>{" "}
                          Coupon code (OFF 5000)
                          <span>$5,000.00</span>
                        </h6>
                      </div>
                      <div className="total_subtotal_booking">
                        <h6>
                          Total Amount <span>$33,000.00</span>{" "}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaSection />
    </Layout>
  );
};

export default FlightBookingPage;
