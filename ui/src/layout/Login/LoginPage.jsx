import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import "./LoginPage.css";
import { login, resolveToken } from "../../api/api";
import Context from "../../Context/Context";

function LoginPage() {
  const [user, setUser] = useContext(Context);
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user?.login) {
      navigate("/home");
    }
    if (user.error) {
      addToast(user.error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, [user]);

  const showPassword = (e) => {
    const passwordInput = document.getElementById("password");
    const eye = document.getElementById("eyePassword");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
    eye.classList.toggle("fa-eye-slash");
  };

  const loginAction = async () => {
    if (email === "" || password === "") {
      addToast("Fill all the Fields", {
        appearance: "error",
      });
    } else {
      let payload = {
        email: email,
        password: password,
      };
      try {
        console.log("reached");
        await login(payload);
        const token = localStorage.getItem("token");
        console.log("token", token);
        const data = await resolveToken({ token });
        data && setUser(data);
      } catch (error) {
        console.log("error", error);
        addToast(error.message, {
          appearance: "error",
        });
      }
    }
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="loginHeader">
          <h3>Login</h3>
        </div>
        <div className="loginInput">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value.trim());
            }}
          />
          <span>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <i
              className="far fa-eye"
              id="eyePassword"
              onClick={showPassword}
            ></i>
          </span>
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            Forget Password?
          </a>
        </div>
        <div className="loginButton">
          <button
            onClick={async () => {
              await loginAction();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
