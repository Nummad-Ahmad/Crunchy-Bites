import style from '../styles/signup.module.css';
import Robot from '../images/robot.png';
import { useNavigate } from 'react-router-dom';
export default function Signup(){
    const navigate = useNavigate();
    return (
        <div className={style.login}>
            <div className={style.formarea}>
                <div className={style.formcontainer}>
                    <p style={{fontSize: '30px', fontWeight: 'bold', margin: '20px 0px'}}>Sign up</p>
                    <input placeholder='Email' className={style.input}/>
                    <input placeholder='Password' className={style.input}/>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                        <p style={{fontSize: '16px', cursor: 'pointer'}} onClick={()=> navigate('/login')}>Already have an account?</p>
                    </div>
                    <button className={style.btn}>Sign up</button>
                </div>
            </div>
            <div className={style.darkarea}>
                <img src={Robot} className={style.robot}/>
                <p style={{fontSize: '20px', fontWeight: 'bold', margin: '0px 0px'}}>Create an account</p>
            </div>
        </div>
    );
}