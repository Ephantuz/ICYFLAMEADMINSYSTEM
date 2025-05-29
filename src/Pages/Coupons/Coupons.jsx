import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Coupons.css'; // Make sure this file exists
import { useSelector } from 'react-redux';

const Coupon = () => {
    const { loggedIn } = useSelector((state) => state.auth)

    const shopId = loggedIn?.user?.id
    const [products, setProducts] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [discountType, setDiscountType] = useState('percentage');
    const [discountValue, setDiscountValue] = useState('');
    const [usageLimit, setUsageLimit] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchCoupons();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`https://icyflame-ltd-core.onrender.com/api/v1/products/shopid?shopid=${shopId}`);
            setProducts(response.data.products || []);
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };

    const fetchCoupons = async () => {
        try {
            const response = await axios.get(`https://icyflame-ltd-core.onrender.com/api/v1/coupons/shop/${shopId}`);
            setCoupons(response.data || []);
        } catch (error) {
            console.error('Error fetching coupons:', error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedProduct || !couponCode || !discountValue || !expirationDate) {
            setMessage('Please fill in all required fields.');
            return;
        }

        const couponData = {
            productId: selectedProduct,
            shopId,
            couponCode,
            discountType,
            discountValue,
            usageLimit,
            expirationDate
        };

        try {
            setLoading(true);
            const response = await axios.post('https://icyflame-ltd-core.onrender.com/api/v1/coupons/create', couponData);
            setMessage('Coupon created successfully!');

            // Reset the form
            setSelectedProduct('');
            setCouponCode('');
            setDiscountType('percentage');
            setDiscountValue('');
            setUsageLimit('');
            setExpirationDate('');

            // Refresh coupon list
            fetchCoupons();
        } catch (error) {
            console.error(error);
            setMessage('Failed to create coupon.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (couponId) => {
        if (!window.confirm('Are you sure you want to delete this coupon?')) return;

        try {
            await axios.delete(`https://icyflame-ltd-core.onrender.com/api/v1/coupons/delete/${couponId}`);
            setMessage('Coupon deleted successfully!');
            fetchCoupons();
        } catch (error) {
            console.error('Error deleting coupon:', error.message);
            setMessage('Failed to delete coupon.');
        }
    };

    return (
        <div className="coupon-container">
            <h2 className="coupon-title">Create a New Coupon</h2>

            {message && <div className="coupon-message">{message}</div>}

            <form onSubmit={handleSubmit} className="coupon-form">
                {/* Product Selection */}
                <div className="form-group">
                    <label className="form-label">Select Product *</label>
                    <select
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        className="form-input"
                    >
                        <option value="">-- Select Product --</option>
                        {products.map((product) => (
                            <option key={product._id} value={product._id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Coupon Code */}
                <div className="form-group">
                    <label className="form-label">Coupon Code *</label>
                    <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="e.g., SAVE10"
                        className="form-input"
                    />
                </div>

                {/* Discount Type */}
                <div className="form-group">
                    <label className="form-label">Discount Type *</label>
                    <select
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value)}
                        className="form-input"
                    >
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed">Fixed Amount</option>
                    </select>
                </div>

                {/* Discount Value */}
                <div className="form-group">
                    <label className="form-label">Discount Value *</label>
                    <input
                        type="number"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                        placeholder="e.g., 10"
                        className="form-input"
                    />
                </div>

                {/* Usage Limit */}
                <div className="form-group">
                    <label className="form-label">Usage Limit (Optional)</label>
                    <input
                        type="number"
                        value={usageLimit}
                        onChange={(e) => setUsageLimit(e.target.value)}
                        placeholder="e.g., 100"
                        className="form-input"
                    />
                </div>

                {/* Expiration Date */}
                <div className="form-group">
                    <label className="form-label">Expiration Date *</label>
                    <input
                        type="date"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        className="form-input"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="submit-button"
                >
                    {loading ? 'Creating...' : 'Create Coupon'}
                </button>
            </form>

            {/* List of Coupons */}
            <div className="coupon-list">
                <h3 className="coupon-list-title">My Coupons</h3>
                {coupons.length === 0 ? (
                    <p>No coupons created yet.</p>
                ) : (
                    <table className="coupon-table">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Product</th>
                                <th>Discount</th>
                                <th>Limit</th>
                                <th>Expires</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map((coupon) => (
                                <tr key={coupon._id}>
                                    <td>{coupon.couponCode}</td>
                                    <td>{coupon.productId?.name || 'N/A'}</td>
                                    <td>
                                        {coupon.discountType === 'percentage'
                                            ? `${coupon.discountValue}%`
                                            : `KES ${coupon.discountValue}`}
                                    </td>
                                    <td>{coupon.usageLimit || 'Unlimited'}</td>
                                    <td>{new Date(coupon.expirationDate).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(coupon._id)}
                                            className="delete-button"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Coupon;
