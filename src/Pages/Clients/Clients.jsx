import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Clients.css';
import {
    fetchAllVendors,
    fetchVendorsByStatus,
    changeVendorStatus,
    reset
} from '../../features/VendorsManagement/VendorsManagementSlice';

const VendorTable = () => {
    const dispatch = useDispatch();
    const {
        vendors = [],
        filteredVendors = [],
        isLoading,
        isError,
        isSuccess,
        message
    } = useSelector((state) => state.vendors);

    const [activeTab, setActiveTab] = useState('all');
    const [sortConfig, setSortConfig] = useState({
        key: 'shopName',
        direction: 'ascending'
    });
    const [showAlert, setShowAlert] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [pendingStatus, setPendingStatus] = useState('');

    useEffect(() => {
        dispatch(fetchAllVendors());
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess || isError) {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
                dispatch(reset());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, isError, dispatch]);

    const handleStatusChange = (status) => {
        setActiveTab(status);
        if (status === 'all') {
            dispatch(fetchAllVendors());
        } else {
            dispatch(fetchVendorsByStatus(status));
        }
    };

    const handleStatusUpdateClick = (vendorId, newStatus) => {
        setSelectedVendor(vendorId);
        setPendingStatus(newStatus);
        setShowConfirmation(true);
    };

    const confirmStatusUpdate = () => {
        dispatch(changeVendorStatus({
            vendorId: selectedVendor,
            status: pendingStatus
        }));
        setShowConfirmation(false);
    };

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortArrow = (key) => {
        if (sortConfig.key !== key) return '↕';
        return sortConfig.direction === 'ascending' ? '↑' : '↓';
    };

    const getStatusBadge = (status) => {
        const statusClasses = {
            'Approved': 'badge-success',
            'Pending': 'badge-warning',
            'Declined': 'badge-danger'
        };
        return (
            <span className={`badge ${statusClasses[status] || 'badge-secondary'}`}>
                {status}
            </span>
        );
    };

    const getSortedVendors = () => {
        const vendorsToSort = [...(activeTab === 'all' ? vendors : filteredVendors)];
        return vendorsToSort.sort((a, b) => {
            const aValue = a[sortConfig.key]?.toString().toLowerCase();
            const bValue = b[sortConfig.key]?.toString().toLowerCase();

            if (sortConfig.key === 'createdAt') {
                return sortConfig.direction === 'ascending'
                    ? new Date(aValue) - new Date(bValue)
                    : new Date(bValue) - new Date(aValue);
            }

            if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        });
    };

    const sortedVendors = getSortedVendors();

    return (
        <div className="client-table-container">
            <h2 className="title">Vendor Management</h2>

            {/* Alert Notification */}
            {showAlert && (
                <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`}>
                    {message}
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="confirmation-modal">
                    <div className="modal-content">
                        <h3>Confirm Status Change</h3>
                        <p>Are you sure you want to change this vendor's status to {pendingStatus}?</p>
                        <div className="modal-actions">
                            <button
                                className="modal-btn cancel"
                                onClick={() => setShowConfirmation(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className={`modal-btn ${pendingStatus.toLowerCase()}`}
                                onClick={confirmStatusUpdate}
                                disabled={isLoading}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Status Filter Tabs */}
            <div className="status-tabs">
                <button
                    className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => handleStatusChange('all')}
                >
                    All Vendors
                </button>
                {['Pending', 'Approved', 'Declined'].map((status) => (
                    <button
                        key={status}
                        className={`tab-btn ${activeTab === status ? 'active' : ''}`}
                        onClick={() => handleStatusChange(status)}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Vendors Table */}
            <div className="table-wrapper">
                <table className="client-table">
                    <thead>
                        <tr>
                            <th onClick={() => sortData('shopName')}>
                                Shop Name {getSortArrow('shopName')}
                            </th>
                            <th onClick={() => sortData('email')}>
                                Email {getSortArrow('email')}
                            </th>
                            <th onClick={() => sortData('county')}>
                                County {getSortArrow('county')}
                            </th>
                            <th onClick={() => sortData('createdAt')}>
                                Joined {getSortArrow('createdAt')}
                            </th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="6" className="loading-text">
                                    <div className="loading-spinner"></div>
                                    Loading vendors...
                                </td>
                            </tr>
                        ) : sortedVendors.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="no-data">
                                    No vendors found
                                </td>
                            </tr>
                        ) : (
                            sortedVendors.map((vendor) => (
                                <tr key={vendor._id}>
                                    <td>{vendor.shopName}</td>
                                    <td>{vendor.email}</td>
                                    <td>{vendor.county}</td>
                                    <td>{new Date(vendor.createdAt).toLocaleDateString()}</td>
                                    <td>{getStatusBadge(vendor.isApproved)}</td>
                                    <td className="actions">
                                        {vendor.isApproved !== 'Approved' && (
                                            <button
                                                className="action-btn approve"
                                                onClick={() => handleStatusUpdateClick(vendor._id, 'Approved')}
                                                disabled={isLoading}
                                            >
                                                Approve
                                            </button>
                                        )}
                                        {vendor.isApproved !== 'Declined' && (
                                            <button
                                                className="action-btn decline"
                                                onClick={() => handleStatusUpdateClick(vendor._id, 'Declined')}
                                                disabled={isLoading}
                                            >
                                                Decline
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VendorTable;