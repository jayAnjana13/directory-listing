import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const Filter = ({ products, materials, setFilter }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");

  const handleFilter = () => {
    setFilter({ product: selectedProduct, material: selectedMaterial });
  };

  return (
    <Row className="mb-3">
      <Col md={4}>
        <Form.Group>
          {/* <Form.Label>Product</Form.Label> */}
          <Form.Select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value=""> Products</option>
            {products.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>

      <Col md={4}>
        <Form.Group>
          {/* <Form.Label>Material</Form.Label> */}
          <Form.Select
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
          >
            <option value=""> Materials</option>
            {materials.map((material, index) => (
              <option key={index} value={material}>
                {material}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>

      <Col md={1} className="d-flex align-items-end">
        <Button variant="primary" onClick={handleFilter}>
          Filter
        </Button>
      </Col>
    </Row>
  );
};

export default Filter;
