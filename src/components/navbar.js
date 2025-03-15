import style from '../styles/navbar.module.css';
import Logo from '../images/logo.png';
import { FaRegBell } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <div className={style.navbar}>
                <img src={Logo} height={100}></img>
                <div className={style.optionsdiv}>
                    <div style={{cursor: 'pointer'}}>
                    <FaRegBell color='white' size={20}/>
                    </div>
                    <div className={style.orderbtn} onClick={()=> navigate('/login')}>
                        Login 
                    </div>
                </div>
        </div>
    );
}