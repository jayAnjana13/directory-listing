import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../slices/productSlice.js";
import { fetchMaterials } from "../../slices/materialSlice.js";
import { fetchGrades } from "../../slices/gradeSlice.js";
import { createProductCombination } from "../../slices/combinationSlice.js";

const AddProductModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  // Fetching data from Redux store
  const { products = [] } = useSelector((state) => state.products) || {};
  const { materials = [] } = useSelector((state) => state.materials) || {};
  const { grades = [] } = useSelector((state) => state.grades) || {};

  // States for selected values
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedGrades, setSelectedGrades] = useState([]); // Multi-select

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchMaterials());
    dispatch(fetchGrades());
  }, [dispatch]);

  // Handle grade selection (multi-select)
  const handleGradeSelection = (gradeId) => {
    setSelectedGrades(
      (prevGrades) =>
        prevGrades.includes(gradeId)
          ? prevGrades.filter((id) => id !== gradeId) // Remove if already selected
          : [...prevGrades, gradeId] // Add if not selected
    );
  };

  // Handle saving data
  const handleSave = async () => {
    if (!selectedProduct || !selectedMaterial || selectedGrades.length === 0) {
      alert("Please select a Product, Material, and at least one Grade!");
      return;
    }

    // Find selected names from the store
    const selectedProductName =
      products.find((p) => p._id === selectedProduct)?.name || "Unknown";
    const selectedMaterialName =
      materials.find((m) => m._id === selectedMaterial)?.name || "Unknown";

    // Prepare multiple combinations (one per selected grade)
    // Prepare multiple combinations (one per selected grade)
    const combinationData = selectedGrades.map((gradeId) => {
      const gradeName =
        grades.find((g) => g._id === gradeId)?.name || "Unknown";

      return {
        productId: selectedProduct,
        productName: selectedProductName, // ✅ Save Product Name
        materialId: selectedMaterial,
        materialName: selectedMaterialName, // ✅ Save Material Name
        gradeId,
        gradeName, // ✅ Save Grade Name
      };
    });

    try {
      await dispatch(createProductCombination(combinationData));

      setSelectedProduct("");
      setSelectedMaterial("");
      setSelectedGrades([]);

      handleClose();
    } catch (error) {
      console.error("Error saving product combinations:", error);
      alert("Failed to save product combinations.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
          Add Product Combination -{" "}
          <small className="text-muted">{selectedGrades.length}</small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {/* Product Selection */}
          <Col>
            <Form.Group>
              <Form.Label>Product</Form.Label>
              <Form.Select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option>Select Product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Material Selection */}
          <Col>
            <Form.Group>
              <Form.Label>Material</Form.Label>
              <Form.Select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
              >
                <option>Select Material</option>
                {materials.map((material) => (
                  <option key={material._id} value={material._id}>
                    {material.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Grade Multi-Selection */}
        <Form.Group className="mt-3">
          <Form.Label>Grades </Form.Label>
          <div
            className="border p-2 rounded"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {grades.map((grade) => (
              <Form.Check
                key={grade._id}
                type="checkbox"
                label={grade.name}
                value={grade._id}
                checked={selectedGrades.includes(grade._id)}
                onChange={() => handleGradeSelection(grade._id)}
              />
            ))}
          </div>
          <small className="text-muted">
            {selectedGrades.length} grades selected
          </small>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;
