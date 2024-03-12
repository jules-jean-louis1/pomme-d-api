"use client";
import { useEffect, useState, useRef } from "react";

const SignupPage = () => {
  const [submit, setSubmit] = useState(false);

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const sendData = async () => {
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  useEffect(() => {
    if (submit) {
      sendData();
      setSubmit(false);
    }
  }, [submit]);

  return (
    <div>
      <h1>Signup</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          ref={usernameRef}
        />
        <input type="text" name="email" placeholder="Email" ref={emailRef} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          ref={passwordRef}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          ref={confirmPasswordRef}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
