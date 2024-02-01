import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { BACKEND_URL } from "../../constants.jsx";
import { useAuth0 } from "@auth0/auth0-react";

const Listing = () => {
  const [listingId, setListingId] = useState();
  const [listing, setListing] = useState({});
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, user } =
    useAuth0();

  useEffect(() => {
    // If there is a listingId, retrieve the listing data
    if (listingId) {
      axios.get(`${BACKEND_URL}/listings/${listingId}`).then((response) => {
        setListing(response.data);
        console.log(listingId)
      });
    }
    // Only run this effect on change to listingId
  }, [listingId]);

  useEffect(() => {
    if (isAuthenticated) {
      setEmail(user.email);
      getUserInfo();
    } 
    
    async function getUserInfo() {
      let token = await getAccessTokenSilently();
      setToken(token);
    }
  }, []);

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
    if (!isAuthenticated) {
      loginWithRedirect();
    }

    axios
      .put(`${BACKEND_URL}/listings/${listingId}`, {email}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setListing(response.data);
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
