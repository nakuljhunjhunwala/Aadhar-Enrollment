import React, { useState, useEffect } from "react";
import Home from "../../components/Home/Home";
import "./AadharDetail.css";
import { getData } from "../../api/api";

function AadharDetail() {
  const [data, setData] = useState({});
  useEffect(() => {
    fetchData();
    async function fetchData() {
      try {
        const aadharData = await getData();
        setData(aadharData);
      } catch (error) {}
    }
  }, []);

  return (
    <Home>
      <div className="card">
        <p>Aadhar No: {data.aadharId}</p>
        <p>
          Name : {data.firstName} {data.lastName}
        </p>
        <p>Phone No: {data.phoneNumber}</p>
        <p>Email : {data.email}</p>
        <p>Address : {data.homeAddress}</p>
        <p>State : {data.state}</p>
      </div>
    </Home>
  );
}

export default AadharDetail;
