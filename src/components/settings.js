import style from '../styles/settings.module.css';
import Navbar from './navbar';
import CheesyFries from '../images/chessyfries.jpg';
import FrenchFries from '../images/frenchfries.jpg';
import Roll from '../images/roll.jpg';
import Samosa from '../images/samosa.jpg';
import { useState } from 'react';

export default function Settings() {
    const [inputValues, setInputValues] = useState({
        samosa: 50,
        fries: 100,
        cheesyFries: 150,
        roll: 40,
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
        } else if (name == 'cheesyFries') {
            var prevValue = inputValues.cheesyFries;
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
    return (
        <div className={style.settings}>
            <Navbar />
            <div className={style.foodboxcontainer}>
                <div className={style.foodbox}>
                    <img src={Samosa} className={style.foodimg} />
                    <p className={style.itemname}>Samosa</p>
                    <p className={style.itemdesc}>Crispy and flavorful samosas filled with spiced potatoes, wrapped in a golden, flaky crust. A perfect snack.</p>
                    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 'bold', color: "rgb(240, 99, 49)" }}>Price</p>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', color: 'white' }}>
                            <p style={{ cursor: 'pointer' }} onClick={() => decrement("samosa")}>-</p>
                            <p style={{ fontWeight: 'bold' }}>{inputValues.samosa}</p>
                            <p style={{ cursor: 'pointer' }} onClick={() => increment("samosa")}>+</p>
                        </div>
                    </div>
                    <button className={style.btn}>Change</button>
                </div>
                <div className={style.foodbox}>
                    <img src={CheesyFries} className={style.foodimg} />
                    <p className={style.itemname}>Cheesy Fries</p>
                    <p className={style.itemdesc}>Our cheesy and crispy fries loaded with rich, melted cheese and creamy mayo. A perfect blend of crunch and cheesy goodness.</p>
                    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 'bold', color: "rgb(240, 99, 49)" }}>Price</p>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', color: 'white' }}>
                            <p style={{ cursor: 'pointer' }} onClick={() => decrement("cheesyFries")}>-</p>
                            <p style={{ fontWeight: 'bold' }}>{inputValues.cheesyFries}</p>
                            <p style={{ cursor: 'pointer' }} onClick={() => increment("cheesyFries")}>+</p>
                        </div>
                    </div>
                    <button className={style.btn}>Change</button>
                </div>
                <div className={style.foodbox}>
                    <img src={FrenchFries} className={style.foodimg} />
                    <p className={style.itemname}>French Fries</p>
                    <p className={style.itemdesc}>Crispy and golden, our French fries are perfectly seasoned and fried to perfection. Light, crunchy and quick snack.</p>
                    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 'bold', color: "rgb(240, 99, 49)" }}>Price</p>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', color: 'white' }}>
                            <p style={{ cursor: 'pointer' }} onClick={() => decrement("fries")}>-</p>
                            <p style={{ fontWeight: 'bold' }}>{inputValues.fries}</p>
                            <p style={{ cursor: 'pointer' }} onClick={() => increment("fries")}>+</p>
                        </div>
                    </div>
                    <button className={style.btn}>Change</button>
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
                    <button className={style.btn}>Change</button>
                </div>
            </div>
        </div>
    );
}