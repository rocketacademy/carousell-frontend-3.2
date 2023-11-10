import Card from "react-bootstrap/Card";

const ListingPreview = (props) => {
  return (
    <Card bg="light">
      <Card.Body>
        <Card.Title>{props.data.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default ListingPreview;
