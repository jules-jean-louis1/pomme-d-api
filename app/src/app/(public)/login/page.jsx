"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useRef } from "react";

const SignupPage = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 h-1/2">
        <div className="border rounded-md p-4 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h2 className="text-3xl font-bold pb-3">Connexion</h2>
          <form method="POST" onSubmit={handleSubmit}>
            <Label
              className="text-gray-600 dark:text-gray-400 required"
              htmlFor="Username"
            >
              Nom d'utilisateur / Email
            </Label>
            <Input
              className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              type="text"
              name="username"
              placeholder="Nom d'utilisateur / Email"
              ref={usernameRef}
            />
            <Label
              className="text-gray-600 dark:text-gray-400 required"
              htmlFor="Password"
            >
              Mot de passe
            </Label>
            <Input
              className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              type="password"
              name="password"
              placeholder="Mot de passe"
              ref={passwordRef}
            />
            <div className="pt-2">
              <Button type="submit">Connexion</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
