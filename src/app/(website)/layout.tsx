import Footer from "@/components/website/Footer";
import Navbar from "@/components/website/Navbar/Navbar";
import CustomCursor from "@/components/website/CustomCursor";
import ChatWidget from "@/components/website/ChatWidget";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <CustomCursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default CommonLayout;
