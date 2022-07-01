import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../Context/Context";

function Home() {
  const [, setUser] = useContext(Context);
  const navigate = useNavigate();
  let logout = () => {
    localStorage.removeItem("token");
    setUser({ login: false });
  };
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <button
        onClick={() => {
          navigate("/register");
        }}
      >
        Register
      </button>
    </div>
  );
}

export default Home;
