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
import Roll from '../images/roll.jpg';
import Samosa from '../images/samosa.jpg';
import Win from '../images/win.png';

export default function Home() {
    const [index, setIndex] = useState(0);
    const images = [Fries1, Fries2, Fries3];
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);
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
                <div className={style.foodbox}>
                    <img src={Roll} className={style.foodimg} />
                    <p className={style.itemname}>Roll</p> 
                    <p className={style.itemdesc}>Crispy and delicious potato rolls are packed with spiced mashed potatoes, wrapped in a golden and crunchy layer.</p>   
                </div>
            </div>
            <div className={style.prizesection}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <img src={Win} />
                <p className={style.prizetitle}>Win exciting prizes !!!</p>
                
                <p className={style.prizedesc}>Buy your favorite snacks and get a chance to win exciting prizes! The more you buy, the higher your chances of winning in our weekly lucky draw. Delicious treats and amazing rewards—don’t miss out!</p>
            </div>
                <img src={Happy} className={style.happyface}/>
            </div>
            <Footer />
        </div>
    );
}