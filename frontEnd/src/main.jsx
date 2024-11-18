import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store.js";
import "./app.css";
import App from "./App.jsx";
import { SignIn } from "./pages/Sign-in.jsx";
import { Profile } from "./pages/Profile.jsx";
import { GlobalErrorPage } from "./pages/globalErrorPage.jsx";
import { ProfileErrorPage } from "./pages/ProfileErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <GlobalErrorPage />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/error-user",
    element: <ProfileErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
