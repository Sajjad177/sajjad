import type { Metadata } from "next";
import { Inconsolata, Signika } from "next/font/google";
import "./globals.css";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

const signika = Signika({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-title",
});

export const metadata: Metadata = {
  title: "Sajjad's Portfolio",
  description:
    "A portfolio showcasing my projects and skills as a full-stack developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inconsolata.variable} ${signika.variable}`}>
        {children}
      </body>
    </html>
  );
}
