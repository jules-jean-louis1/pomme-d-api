"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useSession, signIn, signOut } from "next-auth/react";

const DesktopHeader = () => {
  const { data: session } = useSession();
  return (
    <header className="flex items-center h-14 px-4 border-b bg-white md:px-6 dark:bg-gray-950">
      <Link className="flex items-center gap-2 mr-4" href="#">
        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          API
        </span>
      </Link>
      <nav className="hidden md:flex items-center space-x-4 flex-1">
        <Link className="font-medium" href="#">
          Services
        </Link>
        <Link className="font-medium" href="#">
          Produits
        </Link>
        <Link className="font-medium" href="#">
          Contact
        </Link>
      </nav>
      <div className="flex space-x-2">
        {session ? (
          <>
            <Button variant="outline" size="sm">
              <Link href="/profil">{session?.user.username}</Link>
            </Button>
            <Button size="sm" onClick={() => signOut()}>
              Déconnexion
            </Button>
          </>
        ) : (
          <>
            <Button size="sm" onClick={() => signIn("github")}>
              Connexion
            </Button>
            <Button size="sm">
              <Link href="/signup">Inscription</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export { DesktopHeader };
