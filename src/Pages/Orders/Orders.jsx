import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import './Orders.css';
import { fetchOrders } from '../../features/Orders/Orders';

const Orders = () => {
    const dispatch = useDispatch();
    const { orders, status, error } = useSelector((state) => state.orders);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortAscending, setSortAscending] = useState(true);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const toggleExpand = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    const handleSort = () => {
        setSortAscending(!sortAscending);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredOrders = [...orders]
        .filter((order) => {
            const referenceMatch = order.accountReference?.includes(searchTerm);
            const nameMatch = order.shippingAddress?.name?.toLowerCase().includes(searchTerm.toLowerCase());
            return referenceMatch || nameMatch;
        })
        .sort((a, b) =>
            sortAscending
                ? a.accountReference?.localeCompare(b.accountReference)
                : b.accountReference?.localeCompare(a.accountReference)
        );


    const getPaymentMethodClass = (method) => {
        switch (method.toLowerCase()) {
            case 'mpesa': return 'payment-mpesa';
            case 'payonpickup': return 'payment-pickup';
            default: return '';
        }
    };

    const getPaymentStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'status-pending';
            case 'cancelled': return 'status-cancelled';
            case 'fulfilled': return 'status-fulfilled';
            default: return '';
        }
    };

    return (
        <div className="orders-container">
            <div className="orders-header">
                <h2>Orders</h2>
                <div className="orders-actions">
                    <input
                        type="text"
                        placeholder="Search by customer or reference..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button onClick={handleSort}>
                        Sort {sortAscending ? '▲' : '▼'}
                    </button>
                </div>
            </div>

            {status === 'loading' && <p className="loading">Loading orders...</p>}
            {status === 'failed' && <p className="error">Error: {error}</p>}

            <div className="orders-list">
                {filteredOrders.length === 0 && status === 'succeeded' ? (
                    <p className="no-orders">No orders found.</p>
                ) : (
                    filteredOrders.map((order) => (
                        <div className="order-card" key={order._id}>
                            <div className="order-summary">
                                <div>
                                    <p><strong>Customer:</strong> {order.shippingAddress.name}</p>
                                    <p><strong>Reference:</strong> {order.accountReference}</p>
                                    <p><strong>Date:</strong> {moment(order.createdAt).tz('Africa/Nairobi').format('YYYY-MM-DD HH:mm:ss')}</p>
                                </div>

                                <div className="order-tags">
                                    <span className={`tag ${getPaymentMethodClass(order.paymentMethod)}`}>
                                        {order.paymentMethod}
                                    </span>
                                    <span className={`tag ${getPaymentStatusClass(order.paymentStatus)}`}>
                                        {order.paymentStatus}
                                    </span>
                                </div>

                                <button
                                    className="view-btn"
                                    onClick={() => toggleExpand(order._id)}
                                >
                                    {expandedOrderId === order._id ? 'Hide' : 'View'}
                                </button>
                            </div>

                            {expandedOrderId === order._id && (
                                <div className="order-details">
                                    <div className="details-box">
                                        <h4>Products</h4>
                                        {order.products.map((product, index) => (
                                            <div key={index} className="product-item">
                                                <p><strong>Name:</strong> {product.name}</p>
                                                <p><strong>Quantity:</strong> {product.quantity}</p>
                                                <p><strong>Price:</strong> KES {product.price}</p>
                                                <p><strong>Size:</strong> {product.size} </p>

                                                <br />
                                                <h3>Shop Details</h3>
                                                <p><strong>Shop Name:</strong> {product.shopDetails.shopName}</p>
                                                <p><strong>Email:</strong> {product.shopDetails.email}</p>
                                                <p><strong>Operating Hours:</strong> KES {product.shopDetails.operatingHours}</p>
                                                <p><strong>County:</strong> {product.shopDetails.county}</p>
                                                <p><strong>Phone Number:</strong> {product.shopDetails.phoneNumber}</p>
                                                <p><strong>Alternative Phone Number:</strong> {product.shopDetails.alternativePhoneNumber}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="details-box">
                                        <h4>Shipping Info</h4>
                                        <p><strong>Address:</strong> {order.shippingAddress.street}, {order.shippingAddress.city}</p>
                                        <p><strong>Postal Code:</strong> {order.shippingAddress.postalCode}</p>
                                        <p><strong>Mobile:</strong> {order.shippingAddress.mobileNo}</p>
                                        <p><strong>Landmark:</strong> {order.shippingAddress.landmark}</p>
                                    </div>

                                    <div className="details-box">
                                        <h4>Delivery</h4>
                                        <p><strong>Fee:</strong> KES {order.deliveryfee}</p>
                                        <p><strong>Duration:</strong> {order.deliveryDuration}</p>
                                        <p><strong>Location:</strong> {order.deliveryLocation}</p>
                                        <p><strong>Status:</strong> {order.deliveryStatus}</p>
                                    </div>

                                    <div className="details-box">
                                        <h4>Payment</h4>
                                        <p><strong>Method:</strong> {order.paymentMethod}</p>
                                        <p><strong>Status:</strong> {order.paymentStatus}</p>
                                        <p><strong>Total:</strong> KES {order.totalPrice}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;