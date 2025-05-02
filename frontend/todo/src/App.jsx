import React, { useEffect, useState } from "react";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Todo from "./component/Todo";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // true = show login, false = show signup

  useEffect(() => {
    if (localStorage.getItem("token")) setIsLoggedIn(true);
  }, []);

  if (!isLoggedIn)
    return (
      <div>
        {showLogin ? (
          <>
            <Login onLogin={() => setIsLoggedIn(true)} />
            <p className="text-center mt-2">
              Don't have an account?{" "}
              <button className="text-blue-600 underline" onClick={() => setShowLogin(false)}>
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <>
            <Signup onSignup={() => setIsLoggedIn(true)} />
            <p className="text-center mt-2">
              Already have an account?{" "}
              <button className="text-blue-600 underline" onClick={() => setShowLogin(true)}>
                Login
              </button>
            </p>
          </>
        )}
      </div>
    );

  return <Todo />;
}