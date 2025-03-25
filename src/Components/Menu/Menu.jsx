import React from 'react'
import './Menu.css'
import { Link } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import { BsCartFill } from 'react-icons/bs'
import { GiSettingsKnobs } from 'react-icons/gi'
import { BsDatabaseFillUp } from 'react-icons/bs'
import { BsBarChartLineFill } from 'react-icons/bs'
import { SiLogseq } from 'react-icons/si'


const Menu = () => {
    return (
        <>
            <div className="Menu">
                <div className="menu-item">
                    <span className="title">Profile</span>
                    <Link to='/' className='listItem'>
                        <AiFillHome />
                        <span className="listItemTitle">Home</span>
                    </Link>
                    <Link to='/products' className='listItem'>
                        <FaUserAlt />
                        <span className="listItemTitle">Products</span>
                    </Link>
                </div>
                <div className="menu-item">
                    <span className="title">Accounts</span>
                    <Link to='/salesincome' className='listItem'>
                        <FaUserAlt />
                        <span className="listItemTitle">Sales&Orders</span>
                    </Link>
                    <Link to='/dispach' className='listItem'>
                        <FaUserAlt />
                        <span className="listItemTitle">Dispach</span>
                    </Link>
                    <Link to='/coupons' className='listItem'>
                        <FaUserAlt />
                        <span className="listItemTitle">Coupons</span>
                    </Link>

                    {/* <Link to='/Deliveries' className='listItem'>
                        <BsCartFill />
                        <span className="listItemTitle">Wor</span>
                    </Link> */}

                </div>
                <div className="menu-item">
                    <span className="title">Company</span>
                    <Link to='/employees' className='listItem'>
                        <GiSettingsKnobs />
                        <span className="listItemTitle">Employees</span>
                    </Link>
                    {/* <Link to='/departments' className='listItem'>
                        <BsDatabaseFillUp />
                        <span className="listItemTitle">Departments</span>
                    </Link> */}
                    <Link to='/clients' className='listItem'>
                        <FaUserAlt />
                        <span className="listItemTitle">Customers</span>
                    </Link>
                    <Link to='/vendors' className='listItem'>
                        <BsDatabaseFillUp />
                        <span className="listItemTitle">Vendors</span>
                    </Link>

                </div>
                <div className="menu-item">
                    <span className="title">Marketting</span>
                    <Link to='/brands' className='listItem'>
                        <BsBarChartLineFill />
                        <span className="listItemTitle">Events</span>
                    </Link>
                    <Link to='/partners' className='listItem'>
                        <BsBarChartLineFill />
                        <span className="listItemTitle">Campaigns</span>
                    </Link>

                </div>
                <div className="menu-item">
                    <span className="title">Logs</span>
                    <Link to='/settings' className='listItem'>
                        <SiLogseq />
                        <span className="listItemTitle">Settings</span>
                    </Link>
                    <Link to='/logout' className='listItem'>
                        <BsBarChartLineFill />
                        <span className="listItemTitle">Log Out</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Menu
