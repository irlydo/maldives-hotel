import { useNavigate } from "react-router-dom";

import { useState } from "react";

export default function Admin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const userDetails = {
    username: "marshmallow123",
    password: "marshmallow123",
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const navigate = useNavigate();

  function submitEvent(event) {
    event.preventDefault();
    console.log("Submit button clicked!");

    const isCorrectUser =
      formData.username === userDetails.username &&
      formData.password === userDetails.password;
    console.log(
      isCorrectUser
        ? "Correct user details! Logging in.."
        : "False user details! Go away!"
    );

    if (isCorrectUser) {
      navigate("/adminPanel");
    }

    setFormData({
      username: "",
      password: "",
    });
  }

  return (
    <>
      <form className ='login-form' onSubmit={submitEvent}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        <button type="submit">Log in</button>
      </form>
    </>
  );
}
