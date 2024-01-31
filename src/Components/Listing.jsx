import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../../constants.jsx";

const Listing = () => {
	const [listingId, setListingId] = useState();
	const [listing, setListing] = useState({});
	const [accessToken, setAccessToken] = useState("");

	const {
		user,
		isAuthenticated,
		loginWithRedirect,
		getAccessTokenSilently,
		logout,
	} = useAuth0();

	const checkUser = async () => {
		if (isAuthenticated) {
			let token = await getAccessTokenSilently();
			console.log("token", token);
			setAccessToken(token);
		} else {
			loginWithRedirect();
		}
	};
	useEffect(() => {
		// If there is a listingId, retrieve the listing data
		if (listingId) {
			axios.get(`${BACKEND_URL}/listings/${listingId}`).then((response) => {
				setListing(response.data);
			});
		}
		// Only run this effect on change to listingId
	}, [listingId]);

	// Update listing ID in state if needed to trigger data retrieval
	const params = useParams();
	if (listingId !== params.listingId) {
		setListingId(params.listingId);
	}

	// Store a new JSX element for each property in listing details
	const listingDetails = [];
	if (listing) {
		for (const key in listing) {
			listingDetails.push(
				<Card.Text key={key}>{`${key}: ${listing[key]}`}</Card.Text>
			);
		}
	}

	const handleClick = () => {
		checkUser();
		axios
			.put(`${BACKEND_URL}/listings/${listingId}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((response) => {
				setListing(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<Link to="/">Home</Link>
			<Card bg="light">
				<Card.Body>
					{listingDetails}
					<Button onClick={handleClick} disabled={listing.BuyerId}>
						Buy
					</Button>
				</Card.Body>
			</Card>
			<br />
		</div>
	);
};

export default Listing;
