import axios from 'axios';

const API_URL = 'http://localhost:9191/api/products/v1/';

export const getProducts = (page) => {
    return axios.get(`${API_URL}?p=${page}`);
};

export const getProductById = (id) => {
    return axios.get(`${API_URL}${id}`);
};

export const createProduct = async (productData) => {
    try {
        const response = await axios.post('http://localhost:9191/api/products/v1/', productData);
        return response.data;
    } catch (error) {
        console.error('Failed to create product:', error.response.data);
        throw error;
    }
};
export const updateProduct = (id, product) => {
    return axios.put(`${API_URL}${id}`, product);
};

export const deleteProduct = (id) => {
    return axios.delete(`${API_URL}${id}`);
};
export const getCategories = () => {
    return axios.get('http://localhost:9191/api/categories/v1/');
};