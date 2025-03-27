import { useEffect, useState } from 'react';
import style from '../styles/customers.module.css';
import Navbar from './navbar';
import axios from 'axios';

export default function Customers() {
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage ;
    const firstIndex = lastIndex - recordsPerPage; 
    const records = userData.slice(firstIndex, lastIndex + 1) || [];
    const nPage = Math.ceil(userData.length / recordsPerPage);
    const totalPages = [...Array(nPage + 1).keys()].slice(1) || [];
    console.log(totalPages);
    useEffect(() => {
        axios.get('http://localhost:3000/customerdata').
            then(res => {
                if (res.status == 200) {
                    setUserData(res.data.data);
                }
            }).catch(e => {
                console.log(e);
            });
    }, []);
    function prevPage(){
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1);
        }
    }
    function cheangePage(page){
        setCurrentPage(page);
    }
    function nextPage(){
        if(currentPage !== nPage){
            setCurrentPage(currentPage + 1);
        }
    }
    return (
        <div className={style.customers}>
            <Navbar />
            <div className={style.customerscontainer}>
                <div className={style.customerdata}>

                    <div style={{ padding: '10px', boxSizing: 'border-box', backgroundColor: 'rgb(25, 25, 25)', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                        <p className={style.name}>Name</p>
                        <p className={style.email}>Email</p>
                        <p className={style.totalorders}>Total orders</p>
                        <p className={style.money}>Wins</p>
                    </div>
                    {
                        records &&
                        records.map((item, index) => {
                            return (
                            item.email != "nummad222@gmail.com" &&
                                <div className={style.data}>
                                    <p className={style.name}>{item.name}</p>
                                    <p className={style.email}>{item.email.slice(0, 20)}</p>
                                    <p className={style.totalorders}>{item.orders}</p>
                                    <p className={style.money}>{item.wins}</p>
                                </div>
                            );
                        })
                    }
                </div>
                <div className={style.mobilecontent}>
                    {
                        records &&
                        records.map((item, index) => {
                            return (
                                <div className={style.mobiledata}>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '70px' }}>
                                        <p>{item.name}</p>
                                        <p>{item.email}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '70px' }}>
                                        <p>{item.orders} Orders</p>
                                        <p>{item.wins} Wins</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={style.paginationdata}>
                    <p>
                    Showing {currentPage == nPage ? userData.length - 1 : lastIndex - 1} of {userData?.length - 1
                    } records
                    </p>
                    <div style={{color: 'white', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <p onClick={prevPage} className={style.inactiveButton}>Prev</p>
                        {
                            totalPages.map((item, index)=>{
                                return(
                                <p onClick={()=> cheangePage(item)} className={currentPage == item ? style.activeButton : style.inactiveButton} key={index}>
                                    {item}
                                </p>
                                )
                            })
                        }
                        <p onClick={nextPage} className={style.inactiveButton}>Next</p>
                    </div>
                </div>
            </div>
        </div>
    );
}