import { useEffect, useState, useRef } from 'react';
import style from '../styles/deals.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DealBox({
    deals,
    dealQty,
    incrementDeal,
    decrementDeal,
    mode = "deals" // default
}) {

    const navigate = useNavigate();
    const sliderRef = useRef(null);
    const [localDeals, setLocalDeals] = useState([]);

    const handleClick = () => {
        if (mode === "home") {
            navigate("/deals");
        }
    };

    useEffect(() => {
        if (mode !== "home") return;

        const container = sliderRef.current;
        if (!container) return;

        let scrollAmount = 0;

        const interval = setInterval(() => {
            if (!container) return;

            const maxScroll = container.scrollWidth - container.clientWidth;

            scrollAmount += 260; // card width step

            if (scrollAmount >= maxScroll) {
                scrollAmount = 0; // restart loop
            }

            container.scrollTo({
                left: scrollAmount,
                behavior: "smooth"
            });

        }, 1500);

        return () => clearInterval(interval);
    }, [mode, localDeals]);

    useEffect(() => {
        setLocalDeals(deals);
    }, [deals]);

    const handleToggle = async (deal) => {
        try {
            const res = await axios.patch(
                `${process.env.REACT_APP_BACK_END}/deals/toggleStatus`,
                {
                    dealName: deal.dealName
                },
                { withCredentials: true }
            );

            const data = res.data.data;
            console.log("Updated deal:", data);
            setLocalDeals(prev =>
                prev.map(d =>
                    d._id === deal._id
                        ? { ...d, status: !d.status }
                        : d
                )
            );

        } catch (e) {
            console.log("Toggle error:", e);
        } finally {

        }
    };

    return (
        <div
            ref={sliderRef}
            className={`${style.foodboxcontainer} ${mode === "home" ? style.slider : ""}`}
        >
            {localDeals.map(deal => (
                <div
                    key={deal._id}
                    className={style.foodbox}
                    onClick={mode === "home" ? handleClick : undefined}
                    style={{ cursor: mode === "home" ? "pointer" : "default" }}
                >

                    {/* ================= HOME MODE ================= */}
                    {mode === "home" && (
                        <>
                            <img src={deal.image} className={style.foodimg} alt="" />
                            <p className={style.itemname}>{deal.dealName}</p>
                            <p className={style.itemdesc}>{deal.description}</p>
                        </>
                    )}

                    {/* ================= SETTINGS MODE ================= */}
                    {mode === "settings" && (
                        <>
                            <img src={deal.image} className={style.foodimg} alt="" />

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                margin: 10
                            }}>
                            <p className={style.itemname}>{deal.dealName}</p>

                                <div
                                    className={`${style.toggle} ${deal.status ? style.active : style.inactive}`}
                                    onClick={() => handleToggle(deal)}
                                >
                                    <div className={style.circle}></div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* ================= DEALS MODE ================= */}
                    {mode === "deals" && (
                        <>
                            <img src={deal.image} className={style.foodimg} alt="" />

                            <p className={style.itemname}>{deal.dealName}</p>
                            <p className={style.itemdesc}>{deal.description}</p>

                            {/* PRICE */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                                <p style={{ fontWeight: 'bold' }}>Price</p>
                                <p style={{ fontWeight: 'bold', color: 'rgb(240, 99, 49)' }}>
                                    {deal.dealPrice} Rs
                                </p>
                            </div>

                            {/* QUANTITY */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                                <p style={{ fontWeight: 'bold' }}>Quantity</p>

                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <p style={{ cursor: 'pointer' }} onClick={() => decrementDeal(deal._id)}>-</p>
                                    <p style={{ fontWeight: 'bold' }}>{dealQty[deal._id]}</p>
                                    <p style={{ cursor: 'pointer' }} onClick={() => incrementDeal(deal._id)}>+</p>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            ))}
        </div>
    );
}