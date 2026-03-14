import axios from 'axios';
import style from '../styles/notifications.module.css';
import Navbar from './navbar';
import { FaRegEnvelope } from "react-icons/fa";
import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWinnerNotification } from "../redux/userSlice";
import Confetti from "react-confetti";
import confettiSound from "../assets/confetti.mp3";
import moment from 'moment';

export default function Notifications() {
    const [showConfetti, setShowConfetti] = useState(false);
    const [winner, setWinner] = useState({});
    const [historyData, setHistoryData] = useState([]);

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const { email, notificationRead, wins } = user;

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const day = moment(today).format('DD');
    const month = moment(today).format('MM');
    const year = moment(today).format('YYYY');

    // ------------------ Helper Functions ------------------ //

    const padTime = (timeStr) => {
        const [h = "00", m = "00", s = "00"] = timeStr?.split(":") || [];
        return `${h.padStart(2, "0")}:${m.padStart(2, "0")}:${s.padStart(2, "0")}`;
    };

    const sortByDateDescending = (data) =>
        [...data].sort((a, b) => {
            const dateTimeA = new Date(`${a.date.split('T')[0]}T${padTime(a.time)}`);
            const dateTimeB = new Date(`${b.date.split('T')[0]}T${padTime(b.time)}`);
            return dateTimeB - dateTimeA;
        });

    const formatDate = (date) => {
        const d = new Date(date);
        const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        return `${d.getDate()} ${monthNames[d.getMonth()]}`;
    };

    const getOrderedItems = (item) => {
        const { samosa, fries, lemonade, cheesyFries, chocoMilk } = item.items;
        const parts = [];

        if (samosa) parts.push(`${samosa} Samosa${samosa > 1 ? 's' : ''}`);
        if (fries) parts.push(`${fries} plate${fries > 1 ? 's' : ''} of Fries`);
        if (lemonade) parts.push(`${lemonade} glass${lemonade > 1 ? 'es' : ''} of lemonade`);
        if (cheesyFries) parts.push(`${cheesyFries} plate${cheesyFries > 1 ? 's' : ''} of Cheesy Fries`);
        if (chocoMilk) parts.push(`${chocoMilk} glass${chocoMilk > 1 ? 'es' : ''} of Choco Milk`);

        return parts.join(', ');
    };

    const getWinnerNotification = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACK_END}/winner`);
            if (res.status === 200) setWinner(res.data.winner);
        } catch (err) {
            console.log(err);
        }
    };

    const markNotificationRead = async () => {
        try {
            await axios.patch(
                `${process.env.REACT_APP_BACK_END}/read-notification`,
                { email },
                { withCredentials: true }
            );
            dispatch(setWinnerNotification(true));
        } catch (err) {
            console.log(err);
        }
    };

    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACK_END}/data?date=${formattedDate}`, {
                withCredentials: true
            });
            if (res.status === 200) {
                setHistoryData(sortByDateDescending(res.data.data));
            }
        } catch (err) {
            console.log(err);
        }
    };

    const nextLuckyDraw = () => `1 ${moment(today).add(1, 'month').format('MMMM')}`;

    // ------------------ Computed Values ------------------ //

    const { mostOrderedItem } = useMemo(() => {
        const totalCounts = historyData.reduce((acc, order) => {
            for (const [item, count] of Object.entries(order.items)) {
                acc[item] = (acc[item] || 0) + count;
            }
            return acc;
        }, {});
        const mostOrderedItem = Object.entries(totalCounts).reduce(
            (max, curr) => (curr[1] > max[1] ? curr : max),
            ["", -Infinity]
        );
        return { mostOrderedItem };
    }, [historyData]);

    // ------------------ Effects ------------------ //

    useEffect(() => {
        if (!notificationRead) {
            const audio = new Audio(confettiSound);
            audio.play();
            setTimeout(() => setShowConfetti(true), 300);
            markNotificationRead();

            setTimeout(() => setShowConfetti(false), 6000);
        }

        if (email) getData();
    }, [email]);

    useEffect(() => { getWinnerNotification(); }, []);

    // ------------------ Render ------------------ //

    return (
        <>
            {showConfetti && (
                <div style={{ position: "fixed", width: "100%", zIndex: 999 }}>
                    <Confetti numberOfPieces={300} recycle={false} />
                </div>
            )}

            <div className={style.notifications}>
                <Navbar />
                <p className={style.title}>Stats</p>

                <div className={style.uprDiv}>
                    <div className={style.dataDiv}>
                        <p>Orders this month</p>
                        <p>{historyData.length}</p>
                    </div>
                    <div className={style.dataDiv}>
                        <p>Most ordered item</p>
                        <p>{
                            mostOrderedItem[0] === "" ? "No data" :
                            mostOrderedItem[0].toLowerCase() === 'cheesyfries' ? "Cheesy fries" :
                            mostOrderedItem[0].toLowerCase() === 'chocoMilk' ? "Choco Milk" :
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
                    {winner && winner.email === email && (
<div 
  className={style.notification} 
  style={{ border: "1px solid rgb(240, 99, 49)" }}
>
                            <FaRegEnvelope color="rgb(240, 99, 49)" />
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ maxWidth: '60%' }}>
                                    Congrats {winner.name}. You won this month's lucky draw 🎉🎊🥳
                                </p>
                            </div>
                        </div>
                    )}

                    {historyData.length > 0 ? (
                        historyData.map((item, idx) => (
                            <div key={idx} className={style.notification}>
                                <FaRegEnvelope color="rgb(240, 99, 49)" style={{ marginTop: '4px' }} />
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p>You ordered {getOrderedItems(item)} - ({formatDate(item.date)})</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        winner && winner.email !== email && (![1,2,3].includes(parseInt(day))) && (
                            <div className={style.notification}>
                                <FaRegEnvelope color="rgb(240, 99, 49)" />
                                <p>No notifications</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    );
}