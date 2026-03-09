import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Layout from "./components/Layout";
import Header from "./components/Header";
import AppLayout from "./components/AppLayout";

import Home from "./pages/Home";
import DayDetail from "./pages/DayDetail";

import "leaflet/dist/leaflet.css";

import { APP_NAME } from "./config";
import { isPWA } from "./utils/isPWA";

function App() {

  const location = useLocation();

  const installed = isPWA();

  useEffect(() => {

    let pageTitle = APP_NAME;

    if (location.pathname === "/") {
      pageTitle = `Home | ${APP_NAME}`;
    }
    else if (location.pathname.includes("/detail")) {
      pageTitle = `Weather Detail | ${APP_NAME}`;
    }

    document.title = pageTitle;

  }, [location]);



  if (installed) {

    return (

      <AppLayout>

        <Routes>

          <Route path="/" element={<Home />} />

          <Route
            path="/detail/:city/:date"
            element={<DayDetail />}
          />

        </Routes>

      </AppLayout>

    );

  }



  return (

    <>

      <Header />

      <Layout>

        <Routes>

          <Route path="/" element={<Home />} />

          <Route
            path="/detail/:city/:date"
            element={<DayDetail />}
          />

        </Routes>

      </Layout>

    </>

  );

}

export default App;