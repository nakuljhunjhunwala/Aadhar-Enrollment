import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import { Redirect } from 'react-router'
import "./App.css";
import LoginPage from "./layout/Login/LoginPage";
import AdminList from "./layout/AdminList/AdminList";
import { ToastProvider } from "react-toast-notifications";
import AdminAuth from "./components/AdminAuth";
import Auth from "./components/Auth";
import RegisterPage from "./layout/Register/RegisterPage";
import Context from "./Context/Context"
import { resolveToken } from "./api/api"
import AadharDetail from "./layout/AadharDetail/AadharDetail";


function App() {
  const [user, setUser] = useState({ login: false });

  useEffect(() => {
    const token = localStorage.getItem("token");
    verifyUser(token);
    async function verifyUser(token) {
      if (token) {
        try {
          const data = await resolveToken({ token });
          setUser(data)
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [])

  return (
    <Context.Provider value={[user, setUser]}>
      <ToastProvider
        autoDismiss="true"
        newestOnTop
        placement="top-center"
        autoDismissTimeout="2000"
      >
        <div className="App">
          <Router>
            <Routes>
              <Route path="*" element={<Navigate to="/login" />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route
                exact
                path="/register"
                element={
                  <AdminAuth>
                    <RegisterPage />
                  </AdminAuth>
                }
              />
              <Route
                exact
                path="/adminList"
                element={
                  <AdminAuth>
                    <AdminList />
                  </AdminAuth>
                }
              />
              <Route
                exact
                path="/aadharList"
                element={
                  <Auth>
                    <AadharDetail />
                  </Auth>
                }
              />
            </Routes>
          </Router>
        </div>
      </ToastProvider>
    </Context.Provider>
  );
}

export default App;
