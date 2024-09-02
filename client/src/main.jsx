import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import RestaurantList from "./pages/RestaurantList";
import RestaurantDetail from "./pages/RestaurantDetail";
import LocationSearch from "./pages/LocationSearch";
import ImageSearch from "./pages/ImageSearch";
import Layout from "./components/Layout"; // Adjust the path based on where you place the Layout component
import NotFound from "./components/NotFound"; // Import the NotFound component
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/restaurants/:id" element={<RestaurantDetail />} />
          <Route path="/search/location" element={<LocationSearch />} />
          <Route path="/search/image" element={<ImageSearch />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);
