import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../Service/productService';
import { getAuthors } from '../Service/authorService';
import { getCategories } from '../Service/categoryService';

const ProductForm = ({ product, onSave }) => {
    const [formData, setFormData] = useState({
        product_name: '',
<<<<<<< HEAD
        author: {
            author_name: ''
        },
=======
        author:{
            author_id:''
        }, // ID của tác giả được chọn
>>>>>>> 220504c8b098302728b0983e6ad1b0922a093198
        description: '',
        price: '',
        category:{
            category_id:''
        }, // ID của danh mục được chọn
        image_url: ''
    });

    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Load authors and categories initially
        loadAuthors();
        loadCategories();
    }, []);

    useEffect(() => {
        if (product) {
            setFormData({
                product_name: product.product_name,
                author: {
<<<<<<< HEAD
                    author_name: product.author.author_name
                },
                description: product.description,
                price: product.price,
                categories: {
                    category_name: product.categories.category_name
=======
                    author_id:product.author.author_id
                },
                description: product.description,
                price: product.price,
                category: {
                    category_id:product.categories.category_id
>>>>>>> 220504c8b098302728b0983e6ad1b0922a093198
                },
                image_url: product.image_url
            });
        } else {
            setFormData({
                product_name: '',
<<<<<<< HEAD
                author: {
                    author_name: ''
                },
=======
                author: '',
>>>>>>> 220504c8b098302728b0983e6ad1b0922a093198
                description: '',
                price: '',
                category: '',
                image_url: ''
            });
        }
    }, [product]);

    const loadAuthors = async () => {
        try {
            const data = await getAuthors();
            setAuthors(data);
        } catch (error) {
            console.error('Failed to fetch authors', error);
        }
    };

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
<<<<<<< HEAD
        if (name === 'author_name') {
            setFormData(prevState => ({
                ...prevState,
                author: {
                    ...prevState.author,
                    author_name: value
                }
            }));
        } else if (name === 'category_name') {
            setFormData(prevState => ({
                ...prevState,
                categories: {
                    ...prevState.categories,
                    category_name: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
=======
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
>>>>>>> 220504c8b098302728b0983e6ad1b0922a093198
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
            setFormData({
                product_name: '',
<<<<<<< HEAD
                author: {
                    author_name: ''
                },
=======
                author_id: '',
>>>>>>> 220504c8b098302728b0983e6ad1b0922a093198
                description: '',
                price: '',
                category_id: '',
                image_url: ''
            });
            onSave();
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert('Error: ' + error.response.data.message);
            } else if (error.request) {
                console.error('Error request:', error.request);
                alert('Error: No response from server.');
            } else {
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
<<<<<<< HEAD
                <label>Author Name</label>
                <input
                    type="text"
                    name="author_name"
                    value={formData.author.author_name}
=======
                <label>Author</label>
                <select
                    name="author"
                    value={formData.author}
>>>>>>> 220504c8b098302728b0983e6ad1b0922a093198
                    onChange={handleChange}
                >
                    <option value="">Select author...</option>
                    {authors.map(author => (
                        <option key={author.author_id} value={author.author_id}>
                            {author.author_name}
                        </option>
                    ))}
                </select>
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
                <label>Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="">Select category...</option>
                    {categories.map(categories => (
                        <option key={categories.category_id} value={categories.category_id}>
                            {categories.category_name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Image URL</label>
                <input
                    type="text"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                />
            </div>
            <button className="product-form-button-save" type="submit">Save</button>
        </form>
    );
};

export default ProductForm;
