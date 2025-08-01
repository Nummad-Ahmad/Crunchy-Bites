import style from '../styles/home.module.css';
import Footer from './footer';
import Navbar from './navbar';
import Happy from '../images/happy.png';
import Fries1 from '../images/fries3.png';
import Fries2 from '../images/fries2.png';
import Fries3 from '../images/fries1.png';
import { useEffect, useState } from 'react';
import CheesyFries from '../images/chessyfries.jpg';
import FrenchFries from '../images/frenchfries.jpg';
import Samosa from '../images/samosa.jpg';
import Lemonade from '../images/lemonade.jpg';
import ChocoMilk from '../images/choco.jpg';
import Win from '../images/win.png';
import { FaRegCircleCheck } from "react-icons/fa6";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import DP from "../images/dp.jpg";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userLoggedOut } from '../redux/userSlice';

export default function Home() {
    const dispatch = useDispatch();
    const [winner, setWinner] = useState({});
    const [openQuestion, setOpenQuestion] = useState('');
    const [index, setIndex] = useState(0);
    const images = [Fries1, Fries2, Fries3];
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
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACK_END}/verify-token`, {
            withCredentials: true
        }).then(res => {
            dispatch(userLoggedIn({ email: result.data.user.email, wins: result.data.user.wins }));
            console.log('res', res.data);
        }).catch(err => {
            dispatch(userLoggedOut());
            console.log('err', err.response.data);
        })
    }, []);
    useEffect(() => {
        getWinner();
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);
    function changeIndex(ind) {
        if (openQuestion == ind) {
            setOpenQuestion('');
        } else {
            setOpenQuestion(ind);
        }
    }
    const now = new Date();
    const month = now.getMonth() + 1;
    return (
        <div className={style.home}>
            <Navbar />
            <img src={images[index]} height='100%' width="100%" />
            <p className={style.tagline}>Best Taste & Quality</p>
            <div className={style.foodboxcontainer}>
                <div className={style.foodbox}>
                    <img src={Samosa} className={style.foodimg} />
                    <p className={style.itemname}>Samosa</p>
                    <p className={style.itemdesc}>Crispy and flavorful samosas filled with spiced potatoes, wrapped in a golden, flaky crust. A perfect snack.</p>
                </div>
                <div className={style.foodbox}>
                    <img src={CheesyFries} className={style.foodimg} />
                    <p className={style.itemname}>Cheesy Fries</p>
                    <p className={style.itemdesc}>Our cheesy and crispy fries loaded with rich, melted cheese and creamy mayo. A perfect blend of crunch and cheesy goodness.</p>
                </div>
                <div className={style.foodbox}>
                    <img src={FrenchFries} className={style.foodimg} />
                    <p className={style.itemname}>French Fries</p>
                    <p className={style.itemdesc}>Crispy and golden, our French fries are perfectly seasoned and fried to perfection. Light, crunchy and quick snack.</p>
                </div>
                {
                    (month < 10 && month > 2) &&
                    <div className={style.foodbox}>
                        <img src={Lemonade} className={style.foodimg} />
                        <p className={style.itemname}>Lemonade</p>
                        <p className={style.itemdesc}>Refreshingly sweet and tangy lemonade, bursting with fresh citrus flavor in every sip. Perfect for battling the summer heat.</p>
                    </div>
                }
                {
                    (month > 10 || month < 3) &&
                    <div className={style.foodbox}>
                        <img src={ChocoMilk} className={style.foodimg} />
                        <p className={style.itemname}>Hot Choco Milk</p>
                        <p className={style.itemdesc}>Rich and creamy hot chocolate milk, blending smooth cocoa with velvety warmth. Perfect for cozy moments and chilly days.</p>
                    </div>
                }
            </div>
            <div className={style.prizesection}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={Win} />
                    <p className={style.prizetitle}>Win exciting prizes !!!</p>

                    <p className={style.prizedesc}>Buy your favorite snacks and get a chance to win exciting prizes! The more you buy, the higher your chances of winning in our monthly lucky draw. Delicious treats and amazing rewards—don’t miss out!</p>
                </div>
                <img src={Happy} className={style.happyface} />
            </div>

            <p className={style.tagline}>Our Perks</p>
            <div className={style.foodboxcontainer}>
                <div className={style.advantagediv}>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFDC5A' }}>Quick & Satisfying</p>
                    <p style={{ fontSize: '14px' }}>Need a quick bite? Grab our delicious, crispy snacks made fresh and fast and enjoy a tasty treat anytime, anywhere. Perfect for your cravings on the go!</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '30px', color: '#FFDC5A', fontWeight: 'bold' }}>1</p>
                        <FaRegCircleCheck color='#FFDC5A' size={35} />
                    </div>
                </div>
                <div className={style.advantagediv}>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFDC5A' }}>Fresh & Hygienic</p>
                    <p style={{ fontSize: '14px' }}>Looking for a healthy and hygienic snack? Enjoy our fresh, clean, and delicious treats made with the finest ingredients. Eat fresh, stay healthy</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '30px', color: '#FFDC5A', fontWeight: 'bold' }}>2</p>
                        <FaRegCircleCheck color='#FFDC5A' size={35} />
                    </div>
                </div>
                <div className={style.advantagediv}>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFDC5A' }}>Crispy & Delicious</p>
                    <p style={{ fontSize: '14px' }}>Craving something crispy and delicious? Try our perfectly golden, crunchy snacks that are bursting with flavor. Freshly made and irresistibly tasty!</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '30px', color: '#FFDC5A', fontWeight: 'bold' }}>3</p>
                        <FaRegCircleCheck color='#FFDC5A' size={35} />
                    </div>
                </div>
                <div className={style.advantagediv}>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFDC5A' }}>Eat & Win Prizes</p>
                    <p style={{ fontSize: '14px' }}>Win exciting prizes. Buy your favorite crispy snacks and get a chance to win amazing rewards every month! The more you buy, the better your chances.</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '30px', color: '#FFDC5A', fontWeight: 'bold' }}>4</p>
                        <FaRegCircleCheck color='#FFDC5A' size={35} />
                    </div>
                </div>
            </div>
            <p className={style.tagline}>FAQs</p>
            <div className={style.faqoutercontainer}>
                <div onClick={() => changeIndex(1)} style={{ width: '90%', backgroundColor: '#252525', display: 'flex', flexDirection: 'column', padding: '10px', boxSizing: 'border-box', borderRadius: '5px', color: 'white', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <p style={{ fontWeight: 'bold', width: 'calc(100% - 30px)' }}>How online payments can be made?</p>
                        <div style={{ width: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {
                                openQuestion == 1 ? <GoChevronUp color='white' size={20} /> : <GoChevronDown color='white' size={20} />
                            }
                        </div>
                    </div>
                    {
                        openQuestion == 1 && <p>After placing your order, note your total price and order number. Send the payment via JazzCash or EasyPaisa to 0300-0000000, then WhatsApp the payment receipt along with your order number to the same number.

                        </p>
                    }
                </div>
                <div onClick={() => changeIndex(2)} style={{ width: '90%', backgroundColor: '#252525', display: 'flex', flexDirection: 'column', padding: '10px', boxSizing: 'border-box', borderRadius: '5px', color: 'white', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <p style={{ fontWeight: 'bold', width: 'calc(100% - 30px)' }}>How can I win the prize?</p>
                        <div style={{ width: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {
                                openQuestion == 2 ? <GoChevronUp color='white' size={20} /> : <GoChevronDown color='white' size={20} />
                            }
                        </div>
                    </div>
                    {
                        openQuestion == 2 && <p>Only the orders placed online will result in your participation in lucky draw. The more you order, the better your chances!</p>
                    }
                </div>
                <div onClick={() => changeIndex(3)} style={{ width: '90%', backgroundColor: '#252525', display: 'flex', flexDirection: 'column', padding: '10px', boxSizing: 'border-box', borderRadius: '5px', color: 'white', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <p style={{ fontWeight: 'bold', width: 'calc(100% - 30px)' }}>When is the lucky draw held?</p>
                        <div style={{ width: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {
                                openQuestion == 3 ? <GoChevronUp color='white' size={20} /> : <GoChevronDown color='white' size={20} />
                            }
                        </div>
                    </div>

                    {
                        openQuestion == 3 && <p>The lucky draw takes place on the 1st of every month. Orders from the previous month are not counted to determine the winner.</p>
                    }
                </div>
                <div onClick={() => changeIndex(4)} style={{ width: '90%', backgroundColor: '#252525', display: 'flex', flexDirection: 'column', padding: '10px', boxSizing: 'border-box', borderRadius: '5px', color: 'white', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <p style={{ fontWeight: 'bold', width: 'calc(100% - 30px)' }}>What is the QR code used for?</p>
                        <div style={{ width: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {
                                openQuestion == 4 ? <GoChevronUp color='white' size={20} /> : <GoChevronDown color='white' size={20} />
                            }
                        </div>
                    </div>

                    {
                        openQuestion == 4 && <p> The QR code in your winner's email will be scanned by our team for verification when you claim your prize. Make sure to keep it safe!</p>
                    }
                </div>
                <div onClick={() => changeIndex(5)} style={{ width: '90%', backgroundColor: '#252525', display: 'flex', flexDirection: 'column', padding: '10px', boxSizing: 'border-box', borderRadius: '5px', color: 'white', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <p style={{ fontWeight: 'bold', width: 'calc(100% - 30px)' }}>Is there any minimum order value to participate?</p>
                        <div style={{ width: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {
                                openQuestion == 5 ? <GoChevronUp color='white' size={20} /> : <GoChevronDown color='white' size={20} />
                            }
                        </div>
                    </div>

                    {
                        openQuestion == 5 && <p>No minimum order value is required. Every order counts, regardless of size.</p>
                    }
                </div>
                <div onClick={() => changeIndex(6)} style={{ width: '90%', backgroundColor: '#252525', display: 'flex', flexDirection: 'column', padding: '10px', boxSizing: 'border-box', borderRadius: '5px', color: 'white', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <p style={{ fontWeight: 'bold', width: 'calc(100% - 30px)' }}>How long is the winner QR code valid for?</p>
                        <div style={{ width: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {
                                openQuestion == 6 ? <GoChevronUp color='white' size={20} /> : <GoChevronDown color='white' size={20} />
                            }
                        </div>
                    </div>

                    {
                        openQuestion == 6 && <p> The QR code sent to the winner is valid only until the next lucky draw (i.e., until the 1st of the next month).</p>
                    }
                </div>
            </div>
            <p className={style.tagline}>Lucky Winner</p>
            <div className={style.luckywinnerOuter}>
                {
                    winner.name ?
                        <div className={style.luckyWinnerinner}>
                            <img src={DP} style={{ height: '170px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
                            <p >Congrats {winner?.name}! You’re our lucky winner this month!</p>
                        </div> :
                        <div className={style.luckyWinnerinner}>
                            <div className={style.skeletonImage}></div>
                            <div className={style.skeletonText}></div>
                            <div></div>
                        </div>
                }
            </div>
            <Footer />
        </div>
    );
}