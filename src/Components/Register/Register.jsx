import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Tarajia from './../../assets/images/LogoBig.png';
import { useDispatch, useSelector } from 'react-redux';
// import { registerShop } from './path/to/shopSlice'; // Update this path to wherever your shop action creators are located
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import './Register.css'
import { toast } from "react-toastify"
import Spinner from './../../Components/Spinner/Spinner.jsx';
import { register, reset } from '../../features/Auth/AuthSlice';

const RegisterShop = () => {
    const kenyaCounties = [
        "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu", "Garissa", "Homa Bay",
        "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii",
        "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit",
        "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi City", "Nakuru", "Nandi", "Narok",
        "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya", "Taita Taveta", "Tana River", "Tharaka Nithi",
        "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
    ];
    const fileInputRef = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isError, isSuccess, message, messageverify } = useSelector((state) => state.auth)
    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        shopName: '',
        shopDescription: '',
        managedBy: '',
        phoneNumber: '',
        alternativePhoneNumber: '',
        county: '',
        operatingHours: '',
        address: '',
        zipCode: '',
        password: '',
        file: null,
    });

    const { email, shopName, shopDescription, managedBy, phoneNumber, alternativePhoneNumber, county, operatingHours, password, zipCode, address } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onFileChange = e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
            setFormData({ ...formData, file });
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };
    const [visible, setVisible] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Initialize a new FormData object
        const userData = new FormData();

        // Append each field from formData state to the userData FormData object
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                // Append the file as 'profilePicture' and other data directly
                if (key === 'file') {
                    if (formData[key]) userData.append('profilePicture', formData[key]);
                } else {
                    userData.append(key, formData[key]);
                }
            }
        }

        // Dispatch an action with the FormData
        dispatch(register(userData));

        // console.log(userData);
    };



    useEffect(() => {
        if (isError && !isSuccess) {
            toast.error(message || messageverify, { toastId: 'error-toast' });
            dispatch(reset());
        }
    }, [isError, message, dispatch, isSuccess, messageverify]);

    useEffect(() => {
        if (isSuccess) {
            toast.success(message);
            // getLoggedIn()
            navigate("/login")
            // dispatch(reset());
        }
    }, [isSuccess, navigate, message]);

    useEffect(() => {
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);
    // useEffect(() => {
    //     if (loggedIn) {
    //         navigate('/vendor/shop'); // Redirect to homepage if already logged in
    //     }
    // }, [loggedIn, navigate]);

    if (isLoading) {
        return <div className="loadingDiv">
            ...Loading user form
        </div>
    }
    return (
        <div className='Register'>
            <div className="form_wrapper">
                <div className="form_container">
                    <div className="title_container">
                        {/* <img src={Tarajia} alt="Logo" /> */}
                        <h2>Hello 👋</h2>
                        <h4>Let's create your shop</h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input_field file_input_field">
                            <div className="upload-btn-wrapper">
                                {selectedImage ? (
                                    <img src={selectedImage} alt="Uploaded" className="upload-img" onClick={handleClick} />
                                ) : (
                                    <button className="round-upload-btn" onClick={handleClick}>+</button>
                                )}
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={fileInputRef}
                                    onChange={onFileChange}
                                    accept="image/*"
                                />
                            </div>
                        </div>
                        <div className="input_field">
                            <input type="email" name="email" value={email} placeholder="Email" required onChange={onChange} />
                        </div>
                        <div className="input_field">
                            <input type="text" name="shopName" value={shopName} placeholder="Shop Name" required onChange={onChange} />
                        </div>
                        <div className="input_field">
                            <textarea name="shopDescription" value={shopDescription} placeholder="Shop Description" required onChange={onChange} />
                        </div>
                        <div className="input_field">
                            <input type="text" name="managedBy" value={managedBy} placeholder="Managed By" required onChange={onChange} />
                        </div>
                        <div className="input_field">
                            <input type="text" name="phoneNumber" value={phoneNumber} placeholder="Phone Number" required onChange={onChange} />
                        </div>
                        <div className="input_field">
                            <input type="text" name="alternativePhoneNumber" value={alternativePhoneNumber} placeholder="Alternative Phone Number" required onChange={onChange} />
                        </div>
                        <div className="input_field">
                            <input type="text" name="operatingHours" value={operatingHours} placeholder="Operating Hours" required onChange={onChange} />
                        </div>
                        <div className="input_field">
                            <input type="text" name="address" value={address} placeholder="Shop address" required onChange={onChange} />
                        </div>
                        <div className="input_field select_option">
                            <input list="counties" name="county" placeholder="Select Shop county location" required onChange={onChange} value={county} />
                            <datalist id="counties">
                                {kenyaCounties.map((county, index) => (
                                    <option key={index} value={county} />
                                ))}
                            </datalist>
                        </div>
                        <div className="input_field">
                            <input type="number" name="zipCode" value={zipCode} placeholder="zipCode" required onChange={onChange} />
                        </div>
                        <div className="input_field">
                            <input
                                type={visible ? "text" : "password"}
                                name="password"
                                value={password}
                                placeholder="Let's Set Password"
                                required
                                onChange={onChange}
                            />
                            <div className="icon-wrapper">
                                {visible ? (
                                    <AiOutlineEye className="eye" onClick={() => setVisible(false)} />
                                ) : (
                                    <AiOutlineEyeInvisible className="eye" onClick={() => setVisible(true)} />
                                )}
                            </div>
                        </div>

                        <input className="button" type="submit" value="Create Your Shop" />
                    </form>
                    <p className="credit">Have an Account? <Link to='/login'>Login</Link></p>
                </div>
            </div>
            <p className="credit2">Powered by <a href="https://encryptfirm.vercel.app" target="_blank" rel="noopener noreferrer">e|ncrypt</a> © 2024</p>
        </div>
    );
};

export default RegisterShop;
