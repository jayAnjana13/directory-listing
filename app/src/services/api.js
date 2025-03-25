import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Get Products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/get-products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Add Product
export const addProduct = async (productData) => {
  try {
    const response = await axios.post(
      `${API_URL}/products/add-product`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

//  Add Material
export const addMaterial = async (materialData) => {
  try {
    const response = await axios.post(
      `${API_URL}/materials/add-material`,
      materialData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding material:", error);
    throw error;
  }
};

//  Get Materials
export const getMaterials = async () => {
  try {
    const response = await axios.get(`${API_URL}/materials/get-materials`);
    return response.data;
  } catch (error) {
    console.error("Error fetching materials:", error);
    throw error;
  }
};

//  Add Grade
export const addGrade = async (gradeData) => {
  try {
    const response = await axios.post(`${API_URL}/grades/add-grade`, gradeData);
    return response.data;
  } catch (error) {
    console.error("Error adding grade:", error);
    throw error;
  }
};

//  Get Grades
export const getGrades = async () => {
  try {
    const response = await axios.get(`${API_URL}/grades/get-grades`);
    return response.data;
  } catch (error) {
    console.error("Error fetching grades:", error);
    throw error;
  }
};

//  Get Product Combinations
export const getProductCombinations = async () => {
  try {
    const response = await axios.get(`${API_URL}/combinations/get-combination`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product combinations:", error);
    throw error;
  }
};

//  Add Product Combination
export const addProductCombination = async (combinationData) => {
  console.log("api callled");
  const response = await fetch(`${API_URL}/combinations/add-combination`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(combinationData), // Sending array for bulk insert
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("API Error:", errorData);
    throw new Error("Failed to save product combinations");
  }

  const responseData = await response.json();
  return responseData;
};

//  Update Product Combination
export const updateProductCombination = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${API_URL}/combinations/update-combination/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product combination:", error);
    throw error;
  }
};
