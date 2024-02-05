import logo from "/logo.png";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <>
      <img src={logo} className="logo react" alt="React logo" />

      <h1>Carousell Frontend</h1>
      <div className="card">
        <Outlet />
        <button onClick={() => loginWithRedirect()}>Log In</button>;
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log Out
        </button>
      </div>
    </>
  );
}

export default App;
