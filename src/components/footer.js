import style from '../styles/footer.module.css';
import Logo from '../images/logo.png';
import { IoLogoInstagram } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

export default function Footer() {
    const navigate = useNavigate();
    const email = useSelector(state => {
        const email = state.user?.email;
        return email === '' ? null : email;
    });
    const date = new Date().getFullYear();
    return (
        <div className={style.footer}>
            <div className={style.bigScreen}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={Logo} alt='Logo' height={100}></img>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Eat, enjoy & win</p>
                </div>
                <p style={{ marginBottom: '15px' }}>© {date} Crunchybites All Rights Reserved.</p>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', gap: '20px', height: '100%', margin: 'auto 0px' }}>
                    {
                        email != null ?
                            email != "nummad222@gmail.com" ?
                                <p style={{ cursor: 'pointer', fontSize: '18px' }} onClick={() => { email == null ? navigate('/login') : navigate('/notifications') }}>Notifications</p> :
                                <p style={{ cursor: 'pointer', fontSize: '18px' }} onClick={() => { email == null ? navigate('/login') : navigate('/settings') }}>Settings</p> :
                            null
                    }
                    {
                        email == null ?
                            <div className={style.orderbtn} onClick={() => navigate('/login')}>
                                Order
                            </div> :
                            email == "nummad222@gmail.com" ?
                                <div className={style.orderbtn} onClick={() => navigate('/customers')}>
                                    Customers
                                </div> :
                                <div className={style.orderbtn} onClick={() => navigate('/order')}>
                                    Order
                                </div>
                    }
                </div>
            </div>
            <div className={style.smallscreen}>
                <img src={Logo} alt='Logo' height={100}></img>
                <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Eat, enjoy & win</p>
                <p style={{ margin: '10px 0px' }}>All Rights Reserved.</p>
                <p style={{ margin: '10px 0px' }}>© {date} Crunchybites </p>

            </div>
        </div>
    );
}