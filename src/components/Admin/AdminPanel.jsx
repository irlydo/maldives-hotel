import React, { useState, useEffect } from "react";
import './admin.css'

export default function AdminPanel() {
  const [messages, setMessages] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/bookings")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error("Fetch error for bookings:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/messages")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const deleteMessage = (id) => {
    fetch(`http://localhost:3000/messages/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setMessages(messages.filter((message) => message.id !== id));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="admin-text">
        <h1>Hi, welcome to the admin panel.</h1>
        <i>
          <h3>Here are the messages from users and the bookings.</h3>
        </i>
      </div>
      <div className="booking-section">
        <h2 className='adminpanel-h1'>Bookings</h2>
        {bookings.map((booking, index) => (
          <div className="admin-booking" key={index}>
            <p>
              <b>Start Date:</b> {booking.reservedDates.startDate}
            </p>
            <p>
              <b>End Date:</b> {booking.reservedDates.endDate}
            </p>
            <p>
              <b>Name:</b> {booking.name}
            </p>
            <p>
              <b>Email:</b> {booking.email}
            </p>
          </div>
        ))}
      </div>
      <hr></hr>
      <div className="messages">
        <h2 className='adminpanel-h1'>Messages</h2>
        {messages.map((messageObj, index) => (
          <div className="admin-messages" key={messageObj.id}>
            <p>
              <b>Name: </b>
              {messageObj.name}
            </p>
            <p>
              <b>Email: </b>
              <a className="email" href={`mailto:${messageObj.email}`}>
                {messageObj.email}
              </a>
            </p>
            <p>
              <b>Message: </b>
              {messageObj.message}
            </p>
            <input type="text" className="reply"></input>
            <button type="submit" onClick={() => deleteMessage(messageObj.id)}>
              {" "}
              Reply{" "}
            </button>
            <i
              className="fa-regular fa-trash-can"
              onClick={() => deleteMessage(messageObj.id)}
            ></i>
            <div className="admin-divider"></div>
          </div>
        ))}
      </div>
    </>
  );
}
