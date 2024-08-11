import React, { useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import user_icon from "./Assets/person.png"; // Update this icon if necessary
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";
import "./LoginSignup.css";

interface HomeProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

function Home({ setIsLoggedIn }: HomeProps) {
  const [action, setAction] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aadhar, setAadhar] = useState(""); // Changed from username to aadhar
  const navigate = useNavigate();

  const handleSignUp = () => {
    alert("Sign Up functionality is not implemented.");
    // Simulate user creation
    setAction("Login");
  };

  const handleLogin = () => {
    alert("Login functionality is not implemented.");
    // Simulate login
    setIsLoggedIn(true);
    navigate("/vote");
  };

  return (
    <div className="cont">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action === "Login" ? null : (
          <div className="input">
            <img src={user_icon} alt="Aadhar" /> {/* Update icon if needed */}
            <input
              type="text"
              placeholder="Aadhar Number"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
            />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="Email" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={password_icon} alt="Password" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {action === "Sign Up" ? null : (
        <div className="forgot-password">
          Lost Password? <span>Click Here!</span>
        </div>
      )}

      <div className="Submit-container">
        {action === "Login" ? (
          <>
            <div className="submit blue" onClick={handleLogin}>
              Login
            </div>
            <div
              className="submit gray"
              onClick={() => setAction("Sign Up")}
            >
              Sign Up
            </div>
          </>
        ) : (
          <>
            <div
              className="submit gray"
              onClick={() => setAction("Login")}
            >
              Login
            </div>
            <div className="submit blue" onClick={handleSignUp}>
              Sign Up
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
