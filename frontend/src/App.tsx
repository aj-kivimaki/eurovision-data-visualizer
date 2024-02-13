import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import SinglePage from "./routes/SinglePage";
import Root from "./routes/Root";
import Statistics from "./routes/Statistics";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/singlePage",
          element: <SinglePage />,
        },
        {
          path: "/statistics",
          element: <Statistics />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
