import React from 'react'
import './top.css'
import Product1 from './../../beauty/abnachiq1.jpeg'
import Product2 from './../../beauty/abnachiq2.jpeg'
import Product3 from './../../beauty/abnachiq3.jpeg'
import Product4 from './../../beauty/abnachiq4.jpeg'
import Product5 from './../../beauty/abnachiq5.jpeg'
import Product6 from './../../beauty/abnachiq6.jpeg'
import Product7 from './../../beauty/abnachiq7.jpeg'
import Product8 from './../../beauty/abnachiq8.jpeg'
import Product9 from './../../beauty/abnachiq9.jpeg'


// TOP SELLING PRODUCTS

const TopData = () => {
    return (
        <>
            <div className="TopData">
                <h1>Top Selling Products</h1>
                <div className="leading-p">
                    <div className="p-profile">
                        <div className="p-profile-img">
                            <img src={Product1} alt="product" />
                        </div>
                        <div className="p-profile-desc">
                            <div className="p-title">Shea Butter</div>
                            <div className="p-cat">1kg body</div>
                        </div>
                    </div>
                    <div className="p-cost">Ksh 1200</div>
                </div>
                <div className="leading-p">
                    <div className="p-profile">
                        <div className="p-profile-img">
                            <img src={Product2} alt="product" />
                        </div>
                        <div className="p-profile-desc">
                            <div className="p-title">Coconut Butter</div>
                            <div className="p-cat">1kg body</div>
                        </div>
                    </div>
                    <div className="p-cost">Ksh 1200</div>
                </div>
                <div className="leading-p">
                    <div className="p-profile">
                        <div className="p-profile-img">
                            <img src={Product3} alt="product" />
                        </div>
                        <div className="p-profile-desc">
                            <div className="p-title">Lactic Lotion</div>
                            <div className="p-cat">1kg body</div>
                        </div>
                    </div>
                    <div className="p-cost">Ksh 1200</div>
                </div>
                <div className="leading-p">
                    <div className="p-profile">
                        <div className="p-profile-img">
                            <img src={Product4} alt="product" />
                        </div>
                        <div className="p-profile-desc">
                            <div className="p-title">Scrabber</div>
                            <div className="p-cat">1kg body</div>
                        </div>
                    </div>
                    <div className="p-cost">Ksh 1200</div>
                </div>
                <div className="leading-p">
                    <div className="p-profile">
                        <div className="p-profile-img">
                            <img src={Product5} alt="product" />
                        </div>
                        <div className="p-profile-desc">
                            <div className="p-title">Gellr</div>
                            <div className="p-cat">1kg body</div>
                        </div>
                    </div>
                    <div className="p-cost">Ksh 1200</div>
                </div>
                <div className="leading-p">
                    <div className="p-profile">
                        <div className="p-profile-img">
                            <img src={Product6} alt="product" />
                        </div>
                        <div className="p-profile-desc">
                            <div className="p-title">Perfume</div>
                            <div className="p-cat">1kg body</div>
                        </div>
                    </div>
                    <div className="p-cost">Ksh 1200</div>
                </div>
            </div>
        </>
    )
}

export default TopData
