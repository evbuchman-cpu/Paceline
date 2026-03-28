import { ReactNode } from "react";
import DashboardTopNavbar from "./_components/top-navbar";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DashboardTopNavbar>{children}</DashboardTopNavbar>
  );
}
