import React, { useState } from "react";
import AddProducts from "../components/views/AddProducts";
import { Card, Col, Container, Row } from "react-bootstrap";
import ProductTable from "../components/tables/ProductTable";
import ProductSearch from "../components/views/ProductSearch";
import { useSelector } from "react-redux";
import Filter from "../components/views/Filter";
import BulkEdit from "../components/views/BulkEdit";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({ product: "", material: "" });
  const [bulkEditData, setBulkEditData] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const { combinations } = useSelector((state) => state.productCombinations);

  // Extract unique products and materials from combinations
  const uniqueProducts = [
    ...new Set(combinations.map((item) => item.productName)),
  ];
  const uniqueMaterials = [
    ...new Set(combinations.map((item) => item.materialName)),
  ];

  return (
    <section className="mt-3">
      <Container>
        <Card>
          {/* add product */}
          <AddProducts />
          {/* search */}
          <ProductSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <Container>
            <Row>
              <Col md={9}>
                {/* filter */}
                <Filter
                  products={uniqueProducts}
                  materials={uniqueMaterials}
                  setFilter={setFilter}
                />
              </Col>
              <Col md={3}>
                <BulkEdit
                  selectedProducts={selectedProducts}
                  onBulkEdit={setBulkEditData}
                />
              </Col>
            </Row>
          </Container>
        </Card>

        <hr />
        <Card>
          {/* table */}
          <ProductTable
            searchQuery={searchQuery}
            filter={filter}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            bulkEditData={bulkEditData}
          />
        </Card>
      </Container>
    </section>
  );
};

export default Home;
