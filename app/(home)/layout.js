import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
            <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <main className="flex-1 py-20 lg:px-6">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
