import React, { useState } from "react";
import Layout from "../components/global/Layout";
import CtaSection from "../components/sections/CtaSection";
import FlightCard from "../components/cards/FlightCard";
import FilterPrice from "../components/inputs/FilterPrice";
import FormSection from "../components/sections/FormSection";
import CommonBannerSection from "../components/sections/CommonBannerSection";

import { Flightstate } from "../context/Flightprovider";
import BookDate from "../components/inputs/BookDate";

const FlightSearchPage = () => {
  const [editFlight, setEditFlight] = useState(false);
  const { data, origin, destination } = Flightstate();

  console.log("data", origin, destination);
  // console.log(data && data.length);

  return (
    <Layout>
      {/* Common Banner Area */}
      <CommonBannerSection
        title="Flight search result"
        pageName="Flight search result"
      />
      {/* Form Area */}
      <section className="mt-md-5" id="theme_search_form_tour">
        {editFlight && <FormSection />}
        <div
          className={`${editFlight ? "" : "mt-5 mt-md-0"}`}
          id="theme_search_form"
          style={{ marginTop: "-24px" }}
        >
          <div className="container">
            <div className="theme_search_form_area d-flex flex-wrap align-items-center gap-3">
              <div className="d-flex align-items-center gap-3 me-auto">
                <div>
                  <i class="fas fa-plane-departure fs-5"></i>
                </div>
                <div>
                  <div className="d-flex align-items-center gap-2 h5 mb-2 fw-semibold">
                    <span>Lahore</span>
                    <span>
                      <i class="fas fa-arrow-right fs-6"></i>
                    </span>
                    <span>Karachi</span>
                  </div>
                  <div className="small text-black-50">
                    Mon, 26 Jun | 1 Passenger
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setEditFlight(!editFlight)}
                  className="btn py-2 px-3 btn-outline-primary"
                >
                  <span className="me-2">
                    <i className="fas fa-edit"></i>
                  </span>
                  <span>Change Flight</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Flight Search Areas */}
      <section id="explore_area" className="section_padding">
        <div className="container">
          {/* Section Heading */}
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="section_heading_center">
                <h2>{data && data.length} tours found</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <FilterPrice />
            </div>
            <div className="col-lg-9">
              <div className="mb-4">
                <BookDate />
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="flight_search_result_wrapper">
                    <FlightCard />
                    {/* <FlightCard />
                    <FlightCard />
                    <FlightCard /> */}
                  </div>
                  <div className="load_more_flight">
                    {/* <button type="button" className="btn btn_md">
                      <i className="fas fa-spinner" /> Load more..
                    </button> */}
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

export default FlightSearchPage;
