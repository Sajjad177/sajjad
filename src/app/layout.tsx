import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
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
      className={`${outfit.variable}`}
    >
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased transition-colors duration-500 bg-background text-foreground">
        <ThemeProvider>
          <Toaster position="top-center" richColors />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
