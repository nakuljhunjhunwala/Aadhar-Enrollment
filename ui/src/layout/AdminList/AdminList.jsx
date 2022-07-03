import React, { useState, useEffect } from "react";
import Home from "../../components/Home/Home";
import "./AdminList.css";
import { viewAllData, getDataBasedOnState } from "../../api/api";

function AdminList() {
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  useEffect(() => {
    getData();
    async function getData() {
      let aadharData;
      try {
        if (search === "") {
          aadharData = await viewAllData();
        } else {
          aadharData = await getDataBasedOnState(search);
        }
        setData(aadharData);
      } catch (error) {
        console.log(error);
      }
    }
  }, [search]);

  return (
    <Home>
      <input
        type="text"
        className="search"
        value={search}
        placeholder="Search By State"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <br></br>
      <table>
        <thead>
          <th>Aadhar No</th>
          <th>Name</th>
          <th>Phone No</th>
          <th>Email</th>
          <th>Address</th>
          <th>State</th>
        </thead>
        <tbody>
          {(data?.result || []).map((aadhar) => {
            return (
              <tr>
                <td>{aadhar.aadharId}</td>
                <td>
                  {aadhar.firstName} {aadhar.lastName}
                </td>
                <td>{aadhar.phoneNumber}</td>
                <td>{aadhar.email}</td>
                <td>{aadhar.homeAddress}</td>
                <td>{aadhar.state}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <td colspan="1">Count: {data?.count || 0}</td>
        </tfoot>
      </table>
    </Home>
  );
}

export default AdminList;
