import { Inter as FontSans } from "next/font/google";
import "../styles/globals.css";
import { DesktopHeader } from "@/components/DesktopHeader";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <DesktopHeader />
        {children}
      </body>
    </html>
  );
}
