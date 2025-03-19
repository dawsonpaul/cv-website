"use client";

import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background-dark">
      <Header />
      <main className="flex-grow py-20">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
