import React from 'react'
import './SpinnerShop.css'
// import Load from './Animation - 1713443724989.gif'
function Spinner() {
    return (
        <div className="skeleton">
        <div className="skeleton-image"></div>
        <div className="skeleton-text" style={{ width: '80%' }}></div>
        <div className="skeleton-text" style={{ width: '70%' }}></div>
        <div className="skeleton-text" style={{ width: '60%' }}></div>
        <div className="skeleton-text" style={{ width: '50%' }}></div>
    </div>
    )
}

export default Spinner