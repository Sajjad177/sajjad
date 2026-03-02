import type { Metadata } from "next";
import { Inconsolata, Signika } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inconsolata.variable} ${signika.variable}`}
    >
      <body className="transition-colors duration-500 bg-neutral-50 text-black dark:bg-neutral-950 dark:text-white">
        <ThemeProvider>
          <Toaster position="top-center" richColors />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
