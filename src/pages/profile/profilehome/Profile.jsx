import React from "react";
import ModalProfile from '../../../components/modalprofile/ModalProfile'
import { Outlet } from "react-router-dom";
import style from './profileHome.module.css'
export default function Profile(){

    return(

        <>
        <div className={style.contain}>
        <div className={style.modal}>
        <ModalProfile />
        </div>
        <div className={style.outlet}>
        <Outlet />
        </div>
        </div>
        </>
    )
}
