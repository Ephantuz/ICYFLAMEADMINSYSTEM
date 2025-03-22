import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';
import { TfiClose } from "react-icons/tfi";

const shopId = '679673c9f3a134d3d07e3b45';

const initialFormState = () => ({
    name: '',
    highlights: '',
    minidescription: '',
    detaileddescription: '',
    precription: '',
    insidepackage: '',
    categories: [],
    tags: '',
    unit: '',
    sizes: [{ size: '', originalPrice: '', discountPrice: '', quantity: '' }],
    images: [],
});

const Products = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState(initialFormState());
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`https://icyflameltd-admin-app.vercel.app/api/v1/products/shop?shopid=${shopId}`);
            setProducts(res.data.products);
        } catch (error) {
            console.error('Error fetching products', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            const files = Array.from(e.target.files);
            const fileUrls = files.map(file => URL.createObjectURL(file));
            setImages([...images, ...fileUrls]);
            setForm({ ...form, images: [...form.images, ...files] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        if (form.categories.includes(value)) {
            setForm({ ...form, categories: form.categories.filter(category => category !== value) });
        } else {
            setForm({ ...form, categories: [...form.categories, value] });
        }
    };

    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...form.sizes];
        updatedSizes[index][field] = value;
        setForm({ ...form, sizes: updatedSizes });
    };

    const addSize = () => {
        setForm({
            ...form,
            sizes: [...form.sizes, { size: '', originalPrice: '', discountPrice: '', quantity: '' }],
        });
    };

    const removeSize = (index) => {
        const updatedSizes = form.sizes.filter((_, i) => i !== index);
        setForm({ ...form, sizes: updatedSizes });
    };

    const removeImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
        form.images.splice(indexToRemove, 1);
        setForm({ ...form, images: [...form.images] });
    };

    const openCreateForm = () => {
        resetForm();
        setFormOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Convert tags to array
        const processedTags = form.tags.split(',').map(tag => tag.trim());

        // Append text fields
        formData.append('name', form.name);
        formData.append('highlights', form.highlights);
        formData.append('minidescription', form.minidescription);
        formData.append('detaileddescription', form.detaileddescription);
        formData.append('precription', form.precription);
        formData.append('insidepackage', form.insidepackage);
        formData.append('unit', form.unit);
        formData.append('shopId', shopId);

        // Append categories and tags
        form.categories.forEach(category => formData.append('categories', category));
        processedTags.forEach(tag => {
            if (tag) { // Ensure empty strings are not added
                formData.append('tags', tag);
            }
        });

        // Append sizes
        form.sizes.forEach((sizeObj, index) => {
            formData.append(`sizes[${index}][size]`, sizeObj.size);
            formData.append(`sizes[${index}][originalPrice]`, sizeObj.originalPrice);
            formData.append(`sizes[${index}][discountPrice]`, sizeObj.discountPrice);
            formData.append(`sizes[${index}][quantity]`, sizeObj.quantity);
        });

        // Append images
        form.images.forEach(file => formData.append('images', file));

        // Log FormData contents
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            setLoading(true);
            if (isEditing) {
                await axios.put(
                    `https://icyflameltd-admin-app.vercel.app/api/v1/products/${selectedProductId}`,
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
            } else {
                const response = await axios.post(
                    `https://icyflameltd-admin-app.vercel.app/api/v1/products`,
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                console.log('Product created successfully:', response.data);
            }

            resetForm();
            fetchProducts();
            setFormOpen(false);
        } catch (error) {
            console.error('Error submitting product', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setIsEditing(true);
        setSelectedProductId(product._id);
        setFormOpen(true);
        setForm({
            name: product.name || '',
            highlights: product.highlights || '',
            minidescription: product.minidescription || '',
            detaileddescription: product.detaileddescription || '',
            precription: product.precription || '',
            insidepackage: product.insidepackage || '',
            categories: product.categories || [],
            tags: (product.tags || []).join(', '),
            unit: product.unit || '',
            sizes: product.sizes || [{ size: '', originalPrice: '', discountPrice: '', quantity: '' }],
            images: [],
        });
        setImages(product.images.map(img => img.url));
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (!confirmDelete) return;

        try {
            setLoading(true);
            await axios.delete(`https://icyflameltd-admin-app.vercel.app/api/v1/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product', error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setForm(initialFormState());
        setIsEditing(false);
        setSelectedProductId(null);
        setImages([]);
    };

    return (
        <div className="products-container">
            <div className="header">
                <h2>Products Management</h2>
                <button className="create-btn" onClick={openCreateForm}>
                    + Add New Product
                </button>
            </div>

            <div className={`overlay-form ${formOpen ? 'open' : ''}`}>
                <form className="product-form" onSubmit={handleSubmit}>
                    <div className="form-header">
                        <h3>{isEditing ? 'Edit Product' : 'Create Product'}</h3>
                        <button type="button" className="close-btn" onClick={() => setFormOpen(false)}>
                            ✕
                        </button>
                    </div>

                    <div className="form-content">
                        <input name="name" placeholder="Product Name" value={form.name} onChange={handleInputChange} required />

                        <input name="highlights" placeholder="Highlights" value={form.highlights} onChange={handleInputChange} />

                        <textarea
                            name="minidescription"
                            placeholder="Mini Description"
                            value={form.minidescription}
                            onChange={handleInputChange}
                        />

                        <textarea
                            name="detaileddescription"
                            placeholder="Detailed Description"
                            value={form.detaileddescription}
                            onChange={handleInputChange}
                        />

                        <textarea
                            name="precription"
                            placeholder="Prescription"
                            value={form.precription}
                            onChange={handleInputChange}
                        />

                        <input
                            name="insidepackage"
                            placeholder="Inside Package"
                            value={form.insidepackage}
                            onChange={handleInputChange}
                        />

                        <label>
                            Categories: <span>*</span>
                            <select name="categories" value={form.categories} onChange={handleCategoryChange} multiple>
                                {["Serums", "Facial", "Body", "Hair", "Lotions", "Acids"].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </label>
                        <div className="category-tags">
                            {form.categories.map((category, index) => (
                                <span key={index} className="category-tag">
                                    {category}
                                    <TfiClose className='removeSizeBTN' onClick={() => handleCategoryChange({
                                        target: { value: category }
                                    })} />
                                </span>
                            ))}
                        </div>

                        <input name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleInputChange} />

                        <input name="unit" placeholder="Unit" value={form.unit} onChange={handleInputChange} />

                        <label>Sizes</label>
                        {form.sizes.map((sizeObj, idx) => (
                            <div className="size-group" key={idx}>
                                <div className="">
                                    <label>Size</label>
                                    <input
                                        placeholder="Size"
                                        value={sizeObj.size}
                                        onChange={(e) => handleSizeChange(idx, 'size', e.target.value)}
                                    />
                                </div>
                                <div className="">
                                    <label>Original Price</label>
                                    <input
                                        type="text"
                                        placeholder="Original Price"
                                        value={sizeObj.originalPrice}
                                        onChange={(e) => handleSizeChange(idx, 'originalPrice', e.target.value)}
                                    />
                                </div>
                                <div className="">
                                    <label>Discount Price</label>
                                    <input
                                        type="text"
                                        placeholder="Discount Price"
                                        value={sizeObj.discountPrice}
                                        onChange={(e) => handleSizeChange(idx, 'discountPrice', e.target.value)}
                                    />
                                </div>
                                <div className="">
                                    <label>Quantity</label>
                                    <input
                                        type="text"
                                        placeholder="Quantity"
                                        value={sizeObj.quantity}
                                        onChange={(e) => handleSizeChange(idx, 'quantity', e.target.value)}
                                    />
                                </div>
                                <TfiClose className='removeSizeBTN' onClick={() => removeSize(idx)} />
                            </div>
                        ))}

                        <button type="button" onClick={addSize} className="add-size-btn">
                            + Add Size
                        </button>

                        <label>
                            Images: <span>*</span>
                            <input type="file" name="images" multiple accept="image/*" onChange={handleInputChange} />
                        </label>
                        <div className="image-preview">
                            {images.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image} alt={`Preview ${index}`} />
                                    <TfiClose className='removeSizeBTN' onClick={() => removeImage(index)} />
                                </div>
                            ))}
                        </div>

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
                        </button>

                        {isEditing && (
                            <button type="button" onClick={resetForm} className="cancel-btn">
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className={`products-grid ${formOpen ? 'blurred' : ''}`}>
                {loading ? (
                    <p>Loading products...</p>
                ) : products?.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    products?.map((product) => (
                        <div className="product-card" key={product._id}>
                            <img src={product.images[0]?.url || '/no-image.png'} alt={product.name} className="product-img" />
                            <h4>{product.name}</h4>
                            <p>{product.minidescription}</p>
                            <div className="card-actions">
                                <button onClick={() => handleEdit(product)} className="edit-btn">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(product._id)} className="delete-btn">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Products;