import React, { useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import "./top.css";
import { getSoldOutProductsAsync } from "../../features/Products/allProducts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A933FF"];

const TopData = () => {
    const dispatch = useDispatch();
    const { soldOutProducts, isLoading, isError, message } = useSelector(
        (state) => state.vendorProduct
    );

    useEffect(() => {
        dispatch(getSoldOutProductsAsync());
    }, [dispatch]);

    // console.log("Sold Out Products:", soldOutProducts); // Debugging

    const chartData =
        soldOutProducts?.length > 0
            ? [...soldOutProducts] // Create a shallow copy to avoid modifying Redux state
                .sort((a, b) => b.sold - a.sold)
                .slice(0, 5)
                .map((product) => ({
                    _id: product._id, // Using _id as the unique key
                    name: product.name || "Unknown Product",
                    value: product.total_sold || '',
                    color: COLORS[Math.floor(Math.random() * COLORS.length)], // Keeping colors dynamic
                }))
            : [];

    // console.log("Chart Data:", chartData);

    return (
        <div className="bar-round">
            <div className="title-up">This Month</div>
            <div className="title-up">Best Products (Sales)</div>

            <div className="chart">
                {isLoading ? (
                    <p className="text-center">Loading...</p>
                ) : isError ? (
                    <p className="text-center">{message || "Failed to load data"}</p>
                ) : chartData.length > 0 ? (
                    <ResponsiveContainer width="99%" height={300}>
                        <PieChart>
                            <Tooltip contentStyle={{ background: "white", borderRadius: "5px" }} />
                            <Pie
                                data={chartData}
                                innerRadius="50%"
                                outerRadius="70%"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((item) => (
                                    <Cell key={item.name} fill={item.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-center">No sold-out products</p>
                )}
            </div>

            <div className="options">
                {chartData.map((item) => (
                    <div className="option" key={item._id}>
                        <div className="title">
                            <div className="dot" style={{ background: item.color }}></div>
                            <span>{item.name}</span>
                        </div>
                        <span>{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopData;
