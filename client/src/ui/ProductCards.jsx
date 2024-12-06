import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProductCards({ price, title, imgSrc }) {
  return (
    <Card style={{ width: '26rem', margin: '10px' }}>
      <Card.Img style={{ margin: '3px' }} variant="top" src={imgSrc} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
        <Button variant="primary">Добавить</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCards;
