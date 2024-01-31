import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../../constants";

const NewListingForm = () => {
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState("");
	const [condition, setCondition] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [shippingDetails, setShippingDetails] = useState("");
	const [sellerId, setSellerId] = useState("")
	const { user, isAuthenticated, loginWithRedirect, getAccessTokenSilently,  logout} =
		useAuth0();
	const [accessToken, setAccessToken] = useState("");
	const navigate = useNavigate();

	const checkUser = async () => {
		if (isAuthenticated) {
			let token = await getAccessTokenSilently();
			console.log("token", token);
			setAccessToken(token);
		} else {
			loginWithRedirect();
		}
	};
	const getUser = async () => {
		const thisUser = await axios.get(`${BACKEND_URL}/listings/users/${user.email}`);
		console.log("seller id",thisUser.data[0].id)
		setSellerId(thisUser.data[0].id)
	};
	useEffect(() => {
		if (isAuthenticated && user) {
			getUser();
			console.log(user.email)
		}
	}, [user,isAuthenticated]);

	useEffect(() => {
		checkUser();
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			console.log(user);
		}
	}, [isAuthenticated, user]);

	const handleChange = (event) => {
		switch (event.target.name) {
			case "title":
				setTitle(event.target.value);
				break;
			case "category":
				setCategory(event.target.value);
				break;
			case "condition":
				setCondition(event.target.value);
				break;
			case "price":
				setPrice(event.target.value);
				break;
			case "description":
				setDescription(event.target.value);
				break;
			case "shippingDetails":
				setShippingDetails(event.target.value);
				break;
			default:
		}
	};

	const handleSubmit = (event) => {
		// Prevent default form redirect on submission
		event.preventDefault();

		// Send request to create new listing in backend
		axios
			.post(
				`${BACKEND_URL}/listings`,
				{
					title,
					category,
					condition,
					price,
					description,
					shippingDetails,
					sellerId,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)
			.then((res) => {
				// Clear form state
				setTitle("");
				setCategory("");
				setCondition("");
				setPrice(0);
				setDescription("");
				setShippingDetails("");

				// Navigate to listing-specific page after submitting form
				navigate(`/listings/${res.data.id}`);
			});
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Label>Title</Form.Label>
				<Form.Control
					type="text"
					name="title"
					value={title}
					onChange={handleChange}
					placeholder="iPhone 13, like new!"
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Category</Form.Label>
				<Form.Control
					type="text"
					name="category"
					value={category}
					onChange={handleChange}
					placeholder="Electronics"
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Condition</Form.Label>
				<Form.Control
					type="text"
					name="condition"
					value={condition}
					onChange={handleChange}
					placeholder="Like New"
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Price ($)</Form.Label>
				<Form.Control
					type="text"
					name="price"
					value={price}
					onChange={handleChange}
					placeholder="999"
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Description</Form.Label>
				<Form.Control
					as="textarea"
					name="description"
					value={description}
					onChange={handleChange}
					placeholder="Bought 2 months ago, selling because switching to Android."
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Shipping Details</Form.Label>
				<Form.Control
					as="textarea"
					name="shippingDetails"
					value={shippingDetails}
					onChange={handleChange}
					placeholder="Same day shipping, we can message to coordinate!"
				/>
			</Form.Group>

			<Button variant="primary" type="submit">
				List this item
			</Button>
		<button onClick={()=> logout({returnTo:window.location.origin})}>logout</button>
		</Form>
	);
};

export default NewListingForm;
