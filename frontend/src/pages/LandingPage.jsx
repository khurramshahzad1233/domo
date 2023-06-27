import React from "react";
import Layout from "../components/global/Layout";
import BannerSection from "../components/sections/BannerSection";
import FormSection from "../components/sections/FormSection";
import TopDestinationSection from "../components/sections/TopDestinationSection";
import ExploreSection from "../components/sections/ExploreSection";
import OfferSection from "../components/sections/OfferSection";
import PromotionalToursSection from "../components/sections/PromotionalToursSection";
import OurPartnersSection from "../components/sections/OurPartnersSection";
import CtaSection from "../components/sections/CtaSection";

const LandingPage = () => {
  return (
    <Layout>
      <BannerSection />
      <FormSection />
      <TopDestinationSection />
      <ExploreSection />
      <OfferSection />
      <PromotionalToursSection />
      <OurPartnersSection />
      <CtaSection />
    </Layout>
  );
};

export default LandingPage;
