import style from '../styles/forgotpassword.module.css';
import Robot from '../images/robot.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { IoClose } from "react-icons/io5";
export default function Forgotpassword() {
    const [verified, setVerified] = useState(false);
    const [showVerification, setShowVerification] = useState(false);
    const [verify, setVerify] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    function handleClick(e) {
        e.preventDefault();
        if (email && password) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const valid = emailRegex.test(email);
            if (valid && password.length > 7) {
                setLoading(true);
                axios.post(`https://crunchybitesbackend.vercel.app/forgotpassword`, { email })
                    .then(result => {
                        if (verified) {
                            toast.success('Login successful');
                            navigate('/', { replace: true });
                        } else {
                            toast.success('Verify OTP sent to your email.');
                            setShowVerification(true);
                            setLoading(false);
                        }
                    })
                    .catch(error => {
                        const errorMessage = error?.response?.data?.error || 'Something went wrong!';
                        toast.error(errorMessage);
                        setLoading(false);
                    });
            } else if (!valid) {
                toast.error('Invalid email');
            } else {
                toast.error('Minimum password length is 8');
            }
        } else {
            toast.error('Fill all fields');
        }
    }
    function handleVerificationSubmit() {
        if (verificationCode.trim().length === 6) {
            setVerify(true);
            console.log('Verification Code:', verificationCode);
            axios
                .post(`https://crunchybitesbackend.vercel.app/verifyforgotpassword`, { email, verificationCode, password })
                .then((response) => {
                    if (response.status === 200) {
                        toast.success('Password changed successfully!');
                        setShowVerification(false);
                        navigate('/login', { replace: true });
                    }
                })
                .catch((error) => {
                    setVerify(false);
                    if (error.response) {
                        switch (error.response.status) {
                            case 404:
                                toast.error(error.response.data.error || 'Invalid email or verification code.');
                                break;
                            case 500:
                                toast.error(error.response.data.error || 'Server error. Please try again later.');
                                break;
                            default:
                                toast.error('Something went wrong. Please try again.');
                        }
                    } else {
                        setVerify(false);
                        toast.error('Unable to connect to the server. Please check your network.');
                    }
                    console.error('Verification error:', error);
                });
        } else {
            toast.error('Enter a valid 6-digit code');
        }
    }
    return (
        <div className={style.login}>
            <div className={style.darkarea}>
                <img src={Robot} className={style.robot} />
                <p style={{ fontSize: '30px', fontWeight: 'bold', margin: '0px 0px', color: '#FFDC5A' }}>Change password</p>
            </div>
            <div className={style.formarea}>
                <div className={style.formcontainer}>
                    <p style={{ fontSize: '30px', fontWeight: 'bold', margin: '20px 0px' }}>Forgot password</p>
                    <input onChange={(e) => setEmail(e.target.value)} placeholder='Email' className={style.input} />
                    <input onChange={(e) => setPass(e.target.value)} type='password' placeholder='Password' className={style.input} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    </div>
                    <button className={style.btn} onClick={handleClick}>
                        {loading ? 'Changing password ...' : 'Update password'}
                    </button>
                </div>
            </div>
            {showVerification && (
                <div className={style.verificationOverlay}>
                    <div className={style.verificationContainer}>
                        <div style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
                            <h2 style={{ margin: '0px auto' }}>Verify Your Account</h2>
                            <span style={{ position: 'relative', right: 5 }} onClick={() => setShowVerification(false)}>
                                <IoClose size={20} />
                            </span>
                        </div>
                        <p>Enter the 6-digit code sent to your email.</p>
                        <input
                            type="text"
                            className={style.verificationInput}
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            maxLength={6}
                            placeholder="Enter verification code"
                        />
                        <button onClick={handleVerificationSubmit} className={style.verifyButton}>
                            {verify ? 'Verifying ...' : 'Submit'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}