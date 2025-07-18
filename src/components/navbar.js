import style from '../styles/navbar.module.css';
import Logo from '../images/logo.png';
import { FaRegBell } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import Cookies from 'js-cookie';
import { IoSettingsOutline } from "react-icons/io5";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Navbar() {
    const today = new Date();
    const day = today.getDate();

    const [winner, setWinner] = useState({});
    const email = useSelector(state => {
        const email = state.user?.email;
        return email === '' ? null : email;
    });
    const navigate = useNavigate();
    function getWinner() {
        axios.get(`${process.env.REACT_APP_BACK_END}/winner`)
            .then(res => {
                if (res.status == 200) {
                    setWinner(res.data.winner);
                } else if (res.status == 404) {
                    console.log(res.data);
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
    useEffect(() => {
        getWinner();
    }, []);
    return (
        <div className={style.navbar}>
            <img src={Logo} height={100}></img>
            <div className={style.optionsdiv}>
                {
                    email != null ?
                        email == "nummad222@gmail.com" ?
                            <div onClick={() => navigate('/showorders')} style={{ cursor: 'pointer' }}>
                                <FaRegBell color='white' size={20} />
                            </div> :
                            <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                                <IoHomeOutline color='white' size={20} />
                            </div> : null
                }
                {
                    email != null ?
                        email != "nummad222@gmail.com" ?
                            winner && winner.email == email && (day == 1 || day == 2 || day == 3) ?
                                <div onClick={() => navigate('/notifications')} style={{ cursor: 'pointer' }}>
                                    <div className={style.dot} />
                                    <FaRegBell color='white' size={20} />
                                </div> :
                                <div onClick={() => navigate('/notifications')} style={{ cursor: 'pointer' }}>
                                    <FaRegBell color='white' size={20} />
                                </div> :
                            <div onClick={() => navigate('/settings')} style={{ cursor: 'pointer' }}>
                                <IoSettingsOutline color='white' size={20} />
                            </div> : null
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
    );
}