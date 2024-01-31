import { Link } from "react-router-dom";
import { useEffect } from "react";

import ListingPreviewList from "./ListingPreviewList";

import { useAuth0 } from "@auth0/auth0-react";
const Home = () => {
	const { loginWithRedirect, logout, user, isAuthenticated,  } = useAuth0();

	useEffect(() =>
			{
				if(isAuthenticated)
				{
					console.log(user)
				}
			},[user]);


	return (
		<div>
			<Link to="/listings/new">Sell</Link>
			<br />
			<br />
			<p>User Authenticated: {isAuthenticated? "true":"false"}</p>
			<ListingPreviewList />
			<button onClick={() => loginWithRedirect()}>Log In</button>
			<button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
		</div>
	);
};

export default Home;
