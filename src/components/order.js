import style from '../styles/order.module.css';
import CheesyFries from '../images/chessyfries.jpg';
import FrenchFries from '../images/frenchfries.jpg';
import Roll from '../images/roll.jpg';
import Samosa from '../images/samosa.jpg';
import Navbar from './navbar';
import { useSelector, useDispatch } from "react-redux";
import { setCheesyFries, setFries, setRoll, setSamosa } from '../redux/slice';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Order() {
    const [isLoaded, setLoaded] = useState(false);
    const [send, isSending] = useState(false);
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const navigate = useNavigate();
    const itemQuantities = useSelector((state) => state.items);
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
    });
    const [prices, setPrices] = useState({
        samosa: 0,
        fries: 0,
        cheesyFries: 0,
        roll: 0,
    });
    function calculateTotal() {
        var sum = (inputValues.samosa * 50) + (inputValues.fries * 100) + (inputValues.cheesyFries * 150) + (inputValues.roll * 40);
        return sum;
    }

    function sendOrder() {
        if (calculateTotal() > 0) {
            const loadingToast = toast.loading("Ordering ...");
            axios.post('https://crunchybitesbackend.vercel.app/order', { items: inputValues, email: user.email, date: formattedDate, price: calculateTotal(), time: `${hours}:${minutes}:${seconds}` })
                .then(res => {
                    if (res.status == 201) {
                        toast.dismiss(loadingToast);
                        toast.success(res.data.message);
                        console.log(res);
                    }
                }).catch(e => {
                    toast.dismiss(loadingToast);
                    toast.error("An error occured");
                    console.log(e);
                })
        } else {
            toast.error('Add items first');
        }
    }
    function getItems() {
        var sum = (inputValues.samosa) + (inputValues.fries) + (inputValues.cheesyFries) + (inputValues.roll);
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
        } else if (name == 'roll') {
            var prevValue = inputValues.roll;
            setInputValues({ ...inputValues, [name]: prevValue + 1 });
            dispatch(setRoll(prevValue + 1));
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
                dispatch(setFries(prevValue - 1));
            }
        } else if (name == 'roll') {
            var prevValue = inputValues.roll;
            if (prevValue > 0) {
                setInputValues({ ...inputValues, [name]: prevValue - 1 });
                dispatch(setRoll(prevValue - 1));
            }
        }
    };
    function getData() {
        axios.get('https://crunchybitesbackend.vercel.app/itemdata')
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
    return (
        <div className={style.order}>
            <Navbar />
            <div className={style.foodboxcontainer}>
                <div className={style.foodbox}>
                    <img src={Samosa} className={style.foodimg} />
                    <p className={style.itemname}>Samosa</p>
                    <p className={style.itemdesc}>Crispy and flavorful samosas filled with spiced potatoes, wrapped in a golden, flaky crust. A perfect snack.</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px', marginBottom: '0px' }}>
                        <p style={{ fontWeight: 'bold' }}>Price</p>
                        {
                            isLoaded ?
                            <p style={{ fontWeight: 'bold', color: 'rgb(240, 99, 49)' }}>{inputValues.samosa > 0 ? inputValues.samosa * prices.samosa : prices.samosa} Rs</p> :
                            <p style={{ fontWeight: 'bold', color: 'rgb(240, 99, 49)' }}>Loading ...</p>
                        }
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px', marginBottom: '0px' }}>
                        <p style={{ fontWeight: 'bold' }}>Quantity</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <p style={{ cursor: 'pointer' }} onClick={() => {isLoaded && decrement("samosa")}}>-</p>
                            <p style={{ fontWeight: 'bold' }}>{inputValues.samosa}</p>
                            <p style={{ cursor: 'pointer' }} onClick={() => {isLoaded && increment("samosa")}}>+</p>
                        </div>
                    </div>
                </div>
                <div className={style.foodbox}>
                    <img src={CheesyFries} className={style.foodimg} />
                    <p className={style.itemname}>Loaded Fries</p>
                    <p className={style.itemdesc}>Our cheesy and crispy fries loaded with rich, melted cheese and creamy mayo. A perfect cheesy snack.</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px', marginBottom: '0px' }}>
                        <p style={{ fontWeight: 'bold' }}>Price</p>
                        {
                            isLoaded ?
                                <p style={{ fontWeight: 'bold', color: 'rgb(240, 99, 49)' }}>{inputValues.cheesyFries > 0 ? inputValues.cheesyFries * prices.cheesyFries : prices.cheesyFries} Rs</p> :
                                <p style={{ fontWeight: 'bold', color: 'rgb(240, 99, 49)' }}>Loading ...</p>
                        }
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                        <p style={{ fontWeight: 'bold' }}>Quantity</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <p style={{ cursor: 'pointer' }} onClick={() => {isLoaded && decrement("cheesyFries")}}>-</p>
                            <p style={{ fontWeight: 'bold' }}>{inputValues.cheesyFries}</p>
                            <p style={{ cursor: 'pointer' }} onClick={() => {isLoaded && increment("cheesyFries")}}>+</p>
                        </div>
                    </div>
                </div>
                <div className={style.foodbox}>
                    <img src={FrenchFries} className={style.foodimg} />
                    <p className={style.itemname}>French Fries</p>
                    <p className={style.itemdesc}>Crispy and golden, our French fries are perfectly seasoned and fried to perfection. Light, crunchy and quick snack.</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px', marginBottom: '0px' }}>
                        <p style={{ fontWeight: 'bold' }}>Price</p>
                        {
                            isLoaded ?
                            <p style={{ fontWeight: 'bold', color: 'rgb(240, 99, 49)' }}>{inputValues.fries > 0 ? inputValues.fries * prices.fries : prices.fries} Rs</p> :
                            <p style={{ fontWeight: 'bold', color: 'rgb(240, 99, 49)' }}>Loading ...</p>
                        }
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                        <p style={{ fontWeight: 'bold' }}>Quantity</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <p style={{ cursor: 'pointer' }} onClick={() => {isLoaded && decrement("fries")}}>-</p>
                            <p style={{ fontWeight: 'bold' }}>{inputValues.fries}</p>
                            <p style={{ cursor: 'pointer' }} onClick={() => {isLoaded && increment("fries")}}>+</p>
                        </div>
                    </div>
                </div>
                <div className={style.foodbox}>
                    <img src={Roll} className={style.foodimg} />
                    <p className={style.itemname}>Roll</p>
                    <p className={style.itemdesc}>Crispy and delicious potato rolls are packed with spiced mashed potatoes, wrapped in a golden and crunchy layer.</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px', marginBottom: '0px' }}>
                        <p style={{ fontWeight: 'bold' }}>Price</p>
                        {
                            isLoaded ?
                            <p style={{ fontWeight: 'bold', color: 'rgb(240, 99, 49)' }}>{inputValues.roll > 0 ? inputValues.roll * prices.roll : prices.roll} Rs</p>:
                            <p style={{ fontWeight: 'bold', color: 'rgb(240, 99, 49)' }}>Loading ...</p>
                        }
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                        <p style={{ fontWeight: 'bold' }}>Quantity</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <p style={{ cursor: 'pointer' }} onClick={() => {isLoaded && decrement("roll") }}>-</p>
                            <p style={{ fontWeight: 'bold' }}>{inputValues.roll}</p>
                            <p style={{ cursor: 'pointer' }} onClick={() => {isLoaded && increment("roll")}}>+</p>
                        </div>
                    </div>
                </div>
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
                <btn onClick={sendOrder} className={style.btn}>Order</btn>
            </div>
        </div>
    );
}