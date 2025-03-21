import React, { useState, useEffect } from 'react';
import './Orders.css';
import moment from 'moment-timezone';

const Orders = () => {
    // Mock orders fetched from backend
    const [orders, setOrders] = useState([
        {
            _id: '67b323a7acefe50c7c221ce9',
            user: '677c046e60875b5befdfbfae',
            products: [
                {
                    name: 'Hyaluronic Serum',
                    quantity: 1,
                    price: 2800,
                    size: '30',
                    _id: '67b323a7acefe50c7c221cea'
                }
            ],
            totalPrice: 3066.48,
            shippingAddress: {
                name: 'Ephantus Mwangi 2',
                mobileNo: '0711776266',
                houseNo: 'b01',
                street: 'nairobi',
                landmark: 'Quickmat',
                postalCode: '00100'
            },
            paymentMethod: 'mpesa',
            paymentStatus: 'Pending',
            deliveryfee: '150',
            deliveryDuration: 'Free Delivery',
            deliveryLocation: 'Nairobi',
            deliveryStatus: 'Pending',
            accountReference: 'ORDER-+254711776266-1739793295216-4760',
            phoneUsed: '+254711776266',
            createdAt: 1739793319265
        },
        {
            _id: '67b323a7acefe50c7c221ce7',
            user: '677c046e60875b5befdfbfbe',
            products: [
                {
                    name: 'Hyaluronic Serum',
                    quantity: 1,
                    price: 2800,
                    size: '30',
                    _id: '67b323a7acefe50c7c221cea'
                }
            ],
            totalPrice: 3066.48,
            shippingAddress: {
                name: 'Mike Liope',
                mobileNo: '0711776266',
                houseNo: 'b01',
                street: 'nairobi',
                landmark: 'Quickmat',
                postalCode: '00100'
            },
            paymentMethod: 'mpesa',
            paymentStatus: 'cancelled',
            deliveryfee: '150',
            deliveryDuration: 'Free Delivery',
            deliveryLocation: 'Nairobi',
            deliveryStatus: 'Pending',
            accountReference: 'ORDER-+254711776266-1239793295216-4760',
            phoneUsed: '+254711776266',
            createdAt: 1739793319265
        },
        {
            _id: '67b323a7acefe50c7c221ce6',
            user: '677c046e60875b5befdfbfce',
            products: [
                {
                    name: 'Hyaluronic Serum',
                    quantity: 1,
                    price: 2800,
                    size: '30',
                    _id: '67b323a7acefe50c7c221cea'
                }
            ],
            totalPrice: 3066.48,
            shippingAddress: {
                name: 'Peter Mwangi',
                mobileNo: '0711776266',
                houseNo: 'b01',
                street: 'nairobi',
                landmark: 'Quickmat',
                postalCode: '00100'
            },
            paymentMethod: 'payonpickup',
            paymentStatus: 'Pending',
            deliveryfee: '150',
            deliveryDuration: 'Free Delivery',
            deliveryLocation: 'Nairobi',
            deliveryStatus: 'fulfilled',
            accountReference: 'ORDER-+254711776266-1339793295216-4760',
            phoneUsed: '+254711776266',
            createdAt: 1739793319265
        },
        // Add more sample orders if needed
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortAscending, setSortAscending] = useState(true);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    useEffect(() => {
        // You can replace this with actual API fetch
        // fetchOrders();
    }, []);

    const toggleExpand = (orderId) => {
        if (expandedOrderId === orderId) {
            setExpandedOrderId(null);
        } else {
            setExpandedOrderId(orderId);
        }
    };

    const handleSort = () => {
        const sortedOrders = [...orders].sort((a, b) => {
            if (sortAscending) {
                return a.accountReference.localeCompare(b.accountReference);
            } else {
                return b.accountReference.localeCompare(a.accountReference);
            }
        });
        setOrders(sortedOrders);
        setSortAscending(!sortAscending);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredOrders = orders.filter((order) => {
        const referenceMatch = order.accountReference.includes(searchTerm);
        const nameMatch = order.shippingAddress.name.toLowerCase().includes(searchTerm.toLowerCase());
        return referenceMatch || nameMatch;
    });

    const getPaymentMethodClass = (method) => {
        switch (method.toLowerCase()) {
            case 'mpesa':
                return 'payment-mpesa';
            case 'payonpickup':
                return 'payment-pickup';
            default:
                return '';
        }
    };

    const getPaymentStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'status-pending';
            case 'cancelled':
                return 'status-cancelled';
            case 'fulfilled':
                return 'status-fulfilled';
            default:
                return '';
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

            <div className="orders-list">
                {filteredOrders.length === 0 ? (
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
                                                <p><strong>Size:</strong> {product.size} ml</p>
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
