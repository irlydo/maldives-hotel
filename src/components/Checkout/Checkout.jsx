import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import "./Checkout.css";
const Checkout = () => {
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState({
    startDate: "",
    endDate: "",
  });

  const [totalCost, setTotalCost] = useState("");

  useEffect(() => {
    const dates = JSON.parse(localStorage.getItem("selectedDates"));
    const cost = localStorage.getItem("totalCost");

    if (dates) {
      setSelectedDates({
        startDate: moment(dates.startDate).format("MMMM Do YYYY"),
        endDate: moment(dates.endDate).format("MMMM Do YYYY"),
      });
    }
    if (cost) {
      setTotalCost(cost);
    }

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let reservedDates = JSON.parse(localStorage.getItem("reservedDates")) || [];
    reservedDates.push(selectedDates);
    localStorage.setItem("reservedDates", JSON.stringify(reservedDates));

    const formData = new FormData(e.target);
    localStorage.setItem("email", formData.get("email"));
    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      reservedDates: selectedDates,
      totalCost: totalCost,
    };

    fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/thankyou");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="checkout-container">
      <h2>Complete Your Reservation</h2>
      <div className="reservation-dates">
        <p>Reservation Dates:</p>
        <p>
          <strong>{selectedDates.startDate}</strong> to{" "}
          <strong>{selectedDates.endDate}</strong>
        </p>
      </div>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="cardInfo">Card Number:</label>
          <input type="text" id="cardInfo" name="cardInfo" required />
        </div>
        <div className="form-group">
          <label htmlFor="cardInfo">Expiry date:</label>
          <input type="text" id="cardInfo" name="expiry" required />
        </div>
        <div className="form-group">
          <label htmlFor="cardInfo">CVV:</label>
          <input type="password" id="cardInfo" name="cardInfo" required />
        </div>
        <div className="total-cost">
          <b>Total Price: £{totalCost}</b>
        </div>
        <button type="submit" className="submit-button">
          Complete Reservation
        </button>
      </form>
    </div>
  );
};

export default Checkout;
