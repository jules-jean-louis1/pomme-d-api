"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const profilPage = () => {
  const router = useRouter();
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const sendData = async () => {
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await fetch("/api/profil", {
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

      if (response.status === 400) {
        if (data.message === "Invalid Username") {
          setUsernameError("Nom d'utilisateur invalide");
        }
        if (data.message === "Invalid email") {
          setEmailError("Email invalide");
        }

        if (data.message === "Passwords do not match") {
          setError("Les mots de passe ne correspondent pas");
        }

      }
      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          router.replace("/profil");
        }, 3000);
      }
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
      setError(false);
      setEmailError(false);
      setUsernameError(false);
      setPasswordError(false);
      sendData();
      setSubmit(false);
    }
  }, [submit]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 h-1/2">
        <div className="border rounded-md p-4 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h2 className="text-3xl font-bold pb-3">Profil</h2>
          <form method="POST" onSubmit={handleSubmit}>
            <Label
              className="text-gray-600 dark:text-gray-400 required"
              htmlFor="Username"
            >
              Nom d'utilisateur
            </Label>
            <Input
              className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              ref={usernameRef}
            />
            {usernameError && (
              <p className="text-red-500 text-sm">{usernameError}</p>
            )}
            <Label
              className="text-gray-600 dark:text-gray-400 required"
              htmlFor="Email"
            >
              Email
            </Label>
            <Input
              className={`border-gray-300 dark:border-gray-700 ${
                emailError ? "border-red-500" : ""
              } bg-white dark:bg-gray-800`}
              type="text"
              name="email"
              placeholder="Email"
              ref={emailRef}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
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
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}


            <div className="h-7">
              {success && <p className="text-green-500">Login réussie</p>}
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default profilPage;