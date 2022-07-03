import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../Context/Context";
import "./Home.css";

function Home({ children }) {
  const [user, setUser] = useContext(Context);
  const navigate = useNavigate();
  let logout = () => {
    localStorage.removeItem("token");
    setUser({ login: false });
  };
  return (
    <div className="background">
      <div className="header">
        <div className="title">
          <h3>Aadhar Enrollment</h3>
        </div>
        <div className="menu">
          <button className="logoutButton" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div className="mainBody">
        <div className="childrenContainer">{children}</div>
        {user?.role === "admin" && (
          <div className="registerButtonContainer">
            <button
              className="register"
              onClick={() => {
                navigate("/register");
              }}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
