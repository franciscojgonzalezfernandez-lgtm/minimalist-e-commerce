import { Outlet } from "react-router";
import CustomHeader from "../components/CustomHeader";

export const ShopLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomHeader />
      <Outlet />
    </div>
  );
};
