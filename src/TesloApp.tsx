import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";

export const TesloApp = () => {
  return <RouterProvider router={appRouter} />;
};
