"use client";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Authlayout = ({ children }: LayoutProps) => {
  return <div>{children}</div>;
};

export default Authlayout;
