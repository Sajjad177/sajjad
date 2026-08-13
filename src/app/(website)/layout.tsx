import Footer from "@/components/website/Footer";
import Navbar from "@/components/website/Navbar/Navbar";
import CustomCursor from "@/components/website/CustomCursor";
import ChatWidget from "@/components/website/ChatWidget";
import { PortfolioIntro, ScrollProgress } from "@/components/animations";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScrollProgress />
      <PortfolioIntro />
      <CustomCursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default CommonLayout;
