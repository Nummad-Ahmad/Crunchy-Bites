import style from '../styles/notFound.module.css';
import Navbar from './navbar';
import NotFoundRobot from '../images/notFound.png';

export default function NotFound() {
    return (
        <>
            <div className={style.notFound}>
                <Navbar />
                <div className={style.contentContainer}>
                    <div className={style.textSection}>
                        <p className={style.heading}>
                            Page Not Found
                        </p>
                        <p className={style.description}>
                            Sorry, but the page you are looking for does not exist. Please return to the homepage.
                        </p>
                        <button className={style.returnButton}>
                            Return To Home
                        </button>
                    </div>

                    <img src={NotFoundRobot} className={style.robotimage} />
                </div>
            </div>
        </>
    )
}