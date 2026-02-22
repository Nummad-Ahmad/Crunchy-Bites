import style from '../styles/login.module.css';
import Robot from '../images/robot.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoClose } from "react-icons/io5";
import Logo from '../images/logo.png';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../redux/userSlice';
export default function Login() {
  const [email, setEmail] = useState("");
  const [verify, setVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleLogin(e) {
    e.preventDefault();
    if (email && password) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const valid = emailRegex.test(email);
      if (valid && password.length > 7) {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_BACK_END}/login`, { email, password }, { withCredentials: true })
          .then(result => {
            const verified = result.data.user.isVerified;
            if (verified) {
              toast.success('Login successful');
              dispatch(userLoggedIn({ email: result.data.user.email, wins: result.data.user.wins }));
              navigate('/', { replace: true });
            } else {
              toast.success('Verify your account to get started');
              setShowVerification(true);
              setLoading(false);
            }
          })
          .catch(error => {
            const errorMessage = error?.response?.data?.error || 'Something went wrong';
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

  function handleVerification(e) {
    if (verificationCode.trim().length === 6) {
      setVerify(true);
      axios.post(
        `${process.env.REACT_APP_BACK_END}/verify`,
        { email, verificationCode },
        { withCredentials: true }
      )
        .then((response) => {
          if (response.status === 200) {
            toast.success(response.data.message || 'Account verified successfully');
            setShowVerification(false);
              dispatch(userLoggedIn({ email: response.data.user.email, wins: response.data.user.wins }));
            navigate('/', { replace: true });
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
            toast.error('Unable to connect to the server. Please check your network.');
          }
          console.error('Verification error:', error);
        });
    } else {
      toast.error('Enter a valid 6-digit code');
    }
  }

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // allow only numbers

    const newCode = verificationCode.split('');
    newCode[index] = value;
    setVerificationCode(newCode.join(''));

    // Auto focus next input
    if (value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  return (
    <>
      <div className={style.login}>
        <div className={style.darkarea}>
          <img src={Robot} className={style.robot} alt='' />
          <p style={{ fontSize: '30px', fontWeight: 'bold', margin: '0px 0px', color: '#FFDC5A' }}>Login to get Started</p>
        </div>
        <div className={style.formarea}>
          <div className={style.formcontainer}>
            <img src={Logo} height={150} alt='' />
            <p style={{ fontSize: '30px', fontWeight: 'bold', margin: '0px 0px', marginBottom: '10px' }}>Login</p>
            <input placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} className={style.input} />
            <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} className={style.input} />
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <p style={{ fontSize: '16px', cursor: 'pointer' }} onClick={() => navigate('/signup')}>Signup</p>
              <p style={{ fontSize: '16px', cursor: 'pointer', textAlign: 'end' }} onClick={() => navigate('/forgotpassword')}>Forgot password?</p>
            </div>
            <button className={style.btn} onClick={(e) => handleLogin(e)}>{loading ? "Signing in ..." : "Login"}</button>
          </div>
        </div>
      </div>
      {showVerification && (
        <div className={style.verificationOverlay}>
          <div className={style.verificationContainer}>
            <div
              style={{
                display: 'flex',
                marginBottom: '10px',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h3 style={{ margin: '0px' }}>Verify Your Account</h3>
              <span
                style={{ position: 'relative', right: 5 }}
                onClick={() => setShowVerification(false)}
              >
                <IoClose size={20} />
              </span>
            </div>

            <p style={{ fontSize: '14px' }}>
              Enter the 6-digit code sent to your email.
            </p>

            {/* OTP Boxes */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className={style.verificationInput}
                  value={verificationCode[index] || ''}
                  onChange={(e) => handleOtpChange(e, index)}
                  style={{
                    color: 'white',
                    width: '40px',
                    height: '45px',
                    textAlign: 'center',
                    fontSize: '18px',
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'end', marginTop: '15px' }}>
              <button onClick={handleVerification} className={style.verifyButton}>
                {verify ? 'Verifying ...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}