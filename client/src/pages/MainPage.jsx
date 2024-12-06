import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCards from '../ui/ProductCards';
import axiosInstance from '../axiosInstance';

export default function MainPage() {
  const [chars, setChars] = useState([]);

  const api = 'https://api.escuelajs.co/api/v1/products';

  useEffect(() => {
    axiosInstance.get(api).then((res) => setChars(res.data));
  }, []);

  return (
    <Row style={{ justifyContent: 'center' }}>
      {chars.map((char) => (
        <Col xs={4} key={char.id}>
          <ProductCards char={char} />
        </Col>
      ))}
    </Row>
  );
}
