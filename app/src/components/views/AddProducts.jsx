import React, { useState } from "react";
import { Button, Row, Col, Container, Card } from "react-bootstrap";
import AddProductModal from "../modals/AddProductModal";

const AddProducts = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  return (
    <Container className="my-4">
      <Row>
        <Col md={4} sm={4} xs={3}></Col>
        <Col md={4} sm={3} xs={3}></Col>
        <Col lg={3} md={4} sm={5} xs={12}>
          <Card className="m-1">
            <Card.Title className="p-2 m-0">Directory Listing</Card.Title>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => setShow(true)}> + Add Product</Button>
        </Col>
      </Row>
      <AddProductModal show={show} handleClose={handleClose} />
    </Container>
  );
};

export default AddProducts;
