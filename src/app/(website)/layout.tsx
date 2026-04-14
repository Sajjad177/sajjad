import Footer from "@/components/website/Footer";
import Navbar from "@/components/website/Navbar/Navbar";
import CustomCursor from "@/components/website/CustomCursor";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-[#1a1a1a] bg-[#f7efe2]">
      <CustomCursor />
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
