import React from 'react'
import './Home.css'
import TopData1 from '../../Components/Box1/TopData.jsx'
import TopData2 from '../../Components/Box2/TopData.jsx'
import TopData3 from '../../Components/Box3/TopData.jsx'
import TopData5 from '../../Components/Box5/TopData.jsx'
import TopData6 from '../../Components/Box6/TopData.jsx'
import TopData4 from '../../Components/Box4/TopData.jsx'
import TopData7 from '../../Components/Box7/TopData.jsx'
import TopData8 from '../../Components/Box8/TopData.jsx'


const Home = () => {
    return (
        <>
            <div className="Home">
                <div className="box box1">
                     {/* // TOP SELLING PRODUCTS */}
                    <TopData1 />
                </div>
                <div className="box box2">
                     {/* // Vendors Growth */}
                    <TopData2 />
                </div>
                <div className="box box3"><TopData3 /></div>
                <div className="box box4"><TopData4 /></div>
                <div className="box box5"><TopData5 /></div>
                <div className="box box6"><TopData6 /></div>
                <div className="box box7"><TopData7 /></div>
                <div className="box box8"><TopData8 /></div>
                <div className="box box9"><TopData8 /> </div>
            </div>
        </>
    )
}

export default Home
