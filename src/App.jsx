import logo from "/logo.png";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </button>
  );
};

function App() {
  return (
    <>
      <img src={logo} className="logo react" alt="React logo" />
      <h1>Carousell Frontend</h1>
      <LoginButton />
      <LogoutButton />
      <div className="card">
        <Outlet />
      </div>
    </>
  );
}

export default App;
