import React from "react";
import { Form, Button, InputGroup, Row, Col, Container } from "react-bootstrap";

const ProductSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <Container className="my-2">
      <Row>
        <Col md={6} sm={8} xs={7}>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="primary">Search</Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductSearch;
