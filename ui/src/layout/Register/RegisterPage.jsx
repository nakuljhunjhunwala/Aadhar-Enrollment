import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import "./RegisterPage.css";
import { createAadhar } from "../../api/api";

function RegisterPage() {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [state, setState] = useState("");

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
          phoneNo: Number(phoneNo),
          password: password,
          address: homeAddress,
          state: state,
        };

        await createAadhar(payload);
        addToast("User Registered Successfully", {
          appearance: "success",
        });
        navigate("/adminList");
      } catch (error) {
        let message =
          error?.response?.data?.error ||
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
          <h3>Create Aadhar</h3>
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
            placeholder="Phone Number"
            value={phoneNo}
            onChange={(event) => {
              setPhoneNo(event.target.value);
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
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <textarea
            type="text"
            placeholder="Home Address"
            value={homeAddress}
            onChange={(event) => {
              setHomeAddress(event.target.value.trim());
            }}
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(event) => {
              setState(event.target.value);
            }}
          />
        </div>
        <div className="registerButton">
          <button
            onClick={async () => {
              await signUpAction();
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
