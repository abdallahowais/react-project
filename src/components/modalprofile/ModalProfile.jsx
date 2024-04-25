import React from "react";
import { Link } from "react-router-dom";
import style from '../../pages/profile/profilehome/profileHome.module.css'


export default function MofalProfile(){

    return(

        <>
        <Link  className={style.aa} to='/profile'>my information</Link>
        <Link  className={style.aa} to='userorder'>My Order</Link>
        


        </>
    )
}
