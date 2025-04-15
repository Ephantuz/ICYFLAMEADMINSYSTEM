import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSoldOutProductsAsync } from '../../features/Products/allProducts';
import './top.css';

// TOP SELLING PRODUCTS
const TopData = () => {
    const dispatch = useDispatch();
    const { soldOutProducts, isLoading, isError, message } = useSelector((state) => state.vendorProduct);
    // console.log('Sold Out Products:', soldOutProducts);

    useEffect(() => {
        dispatch(getSoldOutProductsAsync());
    }, [dispatch]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {message}</p>;

    return (
        <div className="TopData">
            <h1>Top Selling Products</h1>
            {soldOutProducts?.length === 0 ? (
                <p>No sold-out products available.</p>
            ) : (
                soldOutProducts?.map((product) => (
                    <div className="leading-p" key={product._id}>
                        <div className="p-profile">
                            <div className="p-profile-img">
                                <img src={product.images[0].url} alt={'img'} />
                            </div>
                            <div className="p-profile-desc">
                                <div className="p-title">{product.name}</div>
                                <div className="p-cat">{product.total_sold}</div>
                            </div>
                        </div>
                        {/* <div className="p-cost">Ksh {product.price}</div> */}
                    </div>
                ))
            )}
        </div>
    );
};

export default TopData;
