import React, { useState, useEffect } from 'react';
import './Clients.css';
// Sample data (simulate backend fetch)
const sampleData = [
    {
        _id: '67da902e8ce8b5787c02bc4d',
        googleId: '100160018650334571608',
        name: 'Dark Cypher',
        email: 'therootcypher@gmail.com',
        picture: 'https://lh3.googleusercontent.com/a/ACg8ocJBuhYCa7nCueavyZAJsLE5AKaaA1noNLdwaVVLPJdfa1vGGTo=s96-c',
        createdAt: 1742377006453,
        updatedAt: 1742379825164,
        addresses: [
            {
                name: 'Ephantus Mwangi',
                mobileNo: '0111889761',
                houseNo: '5555',
                street: 'Ruaka',
                landmark: 'Near Quickmart',
                city: 'Nairobi',
                country: 'Kenya',
                postalCode: '25615511',
                _id: '67da9b31c200bcb444f7f2ca',
            },
        ],
    },
    {
        _id: '67da902e8ce8b5787c02bc42',
        googleId: '100160018650334571608',
        name: 'Dark Martin',
        email: 'therootcypher@gmail.com',
        picture: 'https://lh3.googleusercontent.com/a/ACg8ocJBuhYCa7nCueavyZAJsLE5AKaaA1noNLdwaVVLPJdfa1vGGTo=s96-c',
        createdAt: 1742377006453,
        updatedAt: 1742379825164,
        addresses: [
            {
                name: 'Ephantus Mwangi',
                mobileNo: '0111889761',
                houseNo: '5555',
                street: 'Ruaka',
                landmark: 'Near Quickmart',
                city: 'Nairobi',
                country: 'Kenya',
                postalCode: '25615511',
                _id: '67da9b31c200bcb444f7f2ca',
            },
        ],
    },
    {
        _id: '67da902e8ce8b5787c02bc43',
        googleId: '100160018650334571608',
        name: 'Ephy Mwangi',
        email: 'therootcypher@gmail.com',
        picture: 'https://lh3.googleusercontent.com/a/ACg8ocJBuhYCa7nCueavyZAJsLE5AKaaA1noNLdwaVVLPJdfa1vGGTo=s96-c',
        createdAt: 1742377006453,
        updatedAt: 1742379825164,
        addresses: [
            {
                name: 'Ephantus Mwangi',
                mobileNo: '0111889761',
                houseNo: '5555',
                street: 'Ruaka',
                landmark: 'Near Quickmart',
                city: 'Nairobi',
                country: 'Kenya',
                postalCode: '25615511',
                _id: '67da9b31c200bcb444f7f2ca',
            },
        ],
    },
    // Add more clients if needed
];

const ClientTable = () => {
    const [clients, setClients] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

    useEffect(() => {
        // Simulate fetching data from a backend
        setClients(sampleData);
    }, []);

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedClients = [...clients].sort((a, b) => {
            if (key === 'createdAt') {
                return direction === 'ascending' ? a[key] - b[key] : b[key] - a[key];
            }

            if (a[key]?.toLowerCase() < b[key]?.toLowerCase()) return direction === 'ascending' ? -1 : 1;
            if (a[key]?.toLowerCase() > b[key]?.toLowerCase()) return direction === 'ascending' ? 1 : -1;
            return 0;
        });

        setClients(sortedClients);
        setSortConfig({ key, direction });
    };

    const getSortArrow = (key) => {
        if (sortConfig.key !== key) return '↕';
        return sortConfig.direction === 'ascending' ? '↑' : '↓';
    };

    return (
        <div className="client-table-container">
            <h2 className="title">Clients</h2>
            <div className="table-wrapper">
                <table className="client-table">
                    <thead>
                        <tr>
                            <th>Picture</th>
                            <th onClick={() => sortData('name')}>Name {getSortArrow('name')}</th>
                            <th onClick={() => sortData('email')}>Email {getSortArrow('email')}</th>
                            <th onClick={() => sortData('createdAt')}>Joined {getSortArrow('createdAt')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.length === 0 ? (
                            <tr>
                                <td colSpan="4">Loading...</td>
                            </tr>
                        ) : (
                            clients.map((client) => (
                                <tr key={client._id}>
                                    <td>
                                        <img src={client.picture} alt={client.name} className="avatar" />
                                    </td>
                                    <td>{client.name}</td>
                                    <td>{client.email}</td>
                                    <td>{new Date(client.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientTable;
