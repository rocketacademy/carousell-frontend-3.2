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
	const [buyerId, setBuyerId] = useState("");

	const { user, isAuthenticated, loginWithRedirect, getAccessTokenSilently } =
		useAuth0();

	const getUser = async () => {
		const thisUser = await axios.get(`${BACKEND_URL}/listings/users/${user.email}`);
		console.log(thisUser.data[0].id)
		setBuyerId(thisUser.data[0].id)
	};
	useEffect(() => {
		if (isAuthenticated && user) {
			getUser();
			console.log(user.email)
		}
	}, [user]);

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
		if (isAuthenticated) {
			getAccessTokenSilently()
				.then((res) =>
					axios.put(
						`${BACKEND_URL}/listings/${listingId}`,
						{
							buyerId: buyerId,
						},
						{
							headers: {
								Authorization: `Bearer ${res}`,
							},
						}
					)
				)
				.then((res) => {
					console.log(res.status);
					setListing(res.data);
				});
		} else {
			loginWithRedirect();
		}
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
