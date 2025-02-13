import { Outlet } from "react-router";
import { Navbar } from "~/components/Navbar";

export default function NavbarLayout() {
  return (
    <div className="pb-[90px]">
      <Outlet />
      <Navbar />
    </div>
  );
}
