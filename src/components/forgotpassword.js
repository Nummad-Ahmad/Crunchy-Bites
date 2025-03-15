import style from '../styles/forgotpassword.module.css';
import Robot from '../images/robot.png';
import { useNavigate } from 'react-router-dom';
export default function Forgotpassword(){
    const navigate = useNavigate();
    return (
        <div className={style.login}>
            <div className={style.darkarea}>
                <img src={Robot} className={style.robot}/>
                <p style={{fontSize: '20px', fontWeight: 'bold', margin: '0px 0px'}}>Forgot password? Don't worry</p>
            </div>
            <div className={style.formarea}>
                <div className={style.formcontainer}>
                    <p style={{fontSize: '30px', fontWeight: 'bold', margin: '20px 0px'}}>Forgot password</p>
                    <input placeholder='Email' className={style.input}/>
                    <input placeholder='Password' className={style.input}/>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    </div>
                    <button className={style.btn}>Change password</button>
                </div>
            </div>
        </div>
    );
}