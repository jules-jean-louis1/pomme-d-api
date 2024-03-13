"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const SignupPage = () => {
  const router = useRouter();
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

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

      if (response.status === 400) {
        if (data.message === "Username already exists") {
          setError("Nom d'utilisateur déjà existant");
        }
        if (data.message === "Invalid Username") {
          setUsernameError("Nom d'utilisateur invalide");
        }
        if (data.message === "Invalid email") {
          setEmailError("Email invalide");
        }
        if (data.message === "Email already exists") {
          setError("Email déjà existant");
        }
        if (data.message === "Passwords do not match") {
          setError("Les mots de passe ne correspondent pas");
        }
        if (data.message === "Invalid password") {
          setError(
            "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre"
          );
        }
      }
      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          router.replace("/login");
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
      setConfirmPasswordError(false);
      sendData();
      setSubmit(false);
    }
  }, [submit]);

  return (
    <main className="flex justify-center w-full">
      <section className="w-full p-16">
        <div className="w-full max-w-[1260px] mx-auto text-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-semibold text-6xl mt-[12vh] mb-6 text-center">
              Inscription
            </h1>
            <div className="flex flex-col max-w-[320px] w-full">
              <div>
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
                  {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                  )}
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
                  <Label
                    className="text-gray-600 dark:text-gray-400 required"
                    htmlFor="ConfirmPassword"
                  >
                    Confirmer le mot de passe
                  </Label>
                  <Input
                    className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmer le mot de passe"
                    ref={confirmPasswordRef}
                  />
                  {confirmPasswordError && (
                    <p className="text-red-500 text-sm">
                      {confirmPasswordError}
                    </p>
                  )}
                  <div className="h-7">
                    {success && (
                      <p className="text-green-500">Inscription réussie</p>
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                  </div>
                  <Button type="submit" className="w-full">
                    Inscription
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignupPage;
