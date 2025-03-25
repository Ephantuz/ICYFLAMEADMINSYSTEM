import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Tarajia from './../../assets/images/LogoBig.png';
import { useDispatch, useSelector } from 'react-redux';
// import { registerShop } from './path/to/shopSlice'; // Update this path to wherever your shop action creators are located
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import './shopSettings.css'
import { toast } from "react-toastify"
// import ContentTop from '../ContentTop/ContentTop';
import { reset, updateUser } from '../../features/Auth/AuthSlice';
// import Spinner from './../../components/Spinner/Spinner.jsx';
// import { register, reset } from '../../features/Auth/AuthSlice';

const ProfileSettings = () => {
    const kenyaCounties = [
        "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu", "Garissa", "Homa Bay",
        "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii",
        "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit",
        "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi City", "Nakuru", "Nandi", "Narok",
        "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya", "Taita Taveta", "Tana River", "Tharaka Nithi",
        "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
    ];
    const methods = [
        "M-Pesa", "Bank Transfer", "Cash on Delivery"
    ];
    const fileInputRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isError, isSuccess, updatemessage, loggedIn } = useSelector((state) => state.auth)

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
        newPassword: '',
        withdraw_method: '',
        file: null,
    });


    const { email, shopName, shopDescription, managedBy, phoneNumber, alternativePhoneNumber, county, operatingHours, password, zipCode, address, withdraw_method, newPassword } = formData;

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
    useEffect(() => {
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);
    const handleClick = () => {
        fileInputRef.current.click();
    };
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);

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
        const id = loggedIn.user?.id;
        console.log('User id is:', id);
        if (!id) {
            toast.error("User ID is missing. Cannot update user.");
            return;
        }

        dispatch(updateUser({ userData, id }));
        console.log(userData);
    };
    useEffect(() => {
        if (loggedIn?.user) {
            setFormData({
                email: loggedIn.user?.email || '',
                shopName: loggedIn.user?.name || '',
                shopDescription: loggedIn.user?.description || '',
                managedBy: loggedIn.user?.managedBy || '',
                phoneNumber: loggedIn.user?.contact || '',
                alternativePhoneNumber: loggedIn.user?.alternativePhoneNumber || '',
                county: loggedIn.user?.county || '',
                operatingHours: loggedIn.user?.operatingHours || '',
                address: loggedIn.user?.address || '',
                zipCode: loggedIn.user?.zipCode || '',
                password: '',
                newPassword: '',
                withdraw_method: loggedIn.user?.withdrawMethod || '',
                file: null,
            });
        }
    }, [loggedIn?.user]);



    useEffect(() => {
        if (isError && !isSuccess) {
            toast.error(updatemessage, { toastId: 'error-toast' });
            dispatch(reset());
        }
    }, [isError, updatemessage, dispatch, isSuccess]);

    useEffect(() => {
        if (isSuccess) {
            toast.success(updatemessage, { toastId: 'success-toast' });
            dispatch(reset());
        }
    }, [isSuccess, navigate, updatemessage, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    if (isLoading) {
        return <div className="loadingDiv">
            ...Loading user form
        </div>
    }
    return (
        <div className="shopSettingsMain">
            {/* <ContentTop /> */}
            <div className="shopSettings">
                <div className="initialData">
                    <div className="shopLogo">
                        <img src={loggedIn.user?.profilePicture?.url} alt="" />
                    </div>
                    <div className="shopDetails">
                        <h4>Shop Name</h4>
                        <p>{loggedIn.user?.name}</p>
                        <h4>Managed By</h4>
                        <p>{loggedIn.user?.managedBy}</p>
                        <h4>Verification Status</h4>
                        <p>{loggedIn.user?.verificationStatus}</p>
                        <h4>description</h4>
                        <p>{loggedIn.user?.description}</p>
                        <h4>operatingHours</h4>
                        <p>{loggedIn.user?.operatingHours}</p>
                        <h4>email</h4>
                        <p>{loggedIn.user?.email}</p>
                        <h4>contact</h4>
                        <p>+254{loggedIn.user?.contact}</p>
                        <h4>alternativePhoneNumber</h4>
                        <p>+254{loggedIn.user?.alternativePhoneNumber}</p>
                        <h4>county</h4>
                        <p>{loggedIn.user?.county}</p>
                        <h4>zipCode</h4>
                        <p>{loggedIn.user?.zipCode}</p>
                        <h4>withdrawMethod</h4>
                        <p>{loggedIn.user?.withdrawMethod}</p>
                        <h4>address</h4>
                        <p>{loggedIn.user?.address}</p>
                    </div>
                </div>
                <div className='Register'>
                    <div className="form_wrapper">
                        <div className="form_container">
                            <div className="title_container">

                                <h4>Let's update your shop</h4>
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
                                    <input type="email" name="email" value={email} placeholder="Email" onChange={onChange} />
                                </div>
                                <div className="input_field">
                                    <input type="text" name="shopName" value={shopName} placeholder="Shop Name" onChange={onChange} />
                                </div>
                                <div className="input_field">
                                    <textarea name="shopDescription" value={shopDescription} placeholder="Shop Description" onChange={onChange} />
                                </div>
                                <div className="input_field">
                                    <input type="text" name="managedBy" value={managedBy} placeholder="Managed By" onChange={onChange} />
                                </div>
                                <div className="input_field">
                                    <input type="text" name="phoneNumber" value={phoneNumber} placeholder="Phone Number" onChange={onChange} />
                                </div>
                                <div className="input_field">
                                    <input type="text" name="alternativePhoneNumber" value={alternativePhoneNumber} placeholder="Alternative Phone Number" onChange={onChange} />
                                </div>
                                <div className="input_field">
                                    <input type="text" name="operatingHours" value={operatingHours} placeholder="Operating Hours" onChange={onChange} />
                                </div>
                                <div className="input_field">
                                    <input type="text" name="address" value={address} placeholder="Shop address" onChange={onChange} />
                                </div>
                                <div className="input_field select_option">
                                    <input list="counties" name="county" placeholder="Select Shop county location" onChange={onChange} value={county} />
                                    <datalist id="counties">
                                        {kenyaCounties.map((county, index) => (
                                            <option key={index} value={county} />
                                        ))}
                                    </datalist>
                                </div>
                                <div className="input_field select_option">
                                    <input list="payments" name="withdraw_method" placeholder="Select withdrawal method" onChange={onChange} value={withdraw_method} />
                                    <datalist id="payments">
                                        {methods.map((withdraw_method, index) => (
                                            <option key={index} value={withdraw_method} />
                                        ))}
                                    </datalist>
                                </div>
                                <div className="input_field">
                                    <input type="number" name="zipCode" value={zipCode} placeholder="zipCode" onChange={onChange} />
                                </div>
                                <div className="input_field">
                                    <input
                                        type={visible ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        placeholder="Old Password"
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
                                <div className="input_field">
                                    <input
                                        type={visible2 ? "text" : "password"}
                                        name="newPassword"
                                        value={newPassword}
                                        placeholder="New Password"
                                        required
                                        onChange={onChange}
                                    />
                                    <div className="icon-wrapper">
                                        {visible2 ? (
                                            <AiOutlineEye className="eye" onClick={() => setVisible2(false)} />
                                        ) : (
                                            <AiOutlineEyeInvisible className="eye" onClick={() => setVisible2(true)} />
                                        )}
                                    </div>
                                </div>

                                <input className="button" type="submit" value="Update Your Shop Details" />
                            </form>
                        </div>
                    </div>
                    <p className="credit">Powered by <a href="http://www.designtheway.com" target="_blank" rel="noopener noreferrer">e|ncrypt</a> © 2024</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
