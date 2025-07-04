import style from '../styles/order.module.css';
import CheesyFries from '../images/chessyfries.jpg';
import FrenchFries from '../images/frenchfries.jpg';
import Roll from '../images/roll.jpg';
import Samosa from '../images/samosa.jpg';
import Lemonade from '../images/lemonade.jpg';
import ChocoMilk from '../images/choco.jpg';
import Navbar from './navbar';
import { useDispatch } from "react-redux";
import { setCheesyFries, setChocoMilk, setFries, setLemonade, setRoll, setSamosa } from '../redux/slice';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Order() {
    const [dayName, setDayName] = useState("");
    useEffect(() => {
        const today = new Date();
        const localDay = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'Asia/Karachi' }).format(today);
        setDayName(localDay);
        if (localDay == 'Friday') {
            toast.success("Special discounts for blessed Friday");
        }
    }, []);
    const [isLoaded, setLoaded] = useState(false);
    const [ordering, isOrdering] = useState(false);
    const dispatch = useDispatch();
    const date = new Date().toISOString();
    const formattedDate = date.split("T")[0];
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const [inputValues, setInputValues] = useState({
        samosa: 0,
        fries: 0,
        cheesyFries: 0,
        roll: 0,
        chocoMilk: 0,
        lemonade: 0
    });
    const [prices, setPrices] = useState({
        samosa: 0,
        fries: 0,
        cheesyFries: 0,
        roll: 0,
        chocoMilk: 0,
        lemonade: 0
    });
    function calculateTotal() {
        var sum = (dayName == "Friday" ? inputValues.samosa * 35 : inputValues.samosa * 50) + (dayName == "Friday" ? inputValues.fries * 80 : inputValues.fries * 100) + (dayName == "Friday" ? inputValues.cheesyFries * 120 : inputValues.cheesyFries * 150) + (dayName == "Friday" ? inputValues.lemonade * 35 : inputValues.lemonade * 50) + (dayName == "Friday" ? inputValues.chocoMilk * 120 : inputValues.chocoMilk * 150);
        return sum;
    }

    function sendOrder() {
        if (hours > 17 || hours < 9) {
            toast.error("Order can only be placed between 9am to 5pm");
            return;
        }
        if (calculateTotal() > 0) {
            isOrdering(true);
            const loadingToast = toast.loading("Ordering ...");
            axios.post(`${process.env.REACT_APP_BACK_END}/order`, {
                items: inputValues,
                date: formattedDate,
                price: calculateTotal(),
                time: `${hours}:${minutes}:${seconds}`
            }, {
                withCredentials: true //  make sure this is present so the cookie is sent
            })
                .then(res => {
                    if (res.status === 201) {
                        toast.dismiss(loadingToast);
                        toast.success(`Order number is ${res.data.orderNumber}`);
                        isOrdering(false);
                    }
                })
                .catch(e => {
                    toast.dismiss(loadingToast);
                    toast.error("An error occurred");
                    console.log(e);
                    isOrdering(false);
                });

        } else {
            toast.error('Add items first');
        }
    }
    function getItems() {
        var sum = (inputValues.samosa) + (inputValues.fries) + (inputValues.cheesyFries) + (inputValues.lemonade) + (inputValues.chocoMilk);
        return sum;
    }
    const increment = (name) => {
        if (name == 'samosa') {
            var prevValue = inputValues.samosa;
            setInputValues({ ...inputValues, [name]: prevValue + 1 });
            dispatch(setSamosa(prevValue + 1));
        } else if (name == 'fries') {
            var prevValue = inputValues.fries;
            setInputValues({ ...inputValues, [name]: prevValue + 1 });
            dispatch(setFries(prevValue + 1));
        } else if (name == 'cheesyFries') {
            var prevValue = inputValues.cheesyFries;
            setInputValues({ ...inputValues, [name]: prevValue + 1 });
            dispatch(setCheesyFries(prevValue + 1));
        } else if (name == 'lemonade') {
            var prevValue = inputValues.lemonade;
            setInputValues({ ...inputValues, [name]: prevValue + 1 });
            dispatch(setLemonade(prevValue + 1));
        }
        else if (name == 'chocoMilk') {
            var prevValue = inputValues.chocoMilk;
            setInputValues({ ...inputValues, [name]: prevValue + 1 });
            dispatch(setChocoMilk(prevValue + 1));
        }
    };
    const decrement = (name) => {
        if (name == 'samosa') {
            var prevValue = inputValues.samosa;
            if (prevValue > 0) {
                setInputValues({ ...inputValues, [name]: prevValue - 1 });
                dispatch(setSamosa(prevValue - 1));
            }
        } else if (name == 'fries') {
            var prevValue = inputValues.fries;
            if (prevValue > 0) {
                setInputValues({ ...inputValues, [name]: prevValue - 1 });
                dispatch(setFries(prevValue - 1));
            }
        } else if (name == 'cheesyFries') {
            var prevValue = inputValues.cheesyFries;
            if (prevValue > 0) {
                setInputValues({ ...inputValues, [name]: prevValue - 1 });
                dispatch(setCheesyFries(prevValue - 1));

            }
        } else if (name == 'lemonade') {
            var prevValue = inputValues.lemonade;
            if (prevValue > 0) {
                setInputValues({ ...inputValues, [name]: prevValue - 1 });
                dispatch(setLemonade(prevValue - 1));
            }
        }
        else if (name == 'chocoMilk') {
            var prevValue = inputValues.chocoMilk;
            if (prevValue > 0) {
                setInputValues({ ...inputValues, [name]: prevValue - 1 });
                dispatch(setChocoMilk(prevValue - 1));
            }
        }
    };
    function getData() {
        axios.get(`${process.env.REACT_APP_BACK_END}/itemdata`)
            .then(res => {
                setLoaded(true);
                const formattedValue = res.data.data.reduce((acc, item) => {
                    acc[item.name] = item.price;
                    return acc;
                }, {});
                setPrices(formattedValue);
            }
            )
            .catch(e => {
                console.log(e);
            });
    }
    useEffect(() => {
        getData();
    }, []);
    const month = now.getMonth() + 1;
    return (
        <div className={style.order}>
            <Navbar />
            <div className={style.foodboxcontainer}>
                {
                    isLoaded ?
                        <div className={style.foodbox}>
                            <img src={Samosa} className={style.foodimg} />
                            <p className={style.itemname}>Samosa</p>
                            <p className={style.itemdesc}>Crispy and flavorful samosas filled with spiced potatoes, wrapped in a golden, flaky crust. A perfect snack.</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px', marginBottom: '0px' }}>
                                <p style={{ fontWeight: 'bold' }}>Price</p>
                                <p style={{ fontWeight: 'bold', color: 'rgb(240, 99, 49)' }}>{dayName != "Friday" ? prices.samosa : prices.samosa - 15} Rs</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px', marginBottom: '0px' }}>
                                <p style={{ fontWeight: 'bold' }}>Quantity</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <p style={{ cursor: 'pointer' }} onClick={() => { isLoaded && decrement("samosa") }}>-</p>
                                    <p style={{ fontWeight: 'bold' }}>{inputValues.samosa}</p>
                                    <p style={{ cursor: 'pointer' }} onClick={() => { isLoaded && increment("samosa") }}>+</p>
                                </div>
                            </div>
                        </div> :
                        <div className={style.foodbox}>
                            <div className={style.skeletonImage}></div>
                            <div className={style.skeletonText}></div>
                            <div className={style.skeletonDesc}></div>
                            <div className={style.skeletonPrice}></div>
                            <div className={style.skeletonQuantity}></div>
                        </div>
                }
                {
                    isLoaded ?
                        <div className={style.foodbox}>
                            <img src={CheesyFries} className={style.foodimg} />
                            <p className={style.itemname}>Loaded Fries</p>
                            <p className={style.itemdesc}>Our cheesy and crispy fries loaded with rich, melted cheese and creamy mayo. A perfect cheesy snack.</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px', marginBottom: '0px' }}>
                                <p style={{ fontWeight: 'bold' }}>Price</p>
                                <p style={{ fontWeight: 'bold', color: 'rgb(240, 99, 49)' }}>{dayName == "Friday" ? prices.cheesyFries - 30 : prices.cheesyFries} Rs</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                                <p style={{ fontWeight: 'bold' }}>Quantity</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <p style={{ cursor: 'pointer' }} onClick={() => { isLoaded && decrement("cheesyFries") }}>-</p>
                                    <p style={{ fontWeight: 'bold' }}>{inputValues.cheesyFries}</p>
                                    <p style={{ cursor: 'pointer' }} onClick={() => { isLoaded && increment("cheesyFries") }}>+</p>
                                </div>
                            </div>
                        </div> :

                        <div className={style.foodbox}>
                            <div className={style.skeletonImage}></div>
                            <div className={style.skeletonText}></div>
                            <div className={style.skeletonDesc}></div>
                            <div className={style.skeletonPrice}></div>
                            <div className={style.skeletonQuantity}></div>
                        </div>
                }
                {
                    isLoaded ?
                        <div className={style.foodbox}>
                            <img src={FrenchFries} className={style.foodimg} />
                            <p className={style.itemname}>French Fries</p>
                            <p className={style.itemdesc}>Crispy and golden, our French fries are perfectly seasoned and fried to perfection. Light, crunchy and quick snack.</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px', marginBottom: '0px' }}>
                                <p style={{ fontWeight: 'bold' }}>Price</p>
                                <p style={{ fontWeight: 'bold', color: 'rgb(240, 99, 49)' }}>{dayName == "Friday" ? prices.fries - 20 : prices.fries} Rs</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                                <p style={{ fontWeight: 'bold' }}>Quantity</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <p style={{ cursor: 'pointer' }} onClick={() => { isLoaded && decrement("fries") }}>-</p>
                                    <p style={{ fontWeight: 'bold' }}>{inputValues.fries}</p>
                                    <p style={{ cursor: 'pointer' }} onClick={() => { isLoaded && increment("fries") }}>+</p>
                                </div>
                            </div>
                        </div> :

                        <div className={style.foodbox}>
                            <div className={style.skeletonImage}></div>
                            <div className={style.skeletonText}></div>
                            <div className={style.skeletonDesc}></div>
                            <div className={style.skeletonPrice}></div>
                            <div className={style.skeletonQuantity}></div>
                        </div>
                }
                {
                    (month < 10 && month > 2) &&
                    (
                        isLoaded ?
                            <div className={style.foodbox}>
                                <img src={Lemonade} className={style.foodimg} />
                                <p className={style.itemname}>Lemonade</p>
                                <p className={style.itemdesc}>Refreshingly sweet and tangy lemonade, bursting with fresh citrus flavor in every sip. Perfect for battling the summer heat.</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px', marginBottom: '0px' }}>
                                    <p style={{ fontWeight: 'bold' }}>Price</p>
                                    <p style={{ fontWeight: 'bold', color: 'rgb(240, 99, 49)' }}>{dayName == "Friday" ? prices.lemonade - 15 : prices.lemonade} Rs</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                                    <p style={{ fontWeight: 'bold' }}>Quantity</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <p style={{ cursor: 'pointer' }} onClick={() => { isLoaded && decrement("lemonade") }}>-</p>
                                        <p style={{ fontWeight: 'bold' }}>{inputValues.lemonade}</p>
                                        <p style={{ cursor: 'pointer' }} onClick={() => { isLoaded && increment("lemonade") }}>+</p>
                                    </div>
                                </div>
                            </div> :

                            <div className={style.foodbox}>
                                <div className={style.skeletonImage}></div>
                                <div className={style.skeletonText}></div>
                                <div className={style.skeletonDesc}></div>
                                <div className={style.skeletonPrice}></div>
                                <div className={style.skeletonQuantity}></div>
                            </div>
                    )
                }
                {
                    (month > 10 || month < 3) &&
                    (
                        isLoaded ?
                            <div className={style.foodbox}>
                                <img src={ChocoMilk} className={style.foodimg} />
                                <p className={style.itemname}>Hot Choco Milk</p>
                                <p className={style.itemdesc}>Rich and creamy hot chocolate milk, blending smooth cocoa with velvety warmth. Perfect for cozy moments and chilly days.</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px', marginBottom: '0px' }}>
                                    <p style={{ fontWeight: 'bold' }}>Price</p>
                                    <p style={{ fontWeight: 'bold', color: 'rgb(240, 99, 49)' }}>{dayName == "Friday" ? prices.chocoMilk - 10 : prices.chocoMilk} Rs</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                                    <p style={{ fontWeight: 'bold' }}>Quantity</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <p style={{ cursor: 'pointer' }} onClick={() => { isLoaded && decrement("chocoMilk") }}>-</p>
                                        <p style={{ fontWeight: 'bold' }}>{inputValues.chocoMilk}</p>
                                        <p style={{ cursor: 'pointer' }} onClick={() => { isLoaded && increment("chocoMilk") }}>+</p>
                                    </div>
                                </div>
                            </div> :
                            <div className={style.foodbox}>
                                <div className={style.skeletonImage}></div>
                                <div className={style.skeletonText}></div>
                                <div className={style.skeletonDesc}></div>
                                <div className={style.skeletonPrice}></div>
                                <div className={style.skeletonQuantity}></div>
                            </div>
                    )
                }
            </div>
            <div className={style.quantityandprice}>
                <div className={style.price}>
                    <p>Total price</p>
                    <p style={{ fontWeight: 'bold', color: 'rgb(240, 99, 49)', fontSize: '18px' }}>{calculateTotal()} Rs</p>
                </div>
                <div className={style.quantity}>
                    <p>Total items</p>
                    <p>{getItems()}</p>
                </div>
                <btn onClick={() => { !ordering && sendOrder() }} className={style.btn}>Order</btn>
            </div>
        </div>
    );
}