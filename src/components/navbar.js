import style from '../styles/navbar.module.css';
import Logo from '../images/logo.png';
import { FaRegBell } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import Cookies from 'js-cookie';
import { IoSettingsOutline } from "react-icons/io5";

export default function Navbar() {
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const navigate = useNavigate();
    return (
        <div className={style.navbar}>
            <img src={Logo} height={100}></img>
            <div className={style.optionsdiv}>
            {
                    user != null ?
                        user.email == "nummad222@gmail.com" ?
                            <div onClick={() => navigate('/showorders')} style={{ cursor: 'pointer' }}>
                                <FaRegBell color='white' size={20} />
                            </div> :
                            <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                                <IoHomeOutline color='white' size={20} />
                            </div> : null
                }
                {
                    user != null ?
                        user.email != "nummad222@gmail.com" ?
                            <div onClick={() => navigate('/notifications')} style={{ cursor: 'pointer' }}>
                                <FaRegBell color='white' size={20} />
                            </div> :
                            <div onClick={() => navigate('/settings')} style={{ cursor: 'pointer' }}>
                                <IoSettingsOutline color='white' size={20} />
                            </div> : null
                }
                {
                    user == null ?
                        <div className={style.orderbtn} onClick={() => navigate('/login')}>
                        Order
                        </div> :
                        user.email == "nummad222@gmail.com" ?
                            <div className={style.orderbtn} onClick={() => navigate('/customers')}>
                                Customers
                            </div> :
                            <div className={style.orderbtn} onClick={() => navigate('/order')}>
                                Order
                            </div>
                }
            </div>
        </div>
    );
}