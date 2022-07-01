import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router';
import Context from "../../Context/Context"

function AdminAuth({ children }) {
  const [user, setUser] = useContext(Context);
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(false);
  useEffect(() => {
    if (user?.login && user?.role === 'admin') {
      setHasAccess(true)
    } else {
      setHasAccess(false)
      navigate('/login')
    }
  }, [user])
  return (
    <>
      {hasAccess && (children)}
    </>
  )
}

export default AdminAuth
