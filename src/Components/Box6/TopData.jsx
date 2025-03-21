import React from 'react'
import { Link } from 'react-router-dom'
import { FaUsers } from 'react-icons/fa'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// import './top.css'

const TopData = (props) => {

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ]

    return (
        <>
            <div className="chart-object">
                <div className="chart-info">
                    <div className="title">
                        <FaUsers />
                        <span>Profit Growth</span>
                    </div>
                    <h1>11,500</h1>
                    {/* <Link>Weekly</Link> */}
                </div>
                <div className="chart-data">
                    <div className="chart">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart width={300} height={100} data={data}>
                                <Tooltip
                                    contentStyle={{ background: "transparent", border: "none", color: "green" }}
                                    labelStyle={{ display: "none" }}
                                    position={{ x: 50, y: -10 }}
                                />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="chart-text">
                        <span className="percentage">45%</span>
                        <span className="duration">This Month</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopData
