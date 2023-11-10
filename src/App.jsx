import logo from "/logo.png";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <img src={logo} className="logo react" alt="React logo" />

      <h1>Carousell Frontend</h1>
      <div className="card">
        <Outlet />
      </div>
    </>
  );
}

export default App;
