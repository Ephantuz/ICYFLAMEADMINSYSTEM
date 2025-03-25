import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';

import './top.css'
const TopData = () => {

    const data = [
        { name: 'Vitamin C Serum', value: 400, color: '#0088FE' },
        { name: 'Body Lotion', value: 300, color: '#00C49F' },
        { name: 'Hyaluronic Serum', value: 300, color: '#FFBB28' },
        { name: 'NIacinamide Serum', value: 200, color: '#FF8042' },
    ];



    return (
        <>
            <div className="bar-round">
                <div className="title-up">This Month</div>
                <div className="title-up">Best Products (Sales)</div>
                <div className="chart">
                    <ResponsiveContainer width="99%" height={300}>
                        <PieChart>
                            <Tooltip
                                contentStyle={{ background: "white", borderRadius: "5px" }}
                            />
                            <Pie
                                data={data}
                                innerRadius={"50%"}
                                outerRadius={"70%"}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((item) => (
                                    <Cell
                                        key={item.name}
                                        fill={item.color} />
                                ))}
                            </Pie>

                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="options">
                    {data.map(item => (
                        <div className="option" key={item.name}>
                            <div className="title">
                                <div className="dot" style={{ background: item.color }}></div>
                                <span>{item.name}</span>
                            </div>
                            <span>{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default TopData
