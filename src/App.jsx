import { useState } from "react";
import logo from "/logo.png";
import { BACKEND_URL } from "../constants";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import axios from "axios";

function App() {
	const [currentUser, setCurrentUser] = useState("");
	const { user, isAuthenticated } = useAuth0();
	useEffect(() => {
		if (user) {
			axios
				.post(`${BACKEND_URL}/listings/users`, {
					email: user.email,
				})
				.then((res) => {
					console.log(res.data);
					setCurrentUser(res.data)
				});
		}
	}, [isAuthenticated, user]);
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
