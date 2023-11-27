import React, { useState, useEffect } from "react";

export default function AdminPanel() {
  const [messages, setMessages] = useState([]);

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
    fetch(`http://localhost:3000/messages/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Update state to remove the message from the UI
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
          <h3>Here are the messages from users.</h3>
        </i>
      </div>

      {messages.map((messageObj, index) => (
  <div className="admin-messages" key={messageObj.id}>
    <p>
      <b>Name: </b>
      {messageObj.name}
    </p>
    <p>
      <b>Email: </b>
      <a className='email' href={`mailto:${messageObj.email}`}>{messageObj.email}</a>
    </p>
    <p>
      <b>Message: </b>
      {messageObj.message}
    </p>
    <input type="text" className='reply'></input>
    <button type="submit" onClick={() => deleteMessage(messageObj.id)}> Reply </button>
    <i className="fa-regular fa-trash-can" onClick={() => deleteMessage(messageObj.id)}></i>
    <div className="admin-divider"></div>
  </div>
))}

    </>
  );
}
