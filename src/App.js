import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
import Kassa from "./Pages/Kassa";
import Users from "./Pages/Users";
import Kirim from "./Pages/Kirim";
import Chiqim from "./Pages/Chiqim";
import CheckoutDetails from "./Components/CheckoutDetails";
import UserDetails from "./Components/UserDetails";

const App = () => {
  return (
    <div className="App position-relative">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Kassa />} />
          <Route path="/users" element={<Users />} />
          <Route path="/kirim" element={<Kirim />} />
          <Route path="/chiqim" element={<Chiqim />} />
          <Route path="/checkout/:checkoutID" element={<CheckoutDetails />} />
          <Route path="/user/:userID" element={<UserDetails />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
