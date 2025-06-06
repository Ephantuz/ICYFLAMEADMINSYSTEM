import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/AuthSlice';
// import vendorAuthReducer from '../features/Auth/vendorAuthSlice';
// import productUploadReducer from '../features/Products/productSlice';
import productFetchReducer from '../features/Products/allProducts';
// import EventFetchReducer from '../features/Events/allEventProductsSlice';
// import createEventReducer from '../features/Events/eventSlice';
// import createCouponReducer from '../features/Coupons/couponSlice';
// import getAllCouponsAsyncReducer from '../features/Coupons/allCouponsSlice';
// import allproductFetchReducer from '../features/ShopProducts/allProducts';
// import ordersReducer from '../features/Products/Orders';
// import receiptsReducer from '../features/Products/Receipts';
import ordersReducer from '../features/Orders/Orders';
import adminPaymentReducer from '../features/Payment/Payment';
import paymentReducer from './../features/Management/paymentSlice'
import VendorsManagementReducer from '../features/VendorsManagement/VendorsManagementSlice';
import locationReducer from '../features/Locations/LocationSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        vendorProduct: productFetchReducer,
        orders: ordersReducer,
        locations: locationReducer,
        adminPayments: adminPaymentReducer,
        payments: paymentReducer,
        vendors: VendorsManagementReducer
    },
});
