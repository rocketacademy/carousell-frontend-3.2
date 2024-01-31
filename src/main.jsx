import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./Components/Home";
import NewListingForm from "./Components/NewListingForm";
import Listing from "./Components/Listing";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Route that renders home content */}
      <Route index element={<Home />} />

      <Route path="new" element={<NewListingForm />} />
      {/* Route that renders individual sightings */}
      <Route path="sightings/:sightingId" element={<Listing />} />
      {/* Route that matches all other paths */}
      <Route path="*" element={"Nothing here!"} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={import.meta.env.VITE_SOME_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_SOME_AUTH0_CLIENTID}
    authorizationParams={{
      redirect_uri: import.meta.env.VITE_SOME_AUTH0_REDIRECTUR,
      audience: import.meta.env.VITE_SOME_AUTH0_AUDIENCE,
      scope: "read:current_user update:current_user_metadata",
    }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>
);
