import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from '@mui/material';
import { getVendorPaymentSummary } from '../../features/Management/paymentSlice';

const VendorPaymentSummary = () => {

    const { loggedIn } = useSelector((state) => state.auth);
    const shopId = loggedIn?.user?.id
    // console.log(shopId)
    const dispatch = useDispatch();
    const { vendorSummary, isLoading, isError, message } = useSelector((state) => state.payments);

    useEffect(() => {
        if (shopId) {
            dispatch(getVendorPaymentSummary(shopId));
        }
    }, [dispatch, shopId]);

    if (isLoading) return <CircularProgress />;
    if (isError) return <Alert severity="error">{message}</Alert>;

    return (
        <Box sx={{ p: 3 }}>
            {vendorSummary && (
                <>
                    <Typography variant="h4" gutterBottom>Vendor Payment Summary</Typography>

                    {/* Summary Cards */}
                    <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                        <Card sx={{ minWidth: 200 }}>
                            <CardContent>
                                <Typography variant="h6">Total Earnings</Typography>
                                <Typography variant="h4">Kes {vendorSummary.summary.totalEarnings.toFixed(2)}</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ minWidth: 200 }}>
                            <CardContent>
                                <Typography variant="h6">Total Paid</Typography>
                                <Typography variant="h4">Kes {vendorSummary.summary.totalPaid.toFixed(2)}</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ minWidth: 200 }}>
                            <CardContent>
                                <Typography variant="h6">Pending Amount</Typography>
                                <Typography variant="h4">Kes {vendorSummary.summary.pendingAmount.toFixed(2)}</Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Payment History Table */}
                    <Typography variant="h5" gutterBottom>Payment History</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Amount Paid</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Payment Method</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {vendorSummary.payments.map((payment) => (
                                    <TableRow key={payment._id}>
                                        <TableCell>{payment.orderId?._id || 'N/A'}</TableCell>
                                        <TableCell>Kes {payment.amount.toFixed(2)}</TableCell>
                                        <TableCell>Kes {payment.amountPaid.toFixed(2)}</TableCell>
                                        <TableCell>{payment.status}</TableCell>
                                        <TableCell>{payment.paymentMethod}</TableCell>
                                        <TableCell>
                                            {new Date(payment.createdAt).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </Box>
    );
};

export default VendorPaymentSummary;