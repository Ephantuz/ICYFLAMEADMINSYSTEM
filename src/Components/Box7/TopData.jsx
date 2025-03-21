import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

import './top.css';

const TopData = () => {
    // Step 1: Simulate fetching dynamic brand data (10 brands example)
    const brands = [
        {
            name: 'ICYFLAME',
            data: [5000, 6000, 5500, 5200, 5700, 6000, 6200],
        },
        {
            name: 'Nivea',
            data: [4000, 4500, 4700, 4600, 4800, 5000, 5100],
        },
        {
            name: 'Marini',
            data: [3000, 7000, 6800, 6500, 6900, 7200, 7500],
        },
        {
            name: 'Dove',
            data: [3500, 3800, 3600, 3700, 3900, 4000, 4100],
        },
        {
            name: 'Sera Vee',
            data: [2500, 4700, 4600, 4500, 4900, 5100, 5200],
        },
        {
            name: 'Poa',
            data: [3200, 4000, 4100, 4050, 4300, 4400, 4500],
        },
        {
            name: 'Daisy',
            data: [4100, 4200, 4300, 4250, 4400, 4500, 4600],
        },
        {
            name: 'GlowUp',
            data: [3700, 4600, 4700, 4550, 4800, 4950, 5000],
        },
        {
            name: 'BeautyCo',
            data: [2900, 4100, 4200, 4150, 4300, 4450, 4600],
        },
        {
            name: 'SkinFlare',
            data: [3800, 4700, 4750, 4650, 4850, 4950, 5050],
        },
    ];

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Step 2: Calculate total revenue per brand
    const sortedBrands = brands
        .map(brand => ({
            ...brand,
            total: brand.data.reduce((acc, val) => acc + val, 0),
        }))
        .sort((a, b) => b.total - a.total);

    // Step 3: Get top 5 brands
    const topBrands = sortedBrands.slice(0, 5);

    // Step 4: Transform data to match chart structure
    const chartData = days.map((day, index) => {
        const dayData = { day };
        topBrands.forEach(brand => {
            dayData[brand.name] = brand.data[index];
        });
        return dayData;
    });

    // Define colors for dynamic areas (adjust or expand as needed)
    const colors = ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0', '#9966ff', '#c9cbcf'];

    return (
        <div className="revenue">
            <div className="title">Top 5 Brand Revenue Analytics</div>
            <div className="chart">
                <ResponsiveContainer width="99%" height={400}>
                    <AreaChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 20,
                        }}
                    >
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />

                        {topBrands.map((brand, index) => (
                            <Area
                                key={brand.name}
                                type="monotone"
                                dataKey={brand.name}
                                stackId="1"
                                stroke={colors[index % colors.length]}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TopData;
