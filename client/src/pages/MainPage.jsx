import { Row } from 'react-bootstrap';
import ProductCards from '../ui/ProductCards';

export default function MainPage() {
  return (
    <Row style={{ justifyContent: 'center' }}>
      <ProductCards
        title="Classic Heather Gray Hoodie"
        price="20$"
        imgSrc="https://i.imgur.com/cHddUCu.jpeg"
      />
      <ProductCards
        title="Majestic Mountain Graphic T-Shirt"
        price="15$"
        imgSrc="https://i.imgur.com/QkIa5tT.jpeg"
      />
      <ProductCards
        title="Classic Red Pullover Hoodie"
        price="9$"
        imgSrc="https://i.imgur.com/1twoaDy.jpeg"
      />
      <ProductCards
        title="Classic Comfort Drawstring Joggers"
        price="35$"
        imgSrc="https://i.imgur.com/mp3rUty.jpeg"
      />
      <ProductCards
        title="Classic Comfort Fit Joggers"
        price="17$"
        imgSrc="https://i.imgur.com/ZKGofuB.jpeg"
      />
      <ProductCards
        title="Classic Red Jogger Sweatpants"
        price="10$"
        imgSrc="https://i.imgur.com/9LFjwpI.jpeg"
      />
    </Row>
  );
}
