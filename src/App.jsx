import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Home from "./pages/Home";
import "leaflet/dist/leaflet.css";
import DayDetail from "./pages/DayDetail";
import { APP_NAME } from "./config";

function App() {
  const location = useLocation();

  useEffect(() => {
    let pageTitle = APP_NAME;

    if (location.pathname === "/") {
      pageTitle = `Home | ${APP_NAME}`;
    } else if (location.pathname.includes("/detail")) {
      pageTitle = `Weather Detail | ${APP_NAME}`;
    }

    document.title = pageTitle;
  }, [location]);

  return (
    <>
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:city/:date" element={<DayDetail />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;