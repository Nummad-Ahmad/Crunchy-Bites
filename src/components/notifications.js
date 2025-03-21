import axios from 'axios';
import style from '../styles/notifications.module.css';
import Navbar from './navbar';
import { FaRegEnvelope } from "react-icons/fa";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Notifications() {
    const data = [
        "Hello",
        "Hello",
        "Hello",
        "Hello",
        "Hello",
        "Hello",
        "Hello",

    ];
    var user;
    const [historyData, setHistoryData] = useState([]);
    const date = new Date().toISOString();
    const formattedDate = date.split("T")[0];
    function sortByDateDescending(data) {
        return data.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    function getData(email) {
        axios.get(`http://localhost:3000/data?email=${email}&date=${formattedDate}`)
            .then(res => {
                if (res.status == 200) {
                    setHistoryData(sortByDateDescending(res.data.data));
                    console.log(res.data.data);
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
    function getOrderedItems(item) {
        var orderedItems = "";
        if (item.items.samosa > 0) {
            if (item.items.samosa == 1) {
                orderedItems = item.items.samosa + " Samosa ";
            } else {
                orderedItems = item.items.samosa + " Samosas ";
            }
        }
        if (item.items.fries > 0) {
            if (item.items.fries == 1) {
                orderedItems += item.items.fries + " plate of Fries ";
            } else {
                orderedItems += item.items.fries + " plates of Fries ";
            }
        }
        if (item.items.roll > 0) {
            if (item.items.roll == 1) {
                orderedItems += item.items.roll + " Roll ";
            } else {
                orderedItems += item.items.roll + " Rolls ";
            }
        }
        if (item.items.cheesyFries > 0) {
            if (item.items.cheesyFries == 1) {
                orderedItems += item.items.cheesyFries + " plate of Cheesy Fries ";
            } else {
                orderedItems += item.items.cheesyFries + " plates of Cheesy Fries ";
            }
        }
        return orderedItems;
    }
    function getFormattedDate(date){
        console.log(typeof(date));
        date = new Date(date);
        const formattedDate = date.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "numeric"
        });
        return (formattedDate);
    }

    useEffect(() => {
        user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
        if (user) {
            getData(user.email);
        }
    }, []);
    return (
        <div className={style.notifications}>
            <Navbar />
            <p className={style.title}>Stats</p>
            <div className={style.uprDiv}>
                <div className={style.dataDiv}>
                    <p>Orders this month</p>
                    <p>100</p>
                </div>
                <div className={style.dataDiv}>
                    <p>Most ordered item </p>
                    <p>Fries</p>
                </div>
            </div>
            <div className={style.uprDiv}>
                <div className={style.dataDiv}>
                    <p>Overall most sold item</p>
                    <p>Cheesy Fries</p>
                </div>
                <div className={style.dataDiv}>
                    <p>Next lucky draw</p>
                    <p>22 April</p>
                </div>
            </div>
            <p className={style.title}>Notifications</p>
            <div className={style.notificationscontainer}>
                {
                    historyData && historyData.length > 0 ? (
                        historyData.map((item, index) => {
                            return (
                                <div key={index} className={style.notification}>
                                    <FaRegEnvelope color="rgb(240, 99, 49)" />
                                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <p style={{maxWidth: '70%'}}>
                                        You ordered {getOrderedItems(item)}
                                    </p>
                                    <p>{getFormattedDate(item.date)}</p>
                                </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className={style.notification}>
                            <FaRegEnvelope color="white" />
                            <p>Hello</p>
                        </div>
                    )
                }


            </div>
        </div>
    );
}
