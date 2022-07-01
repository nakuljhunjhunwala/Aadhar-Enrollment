import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router';
import Context from "../../Context/Context"

function Auth({ children }) {
  const [user, setUser] = useContext(Context);
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(false);
  useEffect(() => {
    if (user.login) {
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

export default Auth
