import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Import custom CSS file

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(true);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/register", {
        username,
        password,
        email,
      });

      if (response.data.success) {
        console.log(`\n xxx`, response.data, `\n`);
        setIsRegister(true); // Switch to Login after successful registration
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
    setUsername("");
    setPassword("");
    setEmail("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        username,
        password,
      });

      if (response.data.success) {
        console.log(`\n xxx`, response.data, `\n`);
        navigate("/welcome");
      } else {
        console.log("response.data.message", response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-page">
      {isRegister ? (
        <React.Fragment>
          <button onClick={() => setIsRegister(false)}>Go to Register</button>
          <h2>Login </h2>
          <form className="login-form" onSubmit={handleLogin}>
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
            <button className="submit-button" type="submit">
              Login
            </button>
          </form>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <button onClick={() => setIsRegister(true)}>Go to Login</button>
          <h2>Register </h2>
          <form className="login-form" onSubmit={handleRegister}>
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
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="submit-button" type="submit">
              Register
            </button>
          </form>
        </React.Fragment>
      )}
    </div>
  );
}

export default LoginPage;
