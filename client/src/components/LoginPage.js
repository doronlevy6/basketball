import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Import custom CSS file

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make API call to the backend server
    try {
      const response = await axios.post("http://localhost:4000/login", {
        username,
        password,
        email,
      });

      if (response.data.success) {
        // If login is successful, redirect to the welcome page
        console.log(`\n xxx`, response.data, `\n`); //!
        navigate("/welcome");
      } else {
        // Handle invalid credentials
        console.log(response.data.message);
      }
    } catch (error) {
      // Handle error
      console.log(error.message);
    }

    // Clear the form after submission
    setUsername("");
    setPassword("");
    setEmail("");
  };

  return (
    <div className="login-page">
      <h2>Login </h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="submit-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
