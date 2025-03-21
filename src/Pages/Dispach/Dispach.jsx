import React, { useEffect, useState } from "react";
import "./Dispatch.css";

const Dispatch = () => {
    const [dispatchOrders, setDispatchOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortAsc, setSortAsc] = useState(true);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    useEffect(() => {
        // Fetch orders from backend (mocked here)
        const fetchedOrders = [
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
            // Add more orders...
        ];
        setDispatchOrders(fetchedOrders);
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredOrders = dispatchOrders.filter((order) => {
        const lowerSearch = searchTerm.toLowerCase();
        return (
            order.shippingAddress.name.toLowerCase().includes(lowerSearch) ||
            order.accountReference.toLowerCase().includes(lowerSearch) ||
            order.accountReference.includes(searchTerm)
        );
    });

    const sortedOrders = [...filteredOrders].sort((a, b) => {
        const dateA = a.createdAt;
        const dateB = b.createdAt;
        return sortAsc ? dateA - dateB : dateB - dateA;
    });

    const toggleExpand = (id) => {
        setExpandedOrderId(expandedOrderId === id ? null : id);
    };

    const toggleSort = () => {
        setSortAsc(!sortAsc);
    };

    const handleStatusChange = async (orderId, newPaymentStatus, newDeliveryStatus) => {
        try {
            // Send update to backend
            const response = await fetch(`https://your-api-url.com/orders/${orderId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    paymentStatus: newPaymentStatus,
                    deliveryStatus: newDeliveryStatus
                }),
            });

            if (!response.ok) throw new Error("Failed to update");

            // Update local state
            const updatedOrders = dispatchOrders.map((order) =>
                order._id === orderId
                    ? {
                        ...order,
                        paymentStatus: newPaymentStatus,
                        deliveryStatus: newDeliveryStatus,
                    }
                    : order
            );
            setDispatchOrders(updatedOrders);
            alert("Status updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Error updating statuses");
        }
    };

    const getPaymentMethodStyle = (method) => {
        switch (method.toLowerCase()) {
            case "mpesa":
                return "mpesa";
            case "payonpickup":
                return "payonpickup";
            default:
                return "";
        }
    };

    const getPaymentStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "pending";
            case "fulfilled":
                return "fulfilled";
            case "cancelled":
                return "cancelled";
            default:
                return "";
        }
    };

    return (
        <div className="dispatch-container">
            <h2>Dispatch Center</h2>

            <div className="dispatch-controls">
                <input
                    type="text"
                    placeholder="Search by customer or reference"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button onClick={toggleSort}>
                    Sort by Date {sortAsc ? "▲" : "▼"}
                </button>
            </div>

            {sortedOrders.map((order) => {
                const isPayOnPickup = order.paymentMethod.toLowerCase() === "payonpickup";

                return (
                    <div key={order._id} className="dispatch-card">
                        <div className="dispatch-header">
                            <div>
                                <strong>Customer:</strong> {order.shippingAddress.name}
                            </div>
                            <div>
                                <strong>Reference:</strong> {order.accountReference}
                            </div>
                        </div>

                        <div className="dispatch-info">
                            <span
                                className={`payment-method ${getPaymentMethodStyle(order.paymentMethod)}`}
                            >
                                {order.paymentMethod}
                            </span>

                            <span
                                className={`payment-status ${getPaymentStatusStyle(order.paymentStatus)}`}
                            >
                                {order.paymentStatus}
                            </span>
                        </div>

                        <button onClick={() => toggleExpand(order._id)}>
                            {expandedOrderId === order._id ? "Hide Details" : "View Details"}
                        </button>

                        {expandedOrderId === order._id && (
                            <div className="dispatch-details">
                                <div>
                                    <strong>Products:</strong>
                                    <ul>
                                        {order.products.map((product, index) => (
                                            <li key={index}>
                                                {product.name} - Qty: {product.quantity} - KES {product.price}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <strong>Total Price:</strong> KES {order.totalPrice}
                                </div>
                                <div>
                                    <strong>Delivery Fee:</strong> KES {order.deliveryfee}
                                </div>
                                <div>
                                    <strong>Delivery Duration:</strong> {order.deliveryDuration}
                                </div>
                                <div>
                                    <strong>Delivery Location:</strong> {order.deliveryLocation}
                                </div>

                                <div className="status-change">
                                    {isPayOnPickup && (
                                        <>
                                            <label htmlFor={`payment-status-${order._id}`}>
                                                Update Payment Status:
                                            </label>
                                            <select
                                                id={`payment-status-${order._id}`}
                                                value={order.paymentStatus}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        order._id,
                                                        e.target.value,
                                                        order.deliveryStatus
                                                    )
                                                }
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Fulfilled">Fulfilled</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </>
                                    )}

                                    <label htmlFor={`delivery-status-${order._id}`}>
                                        Update Delivery Status:
                                    </label>
                                    <select
                                        id={`delivery-status-${order._id}`}
                                        value={order.deliveryStatus}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                order._id,
                                                order.paymentStatus,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Dispatched">Dispatched</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Fulfilled">Fulfilled</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Dispatch;
