import React, { useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";

const BulkEdit = ({ selectedProducts, onBulkEdit }) => {
  const [showModal, setShowModal] = useState(false);
  const [bulkEditData, setBulkEditData] = useState({
    length: "",
    shape: "",
    thickness: "",
    surfaceFinish: "",
    outsideDia: "",
    price: "",
  });

  // Open Bulk Edit Modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBulkEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Apply Bulk Edit
  const handleBulkSave = () => {
    onBulkEdit(bulkEditData);
    setShowModal(false);
  };

  return (
    <div className="mb-3">
      <Button variant="primary" onClick={handleShow}>
        Bulk Edit ({selectedProducts.length} )
      </Button>

      {/* Bulk Edit Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bulk Edit Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Length</Form.Label>
                  <Form.Control
                    type="text"
                    name="length"
                    value={bulkEditData.length}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Shape</Form.Label>
                  <Form.Control
                    type="text"
                    name="shape"
                    value={bulkEditData.shape}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Thickness</Form.Label>
                  <Form.Control
                    type="text"
                    name="thickness"
                    value={bulkEditData.thickness}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Surface Finish</Form.Label>
                  <Form.Control
                    type="text"
                    name="surfaceFinish"
                    value={bulkEditData.surfaceFinish}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Outside Dia</Form.Label>
                  <Form.Control
                    type="text"
                    name="outsideDia"
                    value={bulkEditData.outsideDia}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Price (Per Kg)</Form.Label>
                  <Form.Control
                    type="text"
                    name="price"
                    value={bulkEditData.price}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleBulkSave}>
            Update Products
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BulkEdit;
