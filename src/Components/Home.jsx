import { Link } from "react-router-dom";
import ListingPreviewList from "./ListingPreviewList";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const Home = () => {
  const [currUser, setCurrUser] = useState(null);
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
  } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      setCurrUser(user);
    } 
  }, [isAuthenticated]);

  return (
    <div>
      {currUser? <h4>Welcome, {currUser.nickname}!</h4>: null}
      <Link to="/listings/new">Sell Items</Link>
      <br />
      <br />
      <ListingPreviewList />
      <div>
        {!isAuthenticated ? (
          <button onClick={() => loginWithRedirect()}>Log In</button>
        ) : (
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
