import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Modal, TextField, Typography, MenuItem, Alert, CircularProgress } from '@mui/material';
import { processVendorPayment } from '../../features/Management/paymentSlice';

const ProcessPaymentModal = ({ open, onClose, orderId, shopId, amountDue }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        amount: amountDue || 0,
        paymentMethod: 'Mobile Money',
        transactionReference: '',
        notes: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Reset form when props change
    useEffect(() => {
        if (open) {
            console.log('Modal opened with:', { orderId, shopId, amountDue });
            setFormData({
                amount: amountDue || 0,
                paymentMethod: 'Mobile Money',
                transactionReference: '',
                notes: ''
            });
            setError(null);
            setSuccess(null);
        }
    }, [open, amountDue]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Submitting payment:', { orderId, shopId, formData });

        // Enhanced validation
        if (!orderId) {
            console.error('Missing orderId in payment submission');
            setError('Order information is missing');
            return;
        }

        if (!shopId) {
            console.error('Missing shopId in payment submission');
            setError('Shop information is missing');
            return;
        }

        if (formData.amount <= 0) {
            setError('Amount must be greater than 0');
            return;
        }

        if (!formData.transactionReference) {
            setError('Transaction reference is required');
            return;
        }

        setIsProcessing(true);
        setError(null);
        setSuccess(null);

        try {
            const paymentData = {
                shopId: shopId.toString(), // Ensure string format
                orderId: orderId.toString(), // Ensure string format
                amount: parseFloat(formData.amount),
                paymentMethod: formData.paymentMethod,
                transactionReference: formData.transactionReference,
                notes: formData.notes
            };

            console.log('Dispatching payment:', paymentData);
            const result = await dispatch(processVendorPayment(paymentData)).unwrap();

            if (result.success) {
                setSuccess('Payment processed successfully!');
                setTimeout(() => {
                    onClose(true);
                }, 1500);
            } else {
                setError(result.message || 'Payment processing failed');
            }
        } catch (err) {
            console.error('Payment processing error:', err);
            setError(err.message || 'Failed to process payment');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Modal open={open} onClose={() => onClose(false)}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 1
            }}>
                <Typography variant="h6" gutterBottom>Process Vendor Payment</Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Amount (KES)"
                        name="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        inputProps={{ min: "0.01", step: "0.01" }}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Payment Method"
                        name="paymentMethod"
                        select
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Cash">Cash</MenuItem>
                        <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                        <MenuItem value="Mobile Money">Mobile Money</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </TextField>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Transaction Reference"
                        name="transactionReference"
                        value={formData.transactionReference}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Notes"
                        name="notes"
                        multiline
                        rows={3}
                        value={formData.notes}
                        onChange={handleChange}
                    />

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button onClick={() => onClose(false)}>Cancel</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isProcessing || !formData.amount || !formData.transactionReference}
                        >
                            {isProcessing ? <CircularProgress size={24} /> : 'Process Payment'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default ProcessPaymentModal;