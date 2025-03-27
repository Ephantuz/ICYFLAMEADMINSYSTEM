import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AdminPayments.css";
import { fetchAdminPayments } from "../../features/Payment/Payment";

const AdminPayments = () => {
    const dispatch = useDispatch();
    const { shopEarnings, totalTaxEarnings, totalDeliveryEarnings, totalClientTaxEarnings, loading, error } = useSelector(
        (state) => state.adminPayments
    );

    useEffect(() => {
        dispatch(fetchAdminPayments());
    }, [dispatch]);

    return (
        <div className="admin-payments">
            <h2>Admin Payments Summary</h2>

            {loading && <p>Loading payments...</p>}
            {error && <p className="error">Error: {error}</p>}

            {!loading && !error && (
                <>
                    <div className="summary-box">
                        <h3>Total Tax Earnings</h3>
                        <p>KES {totalTaxEarnings.toFixed(2)}</p>
                    </div>

                    <div className="summary-box">
                        <h3>Total Delivery Earnings</h3>
                        <p>KES {totalDeliveryEarnings.toFixed(2)}</p>
                    </div>
                    <div className="summary-box">
                        <h3>Total Delivery Earnings</h3>
                        <p>KES {totalClientTaxEarnings.toFixed(2)}</p>
                    </div>

                    <h3>Shop Earnings</h3>
                    <div className="shop-list">
                        {Object.keys(shopEarnings).map((shopId) => {
                            const shop = shopEarnings[shopId];

                            return (
                                <div key={shopId} className="shop-card">
                                    <h4>{shop.shopDetails.shopName}</h4>
                                    <p><strong>Earnings:</strong> KES {shop.totalEarnings.toFixed(2)}</p>
                                    <p><strong>Email:</strong> {shop.shopDetails.email}</p>
                                    <p><strong>Phone:</strong> 0{shop.shopDetails.phone || "N/A"}</p>
                                    <p><strong>Alternate Phone:</strong> 0{shop.shopDetails.phone2 || "N/A"}</p>

                                    {/* Order Earnings for this shop */}
                                    <div className="order-earnings">
                                        <h5>Order Earnings</h5>
                                        {shop.orderEarnings.length > 0 ? (
                                            <ul>
                                                {shop.orderEarnings.map((order) => (
                                                    <li key={order.orderId} className="order-item">
                                                        <p><strong>Order ID:</strong> {order.orderId}</p>
                                                        <p><strong>Earned:</strong> KES {order.totalOrderEarnings.toFixed(2)}</p>
                                                        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No orders yet</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminPayments;
