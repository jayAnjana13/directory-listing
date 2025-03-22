import React, { useEffect, useState } from "react";
import { Table, Button, Form, Col, Row, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductCombinations,
  modifyProductCombination,
} from "../../slices/combinationSlice.js";

const ProductTable = ({
  searchQuery,
  filter,
  selectedProducts,
  setSelectedProducts,
  bulkEditData,
}) => {
  const dispatch = useDispatch();
  const { combinations } = useSelector((state) => state.productCombinations);

  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //  Handle Edit Button Click (Expand Row)
  const handleQuickEdit = (combination) => {
    setEditRowId(combination._id);
    setEditData({ ...combination });
  };

  //  Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  //  Submit Updated Data
  const handleSave = async () => {
    dispatch(
      modifyProductCombination({ id: editRowId, updatedData: editData })
    );
    setEditRowId(null);
    setEditData({});
  };

  // Fetch Data on Component Mount
  useEffect(() => {
    dispatch(fetchProductCombinations());
  }, [dispatch]);

  //  Filter products based on search input
  const filteredCombinations = combinations.filter((combination) => {
    const matchesSearch =
      `${combination.materialName} ${combination.gradeName} ${combination.productName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesFilter =
      (filter.product === "" || combination.productName === filter.product) &&
      (filter.material === "" || combination.materialName === filter.material);

    return matchesSearch && matchesFilter;
  });

  // Handle Checkbox Selection
  const handleSelectProduct = (id) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((productId) => productId !== id);
      } else {
        return [...prevSelected, id];
      }
    });

    setEditRowId(null); // ✅ Reset edit state when selecting a new row
    setEditData({}); // ✅ Ensure fresh data is used
  };

  // Apply Bulk Edit Data
  useEffect(() => {
    if (bulkEditData && selectedProducts.length > 0) {
      selectedProducts.forEach((id) => {
        dispatch(modifyProductCombination({ id, updatedData: bulkEditData }));
      });

      setSelectedProducts([]);
      setEditRowId(null);
      setEditData({});
    }
  }, [bulkEditData, selectedProducts, dispatch, setSelectedProducts]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCombinations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCombinations.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-4">
      {/* <h2>Product Combination Table</h2> */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check type="checkbox" />
            </th>
            <th>Products</th>
            <th>Actions</th>
            <th>Product Details</th>
            <th>Price (Per Kg)</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((combination) => (
            <React.Fragment key={combination._id}>
              <tr key={combination._id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    onChange={() => handleSelectProduct(combination._id)}
                    checked={selectedProducts.includes(combination._id)}
                  />
                </td>
                <td>
                  {combination.materialName} {combination.gradeName}{" "}
                  {combination.productName}
                </td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleQuickEdit(combination)}
                  >
                    Quick Edit
                  </Button>
                </td>
                <td>
                  <strong>Material:</strong> {combination.materialName} <br />
                  <strong>Length:</strong> {combination.length} <br />
                  <strong>Shape:</strong> {combination.shape} <br />
                  <strong>Thickness:</strong> {combination.thickness} <br />
                  <strong>Surface Finish:</strong> {combination.surfaceFinish}{" "}
                  <br />
                  <strong>Outside Dia.:</strong> {combination.outsideDia}
                </td>
                <td>{combination.price} per kg</td>
              </tr>

              {/*  Expand Row for Quick Edit */}
              {editRowId === combination._id && (
                <tr key={`${combination._id}-edit`}>
                  <td colSpan={1}></td>
                  <td colSpan="4">
                    <Form>
                      <Row>
                        <Col md={6} sm={12}>
                          <Form.Group className="mb-2">
                            <Form.Label>Length</Form.Label>
                            <Form.Control
                              type="text"
                              name="length"
                              value={editData.length}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} sm={12}>
                          <Form.Group className="mb-2">
                            <Form.Label>Shape</Form.Label>
                            <Form.Control
                              type="text"
                              name="shape"
                              value={editData.shape}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6} sm={12}>
                          <Form.Group className="mb-2">
                            <Form.Label>Thickness</Form.Label>
                            <Form.Control
                              type="text"
                              name="thickness"
                              value={editData.thickness}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} sm={12}>
                          <Form.Group className="mb-2">
                            <Form.Label>Surface Finish</Form.Label>
                            <Form.Control
                              type="text"
                              name="surfaceFinish"
                              value={editData.surfaceFinish}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6} sm={12}>
                          <Form.Group className="mb-2">
                            <Form.Label>Outside Dia.</Form.Label>
                            <Form.Control
                              type="text"
                              name="outsideDia"
                              value={editData.outsideDia}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} sm={12}>
                          <Form.Group className="mb-2">
                            <Form.Label>Price (Per Kg)</Form.Label>
                            <Form.Control
                              type="text"
                              name="price"
                              value={editData.price}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="my-4">
                        <Col className="d-flex justify-content-center">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleSave}
                          >
                            Update
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => setEditRowId(null)}
                            className="ms-2"
                          >
                            Cancel
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      <Pagination className="mt-3 d-flex justify-content-center">
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {[...Array(totalPages).keys()].map((pageNumber) => (
          <Pagination.Item
            key={pageNumber + 1}
            active={pageNumber + 1 === currentPage}
            onClick={() => handlePageChange(pageNumber + 1)}
          >
            {pageNumber + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
      ;
    </div>
  );
};

export default ProductTable;
