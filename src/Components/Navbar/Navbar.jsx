import React from 'react'
import './Navbar.css'
// import Logo from './../../logo.png'
// import Profile from './../../profile.jpg'
import { BiSolidSearch } from 'react-icons/bi'
import { AiFillAppstore } from 'react-icons/ai'
import { FaExpand } from 'react-icons/fa'
import { TbBellRingingFilled } from 'react-icons/tb'
import { GrSettingsOption } from 'react-icons/gr'

const Navbar = () => {
    return (
        <>
            <div className="Navbar">
                <div className="logo">
                    {/* <img src={Logo} alt="Logo" /> */}
                    <span>ICYFLAME LTD</span>
                </div>
                <div className="icons">
                    <div className="notification">
                        <TbBellRingingFilled />
                        <span>1</span>
                    </div>
                    <div className="user">
                        {/* <img src={Profile} alt="profile" /> */}
                        <span>Ephantus</span>
                    </div>
                    <GrSettingsOption />
                </div>
            </div>
        </>
    )
}

export default Navbar
