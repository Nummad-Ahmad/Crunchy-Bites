import style from '../styles/login.module.css';
import Robot from '../images/robot.png';
import { useNavigate } from 'react-router-dom';
export default function Login(){
    const navigate = useNavigate();
    return (
        <div className={style.login}>
            <div className={style.darkarea}>
                <img src={Robot} className={style.robot}/>
                <p style={{fontSize: '20px', fontWeight: 'bold', margin: '0px 0px'}}>Login to get Started</p>
            </div>
            <div className={style.formarea}>
                <div className={style.formcontainer}>
                    <p style={{fontSize: '30px', fontWeight: 'bold', margin: '20px 0px', color: 'rgb(0,)'}}>Login</p>
                    <input placeholder='Email' className={style.input}/>
                    <input placeholder='Password' className={style.input}/>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                        <p style={{fontSize: '16px', cursor: 'pointer'}} onClick={()=> navigate('/signup')}>Don't have an account?</p>
                        <p style={{fontSize: '16px', cursor: 'pointer', textAlign: 'end'}} onClick = {()=> navigate('/forgotpassword')}>Forgot password?</p>
                    </div>
                    <button className={style.btn}>Login</button>
                </div>
            </div>
        </div>
    );
}