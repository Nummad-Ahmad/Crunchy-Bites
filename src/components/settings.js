import style from '../styles/settings.module.css';
import Navbar from './navbar';
import Cheesyfries from '../images/chessyfries.jpg';
import Frenchfries from '../images/frenchfries.jpg';
import Roll from '../images/roll.jpg';
import samosa from '../images/samosa.jpg';
import Lemonade from '../images/lemonade.jpg';
import ChocoMilk from '../images/choco.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import QrScanner from "react-qr-scanner";
import { BsQrCodeScan } from "react-icons/bs";

export default function Settings() {
    const [check, setChecked] = useState(false);
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
        if (name == 'samosa') {
            var prevValue = inputValues.samosa;
            setInputValues({ ...inputValues, [name]: prevValue + 10 });
        } else if (name == 'fries') {
            var prevValue = inputValues.fries;
            setInputValues({ ...inputValues, [name]: prevValue + 10 });
        } else if (name == 'cheesyFries') {
            var prevValue = inputValues.cheesyFries;
            setInputValues({ ...inputValues, [name]: prevValue + 10 });
        } else if (name == 'lemonade') {
            var prevValue = inputValues.lemonade;
            setInputValues({ ...inputValues, [name]: prevValue + 10 });
        }
        else if (name == 'chocoMilk') {
            var prevValue = inputValues.chocoMilk;
            setInputValues({ ...inputValues, [name]: prevValue + 10 });
        }
    };
    const decrement = (name) => {
        if (name == 'samosa') {
            var prevValue = inputValues.samosa;
            if (prevValue > 0) {
                setInputValues({ ...inputValues, [name]: prevValue - 10 });
            }
        } else if (name == 'fries') {
            var prevValue = inputValues.fries;
            if (prevValue > 0) {
                setInputValues({ ...inputValues, [name]: prevValue - 10 });
            }
        } else if (name == 'cheesyFries') {
            var prevValue = inputValues.cheesyFries;
            if (prevValue > 0) {
                setInputValues({ ...inputValues, [name]: prevValue - 10 });
            }
        } else if (name == 'lemonade') {
            var prevValue = inputValues.lemonade;
            if (prevValue > 0) {
                setInputValues({ ...inputValues, [name]: prevValue - 10 });
            }
        } else if (name == 'chocoMilk') {
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
    useEffect(() => {
        getData();
    }, []);
    const now = new Date();
    const month = now.getMonth() + 1;
    console.log(inputValues);
    return (
        <div className={style.settings}>
            <Navbar />
            <div className={style.foodboxcontainer}>
                <div className={style.foodbox}>
                    <img src={samosa} className={style.foodimg} />
                    <p className={style.itemname}>Samosa</p>
                    <p className={style.itemdesc}>Our crispy and flavorful samosas filled with spiced potatoes, wrapped in a golden, flaky crust. A perfect snack.</p>
                    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 'bold', color: "rgb(240, 99, 49)" }}>Price</p>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', color: 'white' }}>
                            <p style={{ cursor: 'pointer' }} onClick={() => decrement("samosa")}>-</p>
                            <p style={{ fontWeight: 'bold' }}>{inputValues.samosa}</p>
                            <p style={{ cursor: 'pointer' }} onClick={() => increment("samosa")}>+</p>
                        </div>
                    </div>
                    <button onClick={() => updatePrice('samosa', inputValues.samosa)} className={style.btn}>Change</button>
                </div>
                <div className={style.foodbox}>
                    <img src={Cheesyfries} className={style.foodimg} />
                    <p className={style.itemname}>Cheesy fries</p>
                    <p className={style.itemdesc}>Our cheesy and crispy fries loaded with rich, melted cheese and creamy mayo. A perfect blend of cheesy goodness.</p>
                    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 'bold', color: "rgb(240, 99, 49)" }}>Price</p>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', color: 'white' }}>
                            <p style={{ cursor: 'pointer' }} onClick={() => decrement("cheesyFries")}>-</p>
                            <p style={{ fontWeight: 'bold' }}>{inputValues.cheesyFries}</p>
                            <p style={{ cursor: 'pointer' }} onClick={() => increment("cheesyFries")}>+</p>
                        </div>
                    </div>
                    <button onClick={() => updatePrice('cheesyFries', inputValues.cheesyFries)} className={style.btn}>Change</button>
                </div>
                <div className={style.foodbox}>
                    <img src={Frenchfries} className={style.foodimg} />
                    <p className={style.itemname}>French fries</p>
                    <p className={style.itemdesc}>Crispy and golden, our French fries are perfectly seasoned and fried to perfection. Light, crunchy and quick snack.</p>
                    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 'bold', color: "rgb(240, 99, 49)" }}>Price</p>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', color: 'white' }}>
                            <p style={{ cursor: 'pointer' }} onClick={() => decrement("fries")}>-</p>
                            <p style={{ fontWeight: 'bold' }}>{inputValues.fries}</p>
                            <p style={{ cursor: 'pointer' }} onClick={() => increment("fries")}>+</p>
                        </div>
                    </div>
                    <button onClick={() => updatePrice('fries', inputValues.fries)} className={style.btn}>Change</button>
                </div>
                {
                    month < 10 && month > 3 &&
                    <div className={style.foodbox}>
                        <img src={Lemonade} className={style.foodimg} />
                        <p className={style.itemname}>Lemonade</p>
                        <p className={style.itemdesc}>Refreshingly sweet and tangy lemonade, bursting with fresh citrus flavor in every sip. Perfect for battling the summer heat.</p>
                        <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <p style={{ fontWeight: 'bold', color: "rgb(240, 99, 49)" }}>Price</p>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', color: 'white' }}>
                                <p style={{ cursor: 'pointer' }} onClick={() => decrement("lemonade")}>-</p>
                                <p style={{ fontWeight: 'bold' }}>{inputValues.lemonade}</p>
                                <p style={{ cursor: 'pointer' }} onClick={() => increment("lemonade")}>+</p>
                            </div>
                        </div>
                        <button onClick={() => updatePrice('lemonade', inputValues.lemonade)} className={style.btn}>Change</button>
                    </div>
                }
                {
                    (month > 10 || month < 3) &&
                    <div className={style.foodbox}>
                        <img src={ChocoMilk} className={style.foodimg} />
                        <p className={style.itemname}>Hot Choco Milk</p>
                        <p className={style.itemdesc}>Rich and creamy hot chocolate milk, blending smooth cocoa with velvety warmth. Perfect for cozy moments and chilly days.</p>
                        <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <p style={{ fontWeight: 'bold', color: "rgb(240, 99, 49)" }}>Price</p>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', color: 'white' }}>
                                <p style={{ cursor: 'pointer' }} onClick={() => decrement("chocoMilk")}>-</p>
                                <p style={{ fontWeight: 'bold' }}>{inputValues.chocoMilk}</p>
                                <p style={{ cursor: 'pointer' }} onClick={() => increment("chocoMilk")}>+</p>
                            </div>
                        </div>
                        <button onClick={() => updatePrice('chocoMilk', inputValues.chocoMilk)} className={style.btn}>Change</button>
                    </div>
                }
            </div>

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



