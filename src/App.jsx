import logo from "/logo.png";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <img src={logo} className="logo react" alt="React logo" />

      <h1>Carousell Frontend</h1>
      <div className="card">
        <Outlet />
        <button onClick={() => loginWithRedirect()}>Log In</button>;
      </div>
    </>
  );
}

export default App;
