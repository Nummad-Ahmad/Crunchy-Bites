import axios from 'axios';
import style from '../styles/notifications.module.css';
import Navbar from './navbar';
import { FaRegEnvelope } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const moment = require('moment');

export default function Notifications() {
    const user = useSelector(state => state.user.email);
    const wins = useSelector(state => state.user.wins);
    const [winner, setWinner] = useState({});
    const [historyData, setHistoryData] = useState([]);
    const date = new Date().toISOString();
    const formattedDate = date.split("T")[0];
    var day = moment(date).format('DD');
    const month = moment(date).format('MM');
    const year = moment(date).format('YYYY');
    function sortByDateDescending(data) {
        return data.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    var totalCounts;
    var mostOrderedItem = [];
    function getData() {
    axios.get(`${process.env.REACT_APP_BACK_END}/data?date=${formattedDate}`, {
        withCredentials: true // ✅ send the cookie for authentication
    })
    .then(res => {
        if (res.status === 200) {
            setHistoryData(sortByDateDescending(res.data.data));
        }
    })
    .catch(e => {
        console.log(e);
    });
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
        if (item.items.lemonade > 0) {
            if (item.items.lemonade == 1) {
                orderedItems += item.items.lemonade + " glass of lemonade";
            } else {
                orderedItems += item.items.lemonade + " glasses of lemonade ";
            }
        }
        if (item.items.cheesyFries > 0) {
            if (item.items.cheesyFries == 1) {
                orderedItems += item.items.cheesyFries + " plate of Loaded Fries ";
            } else {
                orderedItems += item.items.cheesyFries + " plates of Loaded Fries ";
            }
        }
        if (item.items.chocoMilk > 0) {
            if (item.items.chocoMilk == 1) {
                orderedItems += item.items.chocoMilk + " glass of Choco Milk ";
            } else {
                orderedItems += item.items.chocoMilk + " glasses of Choco Milk ";
            }
        }
        return orderedItems;
    }
    function getFormattedDate(date) {
        date = new Date(date);
        const formattedDate = date.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "numeric"
        });
        return (formattedDate);
    }
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
    // useEffect(() => {
    //     if (user) {
    //         getData();
    //     }
    // }, []);
    totalCounts = historyData.reduce((acc, order) => {
        for (const [item, count] of Object.entries(order.items)) {
            acc[item] = (acc[item] || 0) + count;
        }
        return acc;
    }, {});
    mostOrderedItem = Object.entries(totalCounts).reduce(
        (max, curr) => (curr[1] > max[1] ? curr : max),
        ["", -Infinity]
    );
    function nextLuckyDraw() {
        const nextMonth = moment(date).add(1, 'month').format('MMMM');
        return `1 ${nextMonth}`;
    }
    useEffect(() => {
        getWinner();
    }, []);
    historyData.sort((a, b) => {
        const [ah, am, as] = a.time.split(":").map(Number);
        const [bh, bm, bs] = b.time.split(":").map(Number);
        return (bh * 3600 + bm * 60 + bs) - (ah * 3600 + am * 60 + as);
    });
    return (
        <div className={style.notifications}>
            <Navbar />
            <p className={style.title}>Stats</p>
            <div className={style.uprDiv}>
                <div className={style.dataDiv}>
                    <p>Orders this month</p>
                    <p>{historyData.length}</p>
                </div>
                <div className={style.dataDiv}>
                    <p>Most ordered item </p>
                    <p>{
                        mostOrderedItem[0] == "" ?
                            "No data" : 
                            mostOrderedItem[0].toLowerCase() == 'cheesyfries' ?
                            "Loaded fries" :
                            mostOrderedItem[0].toLowerCase() == 'chocoMilk' ?
                            "Choco Milk" :
                            mostOrderedItem[0].charAt(0).toUpperCase() + mostOrderedItem[0].slice(1)
                    }</p>
                </div>
            </div>
            <div className={style.uprDiv}>
                <div className={style.dataDiv}>
                    <p>Prizes won</p>
                    <p>{wins}</p>
                </div>
                <div className={style.dataDiv}>
                    <p>Next lucky draw</p>
                    <p>{nextLuckyDraw()}</p>
                </div>
            </div>
            <p className={style.title}>Notifications</p>
            <div className={style.notificationscontainer}>
                {
                    winner &&
                    winner.email == user && (day == 1 || day == 2 || day == 3) &&
                    <div className={style.notification}>
                        <FaRegEnvelope color="rgb(240, 99, 49)" />
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{ maxWidth: '60%' }}>
                                Congrats {winner.name}. You won this month's lucky draw 🎉🎊🥳
                            </p>
                            <p>{day}/{month}/{year}</p>
                        </div>
                    </div>
                }
                {
                    historyData && historyData.length > 0 ? (
                        historyData.map((item, index) => {
                            return (
                                <div key={index} className={style.notification}>
                                    <FaRegEnvelope color="rgb(240, 99, 49)" />
                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p style={{ maxWidth: '60%' }}>
                                            You ordered {getOrderedItems(item)}
                                        </p>
                                        <p>{getFormattedDate(item.date)}</p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        winner &&
                        winner.email != user && (day != 1 || day != 2 || day != 3) &&
                        <div className={style.notification}>
                            <FaRegEnvelope color="rgb(240, 99, 49)" />
                            <p>No notifications</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
