import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    CircularProgress,
    Alert,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField
} from '@mui/material';
import ProcessPaymentModal from './ProcessPaymentModal.jsx';
import { getOrderPayments } from '../../features/Management/paymentSlice';
import { fetchOrders } from '../../features/Orders/Orders';
import moment from 'moment-timezone';

const OrderPayments = () => {
    const dispatch = useDispatch();
    const { orderPayments, isLoading: paymentsLoading, isError: paymentsError, message: paymentsMessage } = useSelector((state) => state.payments);
    const { orders = [], status: ordersStatus, error: ordersError } = useSelector((state) => state.orders);
    const [openModal, setOpenModal] = useState(false);
    const [selectedShop, setSelectedShop] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch all orders when component mounts
    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    // Fetch payments when selected order changes
    useEffect(() => {
        if (selectedOrderId) {
            dispatch(getOrderPayments(selectedOrderId));
        }
    }, [dispatch, selectedOrderId]);

    const handleOpenModal = (payment) => {
        console.log('Payment data:', payment); // Debug log

        // Ensure we have the required data
        const shopId = payment.shopId?._id || payment.shopId;
        const orderId = payment.orderId?._id || payment.orderId;

        if (!shopId || !orderId) {
            console.error('Missing shopId or orderId in payment data:', payment);
            return;
        }

        setSelectedShop({
            shopId,
            orderId,
            amountDue: payment.amountDue
        });
        setOpenModal(true);
    };

    const handleCloseModal = (refresh) => {
        setOpenModal(false);
        if (refresh && selectedOrderId) {
            dispatch(getOrderPayments(selectedOrderId));
        }
    };

    const handleOrderChange = (e) => {
        setSelectedOrderId(e.target.value);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter orders based on search term
    const filteredOrders = orders.filter((order) => {
        const referenceMatch = order?.accountReference?.toLowerCase().includes(searchTerm.toLowerCase());
        const nameMatch = order?.shippingAddress?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        return referenceMatch || nameMatch;
    });

    if (ordersStatus === 'loading') return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
        </Box>
    );

    if (ordersStatus === 'failed') return (
        <Alert severity="error" sx={{ m: 2 }}>
            {ordersError || 'Failed to load orders'}
        </Alert>
    );

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Order Payments</Typography>

            {/* Search and Order Selection */}
            <Card sx={{ mb: 4, p: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Search by customer or reference"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="order-select-label">Select Order</InputLabel>
                            <Select
                                labelId="order-select-label"
                                id="order-select"
                                value={selectedOrderId}
                                label="Select Order"
                                onChange={handleOrderChange}
                            >
                                <MenuItem value="">
                                    <em>Select an order</em>
                                </MenuItem>
                                {filteredOrders.map((order) => (
                                    <MenuItem key={order._id} value={order._id}>
                                        {order?.accountReference || `Order #${order._id.substring(order._id.length - 6).toUpperCase()}`} -
                                        KES {order?.totalPrice?.toFixed(2) || '0.00'} -
                                        {moment(order?.createdAt).tz('Africa/Nairobi').format('MMM D, YYYY')}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Card>

            {/* Payments Display */}
            {paymentsLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {paymentsError && (
                <Alert severity="error" sx={{ m: 2 }}>
                    {paymentsMessage || 'Failed to load payment details'}
                </Alert>
            )}

            {selectedOrderId && orderPayments && (
                <>
                    <TableContainer component={Paper} sx={{ mb: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Shop</TableCell>
                                    <TableCell>Amount Due (KES)</TableCell>
                                    <TableCell>Amount Paid (KES)</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Payment Method</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderPayments.payments?.length > 0 ? (
                                    orderPayments.payments.map((payment) => (
                                        <TableRow key={payment._id}>
                                            <TableCell>
                                                {payment.shopId?.shopName || 'Unknown Shop'}
                                            </TableCell>
                                            <TableCell>{payment.amount?.toFixed(2) || '0.00'}</TableCell>
                                            <TableCell>{payment.amountPaid?.toFixed(2) || '0.00'}</TableCell>
                                            <TableCell>{payment.status || 'Pending'}</TableCell>
                                            <TableCell>{payment.paymentMethod || 'N/A'}</TableCell>
                                            <TableCell>
                                                {payment.status !== 'Paid' && (
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={() => handleOpenModal({
                                                            shopId: payment.shopId,
                                                            orderId: payment.orderId,
                                                            amountDue: (payment.amount || 0) - (payment.amountPaid || 0)
                                                        })}
                                                    >
                                                        Process Payment
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            No payment records found for this order
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Payment Breakdown */}
                    {orderPayments.payments?.length > 0 && (
                        <>
                            <Typography variant="h5" gutterBottom>Payment Breakdown</Typography>
                            <Grid container spacing={3}>
                                {orderPayments.payments.map((payment) => (
                                    <Grid item xs={12} md={6} key={payment._id}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="h6" component="h3">
                                                    {payment.shopId?.shopName || 'Unknown Shop'}
                                                </Typography>
                                                <Typography>Product Amount: KES {payment.breakdown?.productAmount?.toFixed(2) || '0.00'}</Typography>
                                                <Typography>Commission: KES {payment.breakdown?.commissionAmount?.toFixed(2) || '0.00'}</Typography>
                                                <Typography>Net Amount: KES {payment.amount?.toFixed(2) || '0.00'}</Typography>
                                                <Typography>Status: {payment.status || 'Pending'}</Typography>
                                                {payment.transactionReference && (
                                                    <Typography>Reference: {payment.transactionReference}</Typography>
                                                )}
                                                {payment.notes && (
                                                    <Typography>Notes: {payment.notes}</Typography>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}
                </>
            )}

            {/* Payment Modal */}
            {selectedShop && (
                <ProcessPaymentModal
                    open={openModal}
                    onClose={handleCloseModal}
                    orderId={selectedShop.orderId}
                    shopId={selectedShop.shopId}
                    amountDue={selectedShop.amountDue}
                />
            )}
        </Box>
    );
};

export default OrderPayments;