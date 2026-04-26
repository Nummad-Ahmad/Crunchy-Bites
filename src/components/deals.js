import style from '../styles/deals.module.css';
import OrderPlaced from '../assets/images/orderPlaced.png';
import Navbar from './navbar';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import DealBox from './DealBox';
import { useNavigate } from 'react-router-dom';

export default function Deals() {

    const navigate = useNavigate();

    const [showOrderModal, setShowOrderModal] = useState(false);
    const [orderNumber, setOrderNumber] = useState("");
    const [ordering, setOrdering] = useState(false);

    const [deals, setDeals] = useState([]);
    const [dealQty, setDealQty] = useState({});

    // 🔥 derived map (optimization)
    const dealMap = Object.fromEntries(deals.map(d => [d._id, d]));

    // =========================
    // FETCH DATA
    // =========================
    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACK_END}/deals`);
            const data = res.data.data;

            setDeals(data);

            const initial = Object.fromEntries(data.map(d => [d._id, 0]));
            setDealQty(initial);

        } catch {
            toast.error("Failed to load deals");
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // =========================
    // DEAL HANDLERS
    // =========================
    const incrementDeal = (id) => {
        setDealQty(prev => ({
            ...prev,
            [id]: prev[id] + 1
        }));
    };

    const decrementDeal = (id) => {
        setDealQty(prev => ({
            ...prev,
            [id]: Math.max(prev[id] - 1, 0)
        }));
    };

    // =========================
    // TOTAL
    // =========================
    const calculateTotal = () => {
        return Object.keys(dealQty).reduce((sum, id) => {
            return sum + (dealQty[id] * (dealMap[id]?.dealPrice || 0));
        }, 0);
    };

    const getItems = () => {
        return Object.values(dealQty).reduce((sum, q) => sum + q, 0);
    };

    const buildItemsFromDeals = () => {
        const result = {};

        Object.keys(dealQty).forEach(id => {
            const count = dealQty[id];
            if (!count) return;

            const deal = dealMap[id];

            deal.items.forEach(item => {
                result[item.name] = (result[item.name] || 0) + item.quantity * count;
            });
        });

        return result;
    };

    // =========================
    // ORDER
    // =========================
    const sendOrder = async () => {

        if (calculateTotal() <= 0) {
            return toast.error("Add deals first");
        }

        setOrdering(true);
        const loadingToast = toast.loading("Ordering ...");

        const now = new Date();

        try {

            // ✅ build dealName array
            const dealNames = [];

            Object.keys(dealQty).forEach(id => {
                const count = dealQty[id];
                if (!count) return;

                const dealName = dealMap[id]?.dealName;

                for (let i = 0; i < count; i++) {
                    dealNames.push(dealName);
                }
            });

            const res = await axios.post(
                `${process.env.REACT_APP_BACK_END}/order-deal`,
                {
                    dealName: dealNames,
                    items: buildItemsFromDeals(),
                    date: now.toISOString().split("T")[0],
                    price: calculateTotal(),
                    time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
                },
                { withCredentials: true }
            );

            toast.dismiss(loadingToast);

            setOrderNumber(res.data?.orderNumber);
            setShowOrderModal(true);

            // reset quantities
            setDealQty(prev =>
                Object.fromEntries(Object.keys(prev).map(k => [k, 0]))
            );

        } catch {
            toast.dismiss(loadingToast);
            toast.error("Error placing order");
        } finally {
            setOrdering(false);
        }
    };

    const handleButtonClick = () => {
        setShowOrderModal(false);
        navigate('/notifications');
    };

    return (
        <div className={style.order}>
            <Navbar />

            {/* ================= DEALS ================= */}
            <DealBox
                deals={deals}
                dealQty={dealQty}
                incrementDeal={incrementDeal}
                decrementDeal={decrementDeal}
                mode="deals" //home, settings, deals
            />

            {/* ================= TOTAL ================= */}
            <div className={style.quantityandprice}>
                <div className={style.price}>
                    <p>Total price</p>
                    <p style={{ color: 'rgb(240, 99, 49)' }}>
                        {getItems() > 0 ? calculateTotal() : 0} Rs
                    </p>
                </div>

                <div className={style.quantity}>
                    <p>Total items</p>
                    <p>{getItems()}</p>
                </div>

                <div onClick={() => !ordering && sendOrder()} className={style.btn}>
                    Order
                </div>
            </div>

            {/* ================= MODAL ================= */}
            {showOrderModal && (
                <div className={style.verificationOverlay}>
                    <div className={style.verificationContainer}>

                        {/* Image */}
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={OrderPlaced} alt="" style={{ width: '200px' }} />
                        </div>

                        {/* Text */}
                        <p style={{ textAlign: 'center', marginTop: '10px' }}>
                            Your order ({orderNumber}) has been placed 🎉!
                        </p>

                        {/* Button */}
                        <div style={{ marginTop: '15px' }}>
                            <button
                                className={style.verifyButton}
                                onClick={() => handleButtonClick()}
                            >
                                OK
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}