import Image from 'next/image'
import React from 'react'
import logo from '../../public/kc-logo.png'
import india from '../../public/indiaFlag.png'
import style from './styles.module.css'
import { IoSearch ,IoPerson} from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
export default function Header() {
    const gocart = () => {
        window.location.replace("https://kingdomcollection.uk/shopping-cart/");
      }
    const goprofile = () => {
        window.location.replace("https://kingdomcollection.uk/my-account/");
      }
    return (
        <>
            <div className={style.navber}>
                <div className="logo">
                    <Image src={logo} width={240} height={70} />
                </div>
                <div className={style.search}>
                    <input placeholder='Search for anything' className={style.input} />
                    <div className={style.searchIconDiv}><IoSearch className={style.searchIcon} /></div>
                </div>
                <div className={style.navberList}>
                     <div className={style.signIn} title='my account' onClick={goprofile}>
                        <IoPerson/>
                        </div> 
                    {/* <div className={style.signIn} title='sign in'>Sign in</div> */}
                    <div className={style.indiaFlagDiv}>
                        <Image src={india} width={20} height={20} className={style.indiaFlag} />
                    </div>
                    <div className={style.like}><FaRegHeart /></div>
                    <div className={style.cart} onClick={gocart}>
                       
                        <FiShoppingCart />
                        <span className={style.cartValue}>0</span>
                        </div>
                </div>
            </div>
        </>
    )
}
