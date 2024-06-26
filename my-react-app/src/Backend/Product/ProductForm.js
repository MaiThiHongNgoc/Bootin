import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../Service/productService';

const ProductForm = ({ product, onSave }) => {
    const [formData, setFormData] = useState({
        product_name: '',
        author_name: '',
        description: '',
        price: '',
        category_id: '',
        imageUrl: ''
    });

    useEffect(() => {
        if (product) {
            setFormData({
                product_name: product.product_name,
                author_name: product.author_name,
                description: product.description,
                price: product.price,
                category_id: product.categoris.category_id ,
                imageUrl: product.imageUrl
            });
        } else {
            setFormData({
                product_name: '',
                author_name: '',
                description: '',
                price: '',
                category_id: '',
                imageUrl: ''
            });
        }
    }, [product]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('FormData:', formData);
        try {
            if (product) {
                await updateProduct(product.product_id, formData);
            } else {
                await createProduct(formData);
            }
            setFormData({ product_name: '', author_name: '', description: '', price: '', category_id: '', imageUrl: '' });
            onSave();
        } catch (error) {
            if (error.response) {
                // Yêu cầu đã được gửi và server đã phản hồi với trạng thái không phải là 2xx
                console.error('Error response:', error.response.data);
                alert('Error: ' + error.response.data.message);
            } else if (error.request) {
                // Yêu cầu đã được gửi nhưng không nhận được phản hồi
                console.error('Error request:', error.request);
                alert('Error: No response from server.');
            } else {
                // Xảy ra lỗi khác khi thiết lập yêu cầu
                console.error('Error message:', error.message);
                alert('Error: ' + error.message);
            }
        }
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <div>
                <label>Product Name</label>
                <input
                    type="text"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Author Name</label>
                <input
                    type="text"
                    name="author_name"
                    value={formData.author_name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Category ID</label>
                <input
                    type="text"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Image URL</label>
                <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                />
            </div>
            <button className="product-form-button-save" type="submit">Save</button>
        </form>
    );
};

export default ProductForm;