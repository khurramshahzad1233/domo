import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/global/ScrollToTop";

// pages
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import FaqsPage from "./pages/FaqsPage";
import FlightSearchPage from "./pages/FlightSearchPage";
import FlightBookingPage from "./pages/FlightBookingPage";
import MyBookings from "./pages/dashboard/MyBookings";
import MyProfile from "./pages/dashboard/MyProfile";
import TermsUsePage from "./pages/TermsUsePage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./HOC/ProtectedRouter";
import AirlinesPage from "./pages/AirlinesPage";

const pages = [
  { path: "/", element: <LandingPage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/faq", element: <FaqsPage /> },
  { path: "/airlines", element: <AirlinesPage /> },
  { path: "/flight-search", element: <FlightSearchPage /> },
  { path: "/flight-booking", element: <FlightBookingPage /> },
  { path: "/terms-of-use", element: <TermsUsePage /> },
  { path: "/terms-and-conditions", element: <TermsConditionsPage /> },

  // { path: "/my-bookings", element: <MyBookings /> },
  // { path: "/my-profile", element: <MyProfile /> },
];

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <ScrollToTop />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route exact path="my-bookings" element={<MyBookings />} />
          <Route exact path="my-profile" element={<MyProfile />} />
        </Route>
        {pages.map((page) => (
          <Route
            key={`page${page.path}`}
            path={page.path}
            element={page.element}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
