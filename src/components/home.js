import style from '../styles/home.module.css';
import FaqsComponent from './FaqsComponent';
import Footer from './footer';
import Navbar from './navbar';
import Happy from '../assets/images/happy.png';
import Fries1 from '../assets/images/fries3.png';
import Fries2 from '../assets/images/fries2.png';
import Fries3 from '../assets/images/fries1.png';
import { useEffect, useState } from 'react';
import Win from '../assets/images/win.png';
import { FaRegCircleCheck } from "react-icons/fa6";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import DP from "../assets/images/dp.jpg";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userLoggedIn, userLoggedOut } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { getFoodItems } from '../constants/foodItems';
import { getPerks } from '../constants/perks';
import { getFaqs } from '../constants/faqs';

export default function Home() {
    const dispatch = useDispatch();
    const [winner, setWinner] = useState({});
    const [openQuestion, setOpenQuestion] = useState('');
    const [index, setIndex] = useState(0);
    const images = [Fries1, Fries2, Fries3];
    const navigate = useNavigate();
    const now = new Date();
    const month = now.getMonth() + 1;
    const foodItems = getFoodItems(month);
    const perks = getPerks;
    const faqs = getFaqs;

    function getWinner() {
        axios.get(`${process.env.REACT_APP_BACK_END}/winner`)
            .then(res => {
                if (res.status === 200) {
                    setWinner(res.data.winner);
                } else if (res.status === 404) {
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
            dispatch(userLoggedIn({ email: res.data.user.email, wins: res.data.user.wins, notificationRead: res.data.user.notificationRead }));
        }).catch(err => {
            dispatch(userLoggedOut());
            console.log('err', err.response?.data);
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
        if (openQuestion === ind) {
            setOpenQuestion('');
        } else {
            setOpenQuestion(ind);
        }
    }

    return (
        <div className={style.home}>
            <Navbar />
            <img src={images[index]} height='100%' width="100%" alt='' />
            <p className={style.tagline}>Best Taste & Quality</p>
            <div className={style.foodboxcontainer}>
                {
                    foodItems.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => navigate('/order')}
                            className={style.foodbox}
                        >
                            <img src={item.img} className={style.foodimg} alt='' />
                            <p className={style.itemname}>{item.name}</p>
                            <p className={style.itemdesc}>{item.desc}</p>
                        </div>
                    ))
                }
            </div>

            <div className={style.prizesection}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={Win} alt='' />
                    <p className={style.prizetitle}>Win exciting prizes !!!</p>

                    <p className={style.prizedesc}>Buy your favorite snacks and get a chance to win exciting prizes! The more you buy, the higher your chances of winning in our monthly lucky draw. Delicious treats and amazing rewards—don’t miss out!</p>
                </div>
                <img src={Happy} className={style.happyface} alt='' />
            </div>

            <p className={style.tagline}>Our Perks</p>
            <div className={style.foodboxcontainer}>
                {
                    perks.map((perk, i) => (
                        <div key={i} className={style.advantagediv}>
                            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFDC5A' }}>
                                {perk.title}
                            </p>

                            <p style={{ fontSize: '14px' }}>
                                {perk.desc}
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ fontSize: '30px', color: '#FFDC5A', fontWeight: 'bold' }}>
                                    {i + 1}
                                </p>
                                <FaRegCircleCheck color='#FFDC5A' size={35} />
                            </div>
                        </div>
                    ))
                }
            </div>
            
            <p className={style.tagline}>FAQs</p>
            <div className={style.faqoutercontainer}>
    {
        faqs.map((faq, i) => (
            <FaqsComponent
                key={i}
                index={i + 1}
                question={faq.question}
                answer={faq.answer}
                openQuestion={openQuestion}
                changeIndex={changeIndex}
            />
        ))
    }
</div>
            <p className={style.tagline}>Lucky Winner</p>
            <div className={style.luckywinnerOuter}>
                {
                    winner.name ?
                        <div className={style.luckyWinnerinner}>
                            <img src={DP} style={{ height: '170px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} alt='' />
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