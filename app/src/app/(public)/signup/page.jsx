"use client";
import { useEffect, useState } from "react";

const SignupPage = () => {
  const [submit, setSubmit] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendData = async () => {
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
