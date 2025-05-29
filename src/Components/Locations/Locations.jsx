import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    getLocations,
    createLocation,
    updateLocation,
    deleteLocation,
    setCurrentLocation,
    reset
} from '../../features/Locations/LocationSlice';
import { toast } from 'react-toastify';
import './Locations.css';

export default function Locations() {
    const [formData, setFormData] = useState({
        name: '',
        price: ''
    });

    const { name, price } = formData;
    const { locations, isLoading, isError, message, currentLocation } = useSelector(
        (state) => state.locations
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(getLocations());
    }, [isError, message, dispatch]);

    useEffect(() => {
        if (currentLocation) {
            setFormData({
                name: currentLocation.name,
                price: currentLocation.price
            });
        }
    }, [currentLocation]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!name || !price) {
            toast.error('Please fill in all fields');
            return;
        }

        const locationData = {
            name,
            price: Number(price)
        };

        if (currentLocation) {
            dispatch(updateLocation({ id: currentLocation._id, locationData }));
        } else {
            dispatch(createLocation(locationData));
        }

        setFormData({
            name: '',
            price: ''
        });
    };

    const onEdit = (location) => {
        dispatch(setCurrentLocation(location));
    };

    const onDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this location?')) {
            dispatch(deleteLocation(id));
        }
    };

    const onCancel = () => {
        dispatch(setCurrentLocation(null));
        setFormData({
            name: '',
            price: ''
        });
    };

    return (
        <div className="locations-container">
            <h1>Delivery Locations</h1>

            <div className="location-form">
                <h2>{currentLocation ? 'Edit Location' : 'Add New Location'}</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Location Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={onChange}
                            placeholder="Enter location name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Delivery Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={price}
                            onChange={onChange}
                            placeholder="Enter delivery price"
                            min="0"
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Processing...' : currentLocation ? 'Update Location' : 'Add Location'}
                        </button>
                        {currentLocation && (
                            <button type="button" onClick={onCancel} disabled={isLoading}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="locations-list">
                <h2>Available Locations</h2>
                {locations.length === 0 ? (
                    <p>No locations found</p>
                ) : (
                    <div className="location-grid">
                        {locations.map((location) => (
                            <div key={location._id} className="location-card">
                                <h3>{location.name}</h3>
                                <br />
                                <p className='location-price'>Delivery Price: Kes {location.price.toFixed(2)}</p>
                                <div className="location-actions">
                                    <button onClick={() => onEdit(location)}>Edit</button>
                                    <button onClick={() => onDelete(location._id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}