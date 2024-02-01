import logo from "/logo.png";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {

  return (
    <>
      <Auth0Provider
        domain="dev-0rfi8dlf60vmtdnh.us.auth0.com"
        clientId="4DHHnNRh0vIbk3WnLJIicvoiHH3JK4DT"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "https://carousell/api"
        }}
      >
        <img src={logo} className="logo react" alt="React logo" />

        <h1>Carousell Frontend</h1>
        <div className="card">
          <Outlet />
        </div>
      </Auth0Provider>
    </>
  );
}

export default App;
