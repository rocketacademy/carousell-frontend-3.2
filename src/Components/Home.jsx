import { Link } from "react-router-dom";
import ListingPreviewList from "./ListingPreviewList";

const Home = () => {
  return (
    <div>
      <Link to="/new">Sell</Link>
      <br />
      <br />
      <ListingPreviewList />
    </div>
  );
};

export default Home;
