import { useEffect, useState } from 'react';
import style from '../styles/showOrders.module.css';
import Navbar from './navbar';
import axios from 'axios';

export default function ShowOrders() {
const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchOrders = () => {
            axios.get(`${process.env.REACT_APP_BACK_END}/showorders`, {
                withCredentials: true
            })
                .then(res => {
                    console.log(res.data.data);
                    if (res.status === 200) {
                        setRecords(res.data.data.sort((a, b) => {
                            const [ah, am] = a.time.split(":").map(Number);
                            const [bh, bm] = b.time.split(":").map(Number);
                            return (bh * 60 + bm) - (ah * 60 + am);
                        }));
                    }
                })
                .catch(e => {
                    console.error("Error fetching today's orders:", e);
                });

        };

        fetchOrders();
        const interval = setInterval(fetchOrders, 15000);

        return () => clearInterval(interval);
    }, []);
    function changeKey(key) {
        if (key == 'samosa') {
            return 'Samosa';
        } else if (key == 'fries') {
            return "Fries";
        } else if (key == 'cheesyFries') {
            return 'Cheesy Fries';
        } else if (key == 'chocoMilk') {
            return 'Choco Milk';
        } else {
            return 'Lemonade';
        }
    }
    records.sort((a, b) => {
        const [ah, am, as] = a.time.split(":").map(Number);
        const [bh, bm, bs] = b.time.split(":").map(Number);
        return (bh * 3600 + bm * 60 + bs) - (ah * 3600 + am * 60 + as);
    });

    return (
        <div className={style.customers}>
            <Navbar />
            <div className={style.customerscontainer}>
                <div className={style.customerdata}>

                    <div style={{ padding: '10px', boxSizing: 'border-box', backgroundColor: 'rgb(25, 25, 25)', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                        <p className={style.email}>Email</p>
                        <p className={style.name}>Items</p>
                        <p className={style.totalorders}>Price</p>
                        <p className={style.money}>Order number</p>
                    </div>
                    {
                        records &&
                        records.map((item, index) => {
                            return (
                                item.email != "nummad222@gmail.com" &&
                                <div className={style.data}>
                                    <p className={style.email}>{item.sender.slice(0, 20)}</p>
                                    <p className={style.name}>
                                        {Object.entries(item.items)
                                            .filter(([key, value]) => value > 0)
                                            .map(([key, value]) => `${value} ${changeKey(key)}`)
                                            .join(', ')}
                                    </p>

                                    <p className={style.totalorders}>{item.price}</p>
                                    <p className={style.money}>{item.orderNumber}</p>
                                </div>
                            );
                        })
                    }
                </div>
                <div className={style.mobilecontent}>
                    {
                        records &&
                        records.map((item, index) => {
                            return (
                                <div className={style.mobiledata}>
                                    <div style={{ display: 'flex', flexDirection: 'column', padding : '10px 0px'}}>
                                        <p>{item.sender}</p>
                                        
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', padding : '10px 0px'}}>
                                        <p>{Object.entries(item.items)
                                            .filter(([key, value]) => value > 0)
                                            .map(([key, value]) => `${value} ${changeKey(key)}`)
                                            .join(', ')}</p>
                                    </div>
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding : '10px 0px', boxSizing: 'border-box'}}>
                                        <p>{item.price} Rs</p>
                                        <p>{item.orderNumber}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={style.paginationdata}>
                    <p>
                        Total {records.length} orders today
                    </p>
                </div>
            </div>
        </div>
    );
}