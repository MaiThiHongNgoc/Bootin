import axios from 'axios';

const API_URL = 'http://localhost:9191/api/products/v1/';

export const getProducts = (page) => {
    return axios.get(`${API_URL}?p=${page}`);
};

export const getProductById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createProduct = async (formData) => {
    const response = await axios.post('http://localhost:9191/api/products/v1/', {
        product_name: formData.product_name,
        author_name: formData.author_name,
        description: formData.description,
        price: formData.price,
        category_id: formData.category_id,  // Đảm bảo gửi category_id
        imageUrl: formData.imageUrl
    });
    return response.data;
};
export const updateProduct = (id, product) => {
    return axios.put(`${API_URL}/${id}`, product);
};

export const deleteProduct = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};