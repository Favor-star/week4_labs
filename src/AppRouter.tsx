import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/layout/Layout";
import MoviesCard from "./components/MoviesCard";
import SingleMovie from "./components/layout/SingleMovie";

function AppRouter() {
  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <App />,
    // },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <MoviesCard />,
        },
        {
          path: "/movie/:id",
          element: <SingleMovie />,
        },
        {
          path: "watchlist",
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default AppRouter;
