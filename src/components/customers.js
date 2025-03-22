import { useEffect, useState } from 'react';
import style from '../styles/customers.module.css';
import Navbar from './navbar';
import axios from 'axios';

export default function Customers() {
    const [userData, setUserData] = useState();
    useEffect(() => {
        axios.get('http://localhost:3000/customerdata').
            then(res => {
                if (res.status == 200) {
                    setUserData(res.data.data);
                    console.log(res.data.data);
                }
            }).catch(e => {
                console.log(e);
            });
    }, []);
    return (
        <div className={style.customers}>
            <Navbar />
            <div className={style.customerscontainer}>
                <div className={style.customerdata}>

                    <div style={{ padding: '10px', boxSizing: 'border-box', backgroundColor: 'rgb(25, 25, 25)', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                        <p className={style.name}>Name</p>
                        <p className={style.email}>Email</p>
                        <p className={style.totalorders}>Total orders</p>
                        <p className={style.money}>Wins</p>
                    </div>
                    {
                        userData &&
                        userData.map(item => {
                            return (
                            item.email != "nummad222@gmail.com" &&
                                <div className={style.data}>
                                    <p className={style.name}>{item.name}</p>
                                    <p className={style.email}>{item.email.slice(0, 20)}</p>
                                    <p className={style.totalorders}>{item.orders}</p>
                                    <p className={style.money}>{item.wins}</p>
                                </div>
                            );
                        })
                    }
                </div>
                <div className={style.mobilecontent}>
                    {
                        userData &&
                        userData.map(item => {
                            return (
                                <div className={style.mobiledata}>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '70px' }}>
                                        <p>{item.name}</p>
                                        <p>{item.email}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '70px' }}>
                                        <p>{item.orders} Orders</p>
                                        <p>{item.wins} Wins</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={style.paginationdata}>
                    <p>Showing {userData?.length ? userData.length - 1 : 0} of {userData?.length ? userData.length - 1 : 0} records</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                    </div>
                </div>
            </div>
        </div>
    );
}