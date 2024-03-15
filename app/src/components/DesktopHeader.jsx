"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import SearchBar from "./SearchBar";

const DesktopHeader = () => {
  const { data: session } = useSession();
  const [query, setQuery] = useState("");
  return (
    <header className="flex items-center justify-between h-14 px-4 border-b bg-white md:px-6 dark:bg-gray-950">
      <div className="flex items-center">
        <Link className="flex items-center gap-2 mr-4" href="/">
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Kilimi
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          <Link className="font-medium" href="#">
            Services
          </Link>
        </nav>
      </div>
      <div className="z-50 absolute top-0 w-1/2">
        <SearchBar query={query} setQuery={setQuery} />
      </div>
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
            <Button size="sm">
              <Link href="/signin">Connexion</Link>
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
