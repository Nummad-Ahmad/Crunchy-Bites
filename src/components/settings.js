import style from '../styles/settings.module.css';
import Navbar from './navbar';
import Cheesyfries from '../assets/images/chessyfries.jpg';
import Frenchfries from '../assets/images/frenchfries.jpg';
import samosa from '../assets/images/samosa.jpg';
import Lemonade from '../assets/images/lemonade.jpg';
import ChocoMilk from '../assets/images/choco.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import QrScanner from "react-qr-scanner";
import { BsQrCodeScan } from "react-icons/bs";
import DealBox from './DealBox';
import { getFoodItems } from '../constants/foodItems';

export default function Settings() {
    const [check, setChecked] = useState(false);
    
    const [deals, setDeals] = useState([]);
    const [dealQty, setDealQty] = useState({}); 
    const handleScan = (data) => {
        if (data) {
            try {
                const parsedData = JSON.parse(data.text);
                if (typeof (parsedData) !== "object" || parsedData === null || !parsedData.email || !parsedData.verificationCode) {
                    toast.error("Invalid QR Code. Please scan a valid one.");
                    setChecked(false);
                    return;
                }
                if (!parsedData.email || !parsedData.verificationCode) {
                    toast.error("Invalid QR Code. Missing email or verification code.");
                    setChecked(false);
                    return;
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(parsedData.email)) {
                    toast.error("Invalid QR Code. Email format is incorrect.");
                    setChecked(false);
                    return;
                }
                if (!/^\d{6}$/.test(parsedData.verificationCode)) {
                    toast.error("Invalid QR Code. Verification code should be a 6-digit number.");
                    setChecked(false);
                    return;
                }

                const loadingToast = toast.loading("Verifying. Please wait");

                axios.post(`${process.env.REACT_APP_BACK_END}/updatewinner`, {
                    verificationCode: String(parsedData.verificationCode),
                    winnerEmail: parsedData.email
                }, {
                    withCredentials: true //  required for sending JWT cookie
                })
                    .then(res => {
                        toast.dismiss(loadingToast);

                        if (res.status === 200) {
                            toast.success("Winner verified successfully");
                        } else {
                            toast.error("Something went wrong. Try again.");
                        }
                    })
                    .catch(error => {
                        toast.dismiss(loadingToast);

                        if (error.response) {
                            console.error("Response Error:", error.response.data);
                            if (error.response.status === 400) {
                                toast.error(error.response.data.error);
                            } else if (error.response.status === 404) {
                                toast.error("Winner not found.");
                            } else {
                                toast.error("Something went wrong.");
                            }
                        } else if (error.request) {
                            console.error("Request Error:", error.request);
                            toast.error("No response from server. Check your connection.");
                        } else {
                            console.error("Axios Error:", error.message);
                            toast.error("An unexpected error occurred.");
                        }
                    });

                setChecked(false);
            } catch (error) {
                toast.error("Invalid QR Code format. Please scan a valid one.");
                setChecked(false);
                console.error("QR Parsing Error:", error);
            }
        }
    };

    const handleError = (err) => {
        setChecked(false);
        console.error(err);
    };

    const [inputValues, setInputValues] = useState({
        samosa: 0,
        fries: 0,
        cheesyFries: 0,
        roll: 0,
        chocoMilk: 0,
        lemonade: 0
    });
    const increment = (name) => {
        if (name === 'samosa') {
            var prevValue = inputValues.samosa;
            setInputValues({ ...inputValues, [name]: prevValue + 10 });
        } else if (name === 'fries') {
            var prevValue = inputValues.fries;
            setInputValues({ ...inputValues, [name]: prevValue + 10 });
        } else if (name === 'cheesyFries') {
            var prevValue = inputValues.cheesyFries;
            setInputValues({ ...inputValues, [name]: prevValue + 10 });
        } else if (name === 'lemonade') {
            var prevValue = inputValues.lemonade;
            setInputValues({ ...inputValues, [name]: prevValue + 10 });
        }
        else if (name === 'chocoMilk') {
            var prevValue = inputValues.chocoMilk;
            setInputValues({ ...inputValues, [name]: prevValue + 10 });
        }
    };
    const decrement = (name) => {
        if (name === 'samosa') {
            var prevValue = inputValues.samosa;
            if (prevValue > 0) {
                setInputValues({ ...inputValues, [name]: prevValue - 10 });
            }
        } else if (name === 'fries') {
            var prevValue = inputValues.fries;
            if (prevValue > 0) {
                setInputValues({ ...inputValues, [name]: prevValue - 10 });
            }
        } else if (name === 'cheesyFries') {
            var prevValue = inputValues.cheesyFries;
            if (prevValue > 0) {
                setInputValues({ ...inputValues, [name]: prevValue - 10 });
            }
        } else if (name === 'lemonade') {
            var prevValue = inputValues.lemonade;
            if (prevValue > 0) {
                setInputValues({ ...inputValues, [name]: prevValue - 10 });
            }
        } else if (name === 'chocoMilk') {
            var prevValue = inputValues.chocoMilk;
            if (prevValue > 0) {
                setInputValues({ ...inputValues, [name]: prevValue - 10 });
            }
        }
    };
    function updatePrice(name, price) {
        const loadingToast = toast.loading("Updating ...");
        axios.post(`${process.env.REACT_APP_BACK_END}/updateitem`,
            { name, price },
            { withCredentials: true } //  Send cookies (JWT)
        )
            .then(res => {
                if (res.status === 200) {
                    toast.dismiss(loadingToast);
                    toast.success("Updated successfully");
                }
            })
            .catch(e => {
                toast.dismiss(loadingToast);
                toast.error("An error occurred");
                console.log(e);
            });

    }
    function getData() {
        axios.get(`${process.env.REACT_APP_BACK_END}/itemdata`)
            .then(res => {
                const formattedValue = res.data.data.reduce((acc, item) => {
                    acc[item.name] = item.price;
                    return acc;
                }, {});
                setInputValues(formattedValue);
            }
            )
            .catch(e => {
                console.log(e);
            });
    }

    const getDealsData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACK_END}/deals?isAdmin=true`);
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
        getDealsData();
    }, []);
    const now = new Date();
    const month = now.getMonth() + 1;
    
    const foodItems = getFoodItems(month);

    return (
        <div className={style.settings}>
            <Navbar />
            <div className={style.foodboxcontainer}>
    {foodItems.map(item => (
        <div key={item.key} className={style.foodbox}>

            <img src={item.img} className={style.foodimg} alt='' />

            <p className={style.itemname}>{item.name}</p>

            <p className={style.itemdesc}>{item.desc}</p>

            <div style={{
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <p style={{ fontWeight: 'bold', color: "rgb(240, 99, 49)" }}>
                    Price
                </p>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', color: 'white' }}>
                    <p style={{ cursor: 'pointer' }} onClick={() => decrement(item.key)}>-</p>

                    <p style={{ fontWeight: 'bold' }}>
                        {inputValues[item.key]}
                    </p>

                    <p style={{ cursor: 'pointer' }} onClick={() => increment(item.key)}>+</p>
                </div>
            </div>

            <button
                onClick={() => updatePrice(item.key, inputValues[item.key])}
                className={style.btn}
            >
                Change
            </button>

        </div>
    ))}
</div>

            <DealBox
                            deals={deals}
                            dealQty={dealQty}
                            mode="settings" //home, settings, deals
                        />

            {
                check ?
                    <QrScanner
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        className={style.qrscanner}
                        constraints={{
                            video: {
                                facingMode: { ideal: "environment" } // ✅ Use back camera
                            }
                        }}
                    /> :
                    <div onClick={() => setChecked(true)} className={style.qrdiv}>
                        <BsQrCodeScan size={100} color='white' />
                        <p style={{ color: 'white', fontSize: '20px' }}>Scan QR code</p>
                    </div>
            }

        </div>
    );
}



