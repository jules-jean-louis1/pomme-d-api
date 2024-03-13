"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";

const SignInPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    await signIn("credentials", {
      username,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <main className="flex justify-center w-full">
      <section className="w-full p-16">
        <div className="w-full max-w-[1260px] mx-auto text-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-semibold text-6xl mt-[12vh] mb-6 text-center">
              Connexion
            </h1>
            <div className="flex flex-col max-w-[320px] w-full">
              <div className="flex flex-col space-y-2">
                <Button onClick={() => signIn("github")} variant="outline">
                  Continuer avec Github
                </Button>
                <Button onClick={() => signIn("google")} variant="outline">
                  Continuer avec Google
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                  width: "100%",
                  height: "42px",
                  flex: "0 0 auto",
                }}
              >
                <div
                  role="separator"
                  style={{
                    width: "100%",
                    height: "1px",
                    visibility: "visible",
                    borderBottom: "1px solid rgba(55, 53, 47, 0.16)",
                  }}
                ></div>
              </div>

              <div>
                <form action="" method="POST" onSubmit={handleSubmit}>
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
                  />
                  <div className="pt-2">
                    <Button type="submit">Connexion</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignInPage;
