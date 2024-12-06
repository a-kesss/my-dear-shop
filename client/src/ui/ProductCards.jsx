import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProductCards({ char }) {
  return (
    <Card style={{ width: '26rem', height: '700px', marginTop: '20px' }}>
      <Card.Img variant="top" src={char.images} />
      <Card.Body style={{ overflow: 'hidden' }}>
        <Card.Title>{char.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{char.price}$</Card.Subtitle>
        <Card.Text>{char.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductCards;
