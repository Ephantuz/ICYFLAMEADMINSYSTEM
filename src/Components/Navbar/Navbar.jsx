import React from 'react'
import './Navbar.css'
// import Logo from './../../logo.png'
// import Profile from './../../profile.jpg'
import { BiSolidSearch } from 'react-icons/bi'
import { AiFillAppstore } from 'react-icons/ai'
import { FaExpand } from 'react-icons/fa'
import { TbBellRingingFilled } from 'react-icons/tb'
import { GrSettingsOption } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {

    const { loggedIn } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const shopId = loggedIn?.user?.id
    const shopName = loggedIn?.user?.name
    const managedBy = loggedIn?.user?.managedBy
    return (
        <>
            <div className="Navbar">
                <div className="logo">
                    {/* <img src={Logo} alt="Logo" /> */}
                    <span>{shopName}</span>
                </div>
                <div className="icons">
                    <div className="user">
                        {/* <img src={Profile} alt="profile" /> */}
                        Hi, <span>{managedBy}</span>
                    </div>
                    <div className="notification">
                        <TbBellRingingFilled />
                        <span>1</span>
                    </div>
                    {/* <GrSettingsOption /> */}
                </div>
            </div>
        </>
    )
}

export default Navbar
