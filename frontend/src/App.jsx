import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shared/Navbar";

import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import { RouterProvider } from "react-router";
import Home from "./components/Home";
import { Toaster } from "./components/ui/sonner";
import About from "./components/About";
import Contact from "./components/Contact";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
      {/* Toaster for global notifications */}
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

export default App;
