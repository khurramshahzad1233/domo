import React from "react";
import Layout from "../components/global/Layout";
import CtaSection from "../components/sections/CtaSection";
import CommonBannerSection from "../components/sections/CommonBannerSection";

const FaqsPage = () => {
  return (
    <Layout>
      {/* Common Banner Area */}
      <CommonBannerSection title="Faqs" pageName="Faqs" />
      {/* Faqs Area */}
      <section id="faqs_main_arae" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="section_heading_center">
                <h2>Frequent answer and question</h2>
              </div>
            </div>
          </div>
          <div className="faqs_area_top">
            <div className="row">
              <div className="col-lg-8">
                <div className="faqs_three_area_wrapper">
                  {/* Item One */}
                  <div className="faqs_item_wrapper">
                    <h3>General question</h3>
                    <div className="faqs_main_item">
                      <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              It is a long established fact that a reader will
                              be distracted by the readable content?
                            </button>
                          </h2>
                          <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <p>
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingTwo">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              It is a long established fact that a reader will
                              be distracted by the readable content?
                            </button>
                          </h2>
                          <div
                            id="collapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <p>
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingThree">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseThree"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                            >
                              It is a long established fact that a reader will
                              be distracted by the readable content?
                            </button>
                          </h2>
                          <div
                            id="collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingThree"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <p>
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingFour">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseFour"
                              aria-expanded="false"
                              aria-controls="collapseFour"
                            >
                              It is a long established fact that a reader will
                              be distracted by the readable content?
                            </button>
                          </h2>
                          <div
                            id="collapseFour"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingFour"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <p>
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Item Two */}
                  <div className="faqs_item_wrapper">
                    <h3>Regular question</h3>
                    <div className="faqs_main_item">
                      <div className="accordion" id="accordionExampleTwo">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOnef1">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOnef1"
                              aria-expanded="true"
                              aria-controls="collapseOnef1"
                            >
                              It is a long established fact that a reader will
                              be distracted by the readable content?
                            </button>
                          </h2>
                          <div
                            id="collapseOnef1"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingOnef1"
                            data-bs-parent="#accordionExampleTwo"
                          >
                            <div className="accordion-body">
                              <p>
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingTwof1">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwof1"
                              aria-expanded="false"
                              aria-controls="collapseTwof1"
                            >
                              It is a long established fact that a reader will
                              be distracted by the readable content?
                            </button>
                          </h2>
                          <div
                            id="collapseTwof1"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingTwof1"
                            data-bs-parent="#accordionExampleTwo"
                          >
                            <div className="accordion-body">
                              <p>
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingThreef1">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseThreef1"
                              aria-expanded="false"
                              aria-controls="collapseThreef1"
                            >
                              It is a long established fact that a reader will
                              be distracted by the readable content?
                            </button>
                          </h2>
                          <div
                            id="collapseThreef1"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingThreef1"
                            data-bs-parent="#accordionExampleTwo"
                          >
                            <div className="accordion-body">
                              <p>
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingFourf1">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseFourf1"
                              aria-expanded="false"
                              aria-controls="collapseFourf1"
                            >
                              It is a long established fact that a reader will
                              be distracted by the readable content?
                            </button>
                          </h2>
                          <div
                            id="collapseFourf1"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingFourf1"
                            data-bs-parent="#accordionExampleTwo"
                          >
                            <div className="accordion-body">
                              <p>
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Item Three */}
                  <div className="faqs_item_wrapper">
                    <h3>Advance question</h3>
                    <div className="faqs_main_item">
                      <div className="accordion" id="accordionExampleThree">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOnef2">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOnef2"
                              aria-expanded="true"
                              aria-controls="collapseOnef2"
                            >
                              It is a long established fact that a reader will
                              be distracted by the readable content?
                            </button>
                          </h2>
                          <div
                            id="collapseOnef2"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingOnef2"
                            data-bs-parent="#accordionExampleThree"
                          >
                            <div className="accordion-body">
                              <p>
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingTwof2">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwof2"
                              aria-expanded="false"
                              aria-controls="collapseTwof2"
                            >
                              It is a long established fact that a reader will
                              be distracted by the readable content?
                            </button>
                          </h2>
                          <div
                            id="collapseTwof2"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingTwof2"
                            data-bs-parent="#accordionExampleThree"
                          >
                            <div className="accordion-body">
                              <p>
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingThreef2">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseThreef2"
                              aria-expanded="false"
                              aria-controls="collapseThreef2"
                            >
                              It is a long established fact that a reader will
                              be distracted by the readable content?
                            </button>
                          </h2>
                          <div
                            id="collapseThreef2"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingThreef2"
                            data-bs-parent="#accordionExampleThree"
                          >
                            <div className="accordion-body">
                              <p>
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingFourf2">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseFourf2"
                              aria-expanded="false"
                              aria-controls="collapseFourf2"
                            >
                              It is a long established fact that a reader will
                              be distracted by the readable content?
                            </button>
                          </h2>
                          <div
                            id="collapseFourf2"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingFourf2"
                            data-bs-parent="#accordionExampleThree"
                          >
                            <div className="accordion-body">
                              <p>
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="faqs_call_area">
                  <img
                    className="img-color"
                    src="assets/img/icon/call.png"
                    alt="img"
                  />
                  <h5>Contact us 24/7</h5>
                  <h3>
                    <a href="tel:+00-123-456-789">+00 123 456 789</a>
                  </h3>
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

export default FaqsPage;
