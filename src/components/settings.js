import style from '../styles/settings.module.css';
import Navbar from './navbar';
import Cheesyfries from '../images/chessyfries.jpg';
import Frenchfries from '../images/frenchfries.jpg';
import Roll from '../images/roll.jpg';
import samosa from '../images/samosa.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Settings() {
    const [inputValues, setInputValues] = useState({
        samosa: 50,
        fries: 100,
        cheesyfries: 150,
        roll: 40,
    });
    const increment = (name) => {
        if (name == 'samosa') {
            var prevValue = inputValues.samosa;
            setInputValues({ ...inputValues, [name]: prevValue + 10 });
        } else if (name == 'fries') {
            var prevValue = inputValues.fries;
            setInputValues({ ...inputValues, [name]: prevValue + 10 });
        } else if (name == 'cheesyfries') {
            var prevValue = inputValues.cheesyfries;
            setInputValues({ ...inputValues, [name]: prevValue + 10 });
        } else if (name == 'roll') {
            var prevValue = inputValues.roll;
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
        } else if (name == 'cheesyfries') {
            var prevValue = inputValues.cheesyfries;
            if (prevValue > 0) {
                setInputValues({ ...inputValues, [name]: prevValue - 10 });
            }
        } else if (name == 'roll') {
            var prevValue = inputValues.roll;
            if (prevValue > 0) {
                setInputValues({ ...inputValues, [name]: prevValue - 10 });
            }
        }
    };
    function updatePrice(name, price){
        axios.post('http://localhost:3000/updateitem', {name, price})
        .then(res => {
            if(res.status == 200){
                toast.success(res.data.message);
            }
        }).catch(e => {
            console.log(e);
        })
    }
    function getData(){
        axios.get('http://localhost:3000/itemdata')
        .then(res =>{
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
    useEffect(()=>{
        getData();
    }, []);
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
                            <p style={{ fontWeight: 'bold' }}>{inputValues.samosa }</p>
                            <p style={{ cursor: 'pointer' }} onClick={() => increment("samosa")}>+</p>
                        </div>
                    </div>
                    <button onClick={()=> updatePrice('samosa', inputValues.samosa)} className={style.btn}>Change</button>
                </div>
                <div className={style.foodbox}>
                    <img src={Cheesyfries} className={style.foodimg} />
                    <p className={style.itemname}>Cheesy fries</p>
                    <p className={style.itemdesc}>Our cheesy and crispy fries loaded with rich, melted cheese and creamy mayo. A perfect blend of cheesy goodness.</p>
                    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 'bold', color: "rgb(240, 99, 49)" }}>Price</p>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', color: 'white' }}>
                            <p style={{ cursor: 'pointer' }} onClick={() => decrement("cheesyfries")}>-</p>
                            <p style={{ fontWeight: 'bold' }}>{inputValues.cheesyfries}</p>
                            <p style={{ cursor: 'pointer' }} onClick={() => increment("cheesyfries")}>+</p>
                        </div>
                    </div>
                    <button onClick={()=> updatePrice('cheesyfries', inputValues.cheesyfries)} className={style.btn}>Change</button>
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
                    <button onClick={()=> updatePrice('fries', inputValues.fries)} className={style.btn}>Change</button>
                </div>
                <div className={style.foodbox}>
                    <img src={Roll} className={style.foodimg} />
                    <p className={style.itemname}>Roll</p>
                    <p className={style.itemdesc}>Crispy and delicious potato rolls are packed with spiced mashed potatoes, wrapped in a golden and crunchy layer.</p>
                    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 'bold', color: "rgb(240, 99, 49)" }}>Price</p>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', color: 'white' }}>
                            <p style={{ cursor: 'pointer' }} onClick={() => decrement("roll")}>-</p>
                            <p style={{ fontWeight: 'bold' }}>{inputValues.roll}</p>
                            <p style={{ cursor: 'pointer' }} onClick={() => increment("roll")}>+</p>
                        </div>
                    </div>
                    <button onClick={()=> updatePrice('roll', inputValues.roll)} className={style.btn}>Change</button>
                </div>
            </div>
        </div>
    );
}