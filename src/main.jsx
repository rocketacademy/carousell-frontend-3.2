import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
      <Route path="listings/:listingId" element={<Listing />} />
      {/* Route that matches all other paths */}
      <Route path="*" element={"Nothing here!"} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-0qzz65qu6ebsz52w.au.auth0.com"
    clientId="RTCH8xyl1CRiB45nAXyoEeHSwL7LacWv"
    authorizationParams={{
      redirect_uri: "http://localhost:5173",
      audience: "https://carousel/api",
      scope:
        "read:current_user update:current_user_metadata openid profile email",
    }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>
);
