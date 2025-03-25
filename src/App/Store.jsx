import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/AuthSlice';
// import vendorAuthReducer from '../features/Auth/vendorAuthSlice';
import productUploadReducer from '../features/Products/productSlice';
import productFetchReducer from '../features/Products/allProducts';
import EventFetchReducer from '../features/Events/allEventProductsSlice';
import createEventReducer from '../features/Events/eventSlice';
import createCouponReducer from '../features/Coupons/couponSlice';
// import getAllCouponsAsyncReducer from '../features/Coupons/allCouponsSlice';
import allproductFetchReducer from '../features/ShopProducts/allProducts';
import ordersReducer from '../features/Products/Orders';
import receiptsReducer from '../features/Products/Receipts';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        // authVendor: vendorAuthReducer,
        product: productUploadReducer,
        vendorProduct: productFetchReducer,
        Events: EventFetchReducer,
        event: createEventReducer,
        coupon: createCouponReducer,
        orders: ordersReducer,
        receipts: receiptsReducer,
        application: allproductFetchReducer
    },
});
