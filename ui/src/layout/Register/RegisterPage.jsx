import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import "./RegisterPage.css";
import CONSTANT from "../../constant/constant";
import axios from "axios";
import Context from "../../Context/Context";

function RegisterPage() {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const [user, setUser] = useContext(Context);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [code, setCode] = useState("");
  const [type, setType] = useState("admin");

  useEffect(() => {}, [user]);

  const signUpAction = async () => {
    if (email === "") {
      addToast("Fill all the Fields", {
        appearance: "error",
      });
    } else {
      try {
        let payload = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          type: type,
          code: code,
        };

        const user = await axios.post(
          `${CONSTANT.BASE_URL}${CONSTANT.AUTH_API.REGISTER}`,
          payload,
          { withCredentials: true }
        );
        addToast("User Registered Successfully", {
          appearance: "success",
        });
      } catch (error) {
        let message =
          error?.response?.data?.errors?.body[0]?.message ||
          error?.response?.data?.message ||
          "Error Occured";
        addToast(message, {
          appearance: "error",
        });
      }
    }
  };

  return (
    <div className="registerPage">
      <div className="registerContainer">
        <div className="registerHeader">
          <h3>Register</h3>
        </div>
        <div className="registerInput">
          <input
            type="text"
            placeholder="Firstname"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Lastname"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value.trim());
            }}
          />
          <select
            defaultValue="admin"
            placeholder="Type"
            onChange={(event) => {
              setType(event.target.value);
            }}
          >
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
          <input
            type="text"
            placeholder="Code"
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
            }}
          />
        </div>
        <div className="registerButton">
          <button
            onClick={async () => {
              await signUpAction();
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
