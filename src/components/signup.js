import style from '../styles/signup.module.css';
import Robot from '../images/robot.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
export default function Signup(){  const [email, setemail] = useState("")
    const [password, setpass] = useState("")
    const [confirmPass, setConfirmPass] = useState('');
    const [name, setname] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
  
    function handleSignup(e) {
      e.preventDefault();
      if (name && email && password && confirmPass ) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        var valid = emailRegex.test(email);
        if (valid && password.length > 7 && password == confirmPass) {
          setLoading(true);
          axios.post(`https://crunchybitesbackend.vercel.app/signup`, { email, password, name }).then(result => {
            toast.success('Account created');
            navigate('/login', { replace: true });
          }).catch(error => {
            const errorMessage = error?.response?.data?.error || 'Something went wrong';
            toast.error(errorMessage);
            setLoading(false);
          });
        } else if (!valid) {
          toast.error('Invalid email');
        } else if (password.length < 8) {
          toast.error('Minimum password length is 8');
        } else if (password != confirmPass) {
          toast.error('Passwords must be same');
        }
      }
      else {
        toast.error('Fill all fields');
      }
    }
    return (
        <div className={style.login}>
            <div className={style.formarea}>
                <div className={style.formcontainer}>
                    <p style={{fontSize: '30px', fontWeight: 'bold', margin: '20px 0px'}}>Sign up</p>
                    <input placeholder='Full name' onChange={(e)=> setname(e.target.value)} className={style.input}/>
                    <input placeholder='Email' onChange={(e)=> setemail(e.target.value)} className={style.input}/>
                    <input type='password' placeholder='Password' onChange={(e)=> {setpass(e.target.value)}} className={style.input}/>
                    <input type='password' placeholder='Confirm password' onChange={(e)=> setConfirmPass(e.target.value)} className={style.input}/>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                        <p style={{fontSize: '16px', cursor: 'pointer'}} onClick={()=> navigate('/login')}>Already have an account?</p>
                    </div>
                    <button className={style.btn} onClick={handleSignup}>{loading ? "Creating Account ..." : "Sign Up"}</button>
                </div>
            </div>
            <div className={style.darkarea}>
                <img src={Robot} className={style.robot}/>
                <p style={{fontSize: '30px', fontWeight: 'bold', margin: '0px 0px', color: '#FFDC5A'}}>Create an account</p>
            </div>
        </div>
    );
}